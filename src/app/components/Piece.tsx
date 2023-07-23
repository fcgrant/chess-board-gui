import Image from "next/image";

export default function Piece(name: string, imagePath: string, value: number): JSX.Element {

    const pieceDimension: number = 100;
    const pieceValue: number = value;


    return (
        <Image
            height={pieceDimension}
            width={pieceDimension}
            src={imagePath}
            alt={name}
        />
    )
}