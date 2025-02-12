import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [editState, setEditState] = useState(false);
    const [hms, setHms] = useState(Array(6).fill(""));
    const inputs = useRef([]);

    const handleKeyDown = (e, idx) => {
        console.log(e.key);
        const key_val = e.key;
        if (key_val === "Backspace") {
            if (hms[idx] != "") {
                const newHms = [...hms];
                newHms[idx] = "";
                setHms(newHms);
                return;
            }

            if (idx > 0) {
                inputs.current[idx - 1].focus();
            }
        } else if (key_val.match(/^\d$/)) {
            const newHms = [...hms];
            newHms[idx] = key_val;
            setHms(newHms);

            if (idx < 5) {
                inputs.current[idx + 1].focus();
            }

            if (key_val === "") {
                if (idx > 0) {
                    inputs.current[idx - 1].focus();
                }
            }
        }
    };

    const calculateTime = (hms) => {
        const hrs = parseInt(hms[0] + hms[1]);
        const mins = parseInt(hms[2] + hms[3]);
        const secs = parseInt(hms[4] + hms[5]);
        console.log(hrs * 3600 + mins * 60 + secs);
        return hrs * 3600 + mins * 60 + secs;
    };

    const formatTime = (time) => {
        let curr_time = time;

        const hrs = Math.floor(curr_time / 3600);
        const mins = Math.floor((curr_time % 3600) / 60);
        const secs = Math.floor(curr_time % 60);

        return {
            hrs,
            mins,
            secs,
        };
    };

    const handleStart = () => {
        let curr_hms = [...hms];
        for (let i = 0; i < 6; i++) {
            if (curr_hms[i] == "") curr_hms[i] = "0";
        }
        let newTime = calculateTime(curr_hms);
        setTime(newTime);
        // console.log("hs: " + time);

        setEditState(false);
        setRunning(true);
    };
    const handleContinue = () => {
        setRunning(true);
    };
    const handleStop = () => {
        setRunning(false);
    };

    const handleReset = () => {
        setRunning(false);
        setEditState(true);
        let curr_hms = ["", "", "", "", "", ""];
        setHms(curr_hms);
    };
    useEffect(() => {
        if (running && time > 0) {
            const timer = setInterval(() => {
                setTime((prevTime) => prevTime - 1);

                console.log(time);
            }, 1000);

            return () => clearInterval(timer);
        }

        if (time == 0) {
            setRunning(false);
        }
    }, [running, time]);
    return (
        <>
            <div
                className="text"
                style={{
                    display: "flex",
                    width: "1080px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        width: "300px",
                        alignItems: "center",
                    }}
                >
                    <span>Just a simple Timer, Made with ReactJS</span>
                </div>
                <div
                    id="root"
                    // yellow bg plate
                    style={{
                        backgroundColor: "#e3b23c",
                        width: "400px",
                        height: "400px",
                        borderRadius: "40px",
                        boxShadow: "10px 5px 5px rgb(116, 115, 112)",
                    }}
                >
                    <div
                        // timer shape
                        style={{
                            marginTop: "40px",
                            padding: "15px 5px 15px 5px ",
                            border: "10px solid #edcb82",
                            boxShadow: "0px 8px #a17717",
                            backgroundColor: "#EDEBD7",
                            borderRadius: "10px",
                            height: "80px",
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        {!editState && (
                            <span
                                className="text"
                                style={{
                                    fontSize: "50px",
                                    fontWeight: "bold",
                                    color: "#212930",
                                }}
                            >
                                {formatTime(time).hrs} : {formatTime(time).mins}{" "}
                                : {formatTime(time).secs}
                            </span>
                        )}
                        {editState && (
                            <div
                                style={{
                                    // marginTop: "15px",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                {hms.map((_, idx) => {
                                    return (
                                        <>
                                            <input
                                                key={idx}
                                                type="text"
                                                maxLength="1"
                                                value={hms[idx]}
                                                onKeyDown={(e) =>
                                                    handleKeyDown(e, idx)
                                                }
                                                ref={(el) =>
                                                    (inputs.current[idx] = el)
                                                }
                                                style={{
                                                    width: "40px",
                                                    height: "40px",
                                                    margin: "0 5px",
                                                    textAlign: "center",
                                                    fontSize: "18px",
                                                    border: "1px solid #ccc",
                                                    borderRadius: "4px",
                                                }}
                                            ></input>
                                            {(idx == 1 || idx == 3) && (
                                                <span
                                                    style={{
                                                        fontWeight: 600,
                                                        fontSize: "30px",
                                                    }}
                                                >
                                                    :
                                                </span>
                                            )}
                                        </>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    <div
                        style={{
                            marginTop: "20px",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "25px",
                                fontWeight: "bold",
                                color: "#212930",
                            }}
                        >
                            Hours : Minutes : Seconds
                        </span>
                    </div>
                    <div
                        style={{
                            marginTop: "50px",
                        }}
                    >
                        {!running && (
                            <button onClick={() => handleStart()}>Start</button>
                        )}
                        {!editState && !running && (
                            <button onClick={() => handleContinue()}>
                                Continue
                            </button>
                        )}
                        {!editState && running && (
                            <button onClick={() => handleStop()}>Stop</button>
                        )}
                        {!editState && (
                            <button onClick={() => handleReset()}>Reset</button>
                        )}
                    </div>
                </div>
                {/* <div>test</div> */}
            </div>
        </>
    );
}

export default App;
