import { basename } from "path"
import convertPositionToNumber from "./PositionConversions"
import StartingBoardConfig, { newBoardConfig } from "./configs/boardConfig"

// Function returns false if proposed move is illeagal, and true otherwise
export default function ValidateMove(piece: string,
    previousPosition: string,
    currentPosition: string,
    currentBoardConfig: newBoardConfig): boolean {

    const [movePath, moveDirection, moveDistance] = calculateMoveType(previousPosition, currentPosition)
    const [pieceColour, pieceName] = piece.split(" ")

    switch (pieceName) {
        case "Pawn":
            // If a pawn is moving from it's starting square it may move 1 or 2
            // squares, but can only move 1 square if it is not in its starting
            // square
            console.log(StartingBoardConfig)
            if (StartingBoardConfig[previousPosition] &&
                StartingBoardConfig[previousPosition][0] === piece &&
                !(moveDistance === 1 || moveDistance === 2)) {
                return false
            }
            // A pawn can only move diagonally if the square it is moving to is 
            // occupied by an opponents piece
            if (movePath === 1 && isSquareOccupied(currentBoardConfig, currentPosition, pieceColour) !== 1) {
                return false
            }

            switch (pieceColour) {
                case "White":

                    break;
                case "Black":
                    break;
            }
            // 2) If it is not the first move, a pawn may only move 1 square towards
            // the opponents last rank, they cannot move backwards.
            // 3) Pawns may move diagonally if a square diagonally up from them is 
            // occupied by an opponents piece. 
            // 3) Pawns may move diagonally if a square diagonally up from them is 
            // occupied by an opponents piece. 
            // 3) Pawns must become either a bishop, knight, rook, or queen upon 
            // reaching the opponents final rank.
            // occupied by an opponents piece. 
            break;
        case "Knight":
            // Knights:
            // 1) May only move in an L shape from their previous square, two squares up/down
            // and 1 square along and vice versa
            if (movePath !== 2) {
                return false
            }
            break;
        case "Bishop":
            // Bishops:
            // 1) May move for any number of squares diagonally
            if (movePath !== 1) {
                return false
            }
            break;
        case "Rook":
            // Rooks:
            // 1) May move for any number of squares left, right, up or down
            if (movePath !== 0) {
                return false
            }
            break;
        case "Queen":
            // Queens:
            // 1) May move for any number of squares in a straight line
            if (!(movePath === 0 || movePath === 1)) {
                return false
            }
            break;
        case "King":
            // Kings:
            // 1) May move for only 1 square in any direction
            if (!(movePath === 0 || movePath === 1)) {
                return false
            }
            if (moveDistance !== 1) {
                return false
            }
            break;
    }

    // Is the current player in check?
    // Can the current player block/take the checking piece with the proposed move?

    // Is it your turn to play?

    // Does the proposed move land on a square already occupied by one of the
    // current players pieces?
    if (isSquareOccupied(currentBoardConfig, currentPosition, pieceColour) === 2) {
        return false
    }

    // For castling, has the king or the rook on the side of the proposed castle moved?
    // Would the current player be castling out of or into check?
    // Are any of the current players pieces obstructing the path of castling?

    // For en passent, was the last move played by the opponent one where en passent is possible?
    // Is your pawn in the correct position for en passent

    // Is an opponents piece blocking the path of this move? 
    // (unless the proposed piece to move is a knight)


    // Extra rule logic for 50 move limit, move repetitions, stalemate, insufficient material

    return true
}

// Function returns an array describing the path and direction of the move and the 
// number of squares away from the original square it lands
// Return array shape:
// array[0]: The move path, 0 for straight, 1 for diagonal, 2 for L shaped
// array[1]: The move direction, 0 for up, 1 for right, 2 for down, 3 for left.
// For diagonal moves it is 0 for up right, 1 for down right, 2 for down left
// and 3 for up left
// array[2]: The move distance, the number of squares traversed by the move
function calculateMoveType(previousPosition: string, currentPosition: string): Array<number> {

    // Convert each of the ranks and files into their numeric representation
    const [previousFile, previousRank] = convertPositionToNumber(previousPosition[0], previousPosition[1])
    const [currentFile, currentRank] = convertPositionToNumber(currentPosition[0], currentPosition[1])

    let movePath: number;
    let moveDirection: number;
    let moveDistance: number;

    // Check for straight up or down
    if (previousFile === currentFile && previousRank !== currentRank) {
        movePath = 0
        moveDistance = Math.abs(currentRank - previousRank)
        if (previousRank > currentRank) {
            // If the files are the same, but the previous rank is greater than
            // the current rank, the path is straight down
            moveDirection = 2
        } else {
            // If the files are the same, but the current rank is greater than
            // the previous rank, the path is straight up
            moveDirection = 0
        }
        return [movePath, moveDirection, moveDistance]
    }

    // Check for straight left or right
    if (previousFile !== currentFile && previousRank === currentRank) {
        movePath = 0
        moveDistance = Math.abs(currentFile - previousFile)
        if (previousFile > currentFile) {
            // If the ranks are the same, but the previous file is greater than
            // the current file, the path is straight left
            moveDirection = 3
        } else {
            // If the ranks are the same, but the current file is greater than
            // the previous file, the path is straight left
            moveDirection = 1
        }
        return [movePath, moveDirection, moveDistance]
    }

    // For diagonal lines, the difference between the current file and the
    // previous file must be the same as the difference between the 
    if (Math.abs(currentFile - previousFile) === Math.abs(currentRank - previousRank)) {
        movePath = 1
        moveDistance = Math.abs(currentFile - previousFile)
        if (currentFile > previousFile && currentRank > previousRank) {
            // Up right
            moveDirection = 0
        } else if (currentFile > previousFile && currentRank < previousRank) {
            // Down right
            moveDirection = 1
        } else if (currentFile < previousFile && currentRank < previousRank) {
            // Down left
            moveDirection = 2
        } else {
            // Up left
            moveDirection = 3
        }
        return [movePath, moveDirection, moveDistance]
    }

    // For L shaped moves, neither the distance nor direction matters, as only a
    // knight can make these moves they are not impacted by pieces in the 
    // path and the distance for L shaped moves is constant
    if ((Math.abs(currentFile - previousFile) === 1 && Math.abs(currentRank - previousRank) === 2) ||
        (Math.abs(currentFile - previousFile) === 2 && Math.abs(currentRank - previousRank) === 1)) {

        movePath = 2
        // Since the distance and direction don't matter, they are returned as -1
        // to avoid any confusion with them being interpreted
        moveDirection = -1
        moveDistance = -1
        return [movePath, moveDirection, moveDistance]
    }

    // If a move type has not already been returned, then this move is not legal,
    // so return -1 for each variable to indicate the illegal move
    return [-1, -1, -1]
}

function isPathObstructed(moveType: number, previousPosition: string, moveLength: number) {

}

// Function to indicate whether the given square is occupied by one of the current 
// players pieces or an opponents piece or is unoccupied unoccupied
// 0: Unoccupied
// 1: Occupied by opponent
// 2: Occupied by current player
function isSquareOccupied(boardConfig: newBoardConfig, currentPosition: string, playerColour: string) {
    if (boardConfig[currentPosition]) {
        if (boardConfig[currentPosition][0].includes(playerColour)) {
            return 2
        }
        return 1
    } else {
        return 0
    }
}