import { eTipoSopa, eTipoDireccion } from "./tipos";
//import { Coordenada } from "./Coordenada";



class Palabra {
    
    // -------------------
    // PROPIEDADES
    // -------------------

    marcada = false; // creamos una propiedad con el modificar static para indicarle que es estática

    contenido = ''; // palabra concreta
    //ubicacionLetraInicial = new Coordenada( 0, 0 );    
    
    // -------------------
    // CONSTRUCTORES
    // -------------------

    constructor ( palabra = '' ) {
        // incializamos las variables 
        this.contenido = palabra;
        this.marcada = false;
    }   

    // -------------------
    // Setters y Getters
    // -------------------

    /**
     * @param {Boolean} value
     */
    set setMarcarDesmarcar( value ) {
        this.marcada = value;
    }

    /**
     * @returns {Boolean}
     */
    get getEstado(){
        return this.marcada;
    }

    /**
     * @returns {String}
     */
    get getPalabra(){
        return this.contenido;
    }


    /**
     * @returns {Number}
     */
    get getLongitud(){
        if (!this.contenido) return 0;
        return this.contenido.length;
    }

    // -------------------
    // Methods
    // -------------------
    
    // /**
    //  * Indica la ubicación de la palabra en unas coordenadas de tablero
    //  * @param {Number} xInicial 
    //  * @param {Number} yInicial 
    //  * @param {eTipoDireccion} direccion 
    //  */
    // ubicar ( xInicial, yInicial, direccion ) {
    //     this.ubicacionLetraInicial = new Coordenada( xInicial, yInicial );
    //     this.direccionPalabra = direccion;
    // }

    /** obtiene la letra especificada en la posicion indicada, empezando por la posicion 0
     * @param {Number} posicion 
     * @returns {String}
     */
    getLetra( posicion ){
        if (!this.contenido) return '';
        return this.contenido[posicion];
    }    
    

}


export {
    Palabra
}