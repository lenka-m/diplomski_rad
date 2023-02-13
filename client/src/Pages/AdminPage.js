import { useContext, useState,   } from "react";
import ProfileComponent from "../Components/ProfileComponent";
import AllUsers from "../Components/AllUsers";
import "../css/profile.css";
import AllActivities from "../Components/AllActivities";
import AllProjekti from "../Components/AllProjekti";
import AllTeams from "../Components/AllTeams";



function AdminPage({loggedUser}){
    
    const [projektiVisible, setProjektiVisible] = useState(false);
    const [teamsVisible, setTeamsVisible] = useState(false);
    const [usersVisible, setUsersVisible] = useState(false);
    return(
       <div className="ProfilePage">

            <ProfileComponent loggedUser={ loggedUser}/>
            <AllActivities loggedUser = {loggedUser}/>
            <div className="buttons">
            <button onClick= {()=> { setUsersVisible(true);
                    setTeamsVisible(false);
                    setProjektiVisible(false);}}>Korisnici</button>
                <button onClick= {()=> { setProjektiVisible(true);
                setUsersVisible(false);
                    ;setTeamsVisible(false); }} >
                        Projekti</button>
                <button onClick= {()=> { 
                    setTeamsVisible(true);
                    setUsersVisible(false);
                    setProjektiVisible(false);}}>
                        Timovi</button>
                    
            </div>
            {usersVisible && <AllUsers/>}
            {projektiVisible && <AllProjekti/>}
            {teamsVisible && <AllTeams/>}
             
            
       </div>
    )
}
export default AdminPage;