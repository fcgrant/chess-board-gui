
export type BoardConfig = {
    [index: string]: Array<string>
}

const StartingBoardConfig: BoardConfig = {
    "d1": ["White Queen", "/white-queen.svg"],
    "e1": ["White King", "/white-king.svg"],
    "a1": ["White Rook", "/white-rook.svg"],
    "h1": ["White Rook", "/white-rook.svg"],
    "b1": ["White Knight", "/white-knight.svg"],
    "g1": ["White Knight", "/white-knight.svg"],
    "c1": ["White Bishop", "/white-bishop.svg"],
    "f1": ["White Bishop", "/white-bishop.svg"],
    "a2": ["White Pawn", "/white-pawn.svg"],
    "b2": ["White Pawn", "/white-pawn.svg"],
    "c2": ["White Pawn", "/white-pawn.svg"],
    "d2": ["White Pawn", "/white-pawn.svg"],
    "e2": ["White Pawn", "/white-pawn.svg"],
    "f2": ["White Pawn", "/white-pawn.svg"],
    "g2": ["White Pawn", "/white-pawn.svg"],
    "h2": ["White Pawn", "/white-pawn.svg"],
    "d8": ["Black Queen", "/black-queen.svg"],
    "e8": ["Black King", "/black-king.svg"],
    "a8": ["Black Rook", "/black-rook.svg"],
    "h8": ["Black Rook", "/black-rook.svg"],
    "b8": ["Black Knight", "/black-knight.svg"],
    "g8": ["Black Knight", "/black-knight.svg"],
    "c8": ["Black Bishop", "/black-bishop.svg"],
    "f8": ["Black Bishop", "/black-bishop.svg"],
    "a7": ["Black Pawn", "/black-pawn.svg"],
    "b7": ["Black Pawn", "/black-pawn.svg"],
    "c7": ["Black Pawn", "/black-pawn.svg"],
    "d7": ["Black Pawn", "/black-pawn.svg"],
    "e7": ["Black Pawn", "/black-pawn.svg"],
    "f7": ["Black Pawn", "/black-pawn.svg"],
    "g7": ["Black Pawn", "/black-pawn.svg"],
    "h7": ["Black Pawn", "/black-pawn.svg"]
}

export default StartingBoardConfig;