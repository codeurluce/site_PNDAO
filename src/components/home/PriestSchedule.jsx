import React from 'react';
import { useLiturgical } from '../../contexts/LiturgicalContext';
import { Clock, Calendar } from 'lucide-react';
import classNames from 'classnames';


// Sample priest schedule data
const priestSchedule = [
  {
    id: 1,
    name: "Abbé Gabriel G. Diouf",
    role: "Curé 🌟",
    availability: [
      { day: "Lundi", hours: "9h00 - 12h00" },
      { day: "Mercredi", hours: "14h00 - 17h00" },
      { day: "Vendredi", hours: "9h00 - 12h00" }
    ],
    image: "../../public/pretres/Abbegabriel2.jpg" 
  },
  {
    id: 2,
    name: "Abbé Louis Paul W. Ndiaye",
    role: "Vicaire",
    availability: [
      { day: "Mardi", hours: "9h00 - 12h00" },
      { day: "Jeudi", hours: "14h00 - 17h00" },
      { day: "Samedi", hours: "9h00 - 12h00" }
    ],
    image: "../../public/pretres/AbbelouisPaul.jpg"
  },{
    id: 3,
    name: "Abbé Augustin Sambou",
    role: "Etudiant-Residant",
    availability: [ ],
    image: "../../public/pretres/AbbeAugustin.jpg"
  },
  {
    id: 4,
    name: "Abbé Victor D. Faye",
    role: "Etudiant-Residant",
    availability: [ ],
    image: "../../public/pretres/Abbédiomaye.jpg" 
  }
];

export function PriestSchedule() {
  const { theme } = useLiturgical();

  return (
    <section id="horaires" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête inchangé */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <Calendar size={28} className={theme.textColor} />
          <h2 className="text-3xl font-bold text-center">
            Permanence des prêtres
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-2">
          {priestSchedule.map((priest) => (

            <div
              key={priest.id}
              // className="bg-gray-50 rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row relative group"
              className="relative group w-full max-w-md h-80 bg-white rounded-xl shadow-lg overflow-hidden flex">

              {/* Conteneur image avec effet déploiement */}
              <div
                className="
      relative
      w-1/2 h-full
      transition-all duration-500 ease-in-out
      group-hover:absolute group-hover:inset-0 group-hover:w-full group-hover:z-20
    "
                style={{ transitionProperty: 'all' }}
              >
                <img
                  src={priest.image}
                  alt={priest.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                  style={{ transformOrigin: 'left center' }}
                />
              </div>

              {/* Contenu texte */}
              <div
                className="
      w-full md:w-3/3
      p-6 text-xs
      transition-opacity duration-500 ease-in-out
      md:group-hover:opacity-0
      md:group-hover:pointer-events-none
      relative z-20
    "
              >
                <h3 className="text-xl font-semibold mb-2">{priest.name}</h3>
                <p className={classNames("text-sm mb-2", theme.textColor)}>{priest.role}</p>

                <div className="space-y-3">
                  {priest.availability.map((slot, index) => (
                    <div key={index} className="flex items-start">
                      <Clock size={15} className="mt-0.5 text-gray-500 mr-2" />
                      <div>
                        <span className="font-medium">{slot.day}:</span>
                        <span className="ml-1 text-gray-600">{slot.hours}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-gray-100 rounded-lg p-6 max-w-3xl mx-auto">
          <h3 className="text-lg font-semibold mb-4">Horaires des messes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">En semaine</h4>
              <ul className="space-y-2 text-gray-700">
                <li>Lundi - Vendredi: 6h30</li>
                <li>Mercredi: 18h30</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Week-end</h4>
              <ul className="space-y-2 text-gray-700">
                <li>Samedi: 18h30 (Messe anticipée)</li>
                <li>Dimanche: 8h00 et 10h30</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
