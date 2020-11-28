import createDataContext from './createDataContext';
import groceryApi from '../api/grocery';

const listReducer = (state, action) => {
  switch (action.type) {
    case 'get_lists':
      return { ...state, lists: action.payload };
    case 'select_list':
      return {
        ...state,
        selectedList: state.lists.find((list) => list.id === action.payload),
      };
    case 'add_product':
      return {
        ...state,
        selectedList: Object.assign({}, state.selectedList, {
          products: [...state.selectedList.products, action.payload],
        }),
      };
    case 'add_error':
      return { ...state, error: action.payload };
    case 'clean_error':
      return { ...state, error: undefined };
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

const selectList = (dispatch) => {
  return async (id) => {
    dispatch({ type: 'select_list', payload: id });
  };
};

const addProduct = (dispatch) => {
  return async (product) => {
    dispatch({ type: 'add_product', payload: product });
  };
};

const modifyList = (dispatch) => {
  return async (updatedList) => {
    try {
      await groceryApi.put(`api/list/${updatedList.id}`, updatedList);
      const response = (await groceryApi.get('api/lists')).data;

      dispatch({ type: 'get_lists', payload: response });
    } catch (error) {
      dispatch({ type: 'add_error', payload: 'Error updating the list' });
      throw new Error();
    }
  };
};

const cleanError = (dispatch) => {
  return async () => {
    dispatch({ type: 'clean_error' });
  };
};

export const { Provider, Context } = createDataContext(
  listReducer,
  { getLists, modifyList, selectList, cleanError, addProduct },
  { lists: [], error: undefined, selectedList: null }
);
