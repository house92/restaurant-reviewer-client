import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import EditUser from './presentational';
import { useHistory, useParams } from 'react-router-dom';
import { ROUTES } from '../../constants';
import ApiService from '../../services/ApiService';
import { markAsAuthenticated } from '../../slices/user';

const mapDispatchToProps = { markAsAuthenticated };

function EditUserContainer({ user: currentUser, markAsAuthenticated }) {
  const { id } = useParams();
  const history = useHistory();

  const isAdmin = currentUser && currentUser.isAdmin;

  const [user, setUser] = useState(isAdmin ? {} : currentUser);

  useEffect(() => {
    if (isAdmin) {
      ApiService.getUserById(id).then(res => setUser(res));
    } else if (currentUser) {
      history.push(`${ROUTES.users}/${currentUser.id}`);
    } else {
      history.push(ROUTES.home);
    }
  }, [id]);

  return <EditUser
    user={user}
    onNameChange={(event) => {
      const name = event.target.value;
      setUser((existingUser) => ({
        ...existingUser,
        name,
      }));
    }}
    onEmailChange={(event) => {
      const email = event.target.value;
      setUser((existingUser) => ({
        ...existingUser,
        email,
      }));
    }}
    onPasswordChange={(event) => {
      const password = event.target.value;
      setUser((existingUser) => ({
        ...existingUser,
        password,
      }));
    }}
    onSave={() => {
      ApiService.patchUser(user).then(res => {
        if (res.id === currentUser.id) {
          markAsAuthenticated({ user: res });
        }
        setUser(res);
      });
    }}
    onDelete={() => {
      ApiService.deleteUser({ id }).then(() => history.push(ROUTES.home));
    }}
  />;
}

export default connect((state) => ({ user: state.user.user }), mapDispatchToProps)(EditUserContainer);
