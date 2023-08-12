import React, { DragEvent, useState } from "react"
import { StartingBoardConfig } from "../common/configs/boardConfig"
import { Pieces } from "./Piece"

interface Props {
    position: string
}
// Function to indicate the colour of the square given its position string. True
// is returned for black/dark squares, and false is returned for white/light
// squares
function colourFromPosition(position: string): boolean {
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

    // A position is white/light if the file is odd and the rank is even, or the
    // file is even and the rank is odd
    if ((file + rank) % 2 === 0) {
        return true
    }
    return false
}

export default function Square(props: Props): JSX.Element {
    let currentBoardConfig = StartingBoardConfig
    const [occupyingPiece, setOccupyingPiece] = useState(currentBoardConfig[props.position])
    const squareDimensions: number = 100;
    let squareColour: string;

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

    if (colourFromPosition(props.position)) {
        squareColour = "SaddleBrown"
    } else {
        squareColour = "BlanchedAlmond"
    }

    const squareStyle = {
        "backgroundColor": squareColour,
        "height": squareDimensions,
        "width": squareDimensions
    }

    return <div
        style={squareStyle}
        onDragOver={(e) => handleOnDragOver(e)}
        onDrop={(e) => handleOnDrop(e)}
    >
        {occupyingPiece}
    </div>
}
