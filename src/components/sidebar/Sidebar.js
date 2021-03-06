import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";
import { hamburgerMenu } from "../../store/chatSlice";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RateReviewIcon from "@material-ui/icons/RateReview";
import SidebarMessage from "./SidebarMessage";
import db, { auth } from "../../firebase/firebase";

function Sidebar() {
  const user = useSelector(selectUser);
  const hamburgerMenuToggle = useSelector(hamburgerMenu);
  const [chats, setChats] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    db.collection("chats").onSnapshot((snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          chatName: doc.data(),
        }))
      );
    });
  }, []);

  const addChat = () => {
    const chatName = prompt("Enter a chat name");
    if (chatName) {
      db.collection("chats").add({
        chatName,
      });
    }
  };

  console.log(hamburgerMenuToggle);

  return (
    <div className={hamburgerMenuToggle ? "mobileSidebar" : "sidebar"}>
      <div className="sidebar__header">
        <Avatar
          src={user.photo}
          onClick={() => auth.signOut()}
          className="sidebar__headerAvatar"
        />
        <div className="sidebar__input">
          <input
            placeholder="Search"
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
          <SearchIcon />
        </div>
        <IconButton variant="outlined" className="sidebar__inputButton">
          <RateReviewIcon onClick={addChat} />
        </IconButton>
      </div>
      <div className="sidebar__messages">
        {chats
          .filter(({ chatName }) => chatName.chatName.includes(searchInput))
          .map(({ id, chatName }) => (
            <SidebarMessage key={id} id={id} chatName={chatName.chatName} />
          ))}
      </div>
    </div>
  );
}

export default Sidebar;
