import { useSelector } from 'react-redux';

export default () => useSelector(state => {
  if (state.isError) {
    return state.error;
  }
});