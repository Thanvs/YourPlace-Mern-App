import React from "react";

import UserItem from "../userItem/UserItem";

import "./UsersList.css";

const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No Users Found.</h2>
      </div>
    );
  }
  return (
    <ul className="users-list">
      {props.items.map((user) => {
        return <UserItem key={user.id} item={user} id={user.id} />;
      })}
    </ul>
  );
};

export default UsersList;
