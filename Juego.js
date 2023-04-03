import { Tablero } from "./Tablero";
import { ListaPalabras } from "./ListaPalabras";



export class Juego {

    #tablero;
    #listaPalabras;
    #marcador;

    constructor( dimensionX, dimensionY, tipo, numeroPalabras ) {

        this.#tablero = new Tablero( dimensionX, dimensionY, tipo );

        this.#listaPalabras = new ListaPalabras( tipo, 10 );       
        this.#tablero.

    }

}