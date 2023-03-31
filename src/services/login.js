import axios from "axios";



const loginUrl="/api/login"

export const userLogin = async (userObj)=>{
    let resp =null
    
    resp = await axios.post(loginUrl, userObj)
    if (resp){
       
    return resp.data
    }
    else
    {
        <h1>Error try again</h1>
    }
        
    
    
            
}