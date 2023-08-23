import React, { DragEvent } from "react"
import Piece from "./Piece"
import { GameConfig } from "../common/configs/gameConfig"
import { colourFromPosition } from "../common/PositionConversions"
import ValidateMove from "../common/ValidateMove"

interface Props {
    position: string,
    currentGameConfig: GameConfig,
    updateBoardConfig: Function,
}

export default function Square(props: Props): JSX.Element {

    let occupyingPiece: JSX.Element | undefined
    const pieceDetails: Array<string> | undefined = props.currentGameConfig.boardConfig[props.position]
    const squareStyle = {
        "backgroundColor": colourFromPosition(props.position),
        "height": 100,
        "width": 100
    }

    function handleOnDragOver(e: DragEvent) {
        e.preventDefault()
    }

    function handleOnDrop(e: DragEvent) {
        const pieceName = e.dataTransfer.getData("name")
        const pieceImage = e.dataTransfer.getData("imagePath")
        const previousPosition = e.dataTransfer.getData("position")

        if (ValidateMove(pieceName, previousPosition, props.position, props.currentGameConfig)) {
            props.updateBoardConfig(pieceName, pieceImage, previousPosition, props.position)
        }
    }

    if (pieceDetails) {
        occupyingPiece =
            <Piece
                name={pieceDetails[0]}
                imagePath={pieceDetails[1]}
                position={props.position}
            />
    } else {
        occupyingPiece = undefined
    }

    return (
        <>
            <div
                style={squareStyle}
                onDragOver={(e) => handleOnDragOver(e)}
                onDrop={(e) => handleOnDrop(e)}
            >
                {occupyingPiece}
            </div>
        </>
    )
}
