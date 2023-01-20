import axios from "axios"



const userUrl="http://localhost:3002/api/users"

export const updateUser= async (userObj)=>{
    const user= await axios.put(userUrl+"/"+userObj.id, userObj);
    return user.data
}



export const getUser = async (id) => {
     const user= await axios.get(userUrl+"/"+id)
     return user.data
}