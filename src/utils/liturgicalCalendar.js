import { addDays, isWithinInterval, getYear, subDays } from 'date-fns';

// Fonction principale pour déterminer la saison liturgique actuelle
export function getCurrentLiturgicalSeason(date = new Date()) {
  const today = date;
  const year = getYear(today);

  // --- CALCUL DES DATES CLÉS DU CALENDRIER LITURGIQUE ---

  // Pâques (calcul selon l'algorithme de Gauss)
  const easterDate = getEasterDate(year);

  // Carême : du mercredi des Cendres à la veille de Pâques (samedi de Pâques)
  const ashWednesday = subDays(easterDate, 46);
  const laetareSunday = subDays(easterDate, 21); // 4em dimanche de Carême (Laetare)
  const palmSunday = subDays(easterDate, 7);
  const holyThursday = subDays(easterDate, 3);
  const goodFriday = subDays(easterDate, 2);

  // Temps pascal : de Pâques au samedi veille de la Pentecôte
  const pentecostSunday = addDays(easterDate, 49);
  const pentecostMonday = addDays(easterDate, 50);
  const easterSeasonEnd = subDays(pentecostSunday, 1); // veille Pentecôte

  // Avent : commence 4 dimanches avant Noël
  const christmasDate = new Date(year, 11, 25);
  const adventStart = getAdventStart(christmasDate);
  const christmasEve = new Date(year, 11, 24);
  const gaudeteSunday = subDays(christmasDate, 14); // 3e dimanche de l’Avent (Gaudete)


  // Noël : du 25 décembre au 6 janvier
  const christmasDay = new Date(year, 11, 25);
  const epiphany = new Date(year + 1, 0, 6);

  // Fêtes mariales (exemples)
  const marianFeasts = [
    new Date(year, 0, 1),   // Sainte Marie Mère de Dieu
    new Date(year, 7, 15),  // Assomption
    new Date(year, 11, 8),  // Immaculée Conception
  ];

  // --- PRIORITÉ AUX FÊTES FIXES (DATES PRÉCISES) ---

  if (isSameDay(today, palmSunday)) return 'palms';
  if (isSameDay(today, holyThursday)) return 'holyThursday';
  if (isSameDay(today, goodFriday)) return 'goodFriday';
  if (isSameDay(today, easterDate)) return 'easter';
  if (isSameDay(today, pentecostSunday)) return 'pentecost';
  if (isSameDay(today, pentecostMonday)) return 'pentecost';
  if (isSameDay(today, ashWednesday)) return 'ashWednesday';
  if (isSameDay(today, laetareSunday)) return 'joySundayLent';
  if (isSameDay(today, gaudeteSunday)) return 'joySundayAdvent';

  if (marianFeasts.some(d => isSameDay(today, d))) return 'marian';

  // --- PÉRIODES LITURGIQUES ---

  if (isWithinInterval(today, { start: adventStart, end: christmasEve })) {
    return 'advent';
  }

  if (isWithinInterval(today, { start: christmasDay, end: epiphany })) {
    return 'christmas';
  }

  if (isWithinInterval(today, { start: addDays(ashWednesday, 1), end: subDays(easterDate, 1) })) {
    return 'lent';
  }

  if (isWithinInterval(today, { start: easterDate, end: easterSeasonEnd })) {
    return 'easter';
  }

  // --- PAR DÉFAUT, NOUS SOMMES EN TEMPS ORDINAIRE ---
  return 'ordinary';
}

// --- UTILITAIRES ---

/**
 * Compare deux dates sans tenir compte de l'heure.
 */
function isSameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear()
    && d1.getMonth() === d2.getMonth()
    && d1.getDate() === d2.getDate();
}

/**
 * Calcul de la date de Pâques pour une année donnée.
 * Algorithme de Gauss (simplifié, fiable pour les dates modernes).
 */
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

/**
 * Calcul du début de l’Avent : le 4e dimanche avant Noël.
 * Il s'agit du dimanche qui tombe entre le 27 novembre et le 3 décembre.
 */
function getAdventStart(christmasDate) {
  const advent = new Date(christmasDate);
  advent.setDate(advent.getDate() - 21); // soustraction de 3 semaines
  advent.setDate(advent.getDate() - advent.getDay()); // aller au dimanche précédent
  return advent;
}

