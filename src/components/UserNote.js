import React from "react"
import { Button, Container } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { deleteRecurse } from "../services/notes"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getNote } from "../services/notes"
import { Spinner } from "react-bootstrap"
import { Comments } from "./Comments"




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
  
  const containerStyle={
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
  marginBottom: "50px",
  background: "white"}

  if(!note){
     return <Spinner animation="border" role="status" variant="success" > </Spinner>
  } 
  else
  {
  if(userNotes.length > 0){ ///si no pongo esto crashea en el primer render antes de cargar las notes en el useEffect
  
  const title=note.title
  const body=note.body    
    return <Container style={containerStyle}>
      <div className="noteHeader">
      <h3>{"Title: "+title}</h3>
      </div>
      <div style={{marginTop: "50px", marginLeft: "2.5%", minHeight: "300px", width: "100%"}}>
      <div dangerouslySetInnerHTML={{ __html: body }} /></div>
      <div>Views: {note.views}</div>
      <Comments noteId={id} ></Comments>
      <Button style={{marginTop: "40px"}}onClick={()=>{if(window.confirm('Delete the post?')){handleDelete(id, userNotes, navigate)}}}>Delete Post</Button>
    </Container>
}}}