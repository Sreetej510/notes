import SearchBar from "./searchBar";
import Cards from "./cards";
import './css/leftmenu.css'
import React, {useState, useEffect} from "react";
import { useNavigate, useLocation } from 'react-router-dom';

export default function LeftMenu({ openModel }) {

    const [data, setData] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    const fetchAllLogs = () => {
        fetch('/api/allLogs/sreetej510@gmail.com')
            .then(response => response.json())
            .then(data => {
                setData(data);
                navigate(`note/${data.lastUpdated}`);
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        fetchAllLogs();
    },[])

    useEffect(() => {
        if(location.pathname === "/note/fetch"){
            fetchAllLogs();
        }
    }, [location])

    return (
        <div className="LeftMenu">
            <SearchBar />
            <Cards logs={data.logs} />
            <button id="addBtn" onClick={openModel}>
                <svg width="30" height="30" viewBox="0 0 24 24" focusable="false">
                    <path d="M20 13h-7v7h-2v-7H4v-2h7V4h2v7h7v2z"></path>
                </svg>
            </button>
        </div>
    )
}