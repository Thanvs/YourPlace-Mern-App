import React from "react";
import Card from "../../../shared/components/UIElements/card/Card";
import PlaceItem from "../placeItem/PlaceItem";
import Button from "../../../shared/components/formElements/button/Button";
import "./PlacesList.css";

const PlacesList = ({ loadedPlaces }, props) => {
  if (loadedPlaces.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to="/places/new">Share place</Button>
        </Card>
      </div>
    );
  }
  return (
    <div className="place-list">
      {loadedPlaces.map((item) => {
        return (
          <PlaceItem key={item.id} item={item} onDelete={props.onDeletePlace} />
        );
      })}
    </div>
  );
};

export default PlacesList;
