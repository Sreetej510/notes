import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import "./css/notesContent.css";
import Notes from './notes';

export default function NotesContent(){
    const [data,setData] = useState({});
    const location = useLocation();

    const fetchNote = (id) => {
        if(id === ""){return;}
        fetch(`/api/item/sreetej510@gmail.com/${id}`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
      }
    
    useEffect(() => {
        const pathParts = location.pathname.split("/")
        const id = pathParts.slice(-1);
        if(id !== "fetch" && pathParts.includes("note")){
            fetchNote(id);
        }
    }, [location])

    return(
        <div id="NotesContent">
            <div>{data.name}</div>
            <Notes data={data}/>
        </div>
    )
}
