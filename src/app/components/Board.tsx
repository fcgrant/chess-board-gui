import React, { useState } from "react";
import Square from "./Square";
import StartingBoardConfig from "../common/configs/boardConfig";

export default function Board(): JSX.Element {
    const [currentBoardConfig, setCurrentBoardConfig] = useState(StartingBoardConfig)
    const boardDimension: number = 8;
    let board: Array<Array<JSX.Element>> = [];
    let boardRank: Array<JSX.Element> = [];

    function updateBoardConfig(pieceName: string, pieceImage: string, previousPosition: string, currentPosition: string) {
        let tempBoardConfig = currentBoardConfig
        delete tempBoardConfig[previousPosition]
        tempBoardConfig[currentPosition] = [pieceName, pieceImage]
        setCurrentBoardConfig({ ...tempBoardConfig })
    }

    // Generate array of squares for the board and determine their positions and
    // if a piece occupies them
    for (let rank = boardDimension; rank > 0; rank--) {
        boardRank = [];
        for (let file = 0; file < boardDimension; file++) {
            // Generate a string for the given position based on the unicode value
            // of the file and the rank number
            let position = String.fromCharCode(97 + file) + (rank).toString();
            boardRank.push(
                <Square
                    position={position}
                    currentBoardConfig={currentBoardConfig}
                    updateBoardConfig={updateBoardConfig}
                />
            )
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
