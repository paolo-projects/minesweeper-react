import React, { useContext } from "react";
import { setBoard, setGuess, setIsLost, setIsWon } from "../app/board/board";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ServicesContext } from "../services/ServicesContext";
import styles from "./board.module.css";
import BoardCell from "./BoardCell";

type MineSweeperBoardProps = {};

export default function MineSweeperBoard({}: MineSweeperBoardProps) {
    const services = useContext(ServicesContext);
    const board = useAppSelector((state) => state.board);
    const dispatch = useAppDispatch();

    const onCellClick = (row: number, column: number) => {
        const result = services.minesweeper!.testCell(row, column);

        dispatch(setBoard(services.minesweeper!.board()));
        switch (result) {
            case "bomb":
                dispatch(setIsLost(true));
                break;
            case "won":
                dispatch(setIsWon(true));
                break;
        }
    };

    const onCellRightClick = (row: number, column: number) => {
        const cell = board.board.find(
            (v) => v.row === row && v.column === column
        );
        const guess = board.guesses.find(
            (v) => v.row === row && v.column === column
        );
        if (cell && guess && cell.value === "unknown") {
            dispatch(
                setGuess({
                    row,
                    column,
                    isProbableBomb: !guess.isProbableBomb,
                })
            );
        }
    };

    return (
        <div
            className={styles.board}
            style={{ gridTemplateColumns: `repeat(${board.size}, 53px)` }}
        >
            {board.board.map((value) => {
                const guess = board.guesses.find(
                    (v) => v.row === value.row && v.column === value.column
                );
                return guess ? (
                    <BoardCell
                        display={value.value}
                        probableBomb={guess.isProbableBomb}
                        onClick={() => onCellClick(value.row, value.column)}
                        onRightClick={() =>
                            onCellRightClick(value.row, value.column)
                        }
                        style={{
                            gridRow: value.row + 1,
                            gridColumn: value.column + 1,
                        }}
                        key={`${value.row},${value.column}`}
                    />
                ) : null;
            })}
        </div>
    );
}
