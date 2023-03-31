import axios from "axios"

import { token } from "./notes"



const notesUrl="/api/comments"



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
    //.then(response => {const {data} = response; return data})
    //.catch((error)=>{console.log(`error saving the new note ${error}`)})
}

/*export const getAllUserNotes= async (user)=>{
        const id=user.id
        const url ="http://localhost:3002/api/users/"+id
        const notes= await axios.get(url)
        return notes.data
     
       
}*/

export const getAllComments= async ()=>{
    const notes= await axios.get(notesUrl)
    return notes.data
   
}

//console.log(response.data)



export const deleteComment= (id) => {
    
   return axios.delete(notesUrl+"/"+id)
}