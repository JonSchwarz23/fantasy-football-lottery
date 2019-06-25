import React from 'react'
import TeamEntry from "./TeamEntry";

function AllTeams(props) {

    let completeTable = [];
    let teams = props.teams;
    let editTeam = props.editTeam;
    let swapTeams = props.swapTeams;

    teams.forEach(
        (team, i) => {
            completeTable.push(<TeamEntry teamValue={team.name} ballValue={team.balls} ownerValue={team.owner} key={i} index={i} editTeam={editTeam} swapTeams={swapTeams}/>);
        });

    return (
    <tbody>
        <tr>
            <th>Owner</th>
            <th>Team Name</th>
            <th>Ping Pong Balls</th>
            <th>Actions</th>
        </tr>
        {completeTable} 
    </tbody>)
}

export default AllTeams;
