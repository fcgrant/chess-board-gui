import React, { useState } from "react";
import Square from "./Square";
import StartingGameConfig from "../common/configs/gameConfig";

export default function Board(): JSX.Element {
    const [currentGameConfig, setCurrentGameConfig] = useState(StartingGameConfig)
    const boardDimension: number = 8;
    let board: Array<Array<JSX.Element>> = [];
    let boardRank: Array<JSX.Element> = [];

    function updateGameConfig(pieceName: string, pieceImage: string, previousPosition: string, currentPosition: string) {
        const [pieceColour, piece] = pieceName.split(" ")
        let tempGameConfig = currentGameConfig
        // Update board config to reflect the new move
        delete tempGameConfig.boardConfig[previousPosition]
        tempGameConfig.boardConfig[currentPosition] = [pieceName, pieceImage]
        // Update the half move counter
        tempGameConfig.halfMove += 1
        // Update the full move counter if the moved piece was black
        if (pieceColour === "Black") {
            tempGameConfig.fullMove += 1
        }
        // Change the active colour to the opposite of the piece just moved
        tempGameConfig.activeColour === "White" ? tempGameConfig.activeColour = "Black" : tempGameConfig.activeColour = "White"
        // Calculate if the move allows en passant

        // Calculate if the move removes the right to castle



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

function allowsEnPassant(piece: string, previousPosition: string, currentPosition: string) {

}

function checkCastlingRights(piece: string, previousPosition: string, currentPosition: string) {

}
