import { Link } from "react-router-dom"
import { Notes } from "./Notes"


export const YourNotes = ({userNotes}) =>{
    const loggedUser = window.localStorage.getItem('userLoggedIn')
    if(loggedUser){
        return(
        <>
        <h3>Your Posts</h3>
        <Notes notes={userNotes}></Notes>
        </>
    )}}
    //<Notes notes={{userNotes}}></Notes>