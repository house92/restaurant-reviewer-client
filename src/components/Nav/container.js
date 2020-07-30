import React from 'react';
import { connect } from 'react-redux';

import Nav from './presentational';
import ApiService from '../../services/ApiService';
import { signOut } from '../../slices/user';
import useUser from '../../hooks/useUser';
import { ROUTES } from '../../constants';

const mapDispatchToProps = { signOut };

function NavContainer({ user, signOut }) {
  let actions = [];

  if (user) {
    if (user.isAdmin) {
      // TODO
    } else if (user.isOwner) {
      // TODO
    }
    actions.push(
      {
        linkTo: `${ROUTES.users}/${user.id}`,
        text: 'Account',
      },
      {
        onClick: () => {
          ApiService.signOut().then(() => signOut());
        },
        text: 'Sign out',
      },
    );
  } else {
    actions.push({ linkTo: '/sign-in', text: 'Sign in' });
  }

  return <Nav actions={actions} />;
}

export default connect((state) => ({ user: state.user.user }), mapDispatchToProps)(NavContainer);
