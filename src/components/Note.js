import React, { useEffect, useState} from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getNote } from "../services/notes"
import { Container, Spinner } from "react-bootstrap"
import { update } from "../services/notes"
import { Notification } from "../App"
import { updateUser } from "../services/users"
import { CommentForm } from "./CommentForm"
import { Comments } from "./Comments"
import Button from "react-bootstrap/Button"




export const Note = ({notes, setNotes, user, setUser}) => {  
  const [ note, setNote ] = useState([])
  const [ noteLikes, setNoteLikes ] = useState(0)
  const [ message, setMessage ] = useState("")
  const [ postAlreadyLiked, setPostAlreadyLiked ] = useState(false)
  
  const {id} = useParams()
  
  useEffect (()=>{
    
    setNote(null)
    try{
    getNote(id)
    .then(note=>{setNote(note); setNoteLikes(note.likes)} )
    } catch (e){ console.log("Something went wrong"+e)}
    
  },[id])




  const addLike= async(userId)=>{
    
    if(!user){
      setMessage("You must be logged in to like this post")
      setTimeout(()=>{setMessage('')}, 2000)
    }
    else
    {
     if(userId === user.id){
      
      setMessage("You can´t like you own post!")
      setTimeout(()=>{setMessage('')}, 2000)

     }
     else 
     {
      const liked = user.liked.concat(id)
      setPostAlreadyLiked(true)
      const newUser= {...user,liked}
      window.localStorage.setItem('userLoggedIn',JSON.stringify(newUser))
      setUser(newUser)
      setNoteLikes(noteLikes+1)
      const likes=note.likes+1
      const newNote = {...note, likes}
      //const newNotes = notes.map(note => {if(note.id===id){return newNote} else {return note}})
      
      try{
      await updateUser(newUser)
      await update(id,newNote)
      }
      catch(e)
      {
        console.log(e); setNoteLikes(likes-1); setUser(user)
      }   
  }}}


  const noteStyle ={
    img: {
      maxWidth: "90%",
      maxHeight: "90%",
     
    }
  }



/* CSS */


  
 
  if(!note){
     return <>
     
     <Spinner style={{marginLeft:"40%", marginTop:"30%"}} animation="border" role="status" variant="success" > </Spinner>
     </>
  } else{
  
  if(notes.length > 0){ ///si no pongo esto crashea en el primer render antes de cargar las notes en el useEffect
    let  alreadyLiked=false
  if(user){
    alreadyLiked=user.liked.includes(id)}
    const title=note.title
    const body=note.body  
    const unote = notes.find(note => note.id === id)
    const poster=unote.user.username  
    const userId = unote.user.id
   
    return (
      <>
      <Container style={{ 
        minHeight: "600px", 
        width: "80%", 
        paddingLeft: "60px", 
        paddingTop : "30px",
        paddingRight: "60px",
        paddingBottom: "60px",
        borderRadius: "8px", 
        float: "center",
        border: "2px grey solid", 
        marginTop: "20px", 
        background: "white"}}>
        <div className="noteHeader">
          <h3>{title}</h3>
          <Link className="user-link" to={"/users/"+userId}>{"User: "+poster}</Link>
        </div>
        <div   style={{marginTop: "50px", marginLeft: "2.5%", minHeight: "300px", width: "100%"}}>  
          <div dangerouslySetInnerHTML={{ __html: body }}/></div>
          <div style={{ marginTop:"100px"}}>Views: {note.views} Likes: {noteLikes+"  " }  
          {
          (postAlreadyLiked || alreadyLiked) ? 
          <Button variant="success">Liked</Button> : 
          <Button variant="outline-success" onClick={()=>addLike(userId)} >Like</Button>
          }
        </div>
        <Notification  message={message}></Notification>
        <CommentForm user={user} noteId={id}></CommentForm>
      

      </Container>
      <Comments noteId={id}></Comments>
      </>
     
)}}}
