import React from "react";
import { Button, makeStyles, Container, Grid } from "@material-ui/core";
import usePersistState from "usePersistState";
import { generateQuestionsByLevel } from "mathFactory";
import { getRank } from "common";
import MathQuestion from "./MathQuestion";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.mixins.toolbar.minHeight + 20,
        marginBottom: 20,
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
    },
    generateBtn: {
        borderRadius: "50px",
        width: "50%",
        minWidth: 250,
    },
}));

const QuestionContainer = ({ level, handleUpdateXP }) => {
    const classes = useStyles();

    const [questions, setQuestions] = usePersistState("questions", () => generateQuestionsByLevel(level));

    const shouldGenerateCostXP = level > 0 && questions.some((q) => !q.correct && q.attempt > 0);

    const handleGenerateQuestions = () => {
        if (shouldGenerateCostXP) {
            handleUpdateXP(-50, "Refresh Questions");
        }
        setQuestions(generateQuestionsByLevel(level));
    };

    const handleCheckAnswer = (answer, index, xp) => {
        if (answer) {
            let xpChange = 0;
            setQuestions(
                questions.map((q, i) => {
                    if (i === index) {
                        answer = parseInt(answer);
                        if (answer === q.answer) {
                            xpChange = xp;
                            return {
                                ...q,
                                correct: true,
                            };
                        }

                        const newAttempt = q.attempt - 1;
                        if (newAttempt === 0) {
                            xpChange = -xp;
                        }
                        return {
                            ...q,
                            attempt: newAttempt,
                        };
                    }
                    return q;
                })
            );

            if (xpChange) {
                handleUpdateXP(xpChange, "Answered Question");
            }
        }
    };

    return (
        <Container maxWidth="md" className={classes.container}>
            <br />
            <Button
                color="primary"
                className={classes.generateBtn}
                variant="contained"
                onClick={handleGenerateQuestions}
            >
                Refresh {getRank(level)} Questions {shouldGenerateCostXP && "(-50 XP)"}
            </Button>
            <br />

            <Grid container spacing={2}>
                {questions.map((question, questionIndex) => (
                    <MathQuestion
                        level={level}
                        handleCheckAnswer={handleCheckAnswer}
                        key={question.id}
                        question={question}
                        questionIndex={questionIndex}
                    />
                ))}
            </Grid>
        </Container>
    );
};

export default React.memo(QuestionContainer);
