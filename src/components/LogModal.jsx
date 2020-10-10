import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import { DialogContent, DialogActions } from "@material-ui/core";

const LogModal = ({ setShowLog, logRef, open }) => {
    const handleClose = () => {
        setShowLog(false);
    };
    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogContent>
                <Typography variant="h6">XP Log </Typography>
                <pre>{JSON.stringify(logRef.current, null, 2)}</pre>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        if (window.prompt("Password") === "weijie0192") {
                            logRef.current = [];
                            handleClose();
                        } else {
                            window.alert("Wrong password");
                        }
                    }}
                >
                    Clear Log
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LogModal;
