import { getByPlaceholderText } from "@testing-library/react"
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { ProfileNav } from "./ProfileNav"

export const Followers = ({followers})=>{
    const loggedUser = window.localStorage.getItem('userLoggedIn')
    if(loggedUser){
    if (followers.length===0){
        return <div style={{color: "lightblue",  padding: "10px", fontSize: "24px"}}>You don't have any followers yet</div>
    }
    else {
        return <div>
                    <ProfileNav></ProfileNav>
                    <h4>Followers</h4>
                    <Table striped>
                        <tbody>

                            {followers.map(follower => <tr key={follower.followerUserId}><td> <Link to={"/users/"+follower.followerUserId}>Username: {follower.username}</Link></td></tr>)}

                        </tbody>
                    </Table>
                </div>

}}}