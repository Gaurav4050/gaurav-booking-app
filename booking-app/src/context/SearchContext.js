import { createContext, useReducer } from "react";
// just go to header.jsx to see how we can use this createContext

const INITIAL_STATE = {
  destination: undefined,
  state: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state1, action) => {
  console.log(action);
  
  
  switch (action.type) {
    case "NEW_SEARCH":
      console.log('jdnas,dnas,mdnas,mnd,asmnd,mn');
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state1;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [gaurav, dispatch] = useReducer(SearchReducer, INITIAL_STATE);  
  return (
    <SearchContext.Provider
      value={{
        destination: gaurav.destination,
        state: gaurav.state,
        options: gaurav.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};


















