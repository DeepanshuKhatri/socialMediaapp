import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, orderBy,serverTimestamp, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from "../config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { HeartFilled, HeartOutlined, CommentOutlined } from '@ant-design/icons';
import { Divider, Input, Modal } from 'antd';
const Post = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
//   const [user] = useAuthState(auth);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

useEffect(() => {
    const postRef = doc(db, 'posts', postId);
    const unsubscribePost = onSnapshot(postRef, (doc) => {
        setPost(doc.data());
    });
    const commentsQuery = query(
        collection(db, 'comments'),
        where('postId', '==', postId),
        orderBy('createdAt')
      );
      // const unsubscribeComments = onSnapshot(commentsQuery, (snapshot) => {
      //   const fetchedComments = snapshot.docs.map((doc) => ({
      //     id: doc.id,
      //     ...doc.data(),
      //   }));
      //   setComments(fetchedComments);
      // });
  
      return () => {
        unsubscribePost();
        // unsubscribeComments();
      };
}, [postId]);

// useEffect(()=>{
//   post?.likes?.forEach((obj)=>{
//       if(auth.currentUser.uid == obj){
//           setLiked(true);
//           console.log("df")
//       }
//       console.log('adhf')
//   })
// })

const showModal = () => {
  setIsModalOpen(true);
};
const handleOk = () => {
  setIsModalOpen(false);
};
const handleCancel = () => {
  setIsModalOpen(false);
};


  const handleLike = async () => {
    // Add the current user's ID to the likes array
    const updatedLikes = [...post.likes, auth.currentUser.uid];
    await updateDoc(doc(db, 'posts', postId), { likes: updatedLikes });

    setLiked(true);
  };

  const handleUnlike = async () => {
    // Remove the current user's ID from the likes array
    const updatedLikes = post.likes.filter((uid) => uid !== auth.currentUser.uid);
    await updateDoc(doc(db, 'posts', postId), { likes: updatedLikes });

    setLiked(false);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    // Create a new comment document
    const newComment = {
      postId,
      userId: auth.currentUser.uid,
      content: commentText,
      // createdAt: serverTimestamp(),
    };
    // setComments(prev=> [...prev, newComment])

    try {
      // Add the comment to Firestore
      const updatedComments = [...post.comments, newComment]
      // updatedComments.push(newComment)
      await updateDoc(doc(db, 'posts', postId), {comments: updatedComments});
      setCommentText('');
      // setComments((prevComments) => [...prevComments, newComment]);

   
    } catch (error) {
      console.error('Error adding comment: ', error);
    }
  };

  return (
    <div className='post'>
      {/* Render the post content */}
      {post && (
        <div>
          <h3>{post.name}</h3>
          <Divider/>
          <img className='image' height={600} width={500} src={post.url} alt="" />
          <p>{post.caption}</p>
          {/* <p>{post.content}</p> */}
        </div>
      )}
  <Divider/>
      {/* Render like/unlike button */}
      <div className="like-comment">

      {liked ? (
        <button onClick={handleUnlike} className='like'><div className='like-count'><HeartFilled/> {post && <p>{post.likes.length}</p>}</div></button>
        ) : (
          <button onClick={handleLike} className='like'><div className='like-count'><HeartOutlined/> {post && <p>{post.likes.length}</p>}</div></button>
          )}
      <button onClick={()=> setIsModalOpen(true)} className='comment'><div className='like-count'> <CommentOutlined className='comment'/>{post && <p>{post.comments.length}</p>}</div></button>
          </div>

      {/* Render the number of likes */}
     
      <div>
        <form onSubmit={handleSubmitComment}>
          <Input
            type="text"
            className='comment-input'
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
          />
          {/* <button type="submit">Submit</button> */}
        </form>
      
    </div>

    <Modal title="Comments" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="comments-modal">
        {post?.comments?.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
        </div>
      </Modal>
      </div>

  );
};

export default Post;