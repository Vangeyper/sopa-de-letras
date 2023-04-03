


export class Coordenada {

    #posicionX = 0;
    #posicionY = 0;

    /**
     * Constructor de una Coordenada 
     * @param {Number} x 
     * @param {Number} y 
     */
    constructor ( x, y ) {
        this.#posicionX = x;
        this.#posicionY = y;
    }


    /**
     * @returns {Number}
     */
     get getX(){
        return this.#posicionX;
    }

    /**
     * @returns {Number}
     */
    get getY(){
        return this.#posicionY;
    }

}

