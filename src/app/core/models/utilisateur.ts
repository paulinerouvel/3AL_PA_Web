export class Utilisateur {

    constructor(
        public id: number,
        public libelle: string,
        public nom: string,
        public prenom: string,
        public mail: string,
        public tel: string,
        public adresse: string,
        public ville: string,
        public codePostal: string,
        public pseudo: string,
        public mdp: string,
        public photo: string,
        public desc: string,
        public tailleOrganisme: number,
        public estValide: number,
        public statut: string,
        public siret: string,
        public dateDeNaissance: string,
        public nbPointsSourire: number
    ){}
      
}

