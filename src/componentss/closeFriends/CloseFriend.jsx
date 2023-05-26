import './closeFriend.css'

export default function CloseFriend({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (

    //This is to implement the Side Bar So as To make the Close Friends Show
    <li className="sidebarFriend">
            <img className='sidebarFriendImg' src={PF + user.profilePicture} alt=''/>
            <span className="sidebarFriendName">{user.username}</span>
          </li>
  )
}
