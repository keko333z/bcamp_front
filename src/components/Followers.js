import { getByPlaceholderText } from "@testing-library/react"
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"

export const Followers = ({followers})=>{
    const loggedUser = window.localStorage.getItem('userLoggedIn')
    if(loggedUser){
    if (followers.length===0){
        return <div style={{color: "lightblue",  padding: "10px", fontSize: "24px"}}>You don't have any followers yet</div>
    }
    else {
        return <div>
                    <h2>Followers</h2>
                    <Table striped>
                        <tbody>

                            {followers.map(follower => <tr key={follower.followerUserId}><td> <Link to={"/users/"+follower.followerUserId}>Username: {follower.username}</Link></td></tr>)}

                        </tbody>
                    </Table>
                </div>

}}}