import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import {
    setBoard,
    setGuesses,
    setIsLost,
    setIsWon,
    setSize,
} from "./app/board/board";
import { useAppDispatch } from "./app/hooks";
import MineSweeperBoard from "./board/MineSweeperBoard";
import GameControls from "./controls/GameControls";
import { ServicesContext } from "./services/ServicesContext";

const DefaultBoardOptions: [number, number] = [8, 12];

function App() {
    const dispatch = useAppDispatch();
    const context = useContext(ServicesContext);

    const [boardOptions, setBoardOptions] = useState(DefaultBoardOptions);

    useEffect(() => {
        if (context.minesweeper && dispatch) {
            context.minesweeper.init(boardOptions[0], boardOptions[1]);
            const board = context.minesweeper.board();
            dispatch(setSize(boardOptions[0]));
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
            dispatch(setIsLost(false));
            dispatch(setIsWon(false));
        }
    }, [dispatch, context, boardOptions]);

    const handleReset = () => {
        setBoardOptions([...boardOptions]);
    };

    const handleOptionsChange = (size: number, bombsCount: number) => {
        setBoardOptions([size, bombsCount]);
    };

    return (
        <div className="App">
            <GameControls
                onChange={handleOptionsChange}
                onReset={handleReset}
                defaultOptions={DefaultBoardOptions}
            />
            <MineSweeperBoard />
        </div>
    );
}

export default App;
