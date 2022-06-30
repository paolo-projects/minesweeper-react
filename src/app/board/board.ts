import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoardEntry } from "mynesweeper/lib/minesweeper/board";

export interface BoardState {
    size: number;
    board: BoardEntry[];
    isLost: boolean;
    isWon: boolean;
}

export const boardSlice = createSlice({
    name: "board",
    initialState: {
        size: 8,
        board: Array.from({ length: 8 * 8 }, (_, index) => ({
            row: index / 8,
            column: index % 8,
            value: "unknown",
        })),
        isLost: false,
        isWon: false,
    } as BoardState,
    reducers: {
        setBoard: (state, board: PayloadAction<BoardEntry[]>) => {
            state.board = board.payload;
        },
        setSize: (state, size: PayloadAction<number>) => {
            state.size = size.payload;
            state.board = Array.from({ length: 8 * 8 }, (_, index) => ({
                row: index / 8,
                column: index % 8,
                value: "unknown",
            }));
        },
        setIsLost: (state, isLost: PayloadAction<boolean>) => {
            state.isLost = isLost.payload;
        },
        setIsWon: (state, isWon: PayloadAction<boolean>) => {
            state.isWon = isWon.payload;
        },
    },
});

export const { setBoard, setSize, setIsLost, setIsWon } = boardSlice.actions;

export default boardSlice.reducer;
