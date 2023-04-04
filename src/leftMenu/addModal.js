import './css/addModal.css'
import React from "react";
import { useNavigate } from 'react-router-dom';

export default function AddModal({closeModal}) {
    const navigate = useNavigate();

    const formSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        var logName = form[0].value;
        var description = form[1].value;
        var color = form[2].value;
        var keywords = form[3].value.split(',');
        keywords = keywords.map(name => name.toLowerCase());
        var id = Date.now().toString();
        var body = {
            name: logName,
            id: id,
            color: color,
            lastEdit: Date.now(),
            description: description,
            keywords: keywords
        }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        fetch('/api/newLog/sreetej510@gmail.com', requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.acknowledged){
                    closeModal();
                    navigate("note/fetch");
                }else{
                    alert("Error check console");
                    console.log(data);
                }
            });
    }

    return (
        <div id="addModal">
            <div className="fullBG" onClick={closeModal}/>

            <form id='createNotesForm' onSubmit={formSubmit}>
                <h4>New Note</h4>
                <input name="logName" placeholder="Log Name" maxLength="15" required/>

                <textarea name="description" placeholder="Description" maxLength="150" required></textarea>

                <div>
                <label>Color : </label>
                <select id="newLogColor">
                    <option value="">None</option>
                    <option value="darkcyan" className="cusTheme-darkcyan">Dark Cyan</option>
                    <option value="darkorchid" className="cusTheme-darkorchid">Dark Orchid</option>
                    <option value="darkturquoise" className="cusTheme-darkturquoise">Dark Turquoise</option>
                    <option value="deeppink" className="cusTheme-deeppink">Deep Pink</option>
                    <option value="deepskyblue" className="cusTheme-deepskyblue">Deep Skyblue</option>
                    <option value="forestgreen" className="cusTheme-forestgreen">Forest Green</option>
                    <option value="goldenrod" className="cusTheme-goldenrod">Golden</option>
                    <option value="indigo" className="cusTheme-indigo">Indigo</option>
                    <option value="mediumseagreen" className="cusTheme-mediumseagreen">Sea Green</option>
                    <option value="orange" className="cusTheme-orange">Orange</option>
                    <option value="royalblue" className="cusTheme-royalblue">Royal Blue</option>
                    <option value="slateblue" className="cusTheme-slateblue">Slate Blue</option>
                    <option value="skyblue" className="cusTheme-skyblue">Skyblue</option>
                    <option value="teal" className="cusTheme-teal">Teal</option>
                </select>
                </div>

                <input name="keywords" placeholder="Keywords" required/>

                <div className="flex-row">        
                    <button className='createBtn' type="submit">Create</button>
                    <button className='cancelBtn' type="button" onClick={closeModal}>Cancel</button>
                </div>

            </form>
        </div>
    )
}