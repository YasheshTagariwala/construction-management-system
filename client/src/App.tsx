import React from 'react';
import './App.css';
import Header from "./layouts/header";
import Footer from "./layouts/footer";
import Landing from "./pages/landing";

function App() {
    return (
        <div className="App">
            <Header/>
            <Landing/>
            <Footer/>
        </div>
    );
}

export default App;
