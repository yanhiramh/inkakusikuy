document.addEventListener('DOMContentLoaded', function() {
    // Initialize the games after the DOM has fully loaded
    initMemoryGame();
    initQuizGame();
    initTicTacToe();
});

// Memory Game
function initMemoryGame() {
    const memoryGameContainer = document.getElementById('memory-game');
    if (!memoryGameContainer) return;
    
    const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let canFlip = true;
    
    // Shuffle function
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Create card elements
    function createCards() {
        memoryGameContainer.innerHTML = '';
        cards = [];
        flippedCards = [];
        matchedPairs = 0;
        canFlip = true;
        
        // Shuffle card values
        const shuffledValues = shuffle([...cardValues]);
        
        // Create the game grid
        const gameGrid = document.createElement('div');
        gameGrid.className = 'memory-game-grid';
        
        // Create each card
        shuffledValues.forEach((value, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.dataset.value = value;
            card.dataset.index = index;
            
            const cardInner = document.createElement('div');
            cardInner.className = 'memory-card-inner';
            
            const cardFront = document.createElement('div');
            cardFront.className = 'memory-card-front';
            cardFront.innerHTML = '<i class="fas fa-question"></i>';
            
            const cardBack = document.createElement('div');
            cardBack.className = 'memory-card-back';
            cardBack.textContent = value;
            
            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            card.appendChild(cardInner);
            
            card.addEventListener('click', flipCard);
            
            gameGrid.appendChild(card);
            cards.push(card);
        });
        
        memoryGameContainer.appendChild(gameGrid);
        
        // Add a reset button
        const resetButton = document.createElement('button');
        resetButton.className = 'btn btn-primary mt-3';
        resetButton.textContent = 'Reset Game';
        resetButton.addEventListener('click', createCards);
        memoryGameContainer.appendChild(resetButton);
    }
    
    // Flip card function
    function flipCard() {
        if (!canFlip) return;
        if (this.classList.contains('flipped')) return;
        
        this.classList.add('flipped');
        flippedCards.push(this);
        
        if (flippedCards.length === 2) {
            canFlip = false;
            checkForMatch();
        }
    }
    
    // Check for a match
    function checkForMatch() {
        const [card1, card2] = flippedCards;
        
        if (card1.dataset.value === card2.dataset.value) {
            // Match found
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            
            if (matchedPairs === cardValues.length / 2) {
                setTimeout(() => {
                    alert('Congratulations! You found all matches!');
                }, 500);
            }
            
            flippedCards = [];
            canFlip = true;
        } else {
            // No match
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
                canFlip = true;
            }, 1000);
        }
    }
    
    // Initialize the memory game
    createCards();
}

// Quiz Game
function initQuizGame() {
    const quizContainer = document.getElementById('quiz-game');
    if (!quizContainer) return;
    
    // Sample quiz questions
    const quizQuestions = [
        {
            question: "What color is the sky on a clear day?",
            options: ["Blue", "Green", "Red", "Yellow"],
            correctAnswer: 0
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Jupiter", "Mars", "Saturn"],
            correctAnswer: 2
        },
        {
            question: "What is the largest mammal in the world?",
            options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
            correctAnswer: 1
        },
        {
            question: "How many continents are there on Earth?",
            options: ["5", "6", "7", "8"],
            correctAnswer: 2
        },
        {
            question: "Which of these is not a programming language?",
            options: ["Python", "Java", "HTML", "Dolphin"],
            correctAnswer: 3
        }
    ];
    
    let currentQuestion = 0;
    let score = 0;
    
    // Create quiz interface
    function renderQuiz() {
        if (currentQuestion >= quizQuestions.length) {
            showResults();
            return;
        }
        
        const question = quizQuestions[currentQuestion];
        
        quizContainer.innerHTML = `
            <div class="quiz-question-container">
                <h3 class="mb-4">Question ${currentQuestion + 1} of ${quizQuestions.length}</h3>
                <div class="card mb-4">
                    <div class="card-body">
                        <p class="card-text fs-5">${question.question}</p>
                    </div>
                </div>
                <div class="quiz-options">
                    ${question.options.map((option, index) => `
                        <button class="btn btn-outline-primary mb-2 w-100 quiz-option" data-index="${index}">
                            ${option}
                        </button>
                    `).join('')}
                </div>
                <div class="d-flex justify-content-between mt-4">
                    <button class="btn btn-secondary" id="quiz-prev" ${currentQuestion === 0 ? 'disabled' : ''}>Previous</button>
                    <div class="quiz-score">Score: ${score}/${quizQuestions.length}</div>
                    <button class="btn btn-primary" id="quiz-skip">Skip</button>
                </div>
            </div>
        `;
        
        // Add event listeners
        document.querySelectorAll('.quiz-option').forEach(button => {
            button.addEventListener('click', handleAnswer);
        });
        
        document.getElementById('quiz-prev').addEventListener('click', () => {
            if (currentQuestion > 0) {
                currentQuestion--;
                renderQuiz();
            }
        });
        
        document.getElementById('quiz-skip').addEventListener('click', () => {
            currentQuestion++;
            renderQuiz();
        });
    }
    
    // Handle answer selection
    function handleAnswer(e) {
        const selectedIndex = parseInt(e.target.dataset.index);
        const question = quizQuestions[currentQuestion];
        
        document.querySelectorAll('.quiz-option').forEach(button => {
            button.disabled = true;
            
            const index = parseInt(button.dataset.index);
            if (index === question.correctAnswer) {
                button.classList.remove('btn-outline-primary');
                button.classList.add('btn-success');
            } else if (index === selectedIndex) {
                button.classList.remove('btn-outline-primary');
                button.classList.add('btn-danger');
            }
        });
        
        if (selectedIndex === question.correctAnswer) {
            score++;
            document.querySelector('.quiz-score').textContent = `Score: ${score}/${quizQuestions.length}`;
        }
        
        setTimeout(() => {
            currentQuestion++;
            renderQuiz();
        }, 1500);
    }
    
    // Show final results
    function showResults() {
        quizContainer.innerHTML = `
            <div class="text-center">
                <h3 class="mb-4">Quiz Complete!</h3>
                <div class="card mb-4">
                    <div class="card-body">
                        <p class="card-text fs-4">Your Score: ${score} out of ${quizQuestions.length}</p>
                        <p class="card-text">${getScoreMessage(score, quizQuestions.length)}</p>
                    </div>
                </div>
                <button class="btn btn-primary" id="quiz-restart">Play Again</button>
            </div>
        `;
        
        document.getElementById('quiz-restart').addEventListener('click', () => {
            currentQuestion = 0;
            score = 0;
            renderQuiz();
        });
    }
    
    // Get message based on score
    function getScoreMessage(score, total) {
        const percentage = (score / total) * 100;
        
        if (percentage === 100) {
            return "Perfect score! You're a genius!";
        } else if (percentage >= 80) {
            return "Excellent job! You really know your stuff!";
        } else if (percentage >= 60) {
            return "Good work! You passed with flying colors!";
        } else if (percentage >= 40) {
            return "Not bad, but there's room for improvement.";
        } else {
            return "Better luck next time. Keep learning!";
        }
    }
    
    // Start the quiz
    renderQuiz();
}

