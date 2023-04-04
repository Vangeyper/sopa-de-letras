import { eTipoSopa, eTipoDireccion } from "./tipos";
import { Coordenada } from "./Coordenada";
import { ListaPalabras } from './ListaPalabras';
import { aleatorio } from "./utiles";

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
     * @param {Number} x
     * @param {Number} y
     * @returns {Boolean} indica true si se puede situar dicha palabra en esa coordenada del tablero
     */
    #esPosibleUbicarla( palabra, direccion, x, y ) {

        //console.log(`----> esPosibleUbicarla( ${palabra}, ${direccion}, ${x}, ${y} )`);        
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
    #opcionesParaUbicarPalabra( palabra, direccion, xInicio, yInicio, xFinal, yFinal ) {

        let listaOpciones = [];

        console.log(`----> opcionesParaUbicarPalabra( ${palabra}, ${direccion}, ${xInicio}, ${yInicio}, ${xFinal}, ${yFinal} )`);        
        for( let y=yInicio; y<=yFinal; y++ ) {
            for( let x=xInicio; x<=xFinal; x++ ) {
                if( this.#esPosibleUbicarla( palabra, direccion, x, y ) ) {
                    const miCoordenada = new Coordenada( x, y );
                    //console.log(`Es posible en: ${x}, ${y}`);
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
    #addLetrasPalabra( palabra, direccion, miCoordenada ) {

        console.log(`----> addLetrasPalabra( ${palabra}, ${direccion}, ${miCoordenada.getX}, ${miCoordenada.getY} )`);
        const indicePrimeraLetra = (this.#dimensionX * miCoordenada.getY) + miCoordenada.getX;
        
        switch ( direccion ) {
            case eTipoDireccion.HORIZONTAL_DER:
                // añadimos por la derecha en la matriz, misma fila, incrementos de X
                for (let i=0; i<palabra.length; i++) {
                    this.#valores[indicePrimeraLetra + i] = palabra[i];
                    //this.#valores[miCoordenada.getX + i, miCoordenada.getY] = String(palabra[i]);
                    //console.log(`>>>>> ASIGNANDO VALOR >>>>>>>>>   this.#valores[${miCoordenada.getX + i}, ${miCoordenada.getY}] = ${palabra[i]}`);
                    console.log(`>>>>> ASIGNANDO VALOR >>>>>>>>>   this.#valores[${indicePrimeraLetra + i}] = ${palabra[i]}`);
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

        console.log('valores: ' + this.#valores);

    }



    /**
     * Permite añadir una nueva palabra al tablero ubicándola de forma aleatoria y respetando las restricciones indicadas por direccion
     * @param {String} palabra a ubicar 
     * @param {eTipoDireccion} direccion 
     * @returns {Tablero} tablero con la nueva palabra ubicada según indicaciones
     */
    #ubicarPalabra( palabra, direccion ) {

        console.log(`----> ubicarPalabra(${palabra}, ${direccion})`);
        const longitud = palabra.length;
        let coordenadasPosibles = [];

        switch ( direccion ) {
            case eTipoDireccion.HORIZONTAL_DER:
                // eliminamos las columnas por la derecha del tablero que no permitan ubicar la palabra por tamaño
                console.log(`${this.#dimensionX} - ${longitud}, ${this.#dimensionY} - ${1} = ${this.#dimensionX - longitud}, ${this.#dimensionY - 1}`);
                coordenadasPosibles = this.#opcionesParaUbicarPalabra( palabra, direccion, 0, 0, Number(this.#dimensionX - longitud), Number(this.#dimensionY - 1) );
                break;
            case eTipoDireccion.HORIZONTAL_IZQ:
                // eliminamos las columnas por la izquierda del tablero que no permitan ubicar la palabra por tamaño
                console.log(`${this.#dimensionX} - ${1}, ${this.#dimensionY} - ${1} = ${this.#dimensionX - 1}, ${this.#dimensionY - 1}`);
                coordenadasPosibles = this.#opcionesParaUbicarPalabra( palabra, direccion, longitud - 1, 0, Number(this.#dimensionX - 1), Number(this.#dimensionY - 1) );
                break;
            case eTipoDireccion.VERTICAL_ABA:
                // eliminamos las columnas por debajo del tablero que no permitan ubicar la palabra por tamaño
                console.log(`${this.#dimensionX} - ${1}, ${this.#dimensionY} - ${longitud} = ${this.#dimensionX - 1}, ${this.#dimensionY - longitud}`);
                coordenadasPosibles = this.#opcionesParaUbicarPalabra( palabra, direccion, 0, 0, Number(this.#dimensionX - 1), Number(this.#dimensionY - longitud) );
                break; 
            case eTipoDireccion.VERTICAL_ARR:
                // eliminamos las columnas por arriba del tablero que no permitan ubicar la palabra por tamaño
                console.log(`${this.#dimensionX} - ${1}, ${this.#dimensionY} - ${1} = ${this.#dimensionX - 1}, ${this.#dimensionY - 1}`);
                coordenadasPosibles = this.#opcionesParaUbicarPalabra( palabra, direccion, 0, longitud - 1, Number(this.#dimensionX - 1), Number(this.#dimensionY - 1) );
                break;
            case eTipoDireccion.DIAGONAL_DERABA:
                // eliminamos las columnas por la derecha y por debajo del tablero que no permitan ubicar la palabra por tamaño
                coordenadasPosibles = this.#opcionesParaUbicarPalabra( palabra, direccion, 0, 0, this.#dimensionX - longitud, this.#dimensionY - longitud );
                break;
            case eTipoDireccion.DIAGONAL_DERARR:
                // eliminamos las columnas por la derecha y por arriba del tablero que no permitan ubicar la palabra por tamaño
                coordenadasPosibles = this.#opcionesParaUbicarPalabra( palabra, direccion, 0, longitud - 1, this.#dimensionX - longitud, this.#dimensionY - 1 );
                break; 
            case eTipoDireccion.DIAGONAL_IZQABA:
                // eliminamos las columnas por la izquierda y por debajo del tablero que no permitan ubicar la palabra por tamaño
                coordenadasPosibles = this.#opcionesParaUbicarPalabra( palabra, direccion, longitud - 1, 0, this.#dimensionX - 1, this.#dimensionY - longitud );
                break;
            case eTipoDireccion.DIAGONAL_IZQARR:
                // eliminamos las columnas por la izquierda y por arriba del tablero que no permitan ubicar la palabra por tamaño
                coordenadasPosibles = this.#opcionesParaUbicarPalabra( palabra, direccion, longitud - 1, longitud - 1, this.#dimensionX - 1, this.#dimensionY - 1 );
                break;
        }
        console.log(' ------------ coordenadas -------------------- ');
        console.log({coordenadasPosibles});
        if ( coordenadasPosibles && coordenadasPosibles.length > 0 ) {
            const miIndice = aleatorio ( 0, coordenadasPosibles.length - 1 );            
            const miCoordenada = coordenadasPosibles[miIndice]; 
            // miCoordenada.setX( 1 );
            // miCoordenada.setY( 1 );            

            console.log('UBICAMOS EN : ' + {miIndice}, {miCoordenada})
                                   
            this.#addLetrasPalabra( String(palabra), direccion, miCoordenada );   

            const elementTablero = document.querySelector( '#tablero' );
            this.dibujarTablero( elementTablero );            
        }  
        
        return this;
    }


    /**
     * Ubica en el tablero la lista de palabras de forma que se cumplan las direcciones según las variables indicadas de cada tipo
     * Las diagonales serán el resto de palabras. Se aplicará una palabra en cada dirección, es decir una de derecha a izquierda y la siguente de izquierda a derecha.
     * Lo mismo para el sentido vertical: una de arriba hacia abajo y la siguiente de abajo para arriba.
     * @param {ListaPalabras} lista 
     * @param {Number} horizontales 
     * @param {Number} verticales 
     * @returns {Tablero} devuelve el nuevo tablero
     */
    ubicarListaPalabras( lista, horizontales, verticales ) {

        console.log(`----> ubicarListaPalabras(${lista}, ${horizontales}, ${verticales})`);

        // si no hay suficientes elementos no se ubican las palabras
        if( lista.longitud < (horizontales+verticales) ) return this;
        
        let direccion = eTipoDireccion.HORIZONTAL_DER;
        let j = 0;
        // horizontales
        for( let i=1; i<=horizontales; i++ ) {  
            console.log('POSICION: ' + j, lista.obtenerElementoPorPosicion( j ), direccion);
            this.#ubicarPalabra( lista.obtenerElementoPorPosicion( j ), direccion );
            direccion = (direccion === eTipoDireccion.HORIZONTAL_DER) ? eTipoDireccion.HORIZONTAL_IZQ : eTipoDireccion.HORIZONTAL_DER;
            j++;
        }
        // verticales
        direccion = eTipoDireccion.VERTICAL_ABA;
        for( let i=1; i<=verticales; i++ ) {            
            this.#ubicarPalabra( lista.obtenerElementoPorPosicion( j ), direccion );
            direccion = (direccion === eTipoDireccion.VERTICAL_ABA) ? eTipoDireccion.VERTICAL_ARR : eTipoDireccion.VERTICAL_ABA;
            j++;
        }
        // diagonales
        direccion = eTipoDireccion.DIAGONAL_DERABA;
        for( let i=1; i<=lista.longitud-(verticales+horizontales); i++ ) {            
            this.#ubicarPalabra( lista.obtenerElementoPorPosicion( j ), direccion );
            switch( direccion ) {
                case eTipoDireccion.DIAGONAL_DERARR:
                    direccion = eTipoDireccion.DIAGONAL_DERABA;
                    break;
                case eTipoDireccion.DIAGONAL_DERABA:
                    direccion = eTipoDireccion.DIAGONAL_IZQABA;
                    break;
                case eTipoDireccion.DIAGONAL_IZQABA:
                    direccion = eTipoDireccion.DIAGONAL_IZQARR;
                    break;
                case eTipoDireccion.DIAGONAL_IZQARR:
                    direccion = eTipoDireccion.DIAGONAL_DERARR;
                    break;
            }
            j++;
        }

        return this;
    }

    /**
    * Dibuja un tablero lleno de botones con las dimensiones especificadas en ancho x alto
    * @param {HTMLDivElement} element 
    * @returns {HTMLDivElement} devuelve el div con el tablero dibujado
    */
    dibujarTablero = ( element ) => {

        let html = "";
            
        console.log(`----> dibujarTablero( ${element} )`);
        console.log( 'valores: ' + this.#valores );
        html = `
        <table class="tablero">      
        `;
        for ( let y = 0; y < this.#dimensionY; y++ ) {
            html = html + '<tr class="filaTablero">';
            for( let x = 0; x < this.#dimensionX; x++ ) {                    
                //console.log( '(x,y) = ' + this.#valores[x, y] );
                let valor = this.#valores[(this.#dimensionX*y)+x];
                //let valor = this.#valores[x, y];
                // console.log(`valores[x,y] = ${this.#valores[x, y]}`);
                console.log(`valores[${this.#dimensionX}*${y}+${x}] = ${this.#valores[(this.#dimensionX*y)+x]}`);
                //console.log({valor});
                html = html + `
                    <td class="columnaTablero">
                        <div id="elem${x}_${y}" class="casilla">
                        <span class="botonCasilla">${valor}</span>
                        </div>
                    </td>
                    `;                
            }
            html = html + '</tr>';
        }
        html = html + '</table>';
    
        element.innerHTML = html;
        return element;
    }
  

}