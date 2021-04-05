import React, { forwardRef } from "react";
import "./Message.css";
import { Avatar } from "@material-ui/core";
import { PhotoAlbumOutlined } from "@material-ui/icons";

const Message = forwardRef(
  (
    { id, content: { timestamp, message, email, displayName, photo, uid } },
    ref
  ) => {
    return (
      <div ref={ref} className="message" key={id}>
        <Avatar src={[photo]} />
        <p>{message}</p>
        <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
      </div>
    );
  }
);

export default Message;
