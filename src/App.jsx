import React from "react";
import { Fade } from "@material-ui/core";
import Header from "./components/Header";
import QuestionContainer from "components/QuestionContainer";
import { getLevel } from "common";
import usePersistState from "usePersistState";
import "fontsource-roboto";
import LogModal from "components/LogModal";

const defaultState = {
    xp: 0,
};

const App = () => {
    const [status, setStatus] = usePersistState("status", defaultState);
    const [showLog, setShowLog] = React.useState(false);
    const logRef = React.useRef([]);

    const level = getLevel(status.xp);
    const handleUpdateXP = (xp, reason) => {
        logRef.current.push({
            currentXP: status.xp,
            xp,
            reason,
            date: new Date().toLocaleString(),
        });
        setStatus({
            ...status,
            xp: status.xp + xp,
        });
    };

    React.useEffect(() => {
        const storedLog = localStorage.getItem("log");
        if (storedLog) {
            logRef.current = JSON.parse(storedLog);
        }
        window.addEventListener("beforeunload", function (e) {
            localStorage.setItem("log", JSON.stringify(logRef.current));
        });
    }, []);

    return (
        <Fade in>
            <div>
                <Header setShowLog={setShowLog} status={status} />
                <QuestionContainer handleUpdateXP={handleUpdateXP} level={level} />
                <LogModal setShowLog={setShowLog} logRef={logRef} open={showLog} />
                <footer>Copyright © 2020 Wei J. Zheng. All rights reserved.</footer>
            </div>
        </Fade>
    );
};

export default App;
