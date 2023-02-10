import { useContext, useState,   } from "react";
import ProfileComponent from "../Components/ProfileComponent";
import AllUsers from "../Components/AllUsers";
import RegisterNewUser from "../Components/RegisterNewUser";
import { UserContext } from "../Hooks/UserContext";
import "../css/profile.css";
import AllActivities from "../Components/AllActivities";
import AllProjekti from "../Components/AllProjekti";
import AllTeams from "../Components/AllTeams";



function AdminPage(){
    const {user} = useContext(UserContext);
    const [registerVisible, setRegisterVisible] = useState(false);
    const [projektiVisible, setProjektiVisible] = useState(false);
    const [teamsVisible, setTeamsVisible] = useState(false);
    const [usersVisible, setUsersVisible] = useState(false);
    return(
       <div className="ProfilePage">
            {/* <h1> Welcome { user.firstName}</h1>   */}
            
            <ProfileComponent/>
            <AllActivities/>
            <div className="buttons">
                <button onClick= {()=> { setRegisterVisible(true);setUsersVisible(false); setProjektiVisible(false);setTeamsVisible(false);}} > Nov Nalog</button>
                <button onClick= {()=> { setProjektiVisible(true);setUsersVisible(false);setRegisterVisible(false);setTeamsVisible(false); }} >Projekti</button>
                <button onClick= {()=> { setTeamsVisible(true);setUsersVisible(false);setProjektiVisible(false);setRegisterVisible(false); }} >Timovi</button>
                <button onClick= {()=> { setUsersVisible(true);setTeamsVisible(false);setProjektiVisible(false);setRegisterVisible(false); }} >Korisnici</button>
            </div>
             {registerVisible && <RegisterNewUser/>}
             {projektiVisible && <AllProjekti/>}
             {teamsVisible && <AllTeams/>}
             {usersVisible && <AllUsers/>}
            
       </div>
    )
}
export default AdminPage;