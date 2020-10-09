import React from "react";
import "fontsource-roboto";
import { ThemeProvider } from "@material-ui/core";
import theme from "theme";
import Header from "./components/Header";
import { getQuestions } from "mathFactory";
import QuestionContainer from "components/QuestionContainer";
import { getLevel } from "common";

const App = () => {
    const [status, setStatus] = React.useState({
        xp: 0
    });

    const level = getLevel(status.xp);

    return (
        <ThemeProvider theme={theme}>
            <Header status={status} />
            <QuestionContainer level={level} />
        </ThemeProvider>
    );
};

export default App;
