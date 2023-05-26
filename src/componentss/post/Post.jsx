import  './post.css'
import { MoreVert } from '@material-ui/icons'
import { useState, useEffect, useContext} from 'react'
import axios from "axios"
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'

export default function Post({ post }) {
 const [like,setlike] = useState(post.likes.length)
 const [islike,setislike] = useState(false)
 //This is to handle each user of the Post
 const [user, setUser] = useState({});

 const PF = process.env.REACT_APP_PUBLIC_FOLDER;

//For the like
const {user:currentUser} = useContext(AuthContext);

//
useEffect(() =>{
  setislike(post.likes.includes(currentUser._id))
}, [currentUser._id,post.likes]);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get(`/users?userId=${post.userId}`);
      setUser(response.data); // Pass the fetched data to the 'setPosts' function
    } catch (error) {
      console.log(error);
      // Handle the error here
    }
  };

  fetchUser();
}, [post.userId]);


//This is to Handle the Like nd Love And Functionality 
const likeHandler = ()=>{
  try{
    axios.put("/post/"+post._id+"/like", {userId:currentUser._id});
  }
  catch(err){}
  setlike(islike ? like - 1 : like + 1)
  setislike(!islike )
};


  return (
    <div className='post'>
      <div className="postWrapper">
        <div className="postTop"> 
         <div className="postTopLeft">

          <Link to={`profile/${user.username}`}>
          <img className="postProfileImg"

          //This Part is to place a pics if there is no user pics
           src= { user.profilePicture ? PF + user.profilePicture : PF + "person/noavatar.jpg"} alt="" /> 
           </Link>
        <span className="postUsername"> {user.username} </span>
        <span className="postDate"> {format(post.createdAt)}</span>
        </div>
        <div className="postTopRight">
            <MoreVert/>
        </div>
        </div>
        <div className="postCenter">
<span className="postText"> {post?.desc}</span>
<img className="postImg" src={PF+post.img} alt="" />
        </div>
        
        <div className="postBottom">
            <div className="postBottomLeft">
                <img className="likeIcon" src={`${PF}heart.png`} onClick = {likeHandler} alt="" />
                <img className="likeIcon" src={`${PF}like.png`} onClick = {likeHandler}  alt="" />
                <span className="postLikeCounter">{like}people Liked it </span>
            </div>
            <div className="postButtomRight">
                <span className="postCommonText">{post.comment} Comments</span>
            </div>
            </div>
      </div>
    </div>
  )
}
