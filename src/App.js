import { HashRouter,Route,Routes } from 'react-router-dom';
import './App.css';
import Todo from './Todo/Todo';
import Login from './Todo/Login';



function App() {
  return (
    <div className="App">
      
      
        <Route path='/' element={<Login/>}/>

        <Route path='/Todo' element={<Todo/>}/>
    
     
    </div>
  );
}

export default App;
