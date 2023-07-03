import React, {useState, useEffect} from "react";
import { Menu, Input, Button, FloatButton, Modal  } from "antd";
import {
  HomeFilled,
  SearchOutlined,
  BellFilled,
  LinkedinFilled,
  MessageFilled,
  LogoutOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Navbar from "../components/Navbar";
import {storage} from '../config/firebase';
import {ref, uploadBytes, getDownloadURL, listAll, list} from 'firebase/storage'
import { getFirestore, orderBy, onSnapshot, doc, updateDoc, collection,getDocs, addDoc, where, query, QuerySnapshot, serverTimestamp } from "firebase/firestore";
import { useSelector } from "react-redux";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Post from "../components/Post";




const Home = () => {
  const [user] = useAuthState(auth)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [post, setPost] = useState([]);
  const [caption, setCaption] = useState();
  const [like, setLike] = useState(false);

  const selector = useSelector(state => state.user.users)

  const imageListRef = ref(storage, "images/");

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    if(imageUpload== null) return;

    const imageRef = ref(storage, `images/${imageUpload.name}`);
     uploadBytes(imageRef, imageUpload).then((snapshot)=>{
       getDownloadURL(snapshot.ref).then((url)=>{
        // setPost({name:selector.name, uid:selector.uid, url:url})
        addDoc(collection(db, "posts"), {
          name:selector.name,caption: caption, uid:selector.uid, url:url, createdAt: serverTimestamp(),
          likes:[], comments:[]
        });  
        // setImageUrls(prev=>[...prev, url]);
      })
    })


    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(()=>{
  

    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot)=>{
      let posts = [];
      querySnapshot.forEach((doc)=>{
        // console.log(doc.data());
        posts.push({...doc.data(), id:doc.id})
      })
      setPost(posts);
      // console.log(post);

    })
    return ()=> unsubscribe;

  }, [])

  function likePost(){
    console.log("likePost")
    // const updatedLikes = [...post]
    setLike(true);
  }
  function unlikePost(){
    console.log("unlike")
    setLike(false);
  }


  return (
    <div className="container">
      <div>
      <Navbar/>
      </div>
      <div className="home-layout" >
        {/* <div className="recent-homepage">
          <p>recent</p>
        </div> */}

        <div>
          {post?.map((obj)=>{
            return <>
           
            <Post postId={obj.id}/>
            </>
          })}
        </div>
        <FloatButton icon={<PlusOutlined/>} onClick={showModal}/>
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <input type="text" onChange={e=>setCaption(e.target.value)} />
        <input type="file" onChange={e=>setImageUpload(e.target.files[0])}/>
      </Modal>
      </div>
    </div>
  );
};

export default Home;
