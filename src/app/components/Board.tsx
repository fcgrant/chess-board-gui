import React, { useState } from "react";
import Square from "./Square";
import StartingGameConfig from "../common/configs/gameConfig";

export default function Board(): JSX.Element {
    const [currentGameConfig, setCurrentGameConfig] = useState(StartingGameConfig)
    const boardDimension: number = 8;
    let board: Array<Array<JSX.Element>> = [];
    let boardRank: Array<JSX.Element> = [];

    function updateGameConfig(pieceName: string, pieceImage: string, previousPosition: string, currentPosition: string) {
        let tempGameConfig = currentGameConfig
        delete tempGameConfig.boardConfig[previousPosition]
        tempGameConfig.boardConfig[currentPosition] = [pieceName, pieceImage]
        setCurrentGameConfig({ ...tempGameConfig })
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
                    currentGameConfig={currentGameConfig}
                    updateBoardConfig={updateGameConfig}
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
