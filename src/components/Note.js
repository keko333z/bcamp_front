import React from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"







const getNote = (notes,id) => {
  const note = notes.find(note => note.id === id)
  return note
}


export const Note = ({notes}) => {  
 

  const {id}=useParams() 
 
 if(notes.length > 0){ ///si no pongo esto crashea en el primer render antes de cargar las notes en el useEffect
  const note= getNote(notes,id)
  const title=note.title
  const body=note.body  
  const user=note.user.username  
  const userId = note.user.id
    return <div id="singleNote">
      <h3>{"Title: "+title}</h3>
      <div style={{minHeight: "300px", width: "50%"}}><Link to={"/users/"+userId}>{"User: "+user}</Link>
      <div dangerouslySetInnerHTML={{ __html: body }}/></div>
      
    </div>
}}
/**/