import React from "react";

export default (key, defaultValue) => {
    const [state, setState] = React.useState(() => {
        const storedJson = localStorage.getItem(key);

        if (storedJson) {
            return JSON.parse(storedJson);
        }

        if (typeof defaultValue === "function") {
            return defaultValue();
        }
        return defaultValue;
    });

    const handleSetState = (newState) => {
        setState(newState);
    };

    React.useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [state, key]);

    return [state, handleSetState];
};
