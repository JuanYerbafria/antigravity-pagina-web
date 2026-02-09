import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Services from './pages/Services';
import Branches from './pages/Branches';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Vacancies from './pages/Vacancies';
import VacancyDetail from './pages/VacancyDetail';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
    <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
    <p className="text-xl text-gray-600 mb-8">Página no encontrada</p>
    <a href="/" className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors">
      Volver al Inicio
    </a>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos/:category?" element={<Products />} />
          <Route path="/productos/:id" element={<ProductDetail />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/sucursales" element={<Branches />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/unete-al-equipo" element={<Vacancies />} />
          <Route path="/unete-al-equipo/:id" element={<VacancyDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
