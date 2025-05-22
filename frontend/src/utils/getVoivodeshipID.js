const wojewodztwa = [
  "dolnośląskie",
  "kujawsko-pomorskie",
  "lubelskie",
  "lubuskie",
  "łódzkie",
  "małopolskie",
  "mazowieckie",
  "opolskie",
  "podkarpackie",
  "podlaskie",
  "pomorskie",
  "śląskie",
  "świętokrzyskie",
  "warmińsko-mazurskie",
  "wielkopolskie",
  "zachodniopomorskie",
];

export function getVoivodeshipID(stateString) {
  const cleanedName = stateString.toLowerCase().replace(/^województwo\s+/, "");

  const index = wojewodztwa.findIndex((name) => name === cleanedName);
  return index !== -1 ? index + 1 : null;
}
