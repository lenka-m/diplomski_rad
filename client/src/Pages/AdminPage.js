import { useContext, useState,   } from "react";
import AdminProfileComponent from "../Components/AdminProfileComponent";
import AllUsers from "../Components/AllUsers";
import RegisterNewUser from "../Components/RegisterNewUser";
import { UserContext } from "../Hooks/UserContext";
import "../css/profile.css";
import AllActivities from "../Components/AllActivities";



function AdminPage(){
    const {user} = useContext(UserContext);
    const [registerVisible, setRegisterVisible] = useState(false);
    const [activityVisible, setActivitiesVisible] = useState(true);
    const [projektiVisible, setProjektiVisible] = useState(false);
    return(
       <div className="ProfilePage">
            {/* <h1> Welcome { user.firstName}</h1>   */}
            
            <AdminProfileComponent/>
            <div className="buttons">
                <button onClick= {()=> { setRegisterVisible(!registerVisible);setActivitiesVisible(false); setProjektiVisible(false)}} > Nov Nalog</button>
                <button onClick= {()=> { setRegisterVisible(false); setActivitiesVisible(true); setProjektiVisible(false)}} >Aktivnosti</button>
                <button onClick= {()=> { setProjektiVisible(true);setRegisterVisible(false); setActivitiesVisible(false)}} >Projekti</button>
            </div>
             {registerVisible && <RegisterNewUser/>}
             {activityVisible && <AllActivities user = {user}/>}
            
       </div>
    )
}
export default AdminPage;