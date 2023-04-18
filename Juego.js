import { Tablero } from "./Tablero";
import { ListaPalabras } from "./ListaPalabras";
import { eTipoSopa } from "./tipos";
import { Coordenada } from "./Coordenada";
import { isPalabraHorizontal, isPalabraVertical, isPalabraDiagonal } from "./utiles";
import { Marcador } from "./Marcador";


export class Juego {

    #tablero;
    #listaPalabras;
    #marcador;

    #casillaSeleccionada;

    /**
     * 
     * @param {Number} dimensionX 
     * @param {Number} dimensionY 
     * @param {eTipoSopa} tipo 
     * @param {Number} numeroPalabras 
     * @param {Number} horizontales 
     * @param {Number} verticales 
     * @param {Document} miDocument
     * //@param {HTMLDivElement} elementJuego DIV que incluye todos los elementos del juego y del que cuelgan los div de tablero, lista y marcador 
     */
    constructor ( dimensionX, dimensionY, tipo, numeroPalabras, horizontales, verticales, miDocument ) {
       
        // marcador 
        let elementMarcador = miDocument.querySelector( '#marcador' );
        this.#marcador = new Marcador( horizontales, verticales, Number(numeroPalabras - ( horizontales + verticales )), elementMarcador );      

        // lista de palabras        
        let elementLista = miDocument.querySelector( '#palabras' );
        this.#listaPalabras = new ListaPalabras( tipo, elementLista );  

        //this.#listaPalabras = this.#listaPalabras.generarLista( numeroPalabras );
        //console.log('this.#listaPalabras : ' + this.#listaPalabras);
        
        // tablero de juego
        let elementTablero = miDocument.querySelector( '#tablero' );
        this.#tablero = new Tablero( dimensionX, dimensionY, tipo, elementTablero );
        // this.#tablero = this.#tablero.ubicarListaPalabras( this.#listaPalabras, horizontales, verticales );

        // no tenemos nada seleccionado
        this.#casillaSeleccionada = undefined;

        // this.dibujarJuego()             

        
        
        // eventos

        elementTablero.addEventListener('click', ( event ) => {

            console.log(' ---->> tableroSelectListener');
            const element = event.target.closest('.casilla');
            if ( !element ) return;  
        
            // si tenemos el click correspondiente al Select cogemos el data-id:
            const id = element.getAttribute('id');
            console.log({id});
            
            // seleccionamos la casilla inicial o la final
            if( this.#casillaSeleccionada ) {
                // marcamos el final de la palabra
                //element.firstElementChild.classList.toggle('botonCasillaSeleccion');
                this.#marcarPalabra( this.#casillaSeleccionada, id );
                // marcamos/tachamos las letras intermedias si la palabra es correcta
                this.#casillaSeleccionada = undefined;
            }
            else {
                // iniciamos palabra
                this.#casillaSeleccionada = id;
                // marcamos el inicio de palabra
                element.firstElementChild.classList.toggle('botonCasillaSeleccion');
            }

            console.log(this.#casillaSeleccionada);
        });

    }
    


    /**
     * Obtiene la lista de palabras o numeros
     * @param {Number} numeroPalabras 
     * @returns {ListaPalabras}
     */
    async obtenerListaPalabras( numeroPalabras ) {

        this.#listaPalabras = await this.#listaPalabras.generarLista( numeroPalabras );
        console.log('this.#listaPalabras : ' + this.#listaPalabras);
        return this.#listaPalabras;

    }


    /**
     * ubica las palabras de la lista en el tablero
     * @param {Number} horizontales 
     * @param {Number} verticales 
     * @returns {Juego}
     */
    ubicarPalabras( horizontales, verticales ) {

        this.#tablero = this.#tablero.ubicarListaPalabras( this.#listaPalabras, horizontales, verticales );
        this.dibujarJuego();
    }
    




    /**
     * Obtiene las coordenadas de los elementos X e Y según el tag o string que recibe con el formato: elemX_Y
     * @param {String} elementoX_Y 
     * @returns {Coordenada} coordenadas obtenidas
     */
    #obtenerCoordenada( elementoX_Y ) {

        const finalx = elementoX_Y.indexOf( '_' );
        const x = elementoX_Y.substring( 4, finalx );
        const y = elementoX_Y.substring( finalx + 1 );
        return new Coordenada( x, y );

    }

 

    /**
     * Marcará todas las letras o números que existan entre las dos coordenadas especificadas
     * @param {Coordenada} miPto1 
     * @param {Coordenada} miPto2 
     * @returns {String} palabra que forman las coordenadas
     */
    #marcarPalabraHorizontal ( miPto1, miPto2 ) {

        let palabra = '';
    
        if( Number(miPto2.getX) < Number(miPto1.getX) ) {
            // intercambiamos punto
            const xAux = miPto1.getX;
            const yAux = miPto1.getY;
            miPto1.setX( miPto2.getX );
            miPto1.setY( miPto2.getY );
            miPto2.setX( xAux );
            miPto2.setY( yAux );
        }
    
        for( let x = Number(miPto1.getX); x <= Number(miPto2.getX); x++) {
            const item = '#elem' + x + '_' + miPto1.getY;
            console.log(item);
            const element = document.querySelector( item );
            if (element) {
                element.firstElementChild.classList.remove('botonCasillaSeleccion');
                element.firstElementChild.classList.add('botonCasillaSeleccion');
                palabra = palabra.concat(element.firstElementChild.innerText);
            }  
        }
        
        return palabra;
    }



