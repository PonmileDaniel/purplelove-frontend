import { useContext, useRef, useState } from 'react';
import  './share.css';
import {  PermMedia,Label,Room, EmojiEmotions, Cancel} from "@material-ui/icons"
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';

export default function Share() {

  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER


  //For sharing of images
  const desc = useRef()

  const [file, setFile] = useState(null)

  //The Submit event Handler 
  const submitHandler = async (e) =>{
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    //To determine If there is a file 
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file",file)

      //The name of the file 
   
      newPost.img = fileName;
      try {
        await axios.post("https://purplelove-api.onrender.com/upload", data);
      }catch(err){
       
      }
    }
    try{
     await axios.post("https://purplelove-api.onrender.com/post", newPost);
     window.location.reload();
    }catch(err){

    }
  }
  return (
    <div className="share">
      <div className="shareWrapper">
    <div className="shareTop">
     <img src={user.profilePicture ? PF+user.profilePicture : PF + "person/noavatar.jpg"} alt="" className="shareProfileImg" /> 
      <input placeholder={'what is on your mind ' + user.username + "?" } className="shareInput" ref={desc} />
    </div>
    <hr className="shareHr" />
{file && (
  <div className="shareImgCoontainer">
    <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
    <Cancel className='shareCancelImg' onClick={()=>setFile(null)}/>
  </div>
)}
    {/* TO submit the image we use the submit Handler */}
    <form className="shareButton" onSubmit={submitHandler} >
      <div className="shareOptions">
        <label htmlFor='file' className="shareOption">
          <PermMedia htmlColor="tomato" className='shareIcon'/>
          <span className='shareOptionText'>Photo or Video</span>

          {/* This for how to share Images from the Icon Photo and Video */}
{/* And also this is for the code to take jus one file and upload it */}
          <input style={{display: "none"}} type="file" id="file" accept= ".png,.jpg,.jpeg" onChange={(e)=>setFile(e.target.files[0])}/>
        </label>
        <div className="shareOption">
          <Label htmlColor="purple" className='shareIcon'/>
          <span className='shareOptionText'>Tag</span>
        </div>
        <div className="shareOption">
          <Room htmlColor="green" className='shareIcon'/>
          <span className='shareOptionText'>Location</span>
        </div>
        <div className="shareOption">
          <EmojiEmotions htmlColor="goldenrod" className='shareIcon'/>
          <span className='shareOptionText'>Feelings</span>
        </div>
      </div>
      <button className='shareButto' type="submit">Share</button>
    </form>

      </div>
      
    </div>
  )
}
