import { BoardEntry, TestResult } from "mynesweeper/lib/minesweeper/board";

export default interface MinesweeperServiceInterface {
    testCell(row: number, column: number): TestResult;
    board(): BoardEntry[];
    reset(size: number, bombsCount: number): void;
}
