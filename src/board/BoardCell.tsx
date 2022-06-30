import clsx from "clsx";
import React, { CSSProperties } from "react";
import styles from "./board-cell.module.css";
import { DisplayedCell } from "mynesweeper/lib/minesweeper/board";
import { useAppSelector } from "../app/hooks";

type BoardCellProps = {
    display: DisplayedCell;
    onClick: () => void;
    onRightClick: () => void;
    style: CSSProperties;
};

export default function BoardCell({
    display,
    onClick,
    onRightClick,
    style,
}: BoardCellProps) {
    const isLost = useAppSelector((state) => state.board.isLost);
    const isWon = useAppSelector((state) => state.board.isWon);
    let cellClass = styles.untouched;

    if (isWon) {
        cellClass = styles.won;
    } else if (isLost) {
        cellClass = styles.bomb;
    } else {
        switch (display) {
            case "unknown":
                cellClass = styles.untouched;
                break;
            case "empty":
                cellClass = styles.empty;
                break;
            case "bomb":
                cellClass = styles.bomb;
                break;
            default:
                if (typeof display === "number") {
                    cellClass = styles.number;
                }
                break;
        }
    }

    const onMouseDown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (event.button === 2) {
            event.preventDefault();
            event.stopPropagation();
            onRightClick();
        }
    };

    return (
        <div
            className={clsx(styles.boardCell, cellClass)}
            style={style}
            onMouseDown={(e) => onMouseDown(e)}
            onClick={() => onClick()}
        >
            {typeof display === "number" ? (
                <div className={styles.boardCellNumber}>{display}</div>
            ) : null}
        </div>
    );
}
