import axios from "axios";



const loginUrl="https://turquoise-angler-cuff.cyclic.app/api/login"

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