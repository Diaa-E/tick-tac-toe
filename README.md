# tick-tac-toe
An exercise on the factory and module patterns


Board => module
players => factory

board:

    -2-dimensional array (3x3) --> private
    -Check for win --> private
    -Check for draw --> private
    -check used --> private
    -reset board --> private

    -Add a move --> public
    -Check for game end --> public
    -showBoard --> public

Player:

    -Name --> private
    -sign --> private

    -play --> public
