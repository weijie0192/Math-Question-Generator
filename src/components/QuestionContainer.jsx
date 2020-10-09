import React from "react";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    container: {}
}));

const QuestionContainer = () => {
    const classes = useStyles();
    return (
        <div>
            <Button>Generate Question (-50 xp)</Button>
        </div>
    );
};

export default QuestionContainer;
