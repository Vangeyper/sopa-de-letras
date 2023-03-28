import './style.css'


/* ----------------------- */
/* CONSTANTES y ENUMERADOS */
/* ----------------------- */
const eTipoSopa = Object.freeze({
  LETRAS:  1,
  NUMEROS: 2
});

let casillaSeleccionada = undefined;


/* ----------------------- */
/*  FUNCIONES PRINCIPALES  */
/* ----------------------- */

/**
 * Dibuja un tablero lleno de botones con las dimensiones especificadas en ancho x alto
 * @param {HTMLDivElement} element 
 * @param {Number} alto 
 * @param {Number} ancho 
 * @returns {Array<Array<String>>} devuelve una matriz con los elementos del tablero, ya sean letras o números
 */
const dibujarTablero = ( element, alto, ancho ) => {

  let html = "";
  let elementos = [];

  console.log('Dibujamos Tablero');
  html = `
    <table class="tablero">      
  `;
  for ( let y = 1; y <= alto; y++ ) {
    html = html + '<tr class="filaTablero">';
    for( let x = 1; x <= ancho; x++ ) {    
      const valor = 'A';
      html = html + `
        <td class="columnaTablero">
          <div id="elem_${x}_${y}" class="casilla">
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


/**
 * Calcula aleatoriamente una lista de palabras o números y la devuelve en un array
 * @param {HTMLDivElement} element 
 * @param {Number} numero número de palabras
 * @param {eTipoSopa} eTipo indica el tipo de palabras: normales, números, ... según un enumerado
 * @returns {Array<String>} array con la lista de palabras buscada
 */
const dibujarLista = async( element, numero, eTipo ) => {

  let listaElementos = [];

  let html = '<table class="lista">';
  
  for (let i = 1; i <= numero; i++) {
    if ( eTipo === eTipoSopa.NUMEROS ) {
      listaElementos.push( aleatorio(0, 9) );  
      html = html + `<tr class="filaPalabras">
        <td class="columnaPalabras">${ listaElementos[i-1] }</td>
      </tr>
      `;
    }
    if ( eTipo === eTipoSopa.LETRAS ) {
      nuevasPalabras( 10 ).then( listaPalabras => {
        console.log(listaPalabras);
        for ( let n = 0; n < numero; n++ ) {
          console.log( listaPalabras[n] );
          //console.log( html );
          listaElementos.push( listaPalabras[n] );          
          html = html + '<tr class="filaPalabras"><td class="columnaPalabras">' + listaElementos[n] + '</td></tr>';
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
 * Obtiene un entero aleatoriamente entre los números inferior y superior
 * @param {Number} inferior 
 * @param {Number} superior 
 * @returns {Number} número entero entre el intervalo: inferior y superior
 */
const aleatorio = (inferior, superior) => {

  const numPosibilidades = superior - inferior;
  let aleatorio = Math.random() * (numPosibilidades + 1);
  aleatorio = Math.floor(aleatorio);
  
  return inferior + aleatorio;

}


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
 * En función de las 2 casillas marcadas se extrairán el resto de casillas que forman la palabra si es posible: misma horizontal, misma vertical o en diagonal
 * @param {String} inicioID de la forma elem_X_Y donde X es la posición horizontal de la casilla e Y la vertical
 * @param {*} finalID de la forma elem_X_Y donde X es la posición horizontal de la casilla e Y la vertical
 */
const marcarPalabra = ( inicioID, finalID ) => {

  
  element.firstElementChild.classList.toggle('botonCasillaSeleccion');
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
    // validamos final de palabra
    console.log("Validamos palabra : ( " + casillaSeleccionada + " - " + id + " )");
    // marcamos el final de la palabra
    marcarPalabra( casillaSeleccionada, id );
    element.firstElementChild.classList.toggle('botonCasillaSeleccion');
    // marcamos/tachamos las letras intermedias si la palabra es correcta
    casillaSeleccionada = undefined;
  }
  else {
    // iniciamos palabra
    casillaSeleccionada = id;
    console.log("iniciamos palabra: " + id);
    // marcamos el inicio de palabra
    element.firstElementChild.classList.toggle('botonCasillaSeleccion');
  }
}


/* ------------------------ */
/*  EJECUCIÓN DE FUNCIONES  */
/* ------------------------ */

// llamamos a la función
const element = document.querySelector( '#Tablero' );
dibujarTablero( element, 13, 13 );

const elementLista = document.querySelector( '#Palabras' );
dibujarLista( elementLista, 10, eTipoSopa.NUMEROS );
// nuevasPalabras( 1 ).then( listaPalabras => {
//   console.log( listaPalabras[0] );
// })


const tablero = document.querySelector( '.tablero' );
tablero.addEventListener('click', ( event ) => tableroSelectListener( event ));
