import React from "react";
import Square from "./Square";

export default function Board(): JSX.Element {

    const boardDimension: number = 8;
    let position, file: string = "";
    let rank: number;
    let board: Array<JSX.Element> = [];

    for (let i = 0; i < boardDimension; i++) {
        for (let j = 0; j < boardDimension; j++) {
            file = String.fromCharCode(97 + i)
            rank = j + 1;
            position = file + rank.toString();
            board.push(<Square position={position} />)
        }
    }

    return (
        <div>
            {board}
        </div>
    )
}
