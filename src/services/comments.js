import axios from "axios"

import { token } from "./notes"



const notesUrl="https://turquoise-angler-cuff.cyclic.app/api/comments"



export const getNoteComments= async (id)=>{
    const comment= await axios.get(notesUrl+"/"+id)
    return comment.data
}

export const addComment= async (noteObj) => {
     const config= { 
        headers: {Authorization: token}
     }
     
     const resp= await axios.post(notesUrl, noteObj, config)
    
    return resp.data
}

export const getAllComments= async ()=>{
    const notes= await axios.get(notesUrl)
    return notes.data
   
}

export const deleteComment= (id) => {
    
   return axios.delete(notesUrl+"/"+id)
}