import React from "react";
import Square from "./Square";
import { StartingBoardConfig } from "../common/configs/boardConfig";


export default function Board(): JSX.Element {

    const boardDimension: number = 8;
    let currentBoardConfig = StartingBoardConfig;
    let position: string = "";
    let board: Array<Array<JSX.Element>> = [];
    let boardRank: Array<JSX.Element> = [];

    // Generate array of squares for the board and determine their positions and
    // if a piece occupies them
    for (let rank = boardDimension; rank > 0; rank--) {
        boardRank = [];
        for (let file = 0; file < boardDimension; file++) {
            // Generate a string for the given position based on the unicode value
            // of the file and the rank number
            position = String.fromCharCode(97 + file) + (rank).toString();
            // Find if a piece occupies this square based on the board configuration
            boardRank.push(<Square position={position} piece={currentBoardConfig[position]} />)
        }
        board.push(boardRank);
    }

    return (
        <div>
            {board.map(boardRank => {
                return (
                    <div style={{ display: "flex", direction: "ltr" }}>
                        {boardRank}
                    </div>
                )
            })}
        </div>
    )
}
