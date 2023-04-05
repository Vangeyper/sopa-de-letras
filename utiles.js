import { Coordenada } from "./Coordenada";


/**
 * Obtiene un entero aleatoriamente entre los números inferior y superior
 * @param {Number} inferior 
 * @param {Number} superior 
 * @returns {Number} número entero entre el intervalo: inferior y superior
 */
export const aleatorio = (inferior, superior) => {

    console.log(`aleatorio = (${inferior}, ${superior})`);
    const numPosibilidades = Number(superior) - Number(inferior);
    const aleat = Math.random();
    let aleatorio = aleat * (Number(numPosibilidades) + 1);
    aleatorio = Math.trunc(Math.floor(aleatorio));
   
    return String(Number(inferior) + Number(aleatorio));
  
}


/**
 * Devuelve un array de palabras formado por tantas palabras como se indique en el parámetro numeroPalabras
 * @param {Number} numeroPalabras 
 * @returns {Array<String>} Nuevas palabras
 */
export const nuevasPalabras = async( numeroPalabras ) => {

    let listaPalabras = [];
    
    const url = `https://clientes.api.greenborn.com.ar/public-random-word?c=${numeroPalabras}`;
    const res = await fetch( url );
  
    listaPalabras = res.json();
    
    return listaPalabras;
  
  }



  /**
   * Indica true si la palabra formada por los puntos indicados es horizontal, es decir estan en la misma altura. No pueden ser el mismo punto, en ese caso devuelve falso
   * @param {Coordenada} miPto1 
   * @param {Coordenada} miPto2 
   * @returns {Boolean}
   */
  export const isPalabraHorizontal = ( miPto1, miPto2 ) => {

    if ( miPto1.getY === miPto2.getY && miPto1.getX != miPto2.getX )
      return true;
    return false;
  
  }


  /**
   * Indica true si la palabra formada por los puntos indicados es vertical, es decir estan en la misma x. No pueden ser el mismo punto, en ese caso devuelve falso
   * @param {Coordenada} miPto1 
   * @param {Coordenada} miPto2 
   * @returns {Boolean}
   */
  export const isPalabraVertical = ( miPto1, miPto2 ) => {

    if ( miPto1.getY != miPto2.getY && miPto1.getX === miPto2.getX )
      return true;
    return false;
  
  }
