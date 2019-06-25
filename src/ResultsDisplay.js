import React from 'react';

function ResultsDisplay(props) {
    let displayIndex = props.displayIndex;
    let expectedOrder = props.expectedOrder.map(team => team.name);
    let actualOrder = props.actualOrder;
    let winners = props.winners;

    let htmlOrder = [];
    let htmlResults = [];
    let htmlFinalFour = [];
    let finalFour = {};

    let shuffle = function(array) {
        array.sort(() => Math.random() - 0.5);
      }


    expectedOrder.forEach((team, index) => {
        htmlOrder.push(<p key={index}>{(expectedOrder.length - index) + ". " + team}</p>)
    });

    for(let i = 0; i <= displayIndex; i++)
    {
        htmlResults.push(<p key={i}>{(actualOrder.length - i) + ". " + actualOrder[i]}</p>)

        while(expectedOrder[i+htmlFinalFour.length] !== actualOrder[i])
        {
            let teamToAdd = expectedOrder[i+htmlFinalFour.length];
            htmlFinalFour.push(<p key={htmlFinalFour.length}>{teamToAdd}</p>)
            finalFour[teamToAdd] = true;
        }
    }

    if(winners) {
        shuffle(winners);
        winners.forEach(winner => {
            if(!(winner in finalFour))
            {
                htmlFinalFour.push(<p key={htmlFinalFour.length}>{winner}</p>)
            }
        });
    }

    return (
        <div id="lotteryView">
            <div id="lotteryResults">
                <div id="order">
                    <h3>Expected Order: </h3>
                    {htmlOrder}
                </div>
                <div id="results">
                    <h3>Results: </h3>
                    {htmlResults}
                </div>
                <div id="winners">
                    <h3>Winners: </h3>
                    {htmlFinalFour}
                </div>
            </div>
            <h2>{"Next Expected Team: " + expectedOrder[displayIndex+htmlFinalFour.length+1]}</h2>
        </div>
        
    );
}

export default ResultsDisplay;