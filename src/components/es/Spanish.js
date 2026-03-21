// libraries
import { Routes, Route } from 'react-router-dom';

// components
import Header from './Header';
import Mainpage from './Mainpage';
import About from './About';
import Footer from './Footer';

function Spanish () {
    return (
        <div id='page'>
            <Header />
                <Routes>
                    <Route index element={<Mainpage />} />
                    <Route path='about' element={<About />} />
                    <Route path='*' element={<Mainpage />} />
                </Routes>
            <Footer />
        </div>
    )
}

export default Spanish