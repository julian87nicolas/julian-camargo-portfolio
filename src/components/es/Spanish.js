// components
import Header from './Header';
import Mainpage from './Mainpage';
import LocalizedSiteLayout from '../LocalizedSiteLayout';

function Spanish () {
    return (
        <LocalizedSiteLayout
            HeaderComponent={Header}
            MainpageComponent={Mainpage}
        />
    )
}

export default Spanish