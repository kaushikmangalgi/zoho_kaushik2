import logo from './logo.svg';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Login from './components/Login'
import Home from './components/Home'
import Signup from './components/Signup';
import AddContact from './components/AddContact';
import Contacts from './components/Contacts';

function App() {
  return (
       <div>
      <Router>
        <div>
          <Navbar></Navbar>
          <Routes>
            <Route path="/login" element={<Login />} ></Route>
            <Route path="/signup" element={<Signup />} ></Route>
            <Route path="/addContact" element={<AddContact />} ></Route>
            <Route path="/*" element={<Home />} ></Route>
            <Route path="/contacts" element={<Contacts/>} ></Route>
          </Routes>
      
        </div>
      </Router>
        </div>
      
      
      
   
  );
}

export default App;
