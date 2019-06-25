import React, { useState, useEffect } from 'react';
import ResultsDisplay from './ResultsDisplay';
import FinalResults from './FinalResults';

function Results(props) {
    let expectedOrder = props.expectedOrder;
    let actualOrder = props.actualOrder;
    let waitTime = props.waitTime;
    let pickedTeams = props.pickedTeams;

    const [displayIndex, setDisplayIndex] = useState(-1);

    useEffect(() => {

        if(displayIndex < expectedOrder.length) {
            setTimeout(nextIndex, waitTime);
        }
    })

    let  nextIndex = function() {
        setDisplayIndex(displayIndex + 1);
    }

    if(displayIndex + 1 > expectedOrder.length - pickedTeams)
    {
        return <FinalResults actualOrder={actualOrder} displayIndex={displayIndex}></FinalResults>
    }
    else if(displayIndex + 1 === expectedOrder.length - pickedTeams)
    {
        let winners = actualOrder.slice(actualOrder.length - pickedTeams);
        return <ResultsDisplay expectedOrder={expectedOrder} actualOrder={actualOrder} displayIndex={displayIndex} winners={winners}></ResultsDisplay>
    }
    else
    {
        return <ResultsDisplay expectedOrder={expectedOrder} actualOrder={actualOrder} displayIndex={displayIndex}></ResultsDisplay>
    }

}

export default Results;