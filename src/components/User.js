import { Link, useParams } from "react-router-dom"
import { Notes } from "./Notes"
import { updateUser } from "../services/users"
import { getUser } from "../services/users"
import { setToken } from "../services/notes"




const handleFollow= async (id, userToFollowName, user, setUser, setFollowing)=>{
    const loggedUser = window.localStorage.getItem('userLoggedIn')

    if(!loggedUser){
        window.alert("Sign in to follow this user!")
    }
    else{
    const userToFollow = { followingUserId: id, username: userToFollowName}
    const following = user.following.concat(userToFollow)
    console.log(following)
    const newuser={...user, following }
    console.log(newuser)

    try{   /////añado al nuevo usuario que sigo
        const resp = await updateUser(newuser)
        window.localStorage.setItem('userLoggedIn',JSON.stringify(resp))
        setUser(resp)
        setToken(resp.token)
        setFollowing(resp.following)
        console.log(resp)
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
    console.log (resp)
    } catch (e){
        console.log(e)
    }
   
}}

const handleUnfollow= async (id,  user, setUser, setFollowing)=>{
    const loggedUser = window.localStorage.getItem('userLoggedIn')

    if(!loggedUser){
        window.alert("Sign in to follow this user!")
    }
    else{
    
    const following = user.following.filter(follow=>follow.id===id)
    
    const newuser={...user, following }
   
    
    try{   /////añado al nuevo usuario que sigo
        const resp = await updateUser(newuser)
        window.localStorage.setItem('userLoggedIn',JSON.stringify(resp))
        setUser(resp)
        setToken(resp.token)
        setFollowing(resp.following)
        console.log(resp)
       }catch(e){
        console.log(e)
       }
   
    try{ /// me añado como seguidor en ese usuario
    const userUnFollowed= await getUser(id)
    
    const newFollowersArray =userUnFollowed.followers.filter(follower => follower.id===user.id)
    const followers = newFollowersArray
    const newUserWithFollower= {...userUnFollowed, followers}
    const resp = await updateUser(newUserWithFollower)
    console.log (resp)
    } catch (e){
        console.log(e)
    }

}}




export const User=({notes, user, setUser, setFollowing})=>{

    const {id}= useParams()
    
    if((notes.length!==0)&&(user)){

    const itsMe= id.toString() === user.id.toString()  
    const disp= itsMe ? "none" : "initial"
    const onenote=notes.find(note => note.user.id === id)
    const userToFollowName = onenote.user.username
    const userToFollowNotes = notes.filter(note => note.user.id === id)
    const alreadyfollowed= user?.following?.find(user => user.followingUserId === id)
    const path="/notes/"

    if(alreadyfollowed)
    {
        return <div>
                <div>User {userToFollowName} </div><div style={{display: disp}}><Link  onClick={()=>handleUnfollow(id, userToFollowName, user, setUser,setFollowing)}>  Unfollow</Link></div>
                <h3>Latest posts:</h3>
                <Notes notes={userToFollowNotes} path={path}></Notes>

            </div>
    }
    else 
    {
        return <div>
                <div>User {userToFollowName}</div><div style={{display: disp}}><Link onClick={()=>handleFollow(id, userToFollowName, user, setUser,setFollowing)}>  Follow</Link></div>
                <h3>Latest posts:</h3>
                <Notes notes={userToFollowNotes} path={path}></Notes>

            </div>
    }

}}