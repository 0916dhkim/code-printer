import { createStore } from "redux";

export type ApplicationState  = {
  urlInput: string
  isLoading: boolean
  sourceCode?: string
  error?: Error
}

type Action = {
  type: "SET_URL_INPUT",
  value: string
}
| {
  type: "START_LOADING"
}
| {
  type: "LOAD_SOURCE_CODE"
  value: string
}
| {
  type: "FAIL_LOADING",
  error: Error
}

const initialState: ApplicationState = {
  urlInput: "",
  isLoading: false
}

function reducer(state: ApplicationState = initialState, action: Action): ApplicationState {
  console.log(action);
  switch (action.type) {
    case "SET_URL_INPUT":
      return {
        ...state,
        urlInput: action.value
      };
    case "START_LOADING":
      return {
        ...state,
        isLoading: true,
        error: undefined
      };
    case "LOAD_SOURCE_CODE":
      return {
        ...state,
        isLoading: false,
        sourceCode: action.value
      };
    case "FAIL_LOADING":
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export const store = createStore(reducer);

export type ApplicationDispatch = typeof store.dispatch;