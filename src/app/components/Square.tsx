import React from "react"

interface Props {
    piece: JSX.Element,
    color: boolean
}
export default function Square(props: Props) {

    let squareColor: string;
    if (props.color) {
        squareColor = "SaddleBrown"
    } else {
        squareColor = "BlanchedAlmond"
    }

    const squareStyle = {
        "background-color": squareColor,
        "height": "100px",
        "width": "100px"
    }
    return <div style={squareStyle}>{props.piece}</div>
}
