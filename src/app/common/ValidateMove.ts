import convertPositionToNumber from "./PositionConversions"
import StartingBoardConfig, { newBoardConfig } from "./configs/boardConfig"

// Function returns false if proposed move is illeagal, and true otherwise
export default function ValidateMove(piece: string, previousPosition: string, currentPosition: string): boolean {

    const [movePath, moveDirection, moveDistance] = calculateMoveType(previousPosition, currentPosition)
    console.log("Piece " + piece)
    console.log("Move Path " + movePath)
    console.log("Move Direction " + moveDirection)
    console.log("Move Distance " + moveDistance)
    // Use match case for determining rules for different pieces
    switch (piece) {
        case "White Pawn" || "Black Pawn":
            // Pawns: 
            // 1) May move one or two spaces if it is their first move
            if (moveDistance !== 1 && !StartingBoardConfig[previousPosition]) {
                return false
            }
            if (moveDistance === 2 && !StartingBoardConfig[previousPosition]) {
                return false
            } else if (moveDistance !== 1) {
                return false
            }
            // 2) If it is not the first move, a pawn may only move 1 square towards
            // the opponents last rank, they cannot move backwards.
            if (!(moveDirection === 0 || moveDirection === 1)) {
                return false
            }
            // 2) Pawns may move diagonally if a square diagonally up from them is 
            // occupied by an opponents piece. 
            // 3) Pawns must become either a bishop, knight, rook, or queen upon 
            // reaching the opponents final rank.
            // occupied by an opponents piece. 
            break;
        case "White Knight" || "Black Knight":
            // Knights:
            // 1) May only move in an L shape from their previous square, two squares up/down
            // and 1 square along and vice versa
            if (movePath !== 2) {
                console.log("Invalid " + piece + "move")
                return false
            }
            break;
        case "White Bishop" || "Black Bishop":
            // Bishops:
            // 1) May move for any number of squares diagonally, as long as the path is not obstructed
            if (movePath !== 1) {
                console.log("Invalid " + piece + "move")
                return false
            }
            break;
        case "White Rook" || "Black Rook":
        // Rooks:
        // 1) May move for any number of squares along, up or down, as long as the path is not obstructed
        case "White Queen" || "Black Queen":
        // Queens:
        // 1) May move for any number of squares diagonally, as long as the path is not obstructed
        // 2) May move for any number of squares along, up or down, as long as the path is not obstructed
        case "White King" || "Black King":
        // Kings:
        // 1) May move for only 1 square in any direction, as long as the path is not obstructed
    }

    // Is the current player in check?
    // Can the current player block/take the checking piece with the proposed move?

    // Is it your turn to play?

    // Does the proposed move land on a square already occupied by one of the
    // current players pieces?

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

function isSquareOccupied(boardConfig: newBoardConfig, position: string, playerColour: number) {

}