import React from "react";
import { AppBar, Toolbar, Typography, makeStyles, Button } from "@material-ui/core";
import { getNextLevelXP, getRank, getLevel } from "common";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    rank: {
        fontFamily: '"Comic Sans MS", Gadget, sans-serif',
        textTransform: "uppercase",
    },
    higherRank: {
        textShadow: "-2px -2px 8px rgba(221, 255, 26, 1);",
    },
    container: {
        justifyContent: "center",
    },
}));

const NumberChanger = ({ number }) => {
    const [state, setState] = React.useState(number);

    React.useEffect(() => {
        if (state !== number) {
            const diff = number - state;
            const timeout = setTimeout(() => {
                setState(state + (diff > 0 ? 1 : -1));
            }, 20);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [state, number]);

    return state;
};

const Header = ({ status, setShowLog }) => {
    const classes = useStyles();
    const level = getLevel(status.xp);
    const rankStyle = `${classes.rank} ${status.xp > 4000 && classes.higherRank}`;

    return (
        <AppBar position="fixed">
            <Toolbar className={classes.container}>
                <Button
                    color="inherit"
                    onClick={() => {
                        setShowLog(true);
                    }}
                >
                    <Typography variant="h4" className={rankStyle}>
                        <b>{getRank(level)}</b>
                    </Typography>
                    &nbsp; &nbsp;
                    <Typography variant="subtitle2" className={rankStyle}>
                        <NumberChanger number={status.xp} />/{getNextLevelXP(level)} XP
                    </Typography>
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default React.memo(Header);
