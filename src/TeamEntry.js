import React from 'react'

function TeamEntry(props) {

        let teamValue = props.teamValue;
        let ballValue = props.ballValue;
        let ownerValue = props.ownerValue;
        let editTeam = props.editTeam;
        let index = props.index;
        let swapTeams = props.swapTeams;

        return (
            <tr>
                <td> {ownerValue} </td>
                <td> {teamValue} </td>
                <td> {ballValue} </td>
                <td>
                    <button onClick={() => swapTeams(index, index-1)}>&#8593;</button>
                    <button onClick={() => swapTeams(index, index+1)}>&#8595;</button>
                    <button onClick={() => editTeam(index)}>E</button>
                </td>
            </tr>
        );
}

export default TeamEntry;