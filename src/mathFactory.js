import uid from "uid";

export const operation = (op, value1, value2) => {
    switch (op) {
        case "+":
            return value1 + value2;
        case "-":
            return value1 - value2;
        case "x":
            return value1 * value2;
        case "/":
            return value1 / value2;
        default:
            return 0;
    }
};

const getRangeNumber = (range) => Math.round(Math.random() * (range[1] - range[0]) + range[0]);

const getNumber = ({ digit, useNegative }, maxRange = Number.MAX_VALUE) => {
    const max = Math.pow(10, digit) - 1;
    const min = useNegative ? -max : 0;
    return getRangeNumber([min, max > maxRange ? maxRange : max]);
};

export const generateQuestion = (option = defaultOptions) => {
    const operator = option.operators[Math.round(Math.random() * (option.operators.length - 1))];
    const operands = [];
    let answer = undefined;

    for (var i = 0; i < option.operand; i++) {
        const num = operator === "-" && !option.useNegative ? getNumber(option, answer) : getNumber(option);
        operands.push(num);
        if (answer === undefined) {
            answer = num;
        } else {
            answer = operation(operator, answer, num);
        }
    }
    const question = {
        id: uid(),
        operator,
        operands,
        answer,
        attempt: 2,
        correct: false,
        level: option.level,
    };
    return question;
};

export const getQuestions = (count, option) => {
    const questions = [];
    while (count-- > 1) {
        questions.push(generateQuestion(option));
    }
    var challengeQuestion = generateQuestion(levelOptions[option.level]);
    challengeQuestion.challenge = true;
    questions.push(challengeQuestion);
    return questions;
};

const levelOptions = [
    {
        digit: 1,
        operators: ["+"],
        useNegative: false,
        operand: 2,
        level: 1,
    },
    {
        digit: 2,
        operators: ["+", "-"],
        useNegative: false,
        operand: 2,
        level: 2,
    },
    {
        digit: 4,
        operators: ["+", "-"],
        useNegative: false,
        operand: 3,
        level: 3,
    },
    {
        digit: 2,
        operators: ["+", "-"],
        useNegative: true,
        operand: 2,
        level: 4,
    },
    {
        digit: 2,
        operators: ["+", "-", "*"],
        useNegative: true,
        operand: 2,
        level: 5,
    },
];
const defaultOptions = levelOptions[2];

export const generateQuestionsByLevel = (level, count = 10) => {
    console.log(level);
    return getQuestions(count, levelOptions[level]);
};
