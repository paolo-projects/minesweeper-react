import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoardEntry } from "mynesweeper/lib/minesweeper/board";

export type GuessEntry = {
    row: number;
    column: number;
    isProbableBomb: boolean;
};

export interface BoardState {
    size: number;
    board: BoardEntry[];
    guesses: GuessEntry[];
    isLost: boolean;
    isWon: boolean;
}

export const boardSlice = createSlice({
    name: "board",
    initialState: {
        size: 8,
        board: [],
        guesses: [],
        isLost: false,
        isWon: false,
    } as BoardState,
    reducers: {
        setBoard: (state, board: PayloadAction<BoardEntry[]>) => {
            state.board = board.payload;
        },
        setSize: (state, size: PayloadAction<number>) => {
            state.size = size.payload;
            state.board = [];
            state.guesses = [];
        },
        setIsLost: (state, isLost: PayloadAction<boolean>) => {
            state.isLost = isLost.payload;
        },
        setIsWon: (state, isWon: PayloadAction<boolean>) => {
            state.isWon = isWon.payload;
        },
        setGuess: (state, value: PayloadAction<GuessEntry>) => {
            const cell = state.guesses.find(
                (v) =>
                    v.row === value.payload.row &&
                    v.column === value.payload.column
            );
            if (cell) {
                cell.isProbableBomb = value.payload.isProbableBomb;
            }
        },
        setGuesses: (state, value: PayloadAction<GuessEntry[]>) => {
            state.guesses = value.payload;
        },
    },
});

export const { setBoard, setSize, setIsLost, setIsWon, setGuess, setGuesses } =
    boardSlice.actions;

export default boardSlice.reducer;