    /**
     * Marcará todas las letras o números que existan entre las dos coordenadas especificadas
     * @param {Coordenada} miPto1 
     * @param {Coordenada} miPto2 
     * @returns {String} palabra que forman las coordenadas
     */
    #marcarPalabraVertical ( miPto1, miPto2 ) {

        let palabra = '';
      
        if( Number(miPto2.getY) < Number(miPto1.getY) ) {
          // intercambiamos punto
          const xAux = miPto1.getX;
          const yAux = miPto1.getY;
          miPto1.setX( miPto2.getX );
          miPto1.setY( miPto2.getY );
          miPto2.setX( xAux );
          miPto2.setY( yAux );  
        }
      
        for( let y = Number(miPto1.getY); y <= Number(miPto2.getY); y++) {
          const item = '#elem' + miPto1.getX + '_' + y;
          const element = document.querySelector( item );
          if (element) {
              element.firstElementChild.classList.remove('botonCasillaSeleccion');
              element.firstElementChild.classList.add('botonCasillaSeleccion');
              palabra = palabra.concat(element.firstElementChild.innerText);
          }
        }
        
        return palabra;
    }



    /**
     * Marcará todas las letras o números que existan entre las dos coordenadas especificadas
     * @param {Coordenada} miPto1 
     * @param {Coordenada} miPto2 
     * @returns {String} palabra que forman las coordenadas
     */
    #marcarPalabraDiagonalInvertida ( miPto1, miPto2 ) {

        let aumentoY = 1;
        let palabra = '';
        
        if ( Number( miPto2.getY ) < Number( miPto1.getY ) ) {
            aumentoY = -1;
        }
    
        let y = Number( miPto1.getY );
        for( let x = Number( miPto1.getX ); x <= Number( miPto2.getX ); x++) {        
            const item = '#elem' + x + '_' + y;    
            const element = document.querySelector( item );
            if ( element ) {
                element.firstElementChild.classList.remove('botonCasillaSeleccion');
                element.firstElementChild.classList.add('botonCasillaSeleccion');
                palabra = palabra.concat(element.firstElementChild.innerText);
            }
            y = y + aumentoY;    
        }

        return palabra;
    }    


    /**
     * Marcará todas las letras o números que existan entre las dos coordenadas especificadas
     * @param {Coordenada} miPto1 
     * @param {Coordenada} miPto2 
     * @returns {String} palabra que forman las coordenadas
     */
    #marcarPalabraDiagonal ( miPto1, miPto2 ) {

        let aumentoY = 1;
        let palabra = '';
        
        if ( Number( miPto2.getY ) < Number( miPto1.getY ) ) {
            aumentoY = -1;
        }
    
        if( Number( miPto2.getX ) < Number( miPto1.getX ) ) {
            return this.#marcarPalabraDiagonalInvertida( miPto2, miPto1 );
        }
    
        let y = Number( miPto1.getY );
        for( let x = Number( miPto1.getX ); x <= Number( miPto2.getX ); x++) {                    
            const item = '#elem' + x + '_' + y;    
            const element = document.querySelector( item );
            if ( element ) {
                element.firstElementChild.classList.remove('botonCasillaSeleccion');
                element.firstElementChild.classList.add('botonCasillaSeleccion');
                palabra = palabra.concat(element.firstElementChild.innerText);
            }
            y = y + aumentoY;
        }

        return palabra;
        
    }
  



    /**
     * Cambia la clase de los elementos del tablero que tengan la selección por la de marcado cuando se acierta la palabra
     */
    #aplicarMarcadoPalabraCorrecta () {

        var seleccionados = document.getElementsByClassName("botonCasillaSeleccion");
        
        console.log(seleccionados.length);
        for (let i = seleccionados.length - 1; i >= 0; i--) {
            console.log(seleccionados[i]);
            seleccionados[i].classList.add("botonCasillaAcertada");
            seleccionados[i].classList.remove("botonCasillaSeleccion");
        }
    }


    /**
     * Desmarcar las clases de los elementos del tablero que estén seleccionados
     */
    #desmarcarSeleccionados () {

        console.log('descamarcar');
        var seleccionados = document.getElementsByClassName("botonCasillaSeleccion");  
        if (!seleccionados) return;
        
        console.log( 'seleccionados a desmarcar : ' + seleccionados.length );
        console.log( seleccionados[0], seleccionados[1], seleccionados[2] );
        console.log( seleccionados[0].parentElement, seleccionados[1].parentElement, seleccionados[2].parentElement );

        for (let i = seleccionados.length - 1; i >= 0; i--) {
            console.log( 'desmarcamos ' + seleccionados[i].parentElement.id );
            seleccionados[i].classList.remove("botonCasillaSeleccion");
        }
    }



    /**
     * En función de las 2 casillas marcadas se extrairán el resto de casillas que forman la palabra si es posible: misma horizontal, misma vertical o en diagonal
     * @param {String} inicioID de la forma elemX_Y donde X es la posición horizontal de la casilla e Y la vertical
     * @param {String} finalID de la forma elemX_Y donde X es la posición horizontal de la casilla e Y la vertical
     */
    #marcarPalabra = ( inicioID, finalID ) => {

        console.log(` ---->> marcarPalabra( ${inicioID}, ${finalID} )`);
        let palabra = '';
    
        // var seleccionados = document.getElementsByClassName("botonCasillaSeleccion");
        // console.log( 'seleccionados : ' + seleccionados.length );
    
        // if (seleccionados) {
        // for (var i = 0; i<seleccionados.length; i++) {
        //     console.log( seleccionados[i].parentElement.id );
        // }
        // }  
    
        const miPto1 = this.#obtenerCoordenada( inicioID );
        const miPto2 = this.#obtenerCoordenada( finalID );
           
        if ( isPalabraHorizontal( miPto1, miPto2 ) ) {
            palabra = this.#marcarPalabraHorizontal( miPto1, miPto2 );        
        }
        if ( isPalabraVertical( miPto1, miPto2 ) ) {
            palabra = this.#marcarPalabraVertical( miPto1, miPto2 );
        }
        if ( isPalabraDiagonal( miPto1, miPto2 ) ) {
            palabra = this.#marcarPalabraDiagonal( miPto1, miPto2 );
        }
    
        // comprobar si existe la palabra
        console.log({palabra});
        if( this.#listaPalabras.validarPalabra( palabra )) {
            this.#listaPalabras.marcarPalabra( palabra );
            this.#aplicarMarcadoPalabraCorrecta();            
            this.#listaPalabras.dibujarLista();
            return;
        }
        
        this.#desmarcarSeleccionados();        
        
    }



    /**
     * Dibuja el juego en pantalla dentro de los elementos DIV indicados
     * @returns {HTMLDivElement}
     */
    dibujarJuego( elementJuego ) {
        
        this.#listaPalabras.dibujarLista();
        this.#tablero.dibujarTablero();
        this.#marcador.dibujarMarcador();

    }

}