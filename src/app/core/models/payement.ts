export class Payement {

    constructor(
        public montant: number,
        public titulaire: string,
        public adresse_facturation : string,
        public cp_facturation : string,
        public ville_facturation : string,
        public id_don : number,
        public id_commande : number,
        public numero : string,
        public cryptogramme : number
    ) { }

}
