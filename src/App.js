import React from 'react';
import DataTable from './components/DataTable'; 
import data from './data/data.json'; 
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>React Table</h1>
      </header>
      <div className="body">
        <DataTable data={data.body} />
      </div>
    </div>
  );
}

export default App;
