

export class Marcador {

    #diagonales;
    #diagonalesAcertadas;
    #verticales;
    #verticalesAcertadas;
    #horizontales;
    #horizontalesAcertadas;
    #fallidos; // intentos fallidos
    #elementMarcador;


    /**
     * Crea e inicializa el Marcador
     * @param {Number} horizontales 
     * @param {Number} verticales 
     * @param {Number} diagonales 
     * @param {HTMLDivElement} elementMarcador
     * @returns {Marcador}
     */
    constructor ( horizontales, verticales, diagonales, elementMarcador ) {
        
        this.#horizontales = horizontales;
        this.#verticales = verticales;
        this.#diagonales = diagonales;
        this.#horizontalesAcertadas = 0;
        this.#verticalesAcertadas = 0;
        this.#diagonalesAcertadas = 0;
        this.#fallidos = 0;
        this.#elementMarcador = elementMarcador;

        return this;

    }



    /**
     * obtiene el número de aciertos
     * @returns {Number} total de aciertos hasta el momento
     */
    get aciertos() {

        return this.#horizontalesAcertadas + this.#verticalesAcertadas + this.#diagonalesAcertadas;

    }


    /**
     * obtiene el número de intentos fallidos
     * @returns {Number} total de fallos hasta el momento
     */
    get fallos() {

        return this.#fallidos;

    }    


    /**
     * obtiene el número de aciertos - fallos
     * @returns {Number} total de aciertos-fallos hasta el momento
     */
    get puntuacion() {

        return (this.#horizontalesAcertadas + this.#verticalesAcertadas + this.#diagonalesAcertadas)-this.#fallidos;

    }



    /**
     * añade un nuevo acierto para las horizontales
     * @returns {Number} total de aciertos hasta el momento
     */
    acertarHorizontal() {

        this.#horizontalesAcertadas++;
        return this.#horizontalesAcertadas + this.#verticalesAcertadas + this.#diagonalesAcertadas;

    }


    /**
         * añade un nuevo acierto para las verticales
         * @returns {Number} total de aciertos hasta el momento
         */
    acertarVertical() {

        this.#verticalesAcertadas++;
        return this.#horizontalesAcertadas + this.#verticalesAcertadas + this.#diagonalesAcertadas;

    }


    /**
     * añade un nuevo acierto para las diagonales
     * @returns {Number} total de aciertos hasta el momento
     */
    acertarDiagonal() {

        this.#diagonalesAcertadas++;
        return this.#horizontalesAcertadas + this.#verticalesAcertadas + this.#diagonalesAcertadas;

    }


    dibujarMarcador() {

        let html = '<div class="marcador">';
        
        const acertadas = this.#horizontalesAcertadas + this.#verticalesAcertadas + this.#diagonalesAcertadas;
        const puntos = acertadas - this.#fallidos;

        html = html + '<div class="aciertos"><h3>A C E R T A D A S : ' + acertadas + '</h3></div>';
        html = html + '<div class="fallos"><h3>F A L L O S : ' + this.#fallidos + '</h3></div>';
        html = html + '<div class="puntos"><h3>P U N T U A C I Ó N : ' + puntos + '</h3></div>';

        html = html + '</div>';
        this.#elementMarcador.innerHTML = html;
               
        return this.#elementMarcador;        

    }


}