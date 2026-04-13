// components
import Header from './Header';
import Mainpage from './Mainpage';
import LocalizedSiteLayout from './LocalizedSiteLayout';

function English () {
    return (
        <LocalizedSiteLayout
            HeaderComponent={Header}
            MainpageComponent={Mainpage}
        />
    )
}

export default English