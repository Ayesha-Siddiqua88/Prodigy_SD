const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function guessTheNumber() {
    // Generate a random number between 1 and 100
    const number = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;

    console.log("⭐Welcome to Guess the Number Game!⭐\nI have chosen a number between 1 and 100. Can you guess what it is?");

    rl.on('line', (input) => {
        const guess = parseInt(input);

        attempts++;

        if (guess < number) {
            console.log("Too low! Try again.");
        } else if (guess > number) {
            console.log("Too high! Try again.");
        } else {
            console.log(`👑 Congratulations! You guessed the number ${number} correctly!\nIt took you ${attempts-1} attempts to win the game❗`);
            rl.close();
        }
    });
}

guessTheNumber();
