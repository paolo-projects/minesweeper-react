import React, { ChangeEvent, useState } from "react";
import styles from "./game-controls.module.css";

export type SizeOption = {
    size: number;
    bombOptions: number[];
};

const sizeOptions: SizeOption[] = [
    {
        size: 6,
        bombOptions: [6, 10],
    },
    {
        size: 8,
        bombOptions: [6, 10, 12],
    },
    {
        size: 12,
        bombOptions: [6, 10, 12, 16, 18],
    },
    {
        size: 20,
        bombOptions: [6, 10, 12, 16, 24, 64],
    },
];

type GameControlsProps = {
    onChange: (size: number, bombCount: number) => void;
    onReset: () => void;
    defaultOptions: [number, number];
};

export default function GameControls({
    onChange,
    onReset,
    defaultOptions,
}: GameControlsProps) {
    const [selectedSizeOption, setSelectedSizeOption] = useState(
        sizeOptions.find((d) => d.size === defaultOptions[0]) || sizeOptions[0]
    );
    const [selectedBombCount, setSelectedBombCount] = useState(
        selectedSizeOption.bombOptions.includes(defaultOptions[1])
            ? defaultOptions[1]
            : selectedSizeOption.bombOptions[0]
    );

    const handleSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const sizeOption = sizeOptions.find(
            (s) => s.size === parseInt(event.target.value)
        );
        if (sizeOption) {
            setSelectedSizeOption(sizeOption);
            setSelectedBombCount(sizeOption.bombOptions[0]);

            onChange(sizeOption.size, sizeOption.bombOptions[0]);
        }
    };

    const handleBombCountChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const option = parseInt(event.target.value);
        if (option && selectedSizeOption.bombOptions.includes(option)) {
            setSelectedBombCount(option);
            onChange(selectedSizeOption.size, option);
        }
    };

    return (
        <div className={styles.controlsContainer}>
            <label>
                Board size
                <select
                    value={selectedSizeOption.size}
                    onChange={handleSizeChange}
                >
                    {sizeOptions.map((o) => (
                        <option value={o.size}>{o.size}</option>
                    ))}
                </select>
            </label>
            <label>
                Bombs count
                <select
                    value={selectedBombCount}
                    onChange={handleBombCountChange}
                >
                    {selectedSizeOption.bombOptions.map((b) => (
                        <option value={b}>{b}</option>
                    ))}
                </select>
            </label>
            <button onClick={() => onReset()}>Reset</button>
        </div>
    );
}
