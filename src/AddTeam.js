import React, { useState } from 'react'

function AddTeam(props) {

    window.scrollTo(0,0);

    let closeModal = props.closeModal;
    let addTeam = props.addTeam;

    const [owner, setOwner] = useState("");
    const [teamName, setTeamName] = useState("");
    const [balls, setBalls] = useState(0);

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
        addTeam({name: teamName, balls: balls === "" ? 0 : balls, owner: owner});
        closeModal();
    }

    return (
        <div>
            <h2 className="modalTitle" style={{display: "block"}}>Add Team</h2>
            <form>
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
                <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
                <button onClick={closeModal} className="btn btn-danger">Cancel</button>
            </form>
        </div>
    )
        
}

export default AddTeam;