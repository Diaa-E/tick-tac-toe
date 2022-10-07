"use strict"

const gameBoard = (() => {

    let boardArray;

    const _resetBoard = () => {
        
        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                boardArray[i][j] = "";
            }
        }
    };

    

})();