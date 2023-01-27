import React, { useEffect, useState} from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getNote } from "../services/notes"
import { Spinner } from "react-bootstrap"
import { update } from "../services/notes"
import { Notification } from "../App"
import { updateUser } from "../services/users"





export const Note = ({notes, setNotes, user, setUser}) => {  
  const [ note, setNote ] = useState([])
  const [ noteLikes, setNoteLikes] = useState(0)
  const [message, setMessage] = useState("")
  const [postAlreadyLiked, setPostAlreadyLiked] = useState(false)
  
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
      const newNotes = notes.map(note => {if(note.id===id){return newNote} else {return note}})
      //setNotes(newNotes)
      //
      //console.log(newNote)
      //console.log(likes)
      try{
      const userResp = await updateUser(newUser)
      //console.log(userResp)
      const resp= await update(id,newNote)
      console.log("resp user"+userResp)
      console.log("resp note"+resp)
      
     // console.log(resp)
      }catch(e){console.log(e); setNoteLikes(likes-1); setUser(user)}   
  }}}
  
 
  if(!note){
     return <>
     
     <Spinner animation="border" role="status" variant="success" > </Spinner>
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

      <div id="singleNote">
      <h3>{"Title: "+title}</h3>
      <div style={{minHeight: "300px", width: "50%"}}><Link to={"/users/"+userId}>{"User: "+poster}</Link>
      <div dangerouslySetInnerHTML={{ __html: body }}/></div>
      <div>Views: {note.views} Likes: {noteLikes} {(postAlreadyLiked || alreadyLiked) ? <button disabled>Liked</button> : <button onClick={()=>addLike(userId)} >Like</button>}</div><Notification  message={message}></Notification>
      </div>
     
     
)}}}
/**/