

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