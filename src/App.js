import './App.css';
import AddModal from './leftMenu/addModal';
import LeftMenu from './leftMenu/index'
import NotesContent from './notesContent/index'
import React, {useState} from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

export default function App() {

  const [isAddModal, setIsAddModal] = useState(false);

  const openModel = () => {
    setIsAddModal(true);
  }

  const closeModal = () => {
    setIsAddModal(false);
  }

  return (
    <Router>
    <div className='App'>
      {isAddModal?<AddModal closeModal={closeModal}/>:null}
      <div className={`App ${isAddModal?"blur":""}`}>

      <LeftMenu openModel={openModel}/>
      <NotesContent/>
      </ div>
    </div>
    </Router>
  );
}