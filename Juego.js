import { Tablero } from "./Tablero";
import { ListaPalabras } from "./ListaPalabras";
import { eTipoSopa } from "./tipos";



export class Juego {

    #tablero;
    #listaPalabras;
    #marcador;

    /**
     * 
     * @param {Number} dimensionX 
     * @param {Number} dimensionY 
     * @param {eTipoSopa} tipo 
     * @param {Number} numeroPalabras 
     * @param {Number} horizontales 
     * @param {Number} verticales 
     */
    constructor( dimensionX, dimensionY, tipo, numeroPalabras, horizontales, verticales ) {

        this.#listaPalabras = new ListaPalabras( tipo );      
        this.#listaPalabras = this.#listaPalabras.generarLista( numeroPalabras );

        this.#tablero = new Tablero( dimensionX, dimensionY, tipo );
        this.#tablero = this.#tablero.ubicarListaPalabras( this.#listaPalabras, horizontales, verticales );

    }



    /**
     * Dibuja el juego en pantalla dentro de los elementos DIV indicados
     * @param {HTMLDivElement} elementLista 
     * @param {HTMLDivElement} elementTablero 
     * @returns {HTMLDivElement}
     */
    dibujarJuego( elementLista, elementTablero ) {

        elementLista = this.#listaPalabras.dibujarLista( elementLista );
        elementTablero = this.#tablero.dibujarTablero( elementTablero );

    }

}