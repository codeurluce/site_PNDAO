import { createContext, useContext, useState, useEffect } from 'react';
import { liturgicalThemes } from '../types/liturgical'; // Couleurs et noms des saisons
import { getCurrentLiturgicalSeason } from '../utils/liturgicalCalendar'; // Fonction qui calcule la saison actuelle

// Création du contexte sans valeur par défaut (undefined)
const LiturgicalContext = createContext(undefined);

export function LiturgicalProvider({ children }) {
  // État pour stocker la saison actuelle (par défaut 'ordinary' = Temps Ordinaire)
  const [currentSeason, setCurrentSeason] = useState('ordinary');

  // État pour stocker la saison manuelle sélectionnée (null = pas de sélection manuelle)
  const [manualSeason, setManualSeason] = useState(null);

  // Booléen qui indique si on est en mode manuel ou non
  const [isManualMode, setIsManualMode] = useState(false);

  useEffect(() => {
    // Au chargement, récupérer la saison liturgique actuelle automatiquement
    const season = getCurrentLiturgicalSeason();
    setCurrentSeason(season);

    // Calculer le temps en millisecondes jusqu'à minuit
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0); // minuit prochain
    const msUntilMidnight = midnight.getTime() - new Date().getTime();

    // Programmer un timeout qui va se déclencher à minuit
    const initialTimeout = setTimeout(() => {
      // À minuit, mettre à jour la saison
      setCurrentSeason(getCurrentLiturgicalSeason());

      // Puis programmer un intervalle qui met à jour la saison tous les 24h (chaque minuit suivant)
      const dailyInterval = setInterval(() => {
        setCurrentSeason(getCurrentLiturgicalSeason());
      }, 24 * 60 * 60 * 1000); // 24 heures en ms

      // Nettoyer l'intervalle si le timeout est annulé
      return () => clearInterval(dailyInterval);
    }, msUntilMidnight);

    // Nettoyage du timeout si le composant est démonté avant minuit
    return () => clearTimeout(initialTimeout);
  }, []);

  useEffect(() => {
    // Quand manualSeason change, on passe en mode manuel et on applique la saison choisie
    if (manualSeason) {
      setIsManualMode(true);
      setCurrentSeason(manualSeason);
    } else {
      // Sinon on revient au mode automatique et on recalcule la saison
      setIsManualMode(false);
      setCurrentSeason(getCurrentLiturgicalSeason());
    }
  }, [manualSeason]);

  // Fonction pour changer la saison manuellement depuis l'extérieur (ex: composant UI)
  const handleSetManualSeason = (season) => {
    setManualSeason(season);
  };

  // Valeurs fournies dans le contexte, accessibles par les composants enfants
  const value = {
    currentSeason, // Saison courante (automatique ou manuelle)
    theme: liturgicalThemes[currentSeason], // Couleur et nom du thème selon la saison
    setManualSeason: handleSetManualSeason, // Fonction pour changer la saison manuellement
    isManualMode, // Indicateur de mode manuel ou automatique
  };

  return (
    <LiturgicalContext.Provider value={value}>
      {children}
    </LiturgicalContext.Provider>
  );
}

// Hook personnalisé pour accéder facilement au contexte depuis les composants
export function useLiturgical() {
  const context = useContext(LiturgicalContext);
  if (context === undefined) {
    throw new Error('useLiturgical doit être utilisé dans un LiturgicalProvider');
  }
  return context;
}

// Ce context gère la saison liturgique affichée dans l’app (via currentSeason).
// Par défaut, il calcule la saison automatiquement selon la date grâce à getCurrentLiturgicalSeason().
// Il met à jour la saison chaque jour à minuit automatiquement.
// Il permet de passer en mode manuel pour forcer une saison spécifique.
// Il fournit via useLiturgical les infos de saison, thème, mode, et fonction pour changer la saison.
// Utilisé par exemple dans le composant SeasonIndicator pour afficher et modifier la saison.