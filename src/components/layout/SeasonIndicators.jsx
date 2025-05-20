// Ce composant affiche un indicateur visuel de la saison liturgique actuelle avec un bouton 
// pour ouvrir un panneau permettant à l'utilisateur de sélectionner manuellement une autre 
// saison liturgique. Il utilise un contexte LiturgicalContext pour récupérer les informations 
// liées à la saison, le thème (couleurs), et un mode manuel/automatique.
// -----------------------------------------------------------------------------------------

import { useState } from 'react';
import { useLiturgical } from '../../contexts/LiturgicalContext';
import { Settings, X } from 'lucide-react';
import { liturgicalThemes } from '../../types/Liturgical';
import classNames from 'classnames';

export function SeasonIndicator() {
  const { theme, currentSeason, setManualSeason, isManualMode } = useLiturgical();
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleOpen = () => setIsOpen(!isOpen);
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Bulle indicateur de saison */}
      <div 
        className={classNames(
          "flex items-center gap-2 px-3 py-2 rounded-full shadow-md cursor-pointer",
          theme.bgColor, "text-white"
        )}
        onClick={toggleOpen}
      >
        <span className="text-sm font-medium">{theme.seasonName}</span>
        <Settings size={16} />
      </div>
      
      {/* Panneau de sélection */}
      {isOpen && (
        <div className="absolute bottom-12 right-0 w-72 bg-white rounded-lg shadow-xl p-4 animate-fade-in">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800">Temps Liturgiques</h3>
            <button onClick={toggleOpen} className="text-gray-500 hover:text-gray-700">
              <X size={18} />
            </button>
          </div>
          
          {isManualMode && (
            <div className="mb-4">
              <button 
                onClick={() => setManualSeason(null)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded"
              >
                Retour au mode automatique
              </button>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(liturgicalThemes).map((season) => (
              <button
                key={season}
                onClick={() => setManualSeason(season)}
                className={classNames(
                  "flex flex-col items-center p-2 rounded-md text-white text-xs",
                  liturgicalThemes[season].bgColor,
                  currentSeason === season && "ring-2 ring-offset-2 ring-gray-400"
                )}
              >
                {liturgicalThemes[season].name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
