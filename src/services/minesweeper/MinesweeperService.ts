import Board, {
    BoardEntry,
    TestResult,
} from "mynesweeper/lib/minesweeper/board";
import Matrix from "mynesweeper/lib/utils/matrix";

export default class MinesweeperService implements MinesweeperService {
    private minesweeperBoard: Board;

    constructor() {
        this.minesweeperBoard = new Board({
            size: 8,
            bombsCount: 20,
        });
    }

    testCell(row: number, column: number): TestResult {
        return this.minesweeperBoard.test(row, column);
    }

    board(): BoardEntry[] {
        return this.minesweeperBoard.getBoardArray();
    }

    reset(size: number, bombsCount: number) {
        this.minesweeperBoard = new Board({
            size,
            bombsCount,
        });
    }
}
