import { BoardEntry, TestResult } from "mynesweeper/lib/minesweeper/board";

export default interface MinesweeperServiceInterface {
    init(size: number, bombsCount: number): void;
    testCell(row: number, column: number): TestResult;
    board(): BoardEntry[];
    reset(size: number, bombsCount: number): void;
}
