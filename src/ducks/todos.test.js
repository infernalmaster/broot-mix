import reducer, {
  defaultState,
  changeNewItemText,
  deleteItem,
  addNewItem
} from "./todos";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { combineReducers } from "redux";

describe("changeNewItemText", () => {
  it("works", () => {
    const nextState = reducer(defaultState, changeNewItemText("some notes"));

    expect(nextState).toEqual({
      ...defaultState,
      newItemText: "some notes"
    });
  });
});

describe("deleteItem", () => {
  it("works", async () => {
    const stateWithItem = {
      ...defaultState,
      items: [
        {
          id: 1,
          text: "buy milk",
          isDone: true
        },
        {
          id: 2,
          text: "go home",
          isDone: false
        }
      ]
    };

    const api = {
      todos: {
        deleteItem: () => Promise.resolve()
      }
    };

    const store = createStore(
      reducer,
      stateWithItem,
      applyMiddleware(ReduxThunk.withExtraArgument({ api }))
    );

    await store.dispatch(deleteItem(1));

    const nextState = store.getState();

    expect(nextState).toEqual({
      ...defaultState,
      items: [
        {
          id: 2,
          text: "go home",
          isDone: false
        }
      ]
    });
  });
});

describe("addNewItem", () => {
  it("works", async () => {
    const stateWithItem = {
      ...defaultState,
      newItemText: "new item",
      items: []
    };

    const api = {
      todos: {
        create: item =>
          Promise.resolve({
            ...item,
            id: 1
          })
      }
    };

    const store = createStore(
      combineReducers({ todos: reducer }),
      { todos: stateWithItem },
      applyMiddleware(ReduxThunk.withExtraArgument({ api }))
    );

    await store.dispatch(addNewItem());

    const nextState = store.getState();

    expect(nextState).toEqual({
      todos: {
        ...defaultState,
        newItemText: "",
        items: [
          {
            id: 1,
            text: "new item",
            isDone: false
          }
        ]
      }
    });
  });

  it("ignores server error", async () => {
    const stateWithItem = {
      ...defaultState,
      newItemText: "new item",
      items: []
    };

    const api = {
      todos: {
        create: item =>
          Promise.reject({
            name: "some error"
          })
      }
    };

    const store = createStore(
      combineReducers({ todos: reducer }),
      { todos: stateWithItem },
      applyMiddleware(ReduxThunk.withExtraArgument({ api }))
    );

    await store.dispatch(addNewItem());

    const nextState = store.getState();

    expect(nextState).toEqual({
      todos: {
        ...defaultState
      }
    });
  });
});
