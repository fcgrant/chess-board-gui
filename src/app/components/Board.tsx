import React from "react";
import Square from "./Square";
import { whiteKnight } from "./Piece";

export default function Board(): JSX.Element {

    const boardDimension: number = 8;
    let position: string = "";
    let board: Array<Array<JSX.Element>> = [];
    let rank: Array<JSX.Element> = [];

    // Generate array of squares for the board and determine their positions
    for (let i = 0; i < boardDimension; i++) {
        rank = [];
        for (let j = 0; j < boardDimension; j++) {
            position = String.fromCharCode(97 + i) + ((7 - j) + 1).toString();
            rank.push(<Square position={position} piece={whiteKnight} />)
        }
        board.push(rank);
    }

    return (
        <>
            {board.map(rank => {
                return (
                    <div style={{ display: "flex", direction: "ltr" }}>
                        {rank}
                    </div>
                )
            })}
        </>
    )
}
