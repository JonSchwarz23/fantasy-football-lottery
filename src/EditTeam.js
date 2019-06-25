import React, { useState } from 'react'

function EditTeam(props) {

    window.scrollTo(0,0);

    let closeModal = props.closeModal;
    let editTeam = props.editTeam;
    let startingValues = props.startingValues;

    const [owner, setOwner] = useState(startingValues.owner);
    const [teamName, setTeamName] = useState(startingValues.name);
    const [balls, setBalls] = useState(startingValues.balls);

    let handleBallsChange = function(e) {
        let value = parseInt(e.target.value);
        if(e.target.value === "") {
            setBalls("");
        }
        else if(!isNaN(value))
        {
            setBalls(value);
        }
    }

    let handleSubmit = function() {
        editTeam({name: teamName, balls: balls === "" ? 0 : balls, owner: owner});
        closeModal();
    }

    return (
        <div>
            <h2 className="modalTitle" style={{display: "block"}}>Edit Team</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="owner">Owner:</label>
                    <input id="owner" className="form-control" onChange={(e) => setOwner(e.target.value)} value={owner}/>
                </div>
                <div className="form-group">
                    <label htmlFor="teamName">Team Name:</label>
                    <input id="teamName" className="form-control" onChange={(e) => setTeamName(e.target.value)} value={teamName}/>
                </div>
                <div className="form-group">
                    <label htmlFor="pingPongBalls">Ping Pong Balls:</label>
                    <input id="pingPongBalls" className="form-control" onChange={handleBallsChange} value={balls}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button onClick={() => closeModal} className="btn btn-danger">Cancel</button>
            </form>
        </div>
    )
        
}

export default EditTeam;