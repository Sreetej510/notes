import React from "react";
import { Link } from 'react-router-dom'

const getUpdateTimeText = (dateString) => {
    let date = new Date(dateString);
    let diffMins = Math.floor((Date.now() - date)/60000);
    let diffHrs = Math.floor(diffMins/60);
    let updateText = ""
    if(diffMins < 1){
        updateText = "a few seconds ago"
    }else if(diffMins < 60){
        updateText = `${diffMins} mins ago`
    }else if(diffHrs < 24){
        updateText = `${diffHrs} hours ago`
    }else{
        updateText = `on ${date.toLocaleDateString("en-US", { month: 'short', day: '2-digit', year: 'numeric' })}`
    }

    return updateText;
}


export default function Card({document}){

    const updatedTimeText = getUpdateTimeText(document.lastEdit);

    return(
        <div className={`card cusTheme-${document.color}`}>
         <Link to={`/note/${document.id}`}></Link>
         <div className="card-body">
            <h5 className="font_Comic">{document.name}</h5>
            <p className="card-text">{document.description}</p>
            <p><small>Last updated {updatedTimeText}</small></p></div>
        </div>
    )
}