// Tic Tac Toe Game
function initTicTacToe() {
    const tttContainer = document.getElementById('tictactoe-game');
    if (!tttContainer) return;
    
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    
    // Create game board
    function createBoard() {
        tttContainer.innerHTML = `
            <h3 class="mb-3">Tic Tac Toe</h3>
            <div class="ttt-status mb-3">Player ${currentPlayer}'s turn</div>
            <div class="ttt-board">
                ${gameBoard.map((cell, index) => `
                    <div class="ttt-cell" data-index="${index}">${cell}</div>
                `).join('')}
            </div>
            <button class="btn btn-primary mt-3" id="ttt-restart">Restart Game</button>
        `;
        
        // Add event listeners
        document.querySelectorAll('.ttt-cell').forEach(cell => {
            cell.addEventListener('click', handleCellClick);
        });
        
        document.getElementById('ttt-restart').addEventListener('click', resetGame);
    }
    
    // Handle cell click
    function handleCellClick(e) {
        const index = parseInt(e.target.dataset.index);
        
        if (gameBoard[index] !== '' || !gameActive) return;
        
        gameBoard[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        e.target.classList.add(currentPlayer === 'X' ? 'x-cell' : 'o-cell');
        
        if (checkWin()) {
            document.querySelector('.ttt-status').textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }
        
        if (gameBoard.every(cell => cell !== '')) {
            document.querySelector('.ttt-status').textContent = `Game ended in a draw!`;
            gameActive = false;
            return;
        }
        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.querySelector('.ttt-status').textContent = `Player ${currentPlayer}'s turn`;
        
        // If playing against computer and it's O's turn
        if (currentPlayer === 'O' && gameActive) {
            setTimeout(computerMove, 500);
        }
    }
    
    // Computer move
    function computerMove() {
        if (!gameActive) return;
        
        // Find empty cells
        const emptyCells = gameBoard.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
        
        if (emptyCells.length === 0) return;
        
        // Randomly select an empty cell
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        
        // Make the move
        gameBoard[randomIndex] = currentPlayer;
        const cell = document.querySelector(`.ttt-cell[data-index="${randomIndex}"]`);
        cell.textContent = currentPlayer;
        cell.classList.add('o-cell');
        
        if (checkWin()) {
            document.querySelector('.ttt-status').textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }
        
        if (gameBoard.every(cell => cell !== '')) {
            document.querySelector('.ttt-status').textContent = `Game ended in a draw!`;
            gameActive = false;
            return;
        }
        
        currentPlayer = 'X';
        document.querySelector('.ttt-status').textContent = `Player ${currentPlayer}'s turn`;
    }
    
    // Check for win conditions
    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return gameBoard[a] !== '' && 
                   gameBoard[a] === gameBoard[b] && 
                   gameBoard[a] === gameBoard[c];
        });
    }
    
    // Reset game
    function resetGame() {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        createBoard();
    }
    
    // Initialize the game
    createBoard();
}
