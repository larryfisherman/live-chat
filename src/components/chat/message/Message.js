import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import "./Message.css";
import { Avatar } from "@material-ui/core";

import { selectUser } from "../../../store/userSlice";

const Message = forwardRef(
  (
    { id, content: { timestamp, message, email, displayName, photo, uid } },
    ref
  ) => {
    const user = useSelector(selectUser);
    return (
      <div
        ref={ref}
        className={`message ${user.email === email && "message__sender"}`}
        key={id}
      >
        <Avatar className="message__photo" src={[photo]} />
        <p>{message}</p>
        <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
      </div>
    );
  }
);

export default Message;
