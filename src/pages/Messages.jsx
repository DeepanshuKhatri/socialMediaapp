import React, { useEffect, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
// import SendMessage from './SendMessage'
import { useSelector } from "react-redux";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "../components/Navbar";
import SendMessage from "../components/SendMessage";
import { Divider, Avatar } from "antd";

{/* <Navbar/> */ }

const Message = () => {
  const [user] = useAuthState(auth)
  const [members, setMembers] = useState([])
  const [receiver, setReceiver] = useState("");
  const [messages, setMessages] = useState([]);
  const selectedMember = [];


  const selector = useSelector(state => state.user.users)
  useEffect(() => {
    const q = query(
      collection(db, "users")
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let members = [];
      QuerySnapshot.forEach((doc) => {
        members.push({ ...doc.data() })
      })
      setMembers(members);

    })

    return () => unsubscribe;
  }, [])
  members.forEach((mem) => {
    if (mem.uid != auth.currentUser.uid) {
      selectedMember.push({ label: mem.name, value: mem.uid })
    }
  }
  )
  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      const { uid } = auth.currentUser;
      setMessages(messages.filter(x => x.uid === `${uid}-${receiver}` || x.uid === `${receiver}-${uid}`));

    });

    return () => unsubscribe;
  }, [receiver]);

  return (
    <div className="messages">
      <Navbar />
      <div className="message-container">

        <div className="receiver-display">
          {
            members.map((mem) => {
              const { uid } = auth.currentUser;
              return <div  onClick={() => setReceiver(mem.uid)} className="mem-display1">{mem.uid != uid &&
                <>
                  <div className="mem-display">
                    <Avatar
                      size={60}
                      src={mem.avatar}
                      alt="no"
                    />
                    <div className="name">
                      <h4>{mem.name}</h4>

                    </div>
                  </div>

                  <Divider />
                </>}
              </div>

            })
          }
        </div>
          <div className="show-message">



        <div className="chat-message">



          {messages?.map((message) => (
            <>
              {
                message.sender == selector.uid ?
                  <div className=""><p className="p2">{message.text}</p></div>
                  :
                  <div className=""><p className="p1">{message.text}</p></div>

              }

            </>
          ))}
        </div>


        <div className="message-input">
          <SendMessage receiver={receiver} />


        </div>

      </div>
      </div>

    </div>


  );
};

export default Message;