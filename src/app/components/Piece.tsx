import Image from "next/image";

interface Props {
    name: string,
    startingPosition: string,
    color: string,
    currentPosition: string,
    value: number,
    imagePath: string
}
export default function Piece(props: Props): JSX.Element {


    return (
        <Image></Image>

    )
}