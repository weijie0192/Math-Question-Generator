import React from "react";
import {
    makeStyles,
    TextField,
    Divider,
    Card,
    Grid,
    Typography,
    CardContent,
    Chip,
    InputAdornment,
    IconButton,
    Grow,
} from "@material-ui/core";

import DoneIcon from "@material-ui/icons/Done";
import WrongIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 5,
    },
    content: {
        paddingBottom: "16px !important",
    },
    score: {
        float: "right",
        fontSize: "0.8em",
    },
    lastAttemptColor: {
        background: "#ff9800",
    },
    lastAttemptTextColor: {
        color: "#ff9800",
    },
    correctText: {
        color: "#4caf50",
    },
    correctColor: {
        background: "#4caf50",
    },
    result: {
        margin: "16px 0 12px 0",
    },
}));

const baseXP = 32;

const MathQuestion = ({ level, question, questionIndex, handleCheckAnswer }) => {
    const classes = useStyles();

    const [answer, setAnswer] = React.useState("");

    const isIncorrect = question.attempt === 0;
    const isLastChance = question.attempt === 1;
    const isCompleted = isIncorrect || question.correct;

    let xp = ((question.level / (level + 1)) * baseXP) / 2;

    if (isIncorrect && !question.challenge) xp /= 2;
    else xp *= question.attempt;

    return (
        <Grow in style={{ transformOrigin: "0 0 0" }} timeout={200 * (questionIndex + 1)}>
            <Grid item xs={12} sm={question.challenge ? 6 : 6} md={question.challenge ? 12 : 4}>
                <Card elevation={6}>
                    <CardContent className={classes.content}>
                        <Typography gutterBottom variant="subtitle1" component="h2">
                            <b>Question {questionIndex + 1}</b>
                            <Chip
                                size="small"
                                color={isIncorrect ? "secondary" : "primary"}
                                className={`${classes.score} ${isLastChance && classes.lastAttemptColor} ${
                                    question.correct && classes.correctColor
                                }`}
                                label={isIncorrect ? `- ${xp} XP` : `+ ${xp} XP`}
                            />
                        </Typography>
                        <Divider color="primary" />
                        <Typography variant="h6" component="p">
                            {question.operands.map((operand, i) => {
                                if (i !== question.operands.length - 1) {
                                    return `${operand} ${question.operator} `;
                                }
                                return operand;
                            })}{" "}
                            = ?
                        </Typography>
                        {isCompleted ? (
                            <div className={classes.result}>
                                <Typography color="secondary" className={question.correct ? classes.correctText : ""}>
                                    <b>
                                        Answer is {question.answer} {!isCompleted && answer && ` not ${answer}!`}
                                        <span className="floatRight">
                                            {question.correct ? (
                                                <>
                                                    Correct <DoneIcon />
                                                </>
                                            ) : (
                                                <>
                                                    Incorrect <WrongIcon />
                                                </>
                                            )}
                                        </span>
                                    </b>
                                </Typography>
                            </div>
                        ) : (
                            <TextField
                                label="Answer"
                                variant="outlined"
                                margin="dense"
                                fullWidth
                                onChange={(e) => setAnswer(e.target.value)}
                                value={answer}
                                inputProps={{
                                    type: "number",
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                disabled={isCompleted}
                                                className={`${isLastChance && classes.lastAttemptTextColor}`}
                                                color={"primary"}
                                                onClick={(e) => handleCheckAnswer(answer, questionIndex, xp)}
                                            >
                                                <DoneIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    </CardContent>
                </Card>
            </Grid>
        </Grow>
    );
};

export default MathQuestion;
