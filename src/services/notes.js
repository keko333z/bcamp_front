import axios from "axios"



const notesUrl="https://turquoise-angler-cuff.cyclic.app/api/notes"

export let token= null

export const setToken = newToken => token = `bearer ${newToken}`

export const getNote= async (id)=>{
    const note= await axios.get(notesUrl+"/"+id)
    return note.data
}

export const addNote= async (noteObj) => {
     const config= { 
        headers: {Authorization: token}
     }
    
     const resp= await axios.post(notesUrl, noteObj, config)
    
    return resp.data
}

export const getAllUserNotes= async (user)=>{
        const id=user.id
        const url ="https://turquoise-angler-cuff.cyclic.app/api/users/"+id
        const notes= await axios.get(url)
        return notes.data   
}

export const getAll= async ()=>{
    const notes= await axios.get(notesUrl)
    return notes.data
}

export const update = (id, obj) => {
    const config= { 
        headers: {Authorization: token}
     }
    return axios.put(notesUrl+"/"+id, obj, config);
}

export const deleteRecurse = (id) => {
   return axios.delete(notesUrl+"/"+id)
}

