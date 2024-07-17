import {Route,Routes } from 'react-router-dom';
import './App.css';
import Todo from './Todo/Todo';
import Login from './Todo/Login';
import SignUp from './Todo/SignUp';





function App() {
  return (
    <>
      <Routes>
      
        
        <Route path='/' element={<Login/>}/>

        <Route path='/Todo' element={<Todo/>}/>

        <Route path='/SignUp' element={<SignUp/>}/>
    
      </Routes>
     
    </>
  );
}

export default App;
