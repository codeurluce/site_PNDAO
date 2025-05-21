import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LiturgicalProvider } from './contexts/LiturgicalContext';
import  Navbar  from './components/layout/Navbar.jsx'
// import { Footer } from './components/layout/Footer';
import { SeasonIndicator } from './components/layout/SeasonIndicators';
// import { HomePage } from './pages/HomePage';
// import { NotFoundPage } from './pages/NotFoundPage';
// import { PlaceholderPage } from './pages/PlaceholderPage';
import { Church, Users, Calendar, BookOpen, Heart, DollarSign } from 'lucide-react';

function App() {
  return (
    <LiturgicalProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          {/* <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/entities" element={
                <PlaceholderPage 
                  title="Entités et CEB" 
                  description="Explorez les différents groupes et communautés ecclésiales de base de notre paroisse"
                  icon={<Users size={24} />}
                />
              } />
              <Route path="/mass-request" element={
                <PlaceholderPage 
                  title="Demande de messes" 
                  description="Formulaire pour demander une intention de messe"
                  icon={<Church size={24} />}
                />
              } />
              <Route path="/agenda" element={
                <PlaceholderPage 
                  title="Agenda Paroissial" 
                  description="Calendrier des événements et activités de la paroisse"
                  icon={<Calendar size={24} />}
                />
              } />
              <Route path="/news" element={
                <PlaceholderPage 
                  title="Actualités" 
                  description="Suivez la vie et les actualités de notre paroisse"
                  icon={<BookOpen size={24} />}
                />
              } />
              <Route path="/donate" element={
                <PlaceholderPage 
                  title="Faire un don" 
                  description="Soutenez notre paroisse par votre générosité"
                  icon={<DollarSign size={24} />}
                />
              } />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main> */}
          {/* <Footer /> */}
          <SeasonIndicator />
        </div>
      </Router>
    </LiturgicalProvider>
  );
}

export default App;