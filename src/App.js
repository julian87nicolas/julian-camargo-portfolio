// libraries
import { Routes, Route } from 'react-router-dom';

// components
import Header from './components/Header';
import Mainpage from './components/Mainpage';
import About from './components/About';
import Footer from './components/Footer';

// styles
import './components/styles/App.css';


function App() {


  return (
    <div id='page'>
      <Header />
      <div id='content'>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
