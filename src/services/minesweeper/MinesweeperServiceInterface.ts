import { TestResult } from "@paoloinfante/minesweeper";
import { BoardEntry } from "@paoloinfante/minesweeper/lib/minesweeper/board";

export default interface MinesweeperServiceInterface {
    init(size: number, bombsCount: number): void;
    testCell(row: number, column: number): TestResult;
    board(): BoardEntry[];
    reset(size: number, bombsCount: number): void;
}
