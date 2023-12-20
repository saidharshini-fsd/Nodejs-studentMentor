import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Assigned from './components/Assigned';
import Mentor from './components/Mentor';
import Student from './components/Student';
import { Home } from './Home';

function App() {
  return (
    <div className="App">
    <div className='Appdiv'>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/mentor' element={<Mentor/>} />
        <Route path='/student' element={<Student/>} />
        <Route path='/assigned' element={<Assigned/>} />
      </Routes>
      </BrowserRouter>
     </div>
    </div>
  );
}

export default App;
