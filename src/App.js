// libraries
import { Routes, Route } from 'react-router-dom';

// components
import Header from './components/Header';
import Mainpage from './components/Mainpage';
import About from './components/About';
import Footer from './components/Footer';

// styles

import './App.css';


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
