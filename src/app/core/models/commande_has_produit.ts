export class Commande_has_produit {

    constructor(
      public produit_id: number,
      public commande_id: number,
      public produit_CategorieProduit_id: number,
      public quantite: number

    ){}
      
}

