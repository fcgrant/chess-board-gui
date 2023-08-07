import React from "react"

interface Props {
    piece?: JSX.Element,
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
    const rank = (position[1] as unknown) as number

    // A position is white/light if the file is odd and the rank is even, or the
    // file is even and the rank is odd
    if ((file + rank) % 2 === 0) {
        return true
    }
    return false
}

export default function Square(props: Props): JSX.Element {

    const squareDimensions: number = 100;
    let squareColour: string;

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
    return <div style={squareStyle}>{props.piece}</div>
}
