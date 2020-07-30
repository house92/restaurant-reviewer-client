import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import EditRestaurant from './presentational';
import ApiService from '../../services/ApiService';
import { useHistory, useParams } from 'react-router-dom';
import { ROUTES } from '../../constants';

function EditRestaurantContainer({ user, style = {} }) {
  const history = useHistory();
  const { id } = useParams();
  
  const [restaurant, setRestaurant] = useState({ ownerId: user && user.ownerId });

  const isOwner = user && restaurant && user.ownerId === restaurant.ownerId;
  const isAdmin = user && user.isAdmin;
  const isExisting = restaurant.id;

  const viewRoute = `${ROUTES.restaurants}/${id}`;

  if (!isOwner && !isAdmin) {
    history.push(viewRoute);
  }

  useEffect(() => {
    ApiService.getRestaurantById(id).then(res => setRestaurant(res));
  }, [id])

  return <EditRestaurant
    name={restaurant.name}
    onNameChange={(event) => {
      const name = event.target.value;
      setRestaurant((existingRestaurant) => ({
        ...existingRestaurant,
        name,
      }));
    }}
    address={restaurant.address}
    onAddressChange={(event) => {
      const address = event.target.value;
      setRestaurant((existingRestaurant) => ({
      ...existingRestaurant,
      address,
    }));
    }}
    description={restaurant.description}
    onDescriptionChange={(event) => {
      const description = event.target.value;
      setRestaurant((existingRestaurant) => ({
      ...existingRestaurant,
      description,
    }));
    }}
    image={restaurant.image}
    onImageChange={(event) => {
      const image = event.target.value;
      setRestaurant((existingRestaurant) => ({
      ...existingRestaurant,
      image,
    }));
    }}
    onSave={() => {
      if (isExisting) {
        ApiService.patchRestaurant(restaurant)
          .then(() => history.push(viewRoute));
      } else {
        ApiService.postRestaurant(restaurant)
          .then(() => history.push(ROUTES.home));
      }
    }}
    onDelete={() => {
      ApiService.deleteRestaurant({
        id: restaurant.id,
        ownerId: restaurant.ownerId,
      })
        .then(() => history.push(ROUTES.home));
    }}
    isExisting={isExisting}
    style={style}
  />;
}

export default connect((state) => ({ user: state.user.user }), null)(EditRestaurantContainer);