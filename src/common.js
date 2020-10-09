export const rank = ["BABY", "NOOB", "KID", "KID", "SMART", "GOD", "LEGENDARY!"];

export const getLevel = xp => Math.floor(xp / 1000);

export const getNextLevelXP = xp => (getLevel(xp) + 1) * 1000;

export const getRank = xp => rank[getLevel(xp)];
