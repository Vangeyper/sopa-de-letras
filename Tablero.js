import { eTipoSopa, eTipoDireccion } from "./tipos";
import { Palabra } from "./Palabra";
import { Coordenada } from "./Coordenada";
import { ListaPalabras } from './ListaPalabras';

const RELLENO = '-';

export class Tablero {


    #dimensionX;
    #dimensionY;
    #tipologia;
    #valores;
    
    /**
     * Crea un tablero con las dimensiones especificadas y el tipo
     * @param {Number} dimX 
     * @param {Number} dimY 
     * @param {eTipoSopa} tipo 
     */
    constructor ( dimX, dimY, tipo ) {
        this.#dimensionX = dimX;
        this.#dimensionY = dimY;
        this.#tipologia = tipo;  
        this.inicializarTablero();
    }


    inicializarTablero( valor = RELLENO ) {

        this.#valores = [];
        for( let x = 0; x < this.#dimensionX; x++ ) {
            for ( let y = 0; y < this.#dimensionY; y++ ) {
                this.#valores.push( valor );
            }
        }

    }



    /**
     * Devolverá cierto si dada la palabra indicada y la dirección podemos poner la misma en la coordenada x,y sin colisionar con las palabras ya situadas
     * @param {String} palabra 
     * @param {eTipoDireccion} direccion 
     * @param {Number} posX 
     * @param {Number} posY 
     * @returns {Boolean} indica true si se puede situar dicha palabra en esa coordenada del tablero
     */
    esPosibleUbicarla( palabra, direccion, posX, posY ) {

        let i=0;
        let isPosible = false;
        switch ( direccion ) {
            case eTipoDireccion.HORIZONTAL_DER:
                do {
                    const letra = palabra[i];
                    isPosible = (this.#valores[x+i,y] === RELLENO) || (this.#valores[x+i,y] === letra);
                    i++;
                } while( i<palabra.length && isPosible )
                break;
            case eTipoDireccion.HORIZONTAL_IZQ:
                do {
                    const letra = palabra[i];
                    isPosible = (this.#valores[x-i,y] === RELLENO) || (this.#valores[x-i,y] === letra);
                    i++;
                } while( i<palabra.length && isPosible )
                break;
            case eTipoDireccion.VERTICAL_ABA:
                do {
                    const letra = palabra[i];
                    isPosible = (this.#valores[x,y+i] === RELLENO) || (this.#valores[x,y+i] === letra);
                    i++;
                } while( i<palabra.length && isPosible )
                break; 
            case eTipoDireccion.VERTICAL_ARR:
                do {
                    const letra = palabra[i];
                    isPosible = (this.#valores[x,y-i] === RELLENO) || (this.#valores[x,y-i] === letra);
                    i++;
                } while( i<palabra.length && isPosible )
                break;
            case eTipoDireccion.DIAGONAL_DERABA:
                break;
            case eTipoDireccion.DIAGONAL_DERARR:
                break; 
            case eTipoDireccion.DIAGONAL_IZQABA:
                break;
            case eTipoDireccion.DIAGONAL_IZQARR:
                break;
        }

        return isPosible;

    }


    /**
     * Valida y obtiene las opciones posibles para ubicar la palabra indicada en el tablero formado por (xInicio, yInicio), (xFinal, yFinal)
     * @param {String} palabra 
     * @param {eTipoDireccion} direccion 
     * @param {Number} xInicio 
     * @param {Number} yInicio 
     * @param {Number} xFinal 
     * @param {Number} yFinal
     * @returns {Array<Coordenada>} unas coordenadas 
     */
    opcionesParaUbicarPalabra( palabra, direccion, xInicio, yInicio, xFinal, yFinal ) {

        let listaOpciones = [];

        for( let y=yInicio; y<=yFinal; y++ ) {
            for( let x=xInicio; x<=xFinal; x++ ) {
                if( esPosibleUbicarla( palabra, x, y ) ) {
                    const miCoordenada = new Coordenada( x, y );
                    listaOpciones.push( miCoordenada );
                }
            }
        }
        
        return listaOpciones;

    }


    /**
     * Situa cada palabra según la dirección indicada en el array de valores del tablero. 
     * @param {String} palabra 
     * @param {eTipoDireccion} direccion
     * @param {Coordenada} miCoordenada 
     */
    addLetrasPalabra( palabra, direccion, miCoordenada ) {

        const indicePrimeraLetra = (this.#dimensionX * miCoordenada.getY) + miCoordenada.getX;
        
        switch ( direccion ) {
            case eTipoDireccion.HORIZONTAL_DER:
                // añadimos por la derecha en la matriz, misma fila, incrementos de X
                for (let i=0; i<palabra.length; i++) {
                    this.#valores[indicePrimeraLetra + i] = palabra[i];
                }
                break;
            case eTipoDireccion.HORIZONTAL_IZQ:
                // añadimos por la izquierda en la matriz, misma fila, decrementos de X
                for (let i=0; i<palabra.length; i++) {
                    this.#valores[indicePrimeraLetra - i] = palabra[i];
                }
                break;
            case eTipoDireccion.VERTICAL_ABA:
                // añadimos por debajo en la matriz, misma columna, incrementos de Y
                for (let i=0; i<palabra.length; i++) {
                    this.#valores[indicePrimeraLetra + (i*this.#dimensionX)] = palabra[i];
                }
                break; 
            case eTipoDireccion.VERTICAL_ARR:
                // añadimos por encima en la matriz, misma columna, decrementos de Y
                for (let i=0; i<palabra.length; i++) {
                    this.#valores[indicePrimeraLetra + (i*this.#dimensionX)] = palabra[i];
                }
                break;
            case eTipoDireccion.DIAGONAL_DERABA:
                break;
            case eTipoDireccion.DIAGONAL_DERARR:
                break; 
            case eTipoDireccion.DIAGONAL_IZQABA:
                break;
            case eTipoDireccion.DIAGONAL_IZQARR:
                break;
        }

    }


    /**
     * Permite añadir una nueva palabra al tablero ubicándola de forma aleatoria y respetando las restricciones indicadas por direccion
     * @param {String} palabra a ubicar 
     * @param {eTipoDireccion} direccion 
     * @returns {Tablero} tablero con la nueva palabra ubicada según indicaciones
     */
    ubicarPalabra( palabra, direccion ) {

        const longitud = palabra.length;
        let coordenadasPosibles = [];

        switch ( direccion ) {
            case eTipoDireccion.HORIZONTAL_DER:
                // eliminamos las columnas por la derecha del tablero que no permitan ubicar la palabra por tamaño
                coordenadasPosibles = opcionesParaUbicarPalabra( palabra, direccion, 0, 0, this.#dimensionX - longitud + 1, this.#dimensionY );
                break;
            case eTipoDireccion.HORIZONTAL_IZQ:
                // eliminamos las columnas por la izquierda del tablero que no permitan ubicar la palabra por tamaño
                coordenadasPosibles = opcionesParaUbicarPalabra( palabra, longitud - 1, 0, this.#dimensionX, this.#dimensionY );
                break;
            case eTipoDireccion.VERTICAL_ABA:
                // eliminamos las columnas por debajo del tablero que no permitan ubicar la palabra por tamaño
                coordenadasPosibles = opcionesParaUbicarPalabra( palabra, 0, 0, this.#dimensionX, this.#dimensionY - longitud + 1 );
                break; 
            case eTipoDireccion.VERTICAL_ARR:
                // eliminamos las columnas por arriba del tablero que no permitan ubicar la palabra por tamaño
                coordenadasPosibles = opcionesParaUbicarPalabra( palabra, 0, longitud - 1, this.#dimensionX, this.#dimensionY );
                break;
            case eTipoDireccion.DIAGONAL_DERABA:
                // eliminamos las columnas por la derecha y por debajo del tablero que no permitan ubicar la palabra por tamaño
                coordenadasPosibles = opcionesParaUbicarPalabra( palabra, 0, 0, this.#dimensionX - longitud + 1, this.#dimensionY - longitud + 1 );
                break;
            case eTipoDireccion.DIAGONAL_DERARR:
                // eliminamos las columnas por la derecha y por arriba del tablero que no permitan ubicar la palabra por tamaño
                coordenadasPosibles = opcionesParaUbicarPalabra( palabra, 0, longitud - 1, this.#dimensionX - longitud + 1, this.#dimensionY );
                break; 
            case eTipoDireccion.DIAGONAL_IZQABA:
                // eliminamos las columnas por la izquierda y por debajo del tablero que no permitan ubicar la palabra por tamaño
                coordenadasPosibles = opcionesParaUbicarPalabra( palabra, longitud - 1, 0, this.#dimensionX, this.#dimensionY - longitud + 1 );
                break;
            case eTipoDireccion.DIAGONAL_IZQARR:
                // eliminamos las columnas por la izquierda y por arriba del tablero que no permitan ubicar la palabra por tamaño
                coordenadasPosibles = opcionesParaUbicarPalabra( palabra, longitud - 1, longitud - 1, this.#dimensionX, this.#dimensionY );
                break;
        }
        if ( coordenadasPosibles && coordenadasPosibles.length > 0 ) {
            const miIndice = aleatorio ( 0, coordenadasPosibles.length - 1 );
            const miCoordenada = coordenadasPosibles[miIndice]; 
                                   
            añadirPalabra( palabra, miCoordenada );
            ubicar( miCoordenada.getX, miCoordenada.getY, direccion );
        }  
        
        return this;
    }


    /**
    * Dibuja un tablero lleno de botones con las dimensiones especificadas en ancho x alto
    * @param {HTMLDivElement} element 
    * @returns {Array<Array<String>>} devuelve una matriz con los elementos del tablero, ya sean letras o números
    */
    dibujarTablero = ( element ) => {

        let html = "";
        let elementos = [];
            
        console.log('Dibujamos Tablero');
        console.log( this.#valores );
        html = `
        <table class="tablero">      
        `;
        for ( let y = 1; y < this.#dimensionY; y++ ) {
            html = html + '<tr class="filaTablero">';
            for( let x = 1; x < this.#dimensionX; x++ ) {                    
                console.log( '(x,y) = ' + this.#valores[x, y] );
                let valor = this.#valores[x, y];
                html = html + `
                    <td class="columnaTablero">
                        <div id="elem${x}_${y}" class="casilla">
                        <span class="botonCasilla">${valor}</span>
                        </div>
                    </td>
                    `;
                elementos[x,y] = valor;
            }
            html = html + '</tr>';
        }
        html = html + '</table>';
    
        element.innerHTML = html;
        return elementos;
    }
  

}