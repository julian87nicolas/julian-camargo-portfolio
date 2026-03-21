import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

function LocalizedSiteLayout({
  HeaderComponent,
  MainpageComponent,
  AboutComponent,
  FooterComponent,
  includeFallback = false
}) {
  const [theme, setTheme] = useState('dark');
  const [isThemeFlowActive, setIsThemeFlowActive] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
      return;
    }

    const supportsMatchMedia = typeof window.matchMedia === 'function';
    const prefersLight = supportsMatchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    setTheme(prefersLight ? 'light' : 'dark');
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setIsThemeFlowActive(true);
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));

    window.setTimeout(() => {
      setIsThemeFlowActive(false);
    }, 900);
  };

  return (
    <div id='page'>
      <div className={`theme-flow-rtl${isThemeFlowActive ? ' is-active' : ''}`} aria-hidden='true'></div>
      <HeaderComponent theme={theme} onToggleTheme={toggleTheme} />
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