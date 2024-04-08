import {Route,Routes } from 'react-router-dom';
import './App.css';
import Todo from './Todo/Todo';
import Login from './Todo/Login';



function App() {
  return (
    <>
      <Routes>
      
        
        <Route path='/' element={<Login/>}/>

        <Route path='/Todo' element={<Todo/>}/>
    
      </Routes>
     
    </>
  );
}

export default App;
