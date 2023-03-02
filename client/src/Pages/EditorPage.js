import "../css/profile.css";
import ProfileComponent from '../Components/ProfileComponent'
import AllActivitiesEditor from "../Components/AllActivitiesEditor";
import { useEffect, useState } from "react";
import { searchTeams } from "../Actions/TeamActions";
import AllTasks from "../Components/AllTasks";

function EditorPage({loggedUser}){

    const [teams, setTeams] = useState([]);

    useEffect(()=>{
        searchTeams({coordinatorId: loggedUser.id}).then((data)=>{
          setTeams(data)          
        })
    }, [])

    return(
        <div className="ProfilePage">
            <ProfileComponent loggedUser={loggedUser} />
            <AllActivitiesEditor loggedUser={loggedUser} />
            
            {teams.map((team) => (
                <AllTasks key={team.id} team={team} />
            ))}
        </div>
    )
}

export default EditorPage;
