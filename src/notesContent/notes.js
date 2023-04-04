import React, {useState, useEffect, useRef, useCallback} from 'react';
import Note from './note';

export default function Notes({data}){
    const [containerClassName,setContainerClassName] = useState("notScrolling")
    const timeOutRef = useRef(-1);
    const handleScroll = useCallback(() => {
        setContainerClassName("");
        clearTimeout(timeOutRef.current);
        timeOutRef.current = setTimeout(() => {
          setContainerClassName("notScrolling");
        }, 500);
      }, []);

    const scrollHostRef = useRef();

    useEffect(() => {
        const scrollHostElement = scrollHostRef.current;
        scrollHostElement.addEventListener("scroll", handleScroll, true);
        return () => {
          scrollHostElement.removeEventListener("scroll", handleScroll, true);
        };
      },[]);


    const renderNotes = (notes) => {
        var notesArray = []
        if(notes.keys && typeof notes === 'object'){
            notes.keys.forEach((key) => {
                notesArray.push(<Note key={key} note={notes[key]} docId={key} parentId={data._id}/>)
            })
        }
        return notesArray;
    }

    return(
        <div ref={scrollHostRef} id="notesContainer" className={containerClassName}>
            {renderNotes(data)}
        </div>
    )
}