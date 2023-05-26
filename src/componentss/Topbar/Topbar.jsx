import './topbar.css'
import { Search, Person, Chat, Notifications} from "@material-ui/icons"
import { useContext } from 'react'
import {Link} from "react-router-dom"
import {AuthContext} from "../../context/AuthContext"
export default function Topbar() {



  //To choose current User 
  const {user } = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" style={{textDecoration:"none"}}>
          <span className='logo'>purplelove</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <Search className='searchIcon'/>
            <input placeholder='Search' className="searchInput" />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">Homepage</span>
            <span className="topbarLink">Timeline</span>
          </div>
          <div className="topbarIcons">
            <div className="person">
            <div className="topbarIconItem">
              <Person  />
              <span className="topbarIconBadge">1</span>
            </div>
            </div>
           
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="notify">
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">1</span>
            </div>
            </div>
          </div>
<Link to={`/profile/${user.username}`}>        
  <img src={user.profilePicture ?
     PF + user.profilePicture : PF+"person/noavatar.jpg"} 
     alt="" className='topbarImg'/>
          </Link>
        </div>
    
    </div>
  )
}
