import React from 'react';
import './App.css';
import SearchBar from './SearchBar'
import counties from './country'
function App() {
  return (
    <div className="App">
      <div className="App-component">
        <div className="App-component">
          <SearchBar  items ={counties}/>
        </div>
      </div>
    </div>
  );
}

export default App;
