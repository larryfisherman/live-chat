import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Chat.css";
import Message from "./Message";
import db from "../../firebase/firebase";
import firebase from "firebase";
import "firebase/firestore";
import { selectChatId, selectChatName } from "../../store/chatSlice";
import { selectUser } from "../../store/userSlice";
import { setHamburgerClass } from "../../store/chatSlice";
import FlipMove from "react-flip-move";

function Chat() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const chatId = useSelector(selectChatId);
  const chatName = useSelector(selectChatName);
  const [messages, setMessages] = useState([]);
  const [toggleButton, setToggleButton] = useState(false);

  useEffect(() => {
    if (chatId) {
      db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    }
  }, [chatId]);

  useEffect(() => {
    dispatch(
      setHamburgerClass({
        hamburgerClass: toggleButton,
      })
    );
  }, [toggleButton]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("chats").doc(chatId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: inputValue,
      displayName: user.displayName,
      photo: user.photo,
      email: user.email,
    });
    setInputValue("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <h4>
          To: <span className="chat__userName">{chatName}</span>
        </h4>
        <button
          onClick={() => {
            setToggleButton(!toggleButton);
          }}
          className={
            !toggleButton
              ? "chat__headerHamburger"
              : "chat__headerHamburger chat__headerHamburger--active"
          }
        >
          <span className="hamburger__box">
            <span className="hamburger__inner"></span>
          </span>
        </button>
      </div>
      <div className="chat__messages">
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Message key={id} content={data} />
          ))}
        </FlipMove>
      </div>
      <div className="chat__messageInput">
        <form onSubmit={sendMessage}>
          <input
            placeholder={"Message"}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={!chatId}
          />
          <button
            type="submit"
            className="chat__messageInputButton"
            disabled={!chatId}
          ></button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
