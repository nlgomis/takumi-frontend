import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Top from "./components/Top";
import Contact from "./components/Contact";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Top />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
