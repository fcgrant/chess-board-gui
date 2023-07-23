import React from "react"

interface Props {
    piece?: JSX.Element,
    color: boolean
}
export default function Square(props: Props): JSX.Element {

    const squareDimensions: number = 100;
    let squareColor: string;

    if (props.color) {
        squareColor = "SaddleBrown"
    } else {
        squareColor = "BlanchedAlmond"
    }

    const squareStyle = {
        "background-color": squareColor,
        "height": squareDimensions,
        "width": squareDimensions
    }
    return <div style={squareStyle}>{props.piece}</div>
}
