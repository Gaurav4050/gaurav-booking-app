import { createContext, useReducer } from "react";
// just go to header.jsx to see how we can use this createContext
const INITIAL_STATE = {
  username: JSON.parse(localStorage.getItem("user")) || null,
  loading:false,
  error:false
};

export const AuthContext = createContext(INITIAL_STATE);

const SearchReducer = (state,action) => {
  console.log(action);
  switch (action.type) {
    case " LOGIN_START":
      return {
        username: null,
        loading: true,
        error: false,
      };
    case "NEW_LOGIN":
      localStorage.setItem("user",JSON.stringify( action.payload))
      return {
        username: action.payload,
        loading:false,
        error:false
      }
    case "LOGOUT":
        localStorage.removeItem("user")
      return {
        username: null,
        loading:false,
        error:false
      }
    case "LOGIN_FAILURE":
       console.log('k,d,m');
       return {
        username: null,
        loading:false,
        error:action.payload
      }  
    default:
      return {
        username: null,
        loading:false,
        error:false
      }
  }
};

export const AuthContextProvider = ({ children }) => {
  const [gaurav, dispatch] = useReducer(SearchReducer, INITIAL_STATE);  
  return (
    <AuthContext.Provider
      value={{
        username: gaurav.username,
        error:gaurav.error,
        loading:gaurav.loading,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


















