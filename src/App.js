import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserProfile from './UserProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user/:username" component={UserProfile} />
        <Route exact path="/" render={() => <div>Home Page Content</div>} />
      </Routes>
    </Router>
   
  );
}

export default App;
