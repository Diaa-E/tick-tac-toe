"use strict"

const gameBoard = (() => {

    const emptySlot = " ";
    let boardArray= [[], [], []];

    const resetBoard = () => {
        
        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                boardArray[i][j] = emptySlot;
            };
        };
    };

    return {};

})();
