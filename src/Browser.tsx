import type {DiskDef} from "./disks";
import {DISKS_BY_YEAR} from "./disks";
import type {MachineDef} from "./machines";
import "./Browser.css";
import {ScreenFrame} from "./ScreenFrame";
import {useState} from "react";
import {Button} from "./Button";

export type BrowserRunDef = {
    disk: DiskDef;
    machine: MachineDef;
};

export type BrowserProps = {
    onRun: (def: BrowserRunDef) => void;
};

export function Browser({onRun}: BrowserProps) {
    return (
        <div className="Browser">
            <h1>Infinite Mac</h1>
            {Array.from(Object.entries(DISKS_BY_YEAR), ([year, disks]) => (
                <div className="Year" key={year}>
                    <h2>{year}</h2>
                    <div className="Disks">
                        {disks.map(disk => (
                            <Disk disk={disk} onRun={onRun} key={disk.name} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export type DiskProps = {
    disk: DiskDef;
    onRun: (def: BrowserRunDef) => void;
};

function Disk(props: DiskProps) {
    return (
        <ScreenFrame
            className="Disk"
            bezelStyle={props.disk.bezelStyle}
            width={320}
            height={240}
            bezelSize="Medium"
            screen={<DiskContents {...props} />}
        />
    );
}

function DiskContents({disk, onRun}: DiskProps) {
    const [customizing, setCustomizing] = useState(false);
    const [machine, setMachine] = useState(disk.machines[0]);
    const run = () => {
        onRun({disk, machine});
    };

    let contents;
    if (customizing) {
        contents = (
            <div className="Row">
                Machine:{" "}
                <select
                    value={machine.name}
                    onChange={e =>
                        setMachine(disk.machines[e.target.selectedIndex])
                    }>
                    {disk.machines.map((machine, i) => (
                        <option value={machine.name} key={i}>
                            {machine.name}
                        </option>
                    ))}
                </select>
            </div>
        );
    } else {
        contents = <div className="Row">{disk.description}</div>;
    }
    const buttonAppearance =
        disk.bezelStyle === "Beige" ? "Classic" : "Platinum";
    return (
        <div className="DiskContents">
            <h3 className="Row">
                {disk.displayName}
                {disk.displaySubtitle && (
                    <span className="Subtitle"> ({disk.displaySubtitle})</span>
                )}
            </h3>
            {contents}
            <div className="Row Buttons">
                {!customizing && (
                    <Button
                        appearance={buttonAppearance}
                        className="CustomizeButton"
                        onClick={() => setCustomizing(true)}>
                        Customize…
                    </Button>
                )}
                <Button appearance={buttonAppearance} onClick={run}>
                    Run
                </Button>
            </div>
        </div>
    );
}
