import { createStore } from "redux";

export type ApplicationState  = {
  urlInput: string
}

type Action = {
  type: "SET_URL_INPUT",
  value: string
}

const initialState: ApplicationState = {
  urlInput: ""
}

function reducer(state: ApplicationState = initialState, action: Action): ApplicationState {
  console.log(action);
  switch (action.type) {
    case "SET_URL_INPUT":
      return {
        urlInput: action.value
      };
    default:
      return state;
  }
}

export const store = createStore(reducer);

export type ApplicationDispatch = typeof store.dispatch;