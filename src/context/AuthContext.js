import createDataContext from './createDataContext';
import groceryApi from '../api/grocery';
import { AsyncStorage } from 'react-native';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signin':
      return { ...state, isSignedIn: true };
    case 'add_error':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const signin = (dispatch) => {
  return async ({ username, password }) => {
    try {
      const [response] = (
        await groceryApi.post('api/auth/signin', {
          username,
          password,
        })
      ).data;
      await AsyncStorage.setItem('username', response.username);
      await AsyncStorage.setItem('publicId', response.publicId);

      dispatch({ type: 'signin' });
    } catch (error) {
      dispatch({ type: 'add_error', payload: 'Invalid Credentials' });
    }
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin },
  { isSignedIn: false, error: undefined }
);
