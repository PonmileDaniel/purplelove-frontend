import { useContext, useRef } from "react";
import "./login.css"
import {Link} from "react-router-dom"
import {CircularProgress} from "@material-ui/core"

//Auth for Login 
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
//This is to handle the Click 
const email= useRef();
const password = useRef();
const {user,isFetching, error, dispatch} = useContext(AuthContext)
const handleClick = (e) =>{
  e.preventDefault();
 loginCall({email:email.current.value,password:password.current.value },dispatch)
};
console.log(user)

  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
              
               <h3 className="loginLogo">purplelove</h3>
               <span className="loginDesc">Connect with friends and Spread Love to eachother 'purplelove'</span>
            </div>
            <div className="loginRight">
              <div className="type">
            <h3 className="loginLogo">purplelove</h3>
               <span className="loginDesc">Connect with friends and Spread Love to eachother 'purplelove'</span>
               </div>
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder="Email" type="email" required className="loginInput" ref={email}/>
                    <input placeholder="Password" type="password" 
                    required
                    minLength="6"
                     className="loginInput" ref={password}/>
                  <button className="loginButton" disabled={isFetching}>{isFetching ? <CircularProgress color="white" size="20px"/> : "Join"}</button>
                    <span className="loginForget">Forget Password?</span>
                    <div className="loginR">
                    <Link to="/register">
                    <button className="loginRegisterButton">{isFetching ? <CircularProgress color="white" size="20px"/> : "Create an Account"}</button>
                    </Link>
                    </div>
                </form>
            </div>
        </div>
      
    </div>
  )
}
