"use strict"

const gameBoard = (() => {

    const emptySlot = " ";
    let boardArray= [
        [emptySlot, emptySlot, emptySlot],
        [emptySlot, emptySlot, emptySlot],
        [emptySlot, emptySlot, emptySlot]
    ];

    const _resetBoard = () => {
        
        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                boardArray[i][j] = emptySlot;
            };
        };
    };

    const _checkWin = () => {

        let gameOver = false;

        //check rows
        for (let i = 0; i < 3; i++)
        {
            let sign = boardArray[i][0];
            let next1 = boardArray[i][1];
            let next2 = boardArray[i][2];

            if (sign !== emptySlot && sign === next1 && sign === next2)
            {
                gameOver = true;
                return {gameOver, sign};
            };
        };

        //check columns
        for (let i = 0; i < 3; i++)
        {
            let sign = boardArray[0][i];
            let next1 = boardArray[1][i];
            let next2 = boardArray[2][i];

            if (sign !== emptySlot && sign === next1 && sign === next2)
            {
                gameOver = true;
                return {gameOver, sign};
            };
        };

        //check diagonals
        
        //top-left
        if (boardArray[0][0] !== emptySlot && 
            boardArray[0][0] === boardArray[1][1] &&
            boardArray[0][0] === boardArray[2][2])
        {
            gameOver = true;
            return {gameOver, "sign": boardArray[0][0]};
        }

        //top-right
        if (boardArray[0][2] !== emptySlot && 
            boardArray[0][2] === boardArray[1][1] &&
            boardArray[0][2] === boardArray[2][0])
        {
            gameOver = true;
            return {gameOver, "sign": boardArray[0][0]};
        }
    };

    //the idea of checking draw is to check for empty slots after a win check
    //if there is no winner then there are no empty slots then it's a draw
    const _checkDraw = () => {

        for(let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                if (boardArray[i][j] === emptySlot)
                {
                    return false
                }
            }
        }

        return true
    };

    const _checkUsed = (slot) => {

        if (slot === emptySlot)
        {
            return false;
        }
        else
        {
            return true;
        }

    };

    const addMove = (sloty, slotx, sign) => {

        if (!_checkUsed(boardArray[slotx][sloty]))
        {
            boardArray[slotx][sloty] = sign;
        }
    }

    const showBoard = () => {

        console.log(boardArray);
    }

    return {addMove, showBoard};

})();