
// Budget model


// Aquest model defineix l'estructura d'un pressupost. Un pressupost té els següents camps
export interface Budget {

  id:           number;
  clientName:   string;
  phone:        string;
  email:        string;
  serviceName:  string[];
  totalPrice:   number;

}
