import React from "react"
import { useParams } from "react-router-dom"

export const Note = ({notes}) => {
    const {id}=useParams()
    //console.log(id)
    const note =  notes.find(note => note.id === id)
    return <div><h3>Note</h3> {"Title: "+note?.title+" Content: "+note?.body}</div>
  }