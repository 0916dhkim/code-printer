import { createStore } from "redux";

export type ApplicationState  = {
  urlInput: string
  languageInput: string
  isLoading: boolean
  sourceCode?: string
  error?: Error
}

type Action = {
  type: "SET_URL_INPUT",
  value: string
}
| {
  type: "SET_LANGUAGE_INPUT",
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
  languageInput: "",
  isLoading: false
}

function reducer(state: ApplicationState = initialState, action: Action): ApplicationState {
  switch (action.type) {
    case "SET_URL_INPUT":
      return {
        ...state,
        urlInput: action.value
      };
    case "SET_LANGUAGE_INPUT":
      return {
        ...state,
        languageInput: action.value
      };
    case "START_LOADING":
      return {
        ...state,
        isLoading: true,
        sourceCode: undefined,
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
        error: action.error,
        sourceCode: undefined
      };
    default:
      return state;
  }
}

export const store = createStore(reducer);

export type ApplicationDispatch = typeof store.dispatch;