

/**
 * Obtiene un entero aleatoriamente entre los números inferior y superior
 * @param {Number} inferior 
 * @param {Number} superior 
 * @returns {Number} número entero entre el intervalo: inferior y superior
 */
export const aleatorio = (inferior, superior) => {

    const numPosibilidades = Number(superior) - Number(inferior);
    const aleat = Math.random();
    let aleatorio = aleat * (Number(numPosibilidades) + 1);
    aleatorio = Math.trunc(Math.floor(aleatorio));
   
    return Number(inferior) + Number(aleatorio);
  
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