import { useSelector } from 'react-redux';

export default () => useSelector(state => {
  if (state.authenticated) {
    return state.user;
  }
});