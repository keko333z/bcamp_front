import { Notes } from "./Notes"
import { ProfileNav } from "./ProfileNav"


export const YourNotes = ({userNotes, user}) =>{
    
    const path="/yourposts/"
    const loggedUser = window.localStorage.getItem('userLoggedIn')
   
    if(loggedUser)
    
    
    {
        
        
        return(
        <>
        <ProfileNav></ProfileNav>
        <Notes notes={userNotes} user={user} path={path}></Notes>
        
        </>
        )
    }
}