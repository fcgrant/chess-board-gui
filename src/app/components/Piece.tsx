import Image from "next/image";
import { DragEvent } from "react";
type Props = {
    name: string,
    imagePath: string,
    value: number
}

function Piece(props: Props): JSX.Element {
    const pieceDimension: number = 100;

    function handleOnDrag(e: DragEvent) {
        e.dataTransfer.setData("name", props.name)
    }

    return (
        <Image
            height={pieceDimension}
            width={pieceDimension}
            src={props.imagePath}
            alt={props.name}
            draggable
            onDragStart={(e) => handleOnDrag(e)}
        />
    )
}

type PieceList = {
    [index: string]: JSX.Element
}

export const Pieces: PieceList = {
    WhiteKing: <Piece name="White King" imagePath="/white-king.svg" value={0} />,
    WhiteQueen: <Piece name="White Queen" imagePath="/white-queen.svg" value={9} />,
    WhiteRook: <Piece name="White Rook" imagePath="/white-rook.svg" value={5} />,
    WhiteKnight: <Piece name="White Knight" imagePath="/white-knight.svg" value={3} />,
    WhiteBishop: <Piece name="White Bishop" imagePath="/white-bishop.svg" value={3} />,
    WhitePawn: <Piece name="White Pawn" imagePath="/white-pawn.svg" value={1} />,
    BlackKing: <Piece name="Black King" imagePath="/black-king.svg" value={0} />,
    BlackQueen: <Piece name="Black Queen" imagePath="/black-queen.svg" value={9} />,
    BlackRook: <Piece name="Black Rook" imagePath="/black-rook.svg" value={5} />,
    BlackKnight: <Piece name="Black Knight" imagePath="/black-knight.svg" value={3} />,
    BlackBishop: <Piece name="Black Bishop" imagePath="/black-bishop.svg" value={3} />,
    BlackPawn: <Piece name="Black Pawn" imagePath="/black-pawn.svg" value={1} />
}