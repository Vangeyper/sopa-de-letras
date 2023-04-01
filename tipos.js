

// indica que tipo de tablero tenemos, si formado por letras o números, o ambos
const eTipoSopa = Object.freeze({
    LETRAS:  1,
    NUMEROS: 2,
    MIXTO:   3
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