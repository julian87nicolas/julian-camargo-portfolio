// components
import Header from './Header';
import Mainpage from './Mainpage';
import About from './About';
import Footer from './Footer';
import LocalizedSiteLayout from './LocalizedSiteLayout';

function English () {
    return (
        <LocalizedSiteLayout
            HeaderComponent={Header}
            MainpageComponent={Mainpage}
            AboutComponent={About}
            FooterComponent={Footer}
        />
    )
}

export default English