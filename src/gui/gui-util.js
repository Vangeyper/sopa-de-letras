
    /**
    * Dibuja un tablero lleno de botones con las dimensiones especificadas en ancho x alto
    * @param {HTMLDivElement} element
    * @param {Number} dimensionX
    * @param {Number} dimensionY
    * @param {Array} valores
    * @returns {HTMLDivElement} devuelve el div con el tablero dibujado
    */
    export const gui_dibujarTablero_Grid = ( element, dimensionX, dimensionY, valores ) => {

        let html = "";
            
        html = `
        <div class="tablero grid-container">      
        `;
        for ( let y = 0; y < dimensionY; y++ ) {
            //html = html + '<div class="filaTablero grid-item-row">';
            for( let x = 0; x < dimensionX; x++ ) {                    
                let valor = valores[(dimensionX*y)+x];
                html = html + `
                    <div id="elem${x}_${y}" class="casilla grid-item">${valor}</div>
                    `;                
            }
        }
        html = html + '</div>';
    
        element.innerHTML = html;
        return element;
    }


