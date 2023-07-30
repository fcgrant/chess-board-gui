import { Pieces } from "@/app/components/Piece"

type newBoardConfig = {
    [index: string]: JSX.Element
}

export const StartingBoardConfig: newBoardConfig = {
    "d1": Pieces.WhiteQueen,
    "e1": Pieces.WhiteKing,
    "a1": Pieces.WhiteRook,
    "h1": Pieces.WhiteRook,
    "b1": Pieces.WhiteKnight,
    "g1": Pieces.WhiteKnight,
    "c1": Pieces.WhiteBishop,
    "f1": Pieces.WhiteBishop,
    "a2": Pieces.WhitePawn,
    "b2": Pieces.WhitePawn,
    "c2": Pieces.WhitePawn,
    "d2": Pieces.WhitePawn,
    "e2": Pieces.WhitePawn,
    "f2": Pieces.WhitePawn,
    "g2": Pieces.WhitePawn,
    "h2": Pieces.WhitePawn,
    "d8": Pieces.BlackQueen,
    "e8": Pieces.BlackKing,
    "a8": Pieces.BlackRook,
    "h8": Pieces.BlackRook,
    "b8": Pieces.BlackKnight,
    "g8": Pieces.BlackKnight,
    "c8": Pieces.BlackBishop,
    "f8": Pieces.BlackBishop,
    "a7": Pieces.BlackPawn,
    "b7": Pieces.BlackPawn,
    "c7": Pieces.BlackPawn,
    "d7": Pieces.BlackPawn,
    "e7": Pieces.BlackPawn,
    "f7": Pieces.BlackPawn,
    "g7": Pieces.BlackPawn,
    "h7": Pieces.BlackPawn
}