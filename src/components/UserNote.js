import React from "react"
import { Button } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { deleteRecurse } from "../services/notes"
import { useNavigate } from "react-router-dom"




const handleDelete = (id,  userNotes, navigate) => {
  deleteRecurse(id)
  const notesAfterDelete = userNotes.filter(note => note.id !== id)
  console.log(notesAfterDelete)
  window.localStorage.removeItem('note')
  window.localStorage.removeItem('allUserNotes')
  window.localStorage.setItem('allUserNotes',JSON.stringify(notesAfterDelete))
  console.log("deleted")
  navigate('/yourposts')
  window.location.reload()
  
}

const getNote = (userNotes,id) => {
  const note = userNotes.find(note => note.id === id)
  return note
}


export const UserNote = ({userNotes}) => {  
 
  const navigate= useNavigate()
  const {id}=useParams() 
 
 if(userNotes.length > 0){ ///si no pongo esto crashea en el primer render antes de cargar las notes en el useEffect
  const note= getNote(userNotes,id)
  const title=note.title
  const body=note.body    
  
    return <div id="singleNote">
      <h3>Note</h3><div style={{minHeight: "300px", width: "50%"}}>{"Title: "+title+" Content: "}<div dangerouslySetInnerHTML={{ __html: body }} /></div>
      <Button onClick={()=>{if(window.confirm('Delete the post?')){handleDelete(id, userNotes, navigate)}}}>Delete Post</Button>
    </div>
}}