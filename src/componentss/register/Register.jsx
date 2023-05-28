import { useRef } from "react"
import axios from "axios"
import "./register.css"
// import { useNavigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';



export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef()
  const navigate = useNavigate();


  const handleClick = async (e) => {
    //To check if the two password are the Same 
    e.preventDefault();
    if(passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Password doesn't match")
    }
    else{
       const user ={
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
       }
       try{
                await axios.post("https://purplelove-api.onrender.com/api/auth/register", user);
                navigate('/login');
         
                
              } catch (err){
                console.log(err)
              }

    }
  };
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
                    <input placeholder="Username" required ref= {username} className="loginInput" />
                    <input placeholder="Email" required ref={email} className="loginInput" type="email" />
                    <input placeholder="Password" required  ref={password} className="loginInput" type="password" minLength="6" />
                    <input placeholder="Password Again" required ref={passwordAgain} type="password"  className="loginInput" minLength="6" />
                    <button className="loginButton" type="submit">Sign up</button>
                   
                    <button className="loginRegisterButton">Join Account</button>
                </form>
            </div>
        </div>
      
    </div>
  )
}
