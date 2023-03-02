import axios from "axios"



const notesUrl="http://localhost:3002/api/notes"

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
     console.log("front side "+ token)
     const resp= await axios.post(notesUrl, noteObj, config)
    
    return resp.data
    //.then(response => {const {data} = response; return data})
    //.catch((error)=>{console.log(`error saving the new note ${error}`)})
}

export const getAllUserNotes= async (user)=>{
        const id=user.id
        const url ="http://localhost:3002/api/users/"+id
        const notes= await axios.get(url)
        return notes.data
     
       
}
export const getAll= async ()=>{
    
    const url ="http://localhost:3002/api/notes"
    
    const notes= await axios.get(url)
    return notes.data
 
   
}

//console.log(response.data)

export const update = (id, obj) => {
    const config= { 
        headers: {Authorization: token}
     }
    
    return axios.put(notesUrl+"/"+id, obj, config);
}

export const deleteRecurse = (id) => {
    
   return axios.delete(notesUrl+"/"+id)
}

/*export const getNote= async (id)=>{
    const note= await axios.get(notesUrl+"/"+id)
    
    return note
}
*/