import './feed.css'
import Share from '../share/Share'
import Post from '../post/Post'
import { useState, useEffect, useContext } from 'react'
import axios from "axios"
import { AuthContext } from '../../context/AuthContext'



export default function Feed({username}) {

  //Defining Post to connect to the Backend Post so as to collect Post from Backend 

  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = username 
        ? await axios.get("https://purplelove-api.onrender.com/api/post/profile/" + username)
         : await axios.get("https://purplelove-api.onrender.com/api/post/timeline/" + user._id );
        setPosts(response.data.sort((p1,p2) =>{
          return new Date(p2.createdAt) - new Date(p1.createdAt)
        })); // Pass the fetched data to the 'setPosts' function
      } catch (error) {
        console.log(error);
        // Handle the error here
      }
    };
  
    fetchData();
  }, [username, user._id]);
  
  return (
    <div className='Feed'>
      <div className="feedWrapper">
        {(!username || username === user.username )&& <Share/>}
        {posts.map((p) => ( 

      <Post key={p._id} post={p} />
        ))}
        
        
      </div>
    </div>
  )
}



