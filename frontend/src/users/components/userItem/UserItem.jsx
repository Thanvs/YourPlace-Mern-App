import React from "react";

import { Link } from "react-router-dom";

import Card from "../../../shared/components/UIElements/card/Card";
import Avatar from "../../../shared/components/UIElements/avatar/Avatar";

import "./UserItem.css";

const UserItem = (props) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.item.id}/places`}>
          <div className="user-item__image">
            <Avatar
              image={`http://localhost:5000/${props.item.image}`}
              alt={props.item.name}
            />
          </div>
          <div className="user-item__info">
            <h2>{props.item.name}</h2>
            <h3>
              {props.item.places.length} -
              {props.item.places.length === 1 ? " Place" : " Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
