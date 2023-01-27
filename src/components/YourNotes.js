
import { Notes } from "./Notes"


export const YourNotes = ({userNotes}) =>{
    const path="/yourposts/"
    const loggedUser = window.localStorage.getItem('userLoggedIn')
   
    if(loggedUser){
        return(
        <>
        <h3>Your Posts</h3>
        <Notes notes={userNotes} path={path}></Notes>
        </>
    )}}
    //<Notes notes={{userNotes}}></Notes>