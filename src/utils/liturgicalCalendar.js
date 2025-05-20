import { addDays, isWithinInterval, getYear } from 'date-fns';
import { liturgicalThemes } from '../types/Liturgical';

// Logique simplifiée du calendrier liturgique
// Dans une application réelle, cela serait plus complet
export function getCurrentLiturgicalSeason() {
  const today = new Date();
  const year = getYear(today);
  
// Calculer Pâques (version simplifiée : dans une application réelle, utiliser le calcul de Pâques approprié)
// Il s'agit d'une approximation de base qui devrait être remplacée par un algorithme approprié
  const easterDate = getEasterDate(year);
  
// Avent - 4 dimanches avant Noël
  const adventStart = new Date(year, 10, 27); // Approximatif - doit être calculé correctement
  const christmasEve = new Date(year, 11, 24);
  
// Noël - du 25 décembre à l'Épiphanie (6 janvier)
  const christmasDay = new Date(year, 11, 25);
  const epiphany = new Date(year + 1, 0, 6);
  
// Carême - 46 jours avant Pâques (du mercredi des Cendres à Pâques)
  const ashWednesday = addDays(easterDate, -46);
  const palmSunday = addDays(easterDate, -7);
  const holyThursday = addDays(easterDate, -3);
  const goodFriday = addDays(easterDate, -2);
  
// Pâques - Du dimanche de Pâques à la Pentecôte (50 jours après Pâques)
  const pentecost = addDays(easterDate, 49);
  
// Vérifiez d'abord les jours spéciaux
  if (isSameDay(today, palmSunday)) return 'palms';
  if (isSameDay(today, goodFriday)) return 'goodFriday';
  if (isSameDay(today, holyThursday)) return 'holyThursday';
  if (isSameDay(today, pentecost)) return 'pentecost';
  
// Vérifier les plages de dates pour les saisons liturgiques
  if (isWithinInterval(today, { start: adventStart, end: christmasEve })) return 'advent';
  if (isWithinInterval(today, { start: christmasDay, end: epiphany })) return 'christmas';
  if (isWithinInterval(today, { start: ashWednesday, end: addDays(easterDate, -1) })) return 'lent';
  if (isWithinInterval(today, { start: easterDate, end: addDays(pentecost, -1) })) return 'easter';
  
// Vérifiez les fêtes mariales (simplifiées - juste quelques exemples)
  const marianFeasts = [
    new Date(year, 0, 1),   // Mary, Mother of God
    new Date(year, 7, 15),  // Assumption
    new Date(year, 11, 8),  // Immaculate Conception
  ];
  
  if (marianFeasts.some(date => isSameDay(today, date))) return 'marian';
  
// Par défaut, heure ordinaire
  return 'ordinary';
}

// Fonction d'aide pour comparer des dates sans heure
function isSameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
}

// Calcul de Pâques simplifié (méthode de Gauss)
// Dans une application réelle, utiliser un algorithme plus précis
function getEasterDate(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  
  return new Date(year, month, day);
}
// cette fonction est utilisée pour calculer la date de Pâques selon l'algorithme de Gauss
// et renvoie la date de Pâques pour une année donnée.