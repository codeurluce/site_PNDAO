// Ce composant affiche un indicateur visuel de la saison liturgique actuelle avec un bouton 
// pour ouvrir un panneau permettant à l'utilisateur de sélectionner manuellement une autre 
// saison liturgique. Il utilise le contexte LiturgicalContext pour récupérer les informations 
// liées à la saison, le thème (couleurs), et un mode manuel/automatique.
// -----------------------------------------------------------------------------------------

import { useState, useRef, useEffect } from 'react';
import React from 'react';
import { Settings, X } from 'lucide-react'; // Icônes engrenage et croix
import classNames from 'classnames'; // Pour gérer dynamiquement les classes CSS
import { useLiturgical } from '../../contexts/LiturgicalContext';
import { liturgicalThemes } from '../../types/liturgical';
import { is } from 'date-fns/locale';


export function SeasonIndicator() {
  // Récupère le thème, la saison actuelle, la fonction de mise à jour de la saison manuelle et le mode manuel depuis LiturgicalContext.
  const { theme, currentSeason, setManualSeason, isManualMode } = useLiturgical();
  const [isOpen, setIsOpen] = useState(false);   // État local pour savoir si le panneau est ouvert ou non

  const panelRef = useRef(null); // Référence pour le panneau de sélection de saison
  const bubbleRef = useRef(null); // Référence pour la bulle indicateur de saison

  const toggleOpen = () => setIsOpen(!isOpen);   // Fonction pour ouvrir/fermer le panneau

  // Fonction pour fermer le panneau de sélection de saison si on clique en dehors de celui-ci
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target) && bubbleRef.current && !bubbleRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  
  return (
    <div className="fixed bottom-4 right-4 z-50"> {/* Bulle indicateur de saison, Position fixe en bas à droite */}

      {/* Bulle indicateur de saison : affiche le nom de la saison + icône paramètres */}
      <div
        className={classNames(
          "flex items-center gap-2 px-3 py-2 rounded-full shadow-md cursor-pointer",
          theme.bgColor, "text-white" // Couleur de fond dynamique selon la saison
        )}
        onClick={toggleOpen} // Ouvre le panneau de sélection de saison
      >
        <span className="text-sm font-medium">{theme.seasonName}</span> {/* Nom de la saison liturgique*/}
        <Settings size={16} /> {/* Icône paramètres */}
      </div>

      {/* Panneau de sélection du temps liturgiques*/}
      {isOpen && (
        <div className="absolute bottom-12 right-0 w-72 bg-white rounded-lg shadow-xl p-4 animate-fade-in">

          {/* En-tête du panneau avec titre et bouton X de fermeture */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800">Temps Liturgiques</h3>
            <button onClick={toggleOpen} className="text-gray-500 hover:text-gray-700">
              <X size={18} /> {/* Icône croix pour fermer le panneau */}
            </button>
          </div>

          {/* Bouton permettant de revenir au mode automatique si on est en mode manuel */}
          {isManualMode && (
            <div className="mb-4">
              <button
                onClick={() => setManualSeason(null)} // Remet la saison à automatique
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded"
              >
                Retour au mode automatique
              </button>
            </div>
          )}


          {/* Liste des saisons disponibles, sous forme de boutons colorés */}
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(liturgicalThemes).map((season) => (
              <button
                key={season}
                onClick={() => setManualSeason(season)} // Met à jour la saison manuelle
                className={classNames(
                  "flex flex-col items-center p-2 rounded-md text-white text-xs",
                  liturgicalThemes[season].bgColor, // Couleur de fond dynamique selon la saison
                  currentSeason === season && "ring-2 ring-offset-2 ring-gray-400" // Indicateur visuel de la saison sélectionnée
                )}
              >
                {liturgicalThemes[season].name} {/* Nom de la saison affiché*/}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Affiche un indicateur coloré du temps liturgique actuel (ex: Avent, Carême, Noël…)
// Permet d’ouvrir un panneau pour sélectionner manuellement une saison liturgique
// Gère un mode automatique (par défaut) et un mode manuel (sélection utilisateur)
// Utilise un contexte React pour gérer les données globales du thème et saison