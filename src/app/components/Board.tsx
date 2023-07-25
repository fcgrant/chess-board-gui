import React from "react";
import Square from "./Square";
import { List } from "postcss/lib/list";

export default function Board(): JSX.Element {


    const boardDimension: number = 8;
    let piecesOnBoard: Array<JSX.Element>;
    let board: Array<JSX.Element>;

    for (let i = 0; i < boardDimension; i++) {
        for (let j = 0; j < boardDimension; j++) {

        }
    }
    return (
        <>
            <Square
                position="a1"
            />
            <Square
                position="a2"
            />
            <Square
                position="a3"
            />
            <Square
                position="a4"
            />
        </>
    )
}
