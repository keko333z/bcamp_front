import { getByPlaceholderText } from "@testing-library/react"
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"

export const Following = ({following})=>{
    const loggedUser = window.localStorage.getItem('userLoggedIn')
    if(loggedUser){
    if (following.length===0){
        return <div style={{color: "lightblue", padding: "10px", fontSize: "24px" }}>You don't follow anyone yet</div>
    }
    else {
        return  <div>
                    <h2>Following</h2>
                        <Table striped>
                            <tbody>
          
                                {following.map(follower => <tr key={follower.id}><td> <Link to={"/users/"+follower.id}>{follower.id} Username: {follower.username} Name: {follower.name} </Link></td></tr>)}
            
                            </tbody>
                        </Table>
                </div>

}}}