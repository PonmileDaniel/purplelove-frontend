import "./profile.css"
import Topbar from "../../componentss/Topbar/Topbar";
import SideBar from "../../componentss/sideBar/SideBar";
import Rightbar from "../../componentss/rightbar/Rightbar";
import Feed from "../../componentss/feed/Feed";
import { useContext, useEffect, useState } from "react";
import axios from "axios"
import {useParams} from "react-router"
import { Link } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'
import {Add, Remove} from "@material-ui/icons"

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   //This is to handle each user of the Post
 const [user, setUser] = useState({})

 //To get the username from the like
 const username = useParams().username;

 const [friends, setFriends] = useState([])

 
 const{user:currentUser} = useContext(AuthContext)

  
  useEffect(() => {
    const getFriends = async () => {
      try {
        if (user && user._id) {
          const friendList = await axios.get("/users/friends/" + user._id);
          setFriends(friendList.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    getFriends();
  }, [user]);
  //For the follow operation
  const{user:currentUse, dispatch} = useContext(AuthContext)
  const [followed, setFollowed ]= useState(currentUser.followings.includes(user?.id))


  useEffect(() => {
    const getFollowedStatus = () => {
      if (user && user.id) {
        setFollowed(currentUser.followings.includes(user.id));
      }
    };
  
    getFollowedStatus();
  }, [currentUser, user]);
  
  const handleClick = async () =>{
    try{
      if(followed){
        await axios.put("/users/" + user._id + "/unfollow", {userId: currentUse._id})
        dispatch({type: "UNFOLLOW", payload:user._id})
      }else{
        await axios.put("/users/" + user._id + "/follow", {userId: currentUse._id})
        dispatch({type: "FOLLOW", payload:user._id})
      }
      
    }catch(err){
      console.log(err)
    }
    setFollowed(!followed)
  }
  //End for Folllow


 useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get(`/users?username=${username}`);
      setUser(response.data); // Pass the fetched data to the 'setPosts' function
    } catch (error) {
      console.log(error);
      // Handle the error here
    }
  };

  fetchUser();
}, [username]);


  return (
    <>
    <Topbar/>
    <div className="profile">
      <div className="side"><SideBar /></div>

      
    
    <div className="profileRight">
        <div className="profileRightTop">
            <div className="profileCover">
            <img className="profileCoverImg" src={user.coverPicture ? PF + user.coverPicture : PF + "person/noavatar.jpg"} alt="" />
            <img className="profileUserImg" src={user.profilePicture ? PF + user.profilePicture : PF + "person/noavatar.jpg"} alt="" />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
        </div>
          <div className="userFriend">





          <h4 className='rightbarTitle'> User Information </h4>
     <div className="rightbarInfo">
      <div className="rightbarInfoItem">
        <span className='rightbarInfoKey'>City:</span>
        <span className='rightbarInfoValue'>{user.city}</span>
      </div>

      <div className="rightbarInfoItem">
        <span className='rightbarInfoKey'>From:</span>
        <span className='rightbarInfoValue'>{user.from}</span>
      </div>

      <div className="rightbarInfoItem">
        <span className='rightbarInfoKey'>Relationship:</span>
        <span className='rightbarInfoValue'>{user.relationship ===1 ? "Single" : user.relationship ===1 ? "Married":"."}</span>
      </div>
     </div>

{/* 
<div className="container">

        <h4 className='rightbarTitle'> User Friends </h4>

<div className="bb">
        {user.username !== currentUser.username && (
        <button className="rightbarFollowButton">
          Follow<Add/>
        </button>
      )}
      </div>
      </div> */}


<div className="container">
  <div className="headerContainer">
    <h4 className='rightbarTitle'>User Friends</h4>
    <div className="buttonContainer">
      {user.username !== currentUser.username && (
        <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
          {followed ? <Remove/> : <Add/>}
        </button>
      )}
    </div>
  </div>
</div>


     <div className="rightbarfollowings">
     {friends.map((friend) =>(
        <Link to={"/profile/" + friend.username} style={{textDecoration:"none"}}>      <div className="rightbarFollowing">
        <img src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noavatar.jpg"} alt="" className="rightbarFollowingImg" />
        <span className="rightbarFollowingName">{friend.username}</span>
      </div>
      </Link>
      ))}

      
     </div>
     </div>
        <div className="profieRightBottom">

        
          
    <Feed username={username} />
    <Rightbar user={user}/>
    </div>
    </div>
    </div>
    
    </>

  )
}
