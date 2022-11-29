import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {

  const [LData, setLData]=useState({
    username:undefined,
    password:undefined
  })

  const HandleChange = (e) => {
    console.log('hello');
    
    setLData((prev)=>({
        ...prev,[e.target.id]:e.target.value
    }))
  };


    const {dispatch , error}= useContext(AuthContext);  
    const navigate = useNavigate();
    const HandleClick = async (e) =>{
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try{
            const res = await axios.post("/api/auth/login", LData);
            
            dispatch({type:"NEW_LOGIN",payload: res.data.username})
            navigate("/")
        }
        catch(err){
            console.log(err.response.data);  
            dispatch({type:"LOGIN_FAILURE", payload:err.response.data})      
            console.log(error);
                      
        }
    }
  return (
    <div className="LoginContainer">
      <div className="LoginMainContainer">
        <div className="Ltitle">Login</div>
        <input
          type="text"
          placeholder="Enter Your Name"
          id="username"
          className="LUserName"
          onChange={HandleChange}
        />
        <input
          type="password"
          placeholder="Enter Password"
          id="password"
          className="LPassword"
          onChange={HandleChange}
        />

        <button  className="LLogin" onClick={HandleClick}> Login </button>

        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
