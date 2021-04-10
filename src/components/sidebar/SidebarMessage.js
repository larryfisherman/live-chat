import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setChat } from "../../store/chatSlice";
import db from "../../firebase/firebase";
import * as timeago from "timeago.js";

function SidebarMessage({ id, chatName }) {
  const dispatch = useDispatch();
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
      <Avatar src={chatDetails[0]?.photo} />
      <div className="sidebarchat__info">
        <h4>{chatName} </h4>
        <small>
          {timeago.format(new Date(chatDetails[0]?.timestamp?.toDate()))}
        </small>
        <p>{chatDetails[0]?.message}</p>
      </div>
    </div>
  );
}

export default SidebarMessage;
