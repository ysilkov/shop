import './App.css';
import SignIn from './components/SignIn/SignIn';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
    </BrowserRouter>
    <Footer />
    </div>
  );
}

export default App;
