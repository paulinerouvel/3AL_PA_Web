import { Entrepot } from './entrepot';

export class Commande {

  constructor(
    public id: number,
    public date: string,
    public utilisateur_id: number,
    public adresse_livraison : string,
    public ville_livraison : string,
    public cp_livraison : string,
    public entrepot : Entrepot

  ) { }

}