// -------------------------------------------------------------------------------------------------
// import { addDays, isWithinInterval, getYear } from 'date-fns';
// import { liturgicalThemes } from '../types/Liturgical';

// // Logique simplifiée du calendrier liturgique
// // Dans une application réelle, cela serait plus complet
// export function getCurrentLiturgicalSeason() {
//   const today = new Date();
//   const year = getYear(today);
  
// // Calculer Pâques (version simplifiée : dans une application réelle, utiliser le calcul de Pâques approprié)
// // Il s'agit d'une approximation de base qui devrait être remplacée par un algorithme approprié
//   const easterDate = getEasterDate(year);
  
// // Avent - 4 dimanches avant Noël
//   const adventStart = new Date(year, 10, 27); // Approximatif - doit être calculé correctement
//   const christmasEve = new Date(year, 11, 24);
  
// // Noël - du 25 décembre à l'Épiphanie (6 janvier)
//   const christmasDay = new Date(year, 11, 25);
//   const epiphany = new Date(year + 1, 0, 6);
  
// // Carême - 46 jours avant Pâques (du mercredi des Cendres à Pâques)
//   const ashWednesday = addDays(easterDate, -46);
//   const palmSunday = addDays(easterDate, -7);
//   const holyThursday = addDays(easterDate, -3);
//   const goodFriday = addDays(easterDate, -2);
  
// // Pâques - Du dimanche de Pâques à la Pentecôte (50 jours après Pâques)
//   const pentecost = addDays(easterDate, 49);

// //  lundi de Pentecôte - 50 jours après Pâques
// const pentecostMonday = addDays(pentecost, 1);
// if (isSameDay(today, pentecostMonday)) return 'pentecost';

  
// // Vérifiez d'abord les jours spéciaux
//   if (isSameDay(today, palmSunday)) return 'palms';
//   if (isSameDay(today, goodFriday)) return 'goodFriday';
//   if (isSameDay(today, holyThursday)) return 'holyThursday';
//   if (isSameDay(today, pentecost)) return 'pentecost';
  
// // Vérifier les plages de dates pour les saisons liturgiques
//   if (isWithinInterval(today, { start: adventStart, end: christmasEve })) return 'advent';
//   if (isWithinInterval(today, { start: christmasDay, end: epiphany })) return 'christmas';
//   if (isWithinInterval(today, { start: ashWednesday, end: addDays(easterDate, -1) })) return 'lent';
//   if (isWithinInterval(today, { start: easterDate, end: addDays(pentecost, -1) })) return 'easter';
  
// // Vérifiez les fêtes mariales (simplifiées - juste quelques exemples)
//   const marianFeasts = [
//     new Date(year, 0, 1),   // Mary, Mother of God
//     new Date(year, 7, 15),  // Assumption
//     new Date(year, 11, 8),  // Immaculate Conception
//   ];
  
//   if (marianFeasts.some(date => isSameDay(today, date))) return 'marian';
  
// // Par défaut, heure ordinaire
//   return 'ordinary';
// }

// // Fonction d'aide pour comparer des dates sans heure
// function isSameDay(date1, date2) {
//   return date1.getFullYear() === date2.getFullYear() &&
//          date1.getMonth() === date2.getMonth() &&
//          date1.getDate() === date2.getDate();
// }

// // Calcul de Pâques simplifié (méthode de Gauss)
// // Dans une application réelle, utiliser un algorithme plus précis
// function getEasterDate(year) {
//   const a = year % 19;
//   const b = Math.floor(year / 100);
//   const c = year % 100;
//   const d = Math.floor(b / 4);
//   const e = b % 4;
//   const f = Math.floor((b + 8) / 25);
//   const g = Math.floor((b - f + 1) / 3);
//   const h = (19 * a + b - d - g + 15) % 30;
//   const i = Math.floor(c / 4);
//   const k = c % 4;
//   const l = (32 + 2 * e + 2 * i - h - k) % 7;
//   const m = Math.floor((a + 11 * h + 22 * l) / 451);
//   const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
//   const day = ((h + l - 7 * m + 114) % 31) + 1;
  
//   return new Date(year, month, day);
// }
// // cette fonction est utilisée pour calculer la date de Pâques selon l'algorithme de Gauss
// // et renvoie la date de Pâques pour une année donnée.