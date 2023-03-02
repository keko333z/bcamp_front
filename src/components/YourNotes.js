import { YourComments } from "./YourComments"
import { Notes } from "./Notes"
import { Followers } from "./Followers"
import { Following } from "./Following"
import { Link } from "react-router-dom"
import { ProfileNav } from "./ProfileNav"


export const YourNotes = ({userNotes, user}) =>{
    
    const path="/yourposts/"
    const loggedUser = window.localStorage.getItem('userLoggedIn')
   
    if(loggedUser){
        
        
        return(
        <>
        <ProfileNav></ProfileNav>
        <h4>Your Posts</h4>
        <Notes notes={userNotes} user={user} path={path}></Notes>
        
        </>
    )}}
    //<Notes notes={{userNotes}}></Notes>