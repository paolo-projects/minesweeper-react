import Board, {
    BoardEntry,
    TestResult,
} from "mynesweeper/lib/minesweeper/board";

export default class MinesweeperService implements MinesweeperService {
    private minesweeperBoard?: Board;

    init(size: number, bombsCount: number) {
        this.minesweeperBoard = new Board({
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
        this.minesweeperBoard = new Board({
            size,
            bombsCount,
        });
    }
}
