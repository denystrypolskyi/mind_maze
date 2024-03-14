export const generateAnswerOptions = (currentNumberLength, setAnswerOptions, setCorrectNumber, numbersRange) => {
    const options = [];
    const min = numbersRange[currentNumberLength - 2].min;
    const max = numbersRange[currentNumberLength - 2].max;

    for (let i = 0; i < 4; i++) {
      options.push(Math.floor(Math.random() * (max - min + 1) + min));
    }
    setAnswerOptions(options);

    const correctAnswerIndex = Math.floor(Math.random() * options.length);
    const correctAnswer = options[correctAnswerIndex];
    setCorrectNumber(correctAnswer);
};

export const handleTimerEnd = (setIsGuessTime) => {
    setIsGuessTime(prevIsGuessTime => !prevIsGuessTime);
};
