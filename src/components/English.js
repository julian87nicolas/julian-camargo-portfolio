// libraries
import { Routes, Route } from 'react-router-dom';

// components
import Header from './Header';
import Mainpage from './Mainpage';
import About from './About';
import Footer from './Footer';

function English () {
    return (
        <div id='page'>
            <Header />
            <div id='content'>
                <Routes>
                    <Route path='/' element={<Mainpage />} />
                    <Route path='/about' element={<About />} />
                </Routes>
            </div>
            <Footer />
        </div>
    )
}

export default English