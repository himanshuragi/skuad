import React, { useState } from 'react';
import './App.css';
import PopUp from './component/Pop_up';
import Table from './component/Table';

function App() {
 const [ShowPOPUP,setShowPOPUP] = useState(false)
  
  return (
    <div className="App">
       <Table setShowPOPUP={setShowPOPUP}/>
       <PopUp ShowPOPUP={ShowPOPUP} setShowPOPUP={setShowPOPUP}/>
    </div>
  );
}

export default App;
