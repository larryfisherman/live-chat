import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./SidebarMessage.css";
import { Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setChat } from "../../../store/chatSlice";
import { selectUser } from "../../../store/userSlice";
import db from "../../../firebase/firebase";

function SidebarMessage({ id, chatName }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [chatDetails, setChatDetails] = useState([]);

  useEffect(() => {
    db.collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setChatDetails(snapshot.docs.map((doc) => doc.data()));
      });
  }, [id]);

  return (
    <div
      className="sidebarMessage"
      onClick={() => {
        dispatch(
          setChat({
            chatId: id,
            chatName,
          })
        );
      }}
    >
      <Avatar />
      <div className="sidebarchat__info">
        <h4>{chatName} </h4>
        <small>
          {new Date(chatDetails[0]?.timestamp?.toDate()).toLocaleString()}
        </small>
        <p>{chatDetails[0]?.message}</p>
      </div>
    </div>
  );
}

export default SidebarMessage;
