import { useState, useEffect } from "react"
import { getAll } from "../services/notes"

export const useNotes = () => {
const [ notes, setNotes ] = useState([])

useEffect (()=>{ /// habria que limitar la cantidad de posts que se carga en caso de que se hagan muchas publicaciones
  getAll().then(anotes=>setNotes(anotes.reverse()))
},[])

const updateNotes = (n) => {
  setNotes(n)
}

 return {
    notes,
    updateNotes
  }
}