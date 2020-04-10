import React from 'react';
import '../App.css';

export default function wineForm(props) {


    // if (props.location.weekday == undefined) {
    //     return <div></div>
    // }

    if (props.location.wineInfo === undefined) {
        return <div> </div>
    }

    let wineObj=JSON.parse(props.location.wineInfo.wineJSON);

    let elem=document.getElementById("wineRow");
    elem.style.display = 'none';

    return (
        <div className="windFormContainer">
        <h1>Welcome to Wine info</h1>
            <div className="wineInfoBox">
                <img className="wineImg" src={wineObj.picture} /> 
            </div>
            <form>

            </form>
        </div>
    )
}
