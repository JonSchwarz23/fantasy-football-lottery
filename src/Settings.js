import React, { useState } from 'react'

function Settings(props) {

    window.scrollTo(0,0);

    let updateSettings = props.updateSettings;
    let closeModal = props.closeModal;

    const [waitTime, setWaitTime] = useState(props.waitTime);
    const [numberOfWinners, setNumberOfWinners] = useState(props.numberOfWinners);

    let handleTimeChange = function(e) {
        let value = parseInt(e.target.value);
        if(e.target.value === "") {
            setWaitTime("");
        }
        else if(!isNaN(value))
        {
            setWaitTime(value);
        }
    }

    let handleWinnerChange = function(e) {
        let value = parseInt(e.target.value);
        if(e.target.value === "") {
            setNumberOfWinners("");
        }
        else if(!isNaN(value))
        {
            setNumberOfWinners(value);
        }
    }

    let handleSubmit = function() {
        updateSettings(waitTime === "" || waitTime < 0 ? 4000 : waitTime, numberOfWinners === "" || numberOfWinners < 1 ? 4 : numberOfWinners);
        closeModal();
    }

    return (
        <div>
            <h2 className="modalTitle" style={{display: "block"}}>Edit Team</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="numberOfWinners">Number of Teams Selected:</label>
                    <input id="numberOfWinners" className="form-control" onChange={handleWinnerChange} value={numberOfWinners}/>
                </div>

                <div className="form-group">
                    <label htmlFor="waitTime">Time Between Result Update:</label>
                    <input id="waitTime" className="form-control" onChange={handleTimeChange} value={waitTime}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button onClick={() => closeModal} className="btn btn-danger">Cancel</button>
            </form>
        </div>
    )
        
}

export default Settings;