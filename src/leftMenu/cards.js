import './css/cards.css'
import Card from './card';
import React, { useState, useCallback, useEffect, useRef } from 'react';

export default function Cards({logs}){

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
      });

    const renderCards = (logs) => {
      var cardsArray = []
      if(logs){
       const sortedLogs = Object.values(logs).sort((a, b) => new Date(b.lastEdit) - new Date(a.lastEdit));
       sortedLogs.forEach((document) => {
        cardsArray.push(<Card key={document.id} document={document}/>)
       })
      }
      return cardsArray;
    }

    return(
        <div ref={scrollHostRef} id="cardContainer" className={containerClassName}>
          {renderCards(logs)}
        </div>
    )
}