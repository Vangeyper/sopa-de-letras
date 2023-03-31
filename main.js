import './style.css';
import { eTipoSopa } from './tipos';
import { Palabra } from './Palabra';


/* ----------------------- */
/* CONSTANTES y ENUMERADOS */
/* ----------------------- */

let casillaSeleccionada = undefined;


/* ----------------------- */
/*  FUNCIONES PRINCIPALES  */
/* ----------------------- */



/**
 * Calcula aleatoriamente una lista de palabras o números y la devuelve en un array
 * @param {HTMLDivElement} element 
 * @param {Number} numero número de palabras
 * @param {eTipoSopa} eTipo indica el tipo de palabras: normales, números, ... según un enumerado
 * @param {Number} min número mínimo de la lista 
 * @param {Number} max número máximo de la lista
 * @returns {Array<Palabra>} array con la lista de palabras buscada
 */
const dibujarLista = async( element, numero, eTipo, min, max ) => {

  let listaElementos = [];

  let html = '<table class="lista">';
  
  for (let i = 1; i <= numero; i++) {
    if ( eTipo === eTipoSopa.NUMEROS ) {
      const newNumero = aleatorio(min, max);
      const newPalabra = new Palabra(newNumero, eTipo);
      listaElementos.push( newPalabra );          

      html = html + `<tr class="filaPalabras">
        <td class="columnaPalabras">${ newNumero }</td>
      </tr>
      `;
    }
    if ( eTipo === eTipoSopa.LETRAS ) {
      nuevasPalabras( 10 ).then( listaPalabras => {
        console.log(listaPalabras);
        for ( let n = 0; n < numero; n++ ) {
          console.log( listaPalabras[n] );
          //console.log( html );

          const newPalabra = new Palabra(listaPalabras[n], eTipo);
          listaElementos.push( newPalabra );          
          html = html + '<tr class="filaPalabras"><td class="columnaPalabras">' + listaPalabras[n] + '</td></tr>';
          //console.log( html );
        };
        html = html + '</table>';
        element.innerHTML = html;
      });                  
      break;      
    }    
  }

  if ( eTipo === eTipoSopa.NUMEROS ) {
    html = html + '</table>';
    element.innerHTML = html;
  }

  
  return listaElementos;

}






/* ----------------------- */
/*  FUNCIONES SECUNDARIAS  */
/* ----------------------- */




/**
 * Devuelve un array de palabras formado por tantas palabras como se indique en el parámetro numeroPalabras
 * @param {Number} numeroPalabras 
 * @returns {Array<String>} Nuevas palabras
 */
const nuevasPalabras = async( numeroPalabras ) => {

  let listaPalabras = [];
  
  const url = `https://clientes.api.greenborn.com.ar/public-random-word?c=${numeroPalabras}`;
  const res = await fetch( url );

  listaPalabras = res.json();
  
  return listaPalabras;

}


/**
 * Devuelve cierto si ambas coordenadas indicadas están en la misma horizontal y son diferentes
 * @param {Number} x1 
 * @param {Number} y1 
 * @param {Number} x2 
 * @param {Number} y2 
 * @returns {Boolean} 
 */
const isPalabraHorizontal = ( x1, y1, x2, y2 ) => {

  if ( y1 === y2 && x1 != x2 )
    return true;
  return false;

}


/**
 * Devuelve cierto si ambas coordenadas indicadas están en la misma vertical y son diferentes
 * @param {Number} x1 
 * @param {Number} y1 
 * @param {Number} x2 
 * @param {Number} y2 
 * @returns {Boolean} 
 */
const isPalabraVertical = ( x1, y1, x2, y2 ) => {

  if ( x1 === x2 && y1 != y2 )
    return true;
  return false;

}


/**
 * Devuelve cierto si ambas coordenadas indicadas están en la misma horizontal y son diferentes
 * @param {Number} x1 
 * @param {Number} y1 
 * @param {Number} x2 
 * @param {Number} y2 
 * @returns {Boolean} 
 */
const isPalabraDiagonal = ( x1, y1, x2, y2 ) => {

  if ( Math.abs( y2 - y1 ) === Math.abs( x2 - x1 ) )
    return true;
  return false;

}


