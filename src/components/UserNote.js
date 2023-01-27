import React from "react"
import { Button } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { deleteRecurse } from "../services/notes"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getNote } from "../services/notes"
import { Spinner } from "react-bootstrap"




const handleDelete = (id,  userNotes, navigate) => {
  deleteRecurse(id)
  const notesAfterDelete = userNotes.filter(note => note.id !== id).reverse()
  console.log(notesAfterDelete)
  window.localStorage.removeItem('note')
  window.localStorage.removeItem('allUserNotes')
  window.localStorage.setItem('allUserNotes',JSON.stringify(notesAfterDelete))
  console.log("deleted")
  navigate('/yourposts')
  window.location.reload()
  
}

export const UserNote = ({userNotes}) => {  
 
  
  const [ note, setNote ] = useState([])
    
  const navigate= useNavigate()
  const {id} = useParams()
  
  useEffect (()=>{
    setNote(null)
    getNote(id)
    .then(anotes=>setNote(anotes))
    
  },[id])
  
  if(!note){
     return <Spinner animation="border" role="status" variant="success" > </Spinner>
  } 
  else
  {
  if(userNotes.length > 0){ ///si no pongo esto crashea en el primer render antes de cargar las notes en el useEffect
  
  const title=note.title
  const body=note.body    
    return <div id="singleNote">
      <h3>{"Title: "+title}</h3>
      <div style={{minHeight: "300px", width: "50%"}}>
      <div dangerouslySetInnerHTML={{ __html: body }} /></div>
      <div>Views: {note.views}</div>
      <Button onClick={()=>{if(window.confirm('Delete the post?')){handleDelete(id, userNotes, navigate)}}}>Delete Post</Button>
    </div>
}}}