import { Link, useParams } from "react-router-dom"
import { Notes } from "./Notes"
import { updateUser } from "../services/users"
import { getUser } from "../services/users"
import { setToken } from "../services/notes"
import { useEffect, useState } from "react"




const handleFollow= async (id, userToFollowName, user, setUser, setFollowing)=>{

    
    const userToFollow = { followingUserId: id, username: userToFollowName}
    const following = user.following.concat(userToFollow)
    
    const newuser={...user, following }
   

    try{   /////añado al nuevo usuario que sigo
        const resp = await updateUser(newuser)
        window.localStorage.setItem('userLoggedIn',JSON.stringify(resp))
        setUser(resp)
        setToken(resp.token)
        
        setFollowing(resp.following)
        
       }catch(e){
        console.log(e)
       }
   
    try{ /// me añado como seguidor en ese usuario
    const userFollowed= await getUser(id)
    const newFollower= {followerUserId: user.id, username: user.username}
    const newFollowersArray =userFollowed.followers.concat(newFollower)
    const followers = newFollowersArray
    const newUserWithFollower= {...userFollowed, followers}
    const resp = await updateUser(newUserWithFollower)
    
    } catch (e){
        console.log(e)
    }
   
}

const handleUnfollow= async (id,  user, setUser, setFollowing)=>{
    
    
    const following =  user.following.filter(follow=>follow.followingUserId !== id)
    const newuser={...user, following}
   
    
    try{   ////
        const resp = await updateUser(newuser)
        window.localStorage.setItem('userLoggedIn',JSON.stringify(resp))
        setUser(resp)
        setToken(resp.token)
        setFollowing(resp.following)
        
       }catch(e){
        console.log(e)
       }
   
    try{ /// me elimino como seguidor en ese usuario
    const userUnFollowed= await getUser(id)
    
    const newFollowersArray =userUnFollowed.followers.filter(follower => follower.followerUserId !== user.id)
    
    const followers = newFollowersArray
    const newUserWithFollower= {...userUnFollowed, followers}
    
    const resp = await updateUser(newUserWithFollower)
    
    } catch (e){
        console.log(e)
    }

}




export const User=({notes, user, setUser, setFollowing})=>{

    const [userToFollow,setUserToFollow]= useState([])
    
    
    const {id}= useParams()
    

    useEffect (()=>{ 
        
        getUser(id).then(user=>setUserToFollow(user))
        
      },[id])
    
    let display=" "
    
    if((notes.length!==0)){

        if(user){
            const itsMe= id.toString() === user.id.toString()  
            display= itsMe ? "none" : "initial"
            
        }else{
            display = "none"
        }
        
        
    //const onenote=notes.find(note => note.user.id === id)
    const userToFollowName = userToFollow?.username
    const userToFollowNotes = notes.filter(note => note.user.id === id)
    
    const path="/notes/"
    const alreadyfollowed= user?.following.find(user => user.followingUserId === id)
    if(alreadyfollowed)
    {
        return <div>
                <div>User {userToFollowName} </div><div style={{display: display}}><Link  onClick={()=>handleUnfollow(id, user, setUser,setFollowing)}>  Unfollow</Link></div>
                
                <Notes username={userToFollowName} notes={userToFollowNotes} path={path}></Notes>

            </div>
    }
    else 
    {
        return <div>
                <div>User {userToFollowName}</div><div style={{display: display}}><Link onClick={()=>handleFollow(id, userToFollowName, user, setUser,setFollowing)}>  Follow</Link></div>
                
                <Notes  username={userToFollowName} notes={userToFollowNotes} path={path}></Notes>

            </div>
    }

}}