import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainPage from "./components/MainPage/MainPage";
import MyPage from "./components/MyPage/MyPage";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/mypage" element={<MyPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
