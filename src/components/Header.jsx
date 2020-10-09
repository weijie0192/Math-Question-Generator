import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Tooltip,
    makeStyles,
    Chip
} from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import { getNextLevelXP, getRank } from "common";

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1
    },
    rank: {
        fontFamily: '"Comic Sans MS", Gadget, cursive, sans-serif',
        textTransform: "uppercase"
    },
    higherRank: {
        textShadow: "-2px -2px 8px rgba(221, 255, 26, 1);"
    }
}));

const Header = ({ status }) => {
    const classes = useStyles();

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography
                    variant="h5"
                    className={`${classes.rank} ${status.xp > 4000 && classes.higherRank}`}
                >
                    <b>{getRank(status.xp)}</b>
                </Typography>
                &nbsp; &nbsp;
                <Typography
                    variant="subtitle2"
                    className={`${classes.rank} ${status.xp > 4000 && classes.higherRank}`}
                >
                    {status.xp}/{getNextLevelXP(status.xp)} XP
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
