"use strict"

const signs = ["X", "O"];

//game board module
const gameBoard = (() => {
    
    const divSlots = document.querySelectorAll(".slot");

    let xTurn = true;
    let winner = null;

    const emptySlot = " ";

    let boardArray= [
        [emptySlot, emptySlot, emptySlot],
        [emptySlot, emptySlot, emptySlot],
        [emptySlot, emptySlot, emptySlot]
    ];

    //event listeners
    divSlots.forEach(slot => {

        slot.addEventListener("click", (e) => {

            addMove(e.target.getAttribute("data-y"), e.target.getAttribute("data-x"),  _toggleTurn());
            showBoard();
            checkGameover();
        });
    });

    const _toggleTurn = () => {

        if (xTurn)
        {
            xTurn = !xTurn;
            return signs[0];
        }
        else
        {
            xTurn = !xTurn;
            return signs[1];
        }

    };

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
                winner = _getWinner(sign);
                return gameOver;
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
                winner = _getWinner(sign);
                return gameOver;
            };
        };

        //check diagonals
        
        //top-left
        if (boardArray[0][0] !== emptySlot && 
            boardArray[0][0] === boardArray[1][1] &&
            boardArray[0][0] === boardArray[2][2])
        {
            gameOver = true;
            winner = _getWinner(boardArray[0][0]);
            return gameOver;
        }

        //top-right
        if (boardArray[0][2] !== emptySlot && 
            boardArray[0][2] === boardArray[1][1] &&
            boardArray[0][2] === boardArray[2][0])
        {
            gameOver = true;
            winner = _getWinner(boardArray[0][2]);
            return gameOver;
        }

        return false;
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

    const _getWinner = (sign) => {

        for (let i = 0; i < signs.length; i++)
        {
            if (sign === signs[i])
            {
                return i;
            }
        }
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
        
        let slotsCounter = 0;

        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                divSlots[slotsCounter].innerHTML = boardArray[i][j];
                slotsCounter++;
            }
        }
    }

    const checkGameover = () => {

        if (_checkWin())
        {
            document.write(`${players[winner].getName()} (${players[winner].getSign()}) Wins the game`)
        }
    };

    return {addMove, showBoard, checkGameover};

})();

//player factory
const newPlayer = (name, sign) => {

    const _playerInfo = {
        "name": name,
        "sign": sign,
    }

    const getName = () => {

        return _playerInfo.name;

    };

    const getSign = () => {

        return _playerInfo.sign;

    }

    return {getName, getSign};
};

gameBoard.showBoard();

const players = [
    newPlayer("Joe", signs[0]),
    newPlayer("Yelo", signs[1])
]