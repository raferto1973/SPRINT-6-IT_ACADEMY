
// Budget model


// Aquest model defineix l'estructura d'un pressupost.

export interface Budget {

  id:           number;
  clientName:   string;
  phone:        string;
  email:        string;
  serviceName:  string[];  // Array dels serveis pressupostats
  totalPrice:   number;

}
