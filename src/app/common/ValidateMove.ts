import convertPositionToNumber, { convertPositionToString } from "./PositionConversions"
import StartingGameConfig, { GameConfig } from "./configs/gameConfig"
import { BoardConfig } from "./configs/boardConfig"

// Function returns false if proposed move is illeagal, and true otherwise
export default function ValidateMove(piece: string,
    previousPosition: string,
    currentPosition: string,
    currentGameConfig: GameConfig): boolean {

    const [movePath,
        moveDirection,
        moveDistance,
        fileOffset,
        rankOffset] = calculateMoveType(previousPosition, currentPosition)
    const [pieceColour, pieceName] = piece.split(" ")
    const pieceMoved = !(StartingGameConfig.boardConfig[previousPosition] &&
        StartingGameConfig.boardConfig[previousPosition][0] === piece)

    switch (pieceName) {
        case "Pawn":
            // If a pawn is moving from it's starting square it may move 1 or 2
            // squares up
            if (!pieceMoved && !(moveDistance === 1 || moveDistance === 2)) {
                return false
            }
            // If a pawn has already moved, it can only move 1 square
            if (pieceMoved && moveDistance !== 1) {
                return false
            }
            // A pawn can only move diagonally one square and only if the square 
            // it is moving to is occupied by an opponents piece
            if (movePath === 1 && isSquareOccupied(currentGameConfig.boardConfig, currentPosition, pieceColour) !== 1) {
                return false
            }
            if (movePath === 1 && moveDistance !== 1) {
                return false
            }
            // A pawn cannot move forward if it is in front of an opponents pawn
            if (movePath === 0 && isSquareOccupied(currentGameConfig.boardConfig, currentPosition, pieceColour) !== 0) {
                return false
            }

            // White and black pawns move in opposite directions, so their 
            // directional logic must be seperated
            switch (pieceColour) {
                case "White":
                    if (movePath === 0 && moveDirection !== 0) {
                        return false
                    }

                    if (movePath === 1 && !(moveDirection === 3 || moveDirection === 0)) {
                        return false
                    }
                    break;
                case "Black":
                    if (movePath === 0 && moveDirection !== 2) {
                        return false
                    }

                    if ((movePath === 1) && !(moveDirection === 1 || moveDirection === 2)) {
                        return false
                    }
                    break;
            }
            // 3) Pawns must become either a bishop, knight, rook, or queen upon 
            // reaching the opponents final rank. 
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

    // Is the piece pinned to the king?

    // Is it your turn to play?
    if (currentGameConfig.activeColour !== pieceColour) {
        return false
    }

    // Does the proposed move land on a square already occupied by one of the
    // current players pieces?
    if (isSquareOccupied(currentGameConfig.boardConfig, currentPosition, pieceColour) === 2) {
        return false
    }

    // For castling, has the king or the rook on the side of the proposed castle moved?
    // Would the current player be castling out of or into check?
    // Are any of the current players pieces obstructing the path of castling?

    // For en passent, was the last move played by the opponent one where en passent is possible?
    // Is your pawn in the correct position for en passent

    // Is a piece blocking the path of this move? 
    // (unless the proposed piece to move is a knight)
    if (pieceName !== "Knight" && isPathObstructed(previousPosition, fileOffset,
        rankOffset, moveDistance, pieceColour, currentGameConfig.boardConfig)) {
        return false
    }

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
// array[3]: The number to add to the file to obtain the next square in the moves
// path
// array[4]: The number to add to the rank to obtain the next square in the moves
// path
function calculateMoveType(previousPosition: string, currentPosition: string): Array<number> {

    // Convert each of the ranks and files into their numeric representation
    const [previousFile, previousRank] = convertPositionToNumber(previousPosition)
    const [currentFile, currentRank] = convertPositionToNumber(currentPosition)

    let movePath: number;
    let moveDirection: number;
    let moveDistance: number;
    let fileOffset: number;
    let rankOffset: number;

    // Check for straight up or down
    if (previousFile === currentFile && previousRank !== currentRank) {
        movePath = 0
        moveDistance = Math.abs(currentRank - previousRank)
        if (previousRank > currentRank) {
            // If the files are the same, but the previous rank is greater than
            // the current rank, the path is straight down
            moveDirection = 2

            fileOffset = 0
            rankOffset = -1
        } else {
            // If the files are the same, but the current rank is greater than
            // the previous rank, the path is straight up
            moveDirection = 0

            fileOffset = 0
            rankOffset = 1
        }
        return [movePath, moveDirection, moveDistance, fileOffset, rankOffset]
    }

    // Check for straight left or right
    if (previousFile !== currentFile && previousRank === currentRank) {
        movePath = 0
        moveDistance = Math.abs(currentFile - previousFile)
        if (previousFile > currentFile) {
            // If the ranks are the same, but the previous file is greater than
            // the current file, the path is straight left
            moveDirection = 3

            fileOffset = -1
            rankOffset = 0
        } else {
            // If the ranks are the same, but the current file is greater than
            // the previous file, the path is straight left
            moveDirection = 1

            fileOffset = 1
            rankOffset = 0
        }
        return [movePath, moveDirection, moveDistance, fileOffset, rankOffset]
    }

    // For diagonal lines, the difference between the current file and the
    // previous file must be the same as the difference between the 
    if (Math.abs(currentFile - previousFile) === Math.abs(currentRank - previousRank)) {
        movePath = 1
        moveDistance = Math.abs(currentFile - previousFile)
        if (currentFile > previousFile && currentRank > previousRank) {
            // Up right
            moveDirection = 0

            fileOffset = 1
            rankOffset = 1
        } else if (currentFile > previousFile && currentRank < previousRank) {
            // Down right
            moveDirection = 1

            fileOffset = 1
            rankOffset = -1
        } else if (currentFile < previousFile && currentRank < previousRank) {
            // Down left
            moveDirection = 2

            fileOffset = -1
            rankOffset = -1
        } else {
            // Up left
            moveDirection = 3

            fileOffset = -1
            rankOffset = 1
        }
        return [movePath, moveDirection, moveDistance, fileOffset, rankOffset]
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

        // Offsets are not necessary for knights, as they can move even if their
        // path to an open square is obstructed
        fileOffset = 0
        rankOffset = 0
        return [movePath, moveDirection, moveDistance, fileOffset, rankOffset]
    }

    // If a move type has not already been returned, then this move is not legal,
    // so return -1 for each variable to indicate the illegal move
    return [-1, -1, -1, -1, -1]
}
// Function to determine if the path of a given move is obstructed by any occupied
// square, assuming that move is legal.
function isPathObstructed(previousPosition: string,
    fileOffset: number,
    rankOffset: number,
    moveDistance: number,
    pieceColour: string,
    boardConfig: BoardConfig): boolean {
    let [previousFile,
        previousRank] = convertPositionToNumber(previousPosition)
    let nextPosition: string
    for (let path = 0; path < moveDistance - 1; path++) {
        previousFile += fileOffset
        previousRank += rankOffset
        nextPosition = convertPositionToString(previousFile, previousRank)
        if (isSquareOccupied(boardConfig, nextPosition, pieceColour) !== 0) {
            return true
        }
    }
    return false
}

// Function to indicate whether the given square is occupied by one of the current 
// players pieces or an opponents piece or is unoccupied unoccupied
// 0: Unoccupied
// 1: Occupied by opponent
// 2: Occupied by current player
function isSquareOccupied(boardConfig: BoardConfig, currentPosition: string, playerColour: string) {
    if (boardConfig[currentPosition]) {
        if (boardConfig[currentPosition][0].includes(playerColour)) {
            return 2
        }
        return 1
    } else {
        return 0
    }
}