import { Notes } from "./Notes"
import { HomeSide } from "./HomeSide"



export const Home = ({notes, user}) => {
const path="/notes/"

return (
    <div>
        
        <HomeSide></HomeSide>
        <h4>Latest Posts:</h4>
        <Notes  notes={notes} user={user} path={path}></Notes>    
        
        

    </div>


)

}