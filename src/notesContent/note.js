import React, { useState, useEffect, useRef } from 'react';
import ContentEditable from "react-contenteditable";

export default function Note({ note, docId, parentId }) {

    const [content, setContent] = useState(note.log);
    const [name, setName] = useState(note.name);
    const firstTimeRef = useRef(true);

    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const saveNote = () => {
        if(firstTimeRef.current){
            firstTimeRef.current = false;
            return
        }
        var body ={
            _id:parentId,
            [`${docId}`]: {
                log:`${content}`,
                name:`${name}`
        }}
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };

        //TODO write a upload function to save
        fetch("/api/save/sreetej510@gmail.com", requestOptions)
        .then(response => response.json())
        .then(data => {
            if(data.acknowledged){
                console.log("saved")
            }else{
                console.log(data);
            }
        });
    }

    useEffect(() => {
        const saveTimeout = setTimeout(() => {
            saveNote();
        }, 1000);
        return () => {
            clearTimeout(saveTimeout);
        }
    }, [name, content])

    return (
        <div className='noteContainer'>
            <button>delete</button>
            <ContentEditable className='title' onChange={handleNameChange} html={name} />
            <ContentEditable className='noteContent' onChange={handleContentChange} html={content} />
        </div>
    )

}