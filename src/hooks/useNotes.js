import { useState, useEffect } from "react"
import { getAll } from "../services/notes"
import { addNote, update } from '../services/notes'
import { useNavigate } from "react-router-dom"
import { Notification } from "../components/Notification"


export const useNotes = () => {
const [ notes, setNotes ] = useState([])
const navigate=useNavigate()

useEffect (()=>{ /// habria que limitar la cantidad de posts que se carga en caso de que se hagan muchas publicaciones
  getAll().then(anotes=>setNotes(anotes.reverse()))
},[])

const updateNotes = (n) => {
  setNotes(n)
}

const handleNewNote = async (user, noteObj) => {
  let exist=null
  exist=user.userNotes.find(element =>(element.title === noteObj.title)) 
      if (!exist)
      {
        try
        { 
        const note= await addNote(noteObj)//.then(note => {setNotes(note)})  
        const newUserNotes=user.userNotes.concat(note)
        user.updateUserNotes(newUserNotes)
        const newNotes = notes.concat(note)
        updateNotes(newNotes)
        window.localStorage.removeItem('allUserNotes')
        window.localStorage.setItem('allUserNotes',JSON.stringify(newUserNotes))
        console.log(newUserNotes)
        navigate('/notes/'+note.id)
        window.location.reload()
        } catch (e){console.log(`error saving the new note ${e}`)}
   
      } 
      else 
      {
        update(exist.id, noteObj).then(response => {console.log(response.data); }).catch(error => {
        return <Notification message={error}></Notification>})
      }
}
 return {
    notes,
    updateNotes,
    handleNewNote
  }
}