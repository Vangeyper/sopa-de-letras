import './style.css'


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

  html = `
    <table class="tablero">      
  `;
  for ( let y = 1; y <= alto; y++ ) {
    html = html + '<tr class="filaTablero">';
    for( let x = 1; x <= ancho; x++ ) {    
      const valor = 'A';
      html = html + `
        <td class="columnaTablero">
          <input type="button" name="elem_${x}_${y}" value=" ${valor} " />
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
 * @param {LikeTipos} eTipo indica el tipo de palabras: normales, números, ... según un enumerado
 * @returns {Array<String>} array con la lista de palabras buscada
 */
const dibujarLista = ( element, numero, eTipo ) => {

  let listaNumeros = [];

  let html = '<table class="lista">';
  
  for (let i = 1; i <= numero; i++) {
    listaNumeros.push( aleatorio(0, 9) );  
  }

  html = html + '</table>';
  element.innerHTML = html;

  return listaNumeros;

}


/**
 * Obtiene un entero aleatoriamente entre los números inferior y superior
 * @param {Number} inferior 
 * @param {Number} superior 
 * @returns {Number} número entero entre el intervalo: inferior y superior
 */
const aleatorio = (inferior, superior) => {

  var numPosibilidades = superior - inferior;
  var aleatorio = Math.random() * (numPosibilidades + 1);
  aleatorio = Math.floor(aleatorio);
  
  return inferior + aleatorio;

}



// llamamos a la función
const element = document.querySelector( '#Tablero' );
dibujarTablero( element, 13, 13 );
