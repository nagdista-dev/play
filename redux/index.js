import { createStore } from "redux";

const initialState = {
  counter: 0,
};

const reducerCounter = (state = initialState, action) => {
  if (action.type === "inc") {
    return { counter: state.counter + 1 };
  }

  return state;
};
const store = createStore(reducerCounter);

// store.dispatch({ type: "inc" });
const getLatest = () => {
  console.log(store.getState());
};
store.subscribe(getLatest);

setInterval(() => {
  store.dispatch({ type: "inc" });
}, 1000);
