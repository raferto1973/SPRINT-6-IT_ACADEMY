
// models/service.ts

//Aquest fitxer conté el model Service, que representa cada servei amb el seu nom, preu i si està seleccionat o no.

export interface Service {

  id:           number;
  name:         string;
  description:  string;
  price:        number;
  selected:     boolean;

}
