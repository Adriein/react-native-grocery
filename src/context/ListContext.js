import createDataContext from './createDataContext';
import groceryApi from '../api/grocery';

const listReducer = (state, action) => {
  switch (action.type) {
    case 'get_lists':
      return { ...state, lists: action.payload };
    case 'add_error':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const getLists = (dispatch) => {
  return async () => {
    try {
      const response = (await groceryApi.get('api/lists')).data;

      dispatch({ type: 'get_lists', payload: response });
    } catch (error) {
      dispatch({ type: 'add_error', payload: 'Error fetching the lists' });
    }
  };
};

const modifyList = (dispatch) => {
  return async (updatedList) => {
    try {
      await groceryApi.put(`api/list/${updatedList.id}`);
      const response = (await groceryApi.get('api/lists')).data;

      dispatch({ type: 'get_lists', payload: response });
    } catch (error) {
      dispatch({ type: 'add_error', payload: 'Error updating the list' });
    }
  };
};

export const { Provider, Context } = createDataContext(
  listReducer,
  { getLists, modifyList },
  { lists: [], error: undefined }
);
