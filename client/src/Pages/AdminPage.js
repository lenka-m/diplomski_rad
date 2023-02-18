import { useContext, useState,   } from "react";
import ProfileComponent from "../Components/ProfileComponent";
import AllUsers from "../Components/AllUsers";
import "../css/profile.css";
import AllProjekti from "../Components/AllProjekti";
import AllTeams from "../Components/AllTeams";
import AllActivitiesAdmin from "../Components/AllActivitiesAdmin";



function AdminPage({loggedUser}){
    
    const [projektiVisible, setProjektiVisible] = useState(false);
    const [teamsVisible, setTeamsVisible] = useState(false);
    const [usersVisible, setUsersVisible] = useState(false);
    
    return(
       <div className="ProfilePage">

            <ProfileComponent loggedUser={ loggedUser}/>
            <AllActivitiesAdmin loggedUser = {loggedUser}/>
            <div className="tableContainer">
                <div className="buttonContainer buttons">
                    <button onClick= {()=> { 
                        setUsersVisible(!usersVisible);
                        setTeamsVisible(false);
                        setProjektiVisible(false);}}>
                            Korisnici</button>
                    <button onClick= {()=> { 
                        setProjektiVisible(true);
                        setUsersVisible(false);
                        setTeamsVisible(false); }} >
                            Projekti</button>
                    <button onClick= {()=> { 
                        setTeamsVisible(true);
                        setUsersVisible(false);
                        setProjektiVisible(false);}}>
                            Timovi</button>        
                </div>
                {usersVisible && <AllUsers loggedUser = {loggedUser}/>}
                {projektiVisible && <AllProjekti/>}
                {teamsVisible && <AllTeams/>}
            </div>
            
       </div>
    )
}
export default AdminPage;