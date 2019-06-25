import React, {useState} from 'react';
import ReactDOM from "react-dom";
import AllTeams from './AllTeams';
import AddTeam from './AddTeam';
import EditTeam from './EditTeam'
import ReactModal from 'react-modal';
import Results from './Results';
import Settings from './Settings';

var ls = require('local-storage');

function App() {

    const wffl = [
        {name: "Team BEST", balls: 140, owner: "Richard Brunje"},
        {name: "Tombradykisses Hissononthelips", balls: 140, owner: "Maxwell Bellias"},
        {name: "Team Zargon", balls: 140, owner: "Jonathan Schwarz"},
        {name: "Owning The Libs", balls: 125, owner: "Matt Shaffer"},
        {name: "The Swash Knucklers", balls: 105, owner: "Robert Papa"},
        {name: "Pork Wins '96 '97", balls: 90, owner: "Sebastian Hull"},
        {name: "Spare Me Lafleur", balls: 75, owner: "David Droxjock"},
        {name: "Team gil gil boy", balls: 60, owner: "Alec Doyle"},
        {name: "Team Fuck Fantasy Footbal", balls: 45, owner: "Jake Anderson"},
        {name: "Team Ligma", balls: 30, owner: "Billy Crank"},
        {name: "Dirty Sprite", balls: 20, owner: "Adam Brody, David Padover"},
        {name: "Schrute Farms", balls: 15, owner: "Brandon Davis, Frank Gaccione"}
    ];

    let pTeams = ls.get("teams");
    if(!pTeams) pTeams = [];

    let pWaitTime = ls.get("waitTime");
    if(!pWaitTime) pWaitTime = 3000;

    let pNumberOfWinners = ls.get("numberOfWinners");
    if(!pNumberOfWinners) pNumberOfWinners = 4;

    const [runLottery, setRunLottery] = useState(false);
    const [teams, setTeams] = useState(pTeams);
    const [showAddTeamModal, setShowAddTeamModal] = useState(false);
    const [showEditTeamModal, setShowEditTeamModal] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [editTeamIndex, setEditTeamIndex] = useState(0);
    const [results, setResults] = useState([]);
    const [waitTime, setWaitTime] = useState(pWaitTime);
    const [numberOfWinners, setNumberOfWinners] = useState(pNumberOfWinners);

    let calculateResults= function() {

        if(numberOfWinners + 2 >= teams + 2) {
            alert("Add more teams I think this thing will break if you don't");
            return;
        }

        ls.set("teams", teams);
        ls.set("waitTime", waitTime);
        ls.set("numberOfWinners", numberOfWinners);


        let oddsArr = [];
        let order = [];
        let winners = {};
        let winnerOrder = [];

        teams.forEach(
            team => {
                order.unshift(team.name);
                let teamArr = new Array(team.balls).fill(team.name);
                oddsArr = oddsArr.concat(teamArr);
            });

        for(let i = 0; i < numberOfWinners; i++) {
            let winner = getWinner(oddsArr, winners);
            winners[winner] = winner;
            order = order.filter(team => team !== winner);
            winnerOrder.unshift(winner);
        }

        order = order.concat(winnerOrder);

        console.log(order);
        
        setRunLottery(true);
        setResults(order);
    }

    let getWinner = function(oddsArr, prevWinners) {
        while(true) {
            let winningNum = Math.floor(Math.random() * oddsArr.length)
            if(!(oddsArr[winningNum] in prevWinners)) {
                return oddsArr[winningNum];
            }
        }
        
    }

    let updateTeam = function(team) {
        teams[editTeamIndex] = team;
        setTeams(teams);
    }

    let editTeam = function(index)
    {
        setEditTeamIndex(index);
        setShowEditTeamModal(true);
    }

    let swapTeams = function(i, j)
    {
        if(i < 0 || i > teams.length-1 || j < 0 || j > teams.length-1) return;

        let teamsCopy = [...teams];

        let temp = teamsCopy[i];
        teamsCopy[i] = teamsCopy[j];
        teamsCopy[j] = temp;
        setTeams(teamsCopy);
    }

    let updateSettings = function(waitTime, numberOfWinners) {
        setNumberOfWinners(numberOfWinners);
        setWaitTime(waitTime);
    }

    if(!runLottery)
    {
        return (
            <div id="Everything">
                <h1>Draft Lottery 2019</h1>
                <div id="menuButtons">
                    <button type="submit" className="btn btn-success" onClick={() => calculateResults()}>Run</button>
                    <button className="btn btn-secondary" onClick={() => setShowSettingsModal(true)}>Settings</button>
                    <button className="btn btn-info" onClick={() => setTeams(wffl)}>Load WFFL Data</button>
                </div>
                <table className="table table-sm table-hover table-striped table-bordered">
                    <AllTeams teams={teams} editTeam={editTeam} swapTeams={swapTeams}/>
                </table>
                <div id="addButton">
                    <button className="btn btn-success" onClick={() => setShowAddTeamModal(true)}>Add Team</button>
                </div>
                <ReactModal isOpen={showAddTeamModal} contentLabel="Add Team" className="Modal" overlayClassName="Overlay">
                    <AddTeam closeModal={() => setShowAddTeamModal(false)} addTeam={(team) => setTeams([...teams, team])}/>
                </ReactModal>
                <ReactModal isOpen={showEditTeamModal} contentLabel="Edit Team" className="Modal" overlayClassName="Overlay">
                    <EditTeam closeModal={() => setShowEditTeamModal(false)} editTeam={updateTeam} startingValues={teams[editTeamIndex]}/>
                </ReactModal>
                <ReactModal isOpen={showSettingsModal} contentLabel="Settings" className="Modal" overlayClassName="Overlay">
                    <Settings closeModal={() => setShowSettingsModal(false)} waitTime={waitTime} numberOfWinners={numberOfWinners} updateSettings={updateSettings}/>
                </ReactModal>
            </div>
        )
    }
    else
    {
        return <Results expectedOrder={teams.reverse()} actualOrder={results} waitTime={waitTime} pickedTeams={numberOfWinners}></Results>;
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);