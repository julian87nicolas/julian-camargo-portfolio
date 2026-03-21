import { Route, Routes } from 'react-router-dom';

function LocalizedSiteLayout({
  HeaderComponent,
  MainpageComponent,
  AboutComponent,
  FooterComponent,
  includeFallback = false
}) {
  return (
    <div id='page'>
      <HeaderComponent />
      <div id='content'>
        <Routes>
          <Route index element={<MainpageComponent />} />
          <Route path='about' element={<AboutComponent />} />
          {includeFallback && <Route path='*' element={<MainpageComponent />} />}
        </Routes>
      </div>
      <FooterComponent />
    </div>
  );
}

export default LocalizedSiteLayout;