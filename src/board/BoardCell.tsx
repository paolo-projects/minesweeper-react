import clsx from "clsx";
import React, { CSSProperties } from "react";
import styles from "./board-cell.module.css";
import { useAppSelector } from "../app/hooks";
import bombSvg from "../assets/bomb-svg.svg";
import { DisplayedCell } from "mynesweeper/lib/minesweeper/board";

type BoardCellProps = {
    display: DisplayedCell;
    probableBomb: boolean;
    onClick: () => void;
    onRightClick: () => void;
    style: CSSProperties;
};

export default function BoardCell({
    display,
    probableBomb,
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
                cellClass = probableBomb
                    ? styles.probableBomb
                    : styles.untouched;
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

    const handleClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (display === "unknown" && !probableBomb) {
            onClick();
        }
    };

    const handleMouseDown = (
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
            onMouseDown={(e) => handleMouseDown(e)}
            onClick={(e) => handleClick(e)}
            onContextMenu={(e) => e.preventDefault()}
        >
            {typeof display === "number" ? (
                <div className={styles.boardCellNumber}>{display}</div>
            ) : null}
            {display === "unknown" && probableBomb ? (
                <img
                    className={styles.bombImage}
                    src={bombSvg}
                    alt="Probable bomb"
                />
            ) : null}
        </div>
    );
}