/**
 * Marcará todas las letras o números que existan entre las dos coordenadas especificadas
 * @param {Number} x1 
 * @param {Number} y1 
 * @param {Number} x2 
 * @param {Number} y2 
 */
const marcarPalabraHorizontal = ( x1, y1, x2, y2 ) => {

  let palabra = '';
  let incremento = 1;
  let decremento = 0;

  if( Number(x2) < Number(x1) ) {
    const xAux = x1;
    const yAux = y1;
    x1 = x2;
    y1 = y2;
    x2 = xAux;
    y2 = yAux;    
    incremento = 0;
    decremento = 1;
  }

  for( let x = Number(x1); x <= Number(x2); x++) {
    const item = '#elem' + x + '_' + y1;
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
 * @param {Number} x1 
 * @param {Number} y1 
 * @param {Number} x2 
 * @param {Number} y2 
 */
const marcarPalabraVertical = ( x1, y1, x2, y2 ) => {

  let incremento = 1;
  let decremento = 0;

  if( Number(y2) < Number(y1) ) {
    const xAux = x1;
    const yAux = y1;
    x1 = x2;
    y1 = y2;
    x2 = xAux;
    y2 = yAux;    
    incremento = 0;
    decremento = 1;
  }

  for( let y = Number(y1)+incremento; y <= Number(y2)-decremento; y++) {
    const item = '#elem' + x1 + '_' + y;
    const element = document.querySelector( item );
    if (element)
      element.firstElementChild.classList.toggle('botonCasillaSeleccion');
  }
  
}


/**
 * Marcará todas las letras o números que existan entre las dos coordenadas especificadas
 * @param {Number} x1 
 * @param {Number} y1 
 * @param {Number} x2 
 * @param {Number} y2 
 */
const marcarPalabraDiagonalInvertida = ( x1, y1, x2, y2 ) => {

  let aumentoY = 1;
  
  if ( Number(y2) < Number(y1) ) {
    aumentoY = -1;
  }

  let y = Number(y1);
  for( let x = Number(x1); x <= Number(x2)-1; x++) {        
    const item = '#elem' + x + '_' + y;    
    const element = document.querySelector( item );
    if (element)
      element.firstElementChild.classList.toggle('botonCasillaSeleccion');
    y = y + aumentoY;    
  }
  
}


/**
 * Marcará todas las letras o números que existan entre las dos coordenadas especificadas
 * @param {Number} x1 
 * @param {Number} y1 
 * @param {Number} x2 
 * @param {Number} y2 
 */
const marcarPalabraDiagonal = ( x1, y1, x2, y2 ) => {

  let aumentoY = 1;
  
  if ( Number(y2) < Number(y1) ) {
    aumentoY = -1;
  }

  if( Number(x2) < Number(x1) ) {
     marcarPalabraDiagonalInvertida( x2, y2, x1, y1 );
     return;
  }

  let y = Number(y1);
  for( let x = Number(x1)+1; x <= Number(x2); x++) {    
    y = y + aumentoY;    
    const item = '#elem' + x + '_' + y;    
    const element = document.querySelector( item );
    if (element)
      element.firstElementChild.classList.toggle('botonCasillaSeleccion');
  }
  
}


/**
 * Cambia la clase de los elementos del tablero que tengan la selección por la de marcado cuando se acierta la palabra
 */
const aplicarMarcadoPalabraCorrecta = () => {

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
const desmarcarSeleccionados = () => {

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
 * @param {*} finalID de la forma elemX_Y donde X es la posición horizontal de la casilla e Y la vertical
 */
const marcarPalabra = ( inicioID, finalID ) => {

  let palabra = '';

  console.log( 'marcarPalabra' );
  var seleccionados = document.getElementsByClassName("botonCasillaSeleccion");
  console.log( 'seleccionados : ' + seleccionados.length );

  if (seleccionados) {
    for (var i = 0; i<seleccionados.length; i++) {
      console.log( seleccionados[i].parentElement.id );
    }
  }  

  const finalx1 = inicioID.indexOf( '_' );
  const x1 = inicioID.substring( 4, finalx1 );
  const y1 = inicioID.substring( finalx1 + 1 );

  const finalx2 = finalID.indexOf( '_' );
  const x2 = finalID.substring( 4, finalx2 );
  const y2 = finalID.substring( finalx2 + 1 );

  if ( isPalabraHorizontal( x1, y1, x2, y2 ) ) {
    console.log('marcamos palabra horizontal');
    console.log('( ' + x1 + ',' + y1 + ' - ' + x2 + ',' + y2 + ' ) es horizontal');
    palabra = marcarPalabraHorizontal( x1, y1, x2, y2 );        
  }
  if ( isPalabraVertical( x1, y1, x2, y2 ) ) {
    marcarPalabraVertical( x1, y1, x2, y2 );
    //console.log(x1 + ',' + y1 + ' - ' + x2 + ',' + y2 + 'es vertical');
  }
  if ( isPalabraDiagonal( x1, y1, x2, y2 ) ) {
    //console.log(x1 + ',' + y1 + ' - ' + x2 + ',' + y2 + 'es diagonal');
    marcarPalabraDiagonal( x1, y1, x2, y2 );
  }

  // comprobar si existe la palabra
  console.log({palabra});
  for (let i = 0; i < listaPalabras.length; i++) {    
    console.log(listaPalabras[i].getPalabra());
    if( palabra === listaPalabras[i].getPalabra() ) {
      aplicarMarcadoPalabraCorrecta();
      alert('marcado');
      return;
    }
  }
  
  desmarcarSeleccionados();
  
}



/**
 * Trata el evento del Select al clickear en la tabla (Select)
 * @param {MouseEvent} event 
 */
const tableroSelectListener = ( event ) => {

  const element = event.target.closest('.casilla');
  if ( !element ) return;  

  // si tenemos el click correspondiente al Select cogemos el data-id:
  const id = element.getAttribute('id');
  
  // seleccionamos la casilla inicial o la final
  if( casillaSeleccionada ) {
    // marcamos el final de la palabra
    //element.firstElementChild.classList.toggle('botonCasillaSeleccion');
    marcarPalabra( casillaSeleccionada, id );
    // marcamos/tachamos las letras intermedias si la palabra es correcta
    casillaSeleccionada = undefined;
  }
  else {
    // iniciamos palabra
    casillaSeleccionada = id;
    // marcamos el inicio de palabra
    element.firstElementChild.classList.toggle('botonCasillaSeleccion');
  }
}


/**
 * Rellena el tablero de datos con numeros o letras aleatorios según el tipo. Devuelve la matriz que se visualizará en el tablero
 * @param {Number} alto 
 * @param {Number} ancho 
 * @param {eTipoSopa} tipo
 * @returns {Array<Array<String>>}
 */
const generarTablero = ( ancho, alto, tipo ) => {

  let tableroJuego = [];
  let lineaJuego = [];

  if ( tipo === eTipoSopa.LETRAS ) {
    const abc = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,ñ,o,p,q,r,s,t,u,v,w,x,y,z';
    const letras = abc.split(',');
    for ( let y = 1; y <= alto; y++ ) {
      lineaJuego = [];
      for ( let x = 1; x <= ancho; x++) {
        const newIndice = aleatorio( 0, letras.length - 1 );
        lineaJuego.push( letras[newIndice] );
      }
      tableroJuego.push( lineaJuego );
    }        

    return tableroJuego;
  }

  if ( tipo === eTipoSopa.NUMEROS ) {        
    for ( let y = 1; y <= alto; y++ ) {
      lineaJuego = [];
      for ( let x = 1; x <= ancho; x++) {
        const newNumero = aleatorio(0, 9);
        lineaJuego.push( newNumero );
      }
      tableroJuego.push( lineaJuego );
    }        
  }

  return tableroJuego;

}


/* ------------------------ */
/*  EJECUCIÓN DE FUNCIONES  */
/* ------------------------ */

const valoresTablero = generarTablero( 13, 13, eTipoSopa.NUMEROS );

// llamamos a la función
const element = document.querySelector( '#tablero' );
dibujarTablero( element, 13, 13, valoresTablero );

const elementLista = document.querySelector( '#palabras' );

const listaPalabras = dibujarLista( elementLista, 10, eTipoSopa.NUMEROS, 100000000, 999999999 );
// nuevasPalabras( 1 ).then( listaPalabras => {
//   console.log( listaPalabras[0] );
// })


const tablero = document.querySelector( '#tablero' );
tablero.addEventListener('click', ( event ) => tableroSelectListener( event ));