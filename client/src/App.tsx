import './App.css';
import SignIn from './components/SignIn/SignIn';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import SignUp from './components/SignUp/SignUp';
import HomePage from './components/HomePage/HomePage';
import LoadingSignIn from './components/Loading/LoadingSignIn';
import LoadingSignUp from './components/Loading/LoadingSignUp';
import Product from './components/Product/Product';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/product/:productId" element={<Product />} />
      <Route path="/loadingsignin" element={<LoadingSignIn />} />
      <Route path="/loadingsignup" element={<LoadingSignUp />} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
