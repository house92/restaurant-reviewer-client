import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import emailValidator from 'email-validator';

import RegistrationForm from './presentational';
import { markAsAuthenticated } from '../../slices/user';
import { setError } from '../../slices/error';
import ApiService from '../../services/ApiService';

const mapDispatchToProps = { markAsAuthenticated, setError };

function RegistrationFormContainer({ markAsAuthenticated, setError }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  const history = useHistory();

  return <RegistrationForm
    name={name}
    onNameChange={(event) => {
      setName(event.target.value);
    }}
    email={email}
    onEmailChange={(event) => {
      setEmail(event.target.value);
    }}
    password={password}
    onPasswordChange={(event) => {
      setPassword(event.target.value);
    }}
    confirmPassword={confirmPassword}
    onConfirmPasswordChange={(event) => {
      setConfirmPassword(event.target.value);
    }}
    isOwner={isOwner}
    onIsOwnerChange={() => {
      setIsOwner(!isOwner);
    }}
    onSubmit={() => {
      const newValidationErrors = [];
      if (!name) {
        newValidationErrors.push('Name required');
      }
      if (!email) {
        newValidationErrors.push('E-mail address required');
      } else if (!emailValidator.validate(email)) {
        newValidationErrors.push('Invalid e-mail address');
      }
      if (!password) {
        newValidationErrors.push('Password required');
      }
      if (password !== confirmPassword) {
        newValidationErrors.push('Passwords must match');
      }

      if (newValidationErrors.length) {
        setValidationErrors(newValidationErrors.slice(0, 2));
      } else {
        ApiService.registerUser({
          name,
          email,
          password,
          isOwner,
        }).then(user => {
          markAsAuthenticated({ user });
          history.push('/');
        }).catch(error => error)
          .then((error) => setError({ error }));
      }
    }}
    validationErrors={validationErrors}
  />;
}

export default connect(null, mapDispatchToProps)(RegistrationFormContainer);
