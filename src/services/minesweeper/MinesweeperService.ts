import { MinesweeperBoard, TestResult } from "@paoloinfante/minesweeper";
import { BoardEntry } from "@paoloinfante/minesweeper/lib/minesweeper/board";

export default class MinesweeperService implements MinesweeperService {
    private minesweeperBoard?: MinesweeperBoard;

    init(size: number, bombsCount: number) {
        this.minesweeperBoard = new MinesweeperBoard({
            size: size,
            bombsCount: bombsCount,
        });
    }

    testCell(row: number, column: number): TestResult {
        return this.minesweeperBoard!.test(row, column);
    }

    board(): BoardEntry[] {
        return this.minesweeperBoard!.getBoardArray();
    }

    reset(size: number, bombsCount: number) {
        this.minesweeperBoard = new MinesweeperBoard({
            size,
            bombsCount,
        });
    }
}
