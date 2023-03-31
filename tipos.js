

// indica que tipo de tablero tenemos, si formado por letras o números, o ambos
const eTipoSopa = Object.freeze({
    LETRAS:  1,
    NUMEROS: 2,
    MIXTO:   3
  });

// en el momento de ubicar o añadir una palabra en el tablero se determina si se permite colisionar o no con otras palabras ya ubicadas
// la opción libre permitirá ubicar la palabra en una posición inicial atendiendo a una dirección, siempre que dicha palabra no colisione con otra 
const eTipoUbicacion = Object.freeze({
    SIN_COLISION:  1,
    CON_COLISION:  2,
    LIBRE:         3
  });

// Indica la dirección que puede tomar una palabra desde la primera coordenada de su primera letra hasta la última letra 
const eTipoDireccion = Object.freeze({
    HORIZONTAL_DER:     6,        
    HORIZONTAL_IZQ:     4,
    VERTICAL_ABA:       8,
    VERTICAL_ARR:       2,
    DIAGONAL_DERABA:    9,
    DIAGONAL_DERARR:    3,
    DIAGONAL_IZQABA:    7,
    DIAGONAL_IZQARR:    1
  });




  export {
    eTipoSopa,
    eTipoUbicacion,
    eTipoDireccion
  };