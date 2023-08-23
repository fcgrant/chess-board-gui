import StartingBoardConfig, { BoardConfig } from "./boardConfig"

// Object describing the current state of the game, where pieces are, castling
// rights, en passant, ply and full moves
type GameConfig = {
    boardConfig: BoardConfig,
    activeColour: string,
    castlingRights: string,
    enPassant: string,
    halfMove: number,
    fullMove: number
}

const StartingGameConfig: GameConfig = {
    boardConfig: StartingBoardConfig,
    activeColour: "White",
    castlingRights: "WQkq",
    enPassant: "",
    halfMove: 0,
    fullMove: 1
}

export default StartingGameConfig