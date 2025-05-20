import React, { createContext, useContext, useState, useEffect } from 'react';
import { liturgicalThemes } from '../types/liturgical';
import { getCurrentLiturgicalSeason } from '../utils/liturgicalCalendar';

const LiturgicalContext = createContext(undefined);

export function LiturgicalProvider({ children }) {
  const [currentSeason, setCurrentSeason] = useState('ordinary');
  const [manualSeason, setManualSeason] = useState(null);
  const [isManualMode, setIsManualMode] = useState(false);

  useEffect(() => {
    // Définir la saison liturgique actuelle au chargement initial
    const season = getCurrentLiturgicalSeason();
    setCurrentSeason(season);

    // Calcul du temps jusqu'à minuit
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const msUntilMidnight = midnight.getTime() - new Date().getTime();

    // Timeout initial jusqu'à minuit, puis intervalle quotidien
    const initialTimeout = setTimeout(() => {
      setCurrentSeason(getCurrentLiturgicalSeason());

      const dailyInterval = setInterval(() => {
        setCurrentSeason(getCurrentLiturgicalSeason());
      }, 24 * 60 * 60 * 1000);

      // Nettoyage de l'intervalle à la désactivation du timeout
      return () => clearInterval(dailyInterval);
    }, msUntilMidnight);

    return () => clearTimeout(initialTimeout);
  }, []);

  useEffect(() => {
    if (manualSeason) {
      setIsManualMode(true);
      setCurrentSeason(manualSeason);
    } else {
      setIsManualMode(false);
      setCurrentSeason(getCurrentLiturgicalSeason());
    }
  }, [manualSeason]);

  const handleSetManualSeason = (season) => {
    setManualSeason(season);
  };

  const value = {
    currentSeason,
    theme: liturgicalThemes[currentSeason],
    setManualSeason: handleSetManualSeason,
    isManualMode,
  };

  return (
    <LiturgicalContext.Provider value={value}>
      {children}
    </LiturgicalContext.Provider>
  );
}

export function useLiturgical() {
  const context = useContext(LiturgicalContext);
  if (context === undefined) {
    throw new Error('useLiturgical must be used within a LiturgicalProvider');
  }
  return context;
}
