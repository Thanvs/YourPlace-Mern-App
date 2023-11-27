import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import PlacesList from "../components/placesList/PlacesList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/errorModal/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/loadingSpinner/LoadingSpinnner";

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { userId } = useParams();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}{" "}
      <PlacesList
        loadedPlaces={loadedPlaces}
        onDeletePlace={placeDeletedHandler}
      />
    </Fragment>
  );
};

export default UserPlaces;
