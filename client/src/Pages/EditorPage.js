
import "../css/profile.css";
import ProfileComponent from '../Components/ProfileComponent'
import AllActivitiesEditor from "../Components/AllActivitiesEditor";
function EditorPage({loggedUser}){
    const user = loggedUser;
    
    return(
       <div className="ProfilePage">
            
            <ProfileComponent    loggedUser={loggedUser} />
            <AllActivitiesEditor loggedUser={loggedUser} />
       </div>
    )
}
export default EditorPage;