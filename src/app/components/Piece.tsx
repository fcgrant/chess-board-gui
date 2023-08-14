import Image from "next/image";
import { DragEvent } from "react";
type Props = {
    name: string,
    imagePath: string,
    position: string,
}

export default function Piece(props: Props): JSX.Element {
    const pieceDimension: number = 100;

    function handleOnDragStart(e: DragEvent) {
        e.dataTransfer.setData("name", props.name)
        e.dataTransfer.setData("imagePath", props.imagePath)
        e.dataTransfer.setData("position", props.position)
    }

    return (
        <Image
            height={pieceDimension}
            width={pieceDimension}
            src={props.imagePath}
            alt={props.name}
            draggable
            onDragStart={(e) => handleOnDragStart(e)}
        />
    )
}