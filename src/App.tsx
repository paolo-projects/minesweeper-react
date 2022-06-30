import React, { useContext, useEffect } from "react";
import "./App.css";
import { setBoard, setGuesses, setSize } from "./app/board/board";
import { useAppDispatch } from "./app/hooks";
import MineSweeperBoard from "./board/MineSweeperBoard";
import { ServicesContext } from "./services/ServicesContext";

function App() {
    const dispatch = useAppDispatch();
    const context = useContext(ServicesContext);

    useEffect(() => {
        if (context.minesweeper && dispatch) {
            context.minesweeper.init(8, 12);
            const board = context.minesweeper.board();
            dispatch(setSize(10));
            dispatch(setBoard(board));
            dispatch(
                setGuesses(
                    board.map((v) => ({
                        row: v.row,
                        column: v.column,
                        isProbableBomb: false,
                    }))
                )
            );
        }
    }, [dispatch, context]);

    return (
        <div className="App">
            <MineSweeperBoard />
        </div>
    );
}

export default App;
