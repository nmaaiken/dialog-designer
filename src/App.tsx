import React from 'react';
import './App.css';
import DnDFlow from './components/DragnDrop/DragNDrop';

function Flow({ nodes, edges }) {
  return (
    <div className='default-div'>
    <DnDFlow></DnDFlow>
    </div>
  );
}

export default Flow;
