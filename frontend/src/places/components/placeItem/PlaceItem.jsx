import React, { Fragment, useState, useContext } from "react";

import Card from "../../../shared/components/UIElements/card/Card";
import Button from "../../../shared/components/formElements/button/Button";
import Modal from "../../../shared/components/UIElements/modal/Modal";
import Maps from "../../../shared/components/UIElements/map/Maps";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import ErrorModal from "../../../shared/components/UIElements/errorModal/ErrorModal";
import LoadingSpinner from "../../../shared/components/UIElements/loadingSpinner/LoadingSpinnner";
import "./PlaceItem.css";
import { useNavigate } from "react-router-dom";

const PlaceItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const Auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };
  const navigate = useNavigate();
  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${props.item.id}`,
        "DELETE"
      );
      props.onDelete(props.item.id);
    } catch (err) {}
    navigate("/");
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.item.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Maps center={props.item.location} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img
              src={`http://localhost:5000/${props.item.image}`}
              alt={props.item.title}
            />
          </div>
          <div className="place-item__info">
            <h2>{props.item.title}</h2>
            <h3>{props.item.address}</h3>
            <p>{props.item.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {Auth.userId === props.item.creator && (
              <Button to={`/places/${props.item.id}`}>EDIT</Button>
            )}
            {Auth.userId === props.item.creator && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </Fragment>
  );
};

export default PlaceItem;
