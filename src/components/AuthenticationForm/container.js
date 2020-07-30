import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import emailValidator from 'email-validator';

import AuthenticationForm from './presentational';
import ApiService from '../../services/ApiService';
import { markAsAuthenticated } from '../../slices/user';
import { setError } from '../../slices/error';

const mapDispatchToProps = { markAsAuthenticated, setError };

function AuthenticationFormContainer({ markAsAuthenticated, setError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  
  const history = useHistory();

  return <AuthenticationForm
    email={email}
    onEmailChange={(event) => {
      setEmail(event.target.value);
    }}
    password={password}
    onPasswordChange={(event) => {
      setPassword(event.target.value);
    }}
    onSubmit={() => {
      const newValidationErrors = [];
      if (!email) {
        newValidationErrors.push('E-mail address required');
      } else if (!emailValidator.validate(email)) {
        newValidationErrors.push('Invalid e-mail address');
      }
      if (!password) {
        newValidationErrors.push('Password required');
      }

      if (newValidationErrors.length) {
        setValidationErrors(newValidationErrors);
      } else {
        ApiService.authenticateUser({
          email,
          password,
        }).then(user => {
          console.log(user);
          markAsAuthenticated({ user });
          history.push('/');
        }).catch((error) => error)
          .then((error) => setError({ error }));
      }
    }}
    validationErrors={validationErrors}
  />;
}

export default connect(null, mapDispatchToProps)(AuthenticationFormContainer);
