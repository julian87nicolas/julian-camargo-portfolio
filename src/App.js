// libraries
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// components
import English from './components/English';
import Spanish from './components/es/Spanish';

// styles
import './components/styles/App.css';


function App() {
  const location = useLocation();

  useEffect(() => {
    const isSpanish = location.pathname.startsWith('/es');
    const title = isSpanish
      ? 'Julián Camargo | Portfolio de Backend'
      : 'Julián Camargo | Backend Developer Portfolio';
    const description = isSpanish
      ? 'Portfolio de Julián Camargo: proyectos, experiencia y contacto como desarrollador backend y de software/firmware.'
      : 'Julián Camargo portfolio: projects, experience and contact as a backend and software/firmware developer.';

    document.title = title;
    document.documentElement.lang = isSpanish ? 'es' : 'en';

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', description);
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/es/*" element={<Spanish/>} />
      <Route path="/*" element={<English/>} />
    </Routes>
  );
}

export default App;
