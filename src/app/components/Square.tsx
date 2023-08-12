import React, { DragEvent, useState } from "react"
import { StartingBoardConfig } from "../common/configs/boardConfig"
import { Pieces } from "./Piece"

interface Props {
    position: string
}
// Function to return the colour of the square given its position string
function colourFromPosition(position: string): string {
    const positionRegex = "^[a-h][1-8]$"
    // Split position string into rank and file
    if (position.length !== 2) {
        throw "Position string must be of length 2"
    } else if (!position.match(positionRegex)) {
        throw "Position string must be a valid chess position"
    }

    // Get the value of the alphabetic file as a number, e.g. a is 1, b is 2, by
    // getting its unicode value and subtracting 96, since the unicode value of
    // a is 97
    const file = position[0].charCodeAt(0) - 96
    const rank = parseInt(position[1])

    if ((file + rank) % 2 === 0) {
        return "SaddleBrown"
    }
    return "BlanchedAlmond"
}

export default function Square(props: Props): JSX.Element {
    let currentBoardConfig = StartingBoardConfig
    const [occupyingPiece, setOccupyingPiece] = useState(currentBoardConfig[props.position])
    const squareStyle = {
        "backgroundColor": colourFromPosition(props.position),
        "height": 100,
        "width": 100
    }

    function handleOnDragOver(e: DragEvent) {
        e.preventDefault()
    }

    function handleOnDrop(e: DragEvent) {
        const pieceName = e.dataTransfer.getData("name")
        Object.keys(Pieces).forEach((piece) => {
            if (Pieces[piece].props.name === pieceName) {
                setOccupyingPiece(Pieces[piece])
            }
        })
    }

    return <div
        style={squareStyle}
        onDragOver={(e) => handleOnDragOver(e)}
        onDrop={(e) => handleOnDrop(e)}
    >
        {occupyingPiece}
    </div>
}
