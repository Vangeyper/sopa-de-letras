import { eTipoSopa } from "./tipos";
import { nuevasPalabras, aleatorio } from "./utiles";


export class ListaPalabras {

    #lista;
    #marcadas;
    #tipo;


    /**
     * Crea la lista de palabras según el tipo y número
     * @param {eTipoSopa} tipo de tablero: numero, letras, mixto
     */
    constructor ( tipo ) {

        this.#lista = [];
        this.#marcadas = [];
        this.#tipo = tipo;

    }


    get numeroPalabras() {

        return this.#lista.length;

    }


    /**
     * Obtiene el elemento de la lista por su indice
     * @param {Number} posicion 
     * @returns {String} elemento de la lista
     */
    obtenerElementoPorPosicion( posicion ) {

        console.log(`obtenerElementoPorPosicion(${posicion})`);
        console.log('de lista: ' + this.#lista);
        console.log('this.#lista.length: ' + this.#lista.length);
        if( this.#lista.length >= posicion ) {
            console.log('ELEMENTO : this.#lista[posicion]: ' + this.#lista[posicion]);
            return this.#lista[posicion];
        }
        return undefined

    }


    /**
     * Añade una nueva palabra a la lista de palabras
     * @param {String} palabra 
     * @returns {ListaPalabras} nueva lista
     */
    #addPalabra( palabra ) {

        this.#lista.push ( palabra );

    }
    

    /**
     * Borrar una palabra a la lista de palabras
     * @param {String} palabra 
     * @returns {ListaPalabras} nueva lista
     */
    #removePalabra( palabra ) {

        this.#lista = this.#lista.filter ( element => element != palabra );

    }


    /**
     * Marcar una palabra de la lista de palabras
     * @param {String} palabra 
     * @returns {ListaPalabras} nueva lista
     */
    marcarPalabra ( palabra ) {

        this.#marcadas.push( palabra );

    }


    /**
     * Marcar una palabra de la lista de palabras
     * @param {String} palabra 
     * @returns {ListaPalabras} nueva lista
     */
    desmarcarPalabra ( palabra ) {

        this.#marcadas = this.#marcadas.filter( element => element != palabra );

    }


    /**
     * Valida si una palabra existe en nuestra lista y no está marcada
     * @param {String} palabra 
     * @returns {boolean} indica si existe la palabra dentro de nuestra lista y no está marcada
     */
    validarPalabra ( palabra ) {

        const misPalabras = this.#lista.filter( element => element == palabra );
        if ( !misPalabras ) return false;

        const misPalabrasMarcadas = this.#marcadas.filter( element => element == palabra );
        if ( !misPalabrasMarcadas ) return true;
        return false;

    }


    /**
     * Dibuja en un elemento html la lista de palabras
     * @param {HTMLDivElement} element 
     * @returns {HTMLDivElement} elemento refrescado
     */
    dibujarLista = ( element ) => {

        let html = '<table class="lista">';
        
        for (let i = 0; i < this.#lista.length; i++) {
            html = html + '<tr class="filaPalabras"><td class="columnaPalabras">' + this.#lista[i] + '</td></tr>';
        };

        html = html + '</table>';
        element.innerHTML = html;
               
        return element;
    
    }
  





    /**
     * Genera aleatoriamente la lista de palabras o números y la establece internamente en este objeto
     * @param {Number} numero número de elementos a generar
     * @param {Number} min número mínimo de la lista (solo para los tipos de sopas de números)
     * @param {Number} max número máximo de la lista (solo para los tipos de sopas de números)
     * @returns {ListaPalabras} lista de palabras buscada
     */
    generarLista = ( numero, min = 100000000, max = 999999999 ) => {
        
        console.log( 'generarLista()' );
        console.log( 'tipo: ' + this.#tipo );
        console.log( 'numero de palabras: ' + numero );
        this.#lista = [];
        this.#marcadas = [];
    
        for (let i = 1; i <= numero; i++) {
            if ( this.#tipo === eTipoSopa.NUMEROS ) {                
                const newNumero = aleatorio(min, max);
                console.log({newNumero, min, max});
                console.log('addPalabra: ' + newNumero);
                this.#addPalabra( newNumero );
                console.log('lista: ' + this.#lista);
            }
            // if ( this.#tipo === eTipoSopa.LETRAS ) {
            //     nuevasPalabras( numero ).then( listaPalabras => {
            //         console.log(listaPalabras);
            //         for ( let n = 0; n < numero; n++ ) {
            //             console.log( listaPalabras[n] );
            
            //             const newPalabra = new Palabra(listaPalabras[n], eTipo);
            //             this.#lista.#addPalabra( newPalabra );          
            //         };
            //     });                  
            //     break;      
            // }    
        }
    
        return this;
    
    }


}