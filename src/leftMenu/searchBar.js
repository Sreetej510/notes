import './css/searchBar.css'
import React, { useState } from 'react';

//TODO implement search Bar form submit
const searchSubmit = (e) => {
  e.preventDefault();
}

export default function SearchBar(){
    var searchTextClass = ""
    const [text, setText] = useState("");
    if(text !== ""){
        searchTextClass = "active";
    }

    return(
        <div className="searchBarContainer" id="searchBarContainer">
          <form id="searchBar" onSubmit={searchSubmit}>
            <button type="submit" className="enterSearchBtn">
              <svg>
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l
                    5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
                </path>
              </svg>
            </button>

            <input type="text" placeholder="Search of Notes" id="searchInput" value={text} onChange={(e) => setText(e.target.value)} />

            <button type="button" id="clearSearchBtn" className={searchTextClass} onClick={() => setText("")}>
              <svg>
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                </path>
                <path d="M0 0h24v24H0z" fill="none"></path>
              </svg>
            </button>
          </form>
        </div>
    )
}