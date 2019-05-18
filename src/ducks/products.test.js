import reducer, {
  moduleName,
  defaultState,
  fetchProducts,
  productsSelector
} from "./products";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { combineReducers } from "redux";

it("fetches products", async () => {
  const products = [{ id: 1, name: "product1" }];

  const api = {
    products: {
      getAll: () => Promise.resolve(products)
    }
  };

  const store = createStore(
    combineReducers({ [moduleName]: reducer }),
    { [moduleName]: defaultState },
    applyMiddleware(ReduxThunk.withExtraArgument({ api }))
  );

  await store.dispatch(fetchProducts());

  console.log(store.getState());

  const result = productsSelector(store.getState());

  expect(result).toEqual(products);
});
