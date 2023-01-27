import { Notes } from "./Notes"


export const Home = ({notes}) => {
const path="/notes/"

return (
    
<Notes  notes={notes} path={path}></Notes>    

)

}