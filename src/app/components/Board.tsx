import React, { useState } from "react";
import Square from "./Square";
import StartingGameConfig from "../common/configs/gameConfig";
import convertPositionToNumber, { convertPositionToString } from "../common/PositionConversions";

export default function Board(): JSX.Element {
    const [currentGameConfig, setCurrentGameConfig] = useState(StartingGameConfig)
    const boardDimension: number = 8;
    let board: Array<Array<JSX.Element>> = [];
    let boardRank: Array<JSX.Element> = [];

    function updateGameConfig(piece: string, pieceImage: string, previousPosition: string, currentPosition: string) {
        const [pieceColour, pieceName] = piece.split(" ")
        let tempGameConfig = currentGameConfig
        // Update board config to reflect the new move
        delete tempGameConfig.boardConfig[previousPosition]
        tempGameConfig.boardConfig[currentPosition] = [piece, pieceImage]
        // Update the half move counter
        tempGameConfig.halfMove += 1
        // Update the full move counter if the moved piece was black
        if (pieceColour === "Black") {
            tempGameConfig.fullMove += 1
        }
        // Change the active colour to the opposite of the piece just moved
        tempGameConfig.activeColour === "White" ? tempGameConfig.activeColour = "Black" : tempGameConfig.activeColour = "White"
        // Calculate if the move allows en passant
        tempGameConfig.enPassant = allowsEnPassant(pieceName, pieceColour, previousPosition, currentPosition)
        // Calculate if the move removes the right to castle


        console.log(tempGameConfig)
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

// Function to return a square that can be moved to via en passant, or returns 
// - if en passant is not possible
function allowsEnPassant(pieceName: string, pieceColour: string, previousPosition: string, currentPosition: string) {
    if (pieceName !== "Pawn") {
        return "-"
    }
    const [previousFile, previousRank] = convertPositionToNumber(previousPosition)
    const [currentFile, currentRank] = convertPositionToNumber(currentPosition)

    // If the pawn moved two squares, then the square inbetween the previous and
    // current square can be moved to via en passant
    if (Math.abs(currentRank - previousRank) === 2) {
        if (pieceColour === "White") {
            return convertPositionToString(previousFile, previousRank + 1)
        } else {
            return convertPositionToString(previousFile, previousRank - 1)
        }
    }
    // If the pawn only moved once, then en passant is not possible
    return "-"
}

function checkCastlingRights(piece: string, previousPosition: string, currentPosition: string) {

}
