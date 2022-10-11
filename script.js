"use strict"

const signs = ["X", "O"];

//game board module
const gameBoard = (() => {
    
    const divSlots = document.querySelectorAll(".slot");
    const divWinner = document.querySelectorAll("#player-win");
    const divDraw = document.querySelectorAll("#draw");
    const imgPlayAgain = document.querySelectorAll(".play-again");

    let gameOver = false;
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

    imgPlayAgain.forEach(image => {

        image.addEventListener("click", (e) => {

            _resetBoard();
            showBoard();
        });
    });

    const _hidePlayAgain = () =>{

        imgPlayAgain.forEach(image => {

            image.setAttribute("hidden", "true");

        });
    };

    const _showPlayAgain = () => {

        imgPlayAgain.forEach(image => {

            image.removeAttribute("hidden");

        });
    };

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

        gameOver = false;
        _hidePlayAgain();

        divWinner.forEach(div => {

            div.classList.remove("winner-active");
        });

        divDraw.forEach(div => {

            div.classList.remove("winner-active");
        });
    };

    const _checkWin = () => {

        gameOver = false;

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

        if (!_checkUsed(boardArray[slotx][sloty]) && !gameOver)
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
            divWinner[winner].classList.add("winner-active");
            gameOver = true;
            _showPlayAgain();
        }
        else if (_checkDraw())
        {
            for (let i = 0; i < divDraw.length; i++)
            {
                divDraw[i].classList.add("winner-active");
                gameOver = true;
                _showPlayAgain();
            }
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