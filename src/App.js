// libraries
import { Routes, Route } from 'react-router-dom';

// components
import English from './components/English';
import Spanish from './components/es/Spanish';

// styles
import './components/styles/App.css';


function App() {


  return (
    <Routes>
      <Route path ="/*" element={<English/>} />
      <Route path ="/es*" element={<Spanish/>} />
    </Routes>
  );
}

export default App;
