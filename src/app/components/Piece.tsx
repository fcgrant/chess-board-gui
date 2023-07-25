import Image from "next/image";

type Props = {
    name: string,
    imagePath: string,
    value: number
}

function Piece(props: Props): JSX.Element {

    const pieceDimension: number = 100;
    const pieceValue: number = props.value;


    return (
        <Image
            height={pieceDimension}
            width={pieceDimension}
            src={props.imagePath}
            alt={props.name}
        />
    )
}

export const whiteKnight = <Piece name="White Knight" imagePath="/light-knight.svg" value={3} />