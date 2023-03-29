import { eTipoSopa } from "./tipos";



class Palabra {
    
    // -------------------
    // PROPIEDADES
    // -------------------

    marcada = false; // creamos una propiedad con el modificar static para indicarle que es estática

    tipo = eTipoSopa.LETRAS;
    contenido = ''; // palabra concreta
    
    // -------------------
    // CONSTRUCTORES
    // -------------------

    constructor ( palabra = '', tipo = eTipoSopa.LETRAS ) {
        // incializamos las variables 
        this.contenido = palabra;
        this.tipo = tipo;
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


    // -------------------
    // Methods
    // -------------------
    
}


export {
    Palabra
}