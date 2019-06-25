import React from 'react';

function FinalResults(props) {
    let actualOrder = props.actualOrder; 
    let displayIndex = props.displayIndex;

    let htmlResults = [];

    for(let i = 0; i < displayIndex; i++)
    {
        htmlResults.push(<h3>{actualOrder.length - i + ". " + actualOrder[i]}</h3>);
    }

    return (
        <div id="finalResults">
            {htmlResults}
        </div>
    )
}

export default FinalResults;