import React from 'react';
import ProblemList from './components/ProblemList';
import Navbar from './components/Navbar'; // Import the Navbar component
import './styles.css';

function App() {
    return (
        <div className="App">
            <Navbar /> {/* Include the Navbar */}
            <ProblemList />
        </div>
    );
}

export default App;