import { createSelector } from "reselect";

const appName = "rr2";
export const moduleName = "products";

/**
 * Constants
 */
const FETCH_LIST_REQUEST = `${appName}/${moduleName}/FETCH_LIST/REQUEST`;
const FETCH_LIST_SUCCESS = `${appName}/${moduleName}/FETCH_LIST/SUCCESS`;
const FETCH_LIST_FAILURE = `${appName}/${moduleName}/FETCH_LIST/FAILURE`;

/**
 * Action creator
 */

export const fetchProducts = () => async (dispatch, _getState, { api }) => {
  dispatch({
    type: FETCH_LIST_REQUEST
  });

  try {
    const data = await api.products.getAll();

    dispatch({
      type: FETCH_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: FETCH_LIST_FAILURE,
      payload: error
    });
  }
};

const defaultState = {
  list: []
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case FETCH_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload
      };
    default:
      return state;
  }
}

export const stateSelector = state => state[moduleName];
export const productsSelector = createSelector(
  stateSelector,
  state => state.list
);
