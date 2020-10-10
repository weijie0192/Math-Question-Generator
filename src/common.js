export const rank = ["BABY", "NOOB", "KID", "KID", "SMART", "GOD", "LEGENDARY!"];

export const getLevel = (xp) => Math.floor(xp / 1000);

export const getNextLevelXP = (level) => (level + 1) * 1000;

export const getRank = (level) => rank[level];
