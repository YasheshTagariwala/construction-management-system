import React from 'react';
import Header from "./layouts/header";
import Footer from "./layouts/footer";
import Login from "./pages/login";

function App() {
    return (
        <div className="App">
            <Header/>
            <Login/>
            <Footer/>
        </div>
    );
}

export default App;
