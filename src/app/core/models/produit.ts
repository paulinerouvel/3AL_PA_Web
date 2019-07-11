export class Produit {

    constructor(
        public id: number,
        public libelle: string,
        public desc: string,
        public photo: string,
        public prix: number,
        public prixInitial: number,
        public quantite : number,
        public DLC: string,
        public codeBarre: string,
        public enRayon: number,
        public dateMiseEnRayon: string,
        public categorieProduit_id: number,
        public listProduct_id: number,
        public entrepotwm_id: number,
        public destinataire: number
    ){}
      
}


