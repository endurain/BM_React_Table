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
      <body className="body">
        <DataTable data={data.body} />
      </body>
      
    </div>
  );
}

export default App;
