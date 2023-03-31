import { eTipoSopa, eTipoUbicacion, eTipoDireccion } from "./tipos";
import { Palabra } from "./Palabra";


class Tablero {
   
    /**
     * Crea un tablero con las dimensiones especificadas y el tipo
     * @param {Number} dimX 
     * @param {Number} dimY 
     * @param {eTipoSopa} tipo 
     */
    constructor ( dimX, dimY, tipo ) {
        this.numeroPalabras = 0;
        this.listaPalabras = [];
        this.valores = [];    
        this.dimensionX = dimX;
        this.dimensionY = dimY;
        this.tipologia = tipo;        
    }

    /**
     * Permite añadir una nueva palabra al tablero ubicándola de forma aleatoria y respetando las restricciones indicadas por tipoUbicacion
     * @param {Palabra} palabra a ubicar 
     * @param {eTipoUbicacion} tipoUbicacion 
     * @param {Number} xInicial
     * @param {Number} yInicial
     * @returns {Tablero} tablero con la nueva palabra ubicada según indicaciones
     */
    ubicarPalabra( palabra, tipoUbicacion, xInicial = 0, yInicial = 0, direccion = eTipoDireccion.HORIZONTAL_DER ) {
        switch ( tipoUbicacion ) {
            case eTipoUbicacion.CON_COLISION:
                break;
            case eTipoUbicacion.SIN_COLISION:
                break;
            case eTipoUbicacion.LIBRE:
                palabra.ubicar(xInicial, yInicial, direccion );
                break;                
        }
        this.listaPalabras.push( palabra );
    }


    rellenarValores() {
        
    }

    /**
    * Dibuja un tablero lleno de botones con las dimensiones especificadas en ancho x alto
    * @param {HTMLDivElement} element 
    * @param {Number} alto 
    * @param {Number} ancho 
    * @param {Array<Array<String>>} valores
    * @returns {Array<Array<String>>} devuelve una matriz con los elementos del tablero, ya sean letras o números
    */
    dibujarTablero = ( element, ancho, alto, valores ) => {

        let html = "";
        let elementos = [];
    
        console.log('Dibujamos Tablero');
        html = `
        <table class="tablero">      
        `;
        for ( let y = 1; y < alto; y++ ) {
        html = html + '<tr class="filaTablero">';
        for( let x = 1; x < ancho; x++ ) {    
            let valor = valores[x][y];
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