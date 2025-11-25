// Game: Catch Eco Symbols
let gameActive = false;
let gameScore = 0;
let gameInterval;
let itemsInterval;

const ecoSymbols = ['🌱', '♻️', '🌳', '💧', '🌍', '☀️', '🍃', '🌺'];
const badSymbols = ['🏭', '🚗', '💨', '🗑️'];

function startGame() {
    gameActive = true;
    gameScore = 0;
    updateScore();
    
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    
    // Spawn items every 800ms
    itemsInterval = setInterval(spawnItem, 800);
    
    // End game after 30 seconds
    setTimeout(endGame, 30000);
}

function spawnItem() {
    if (!gameActive) return;
    
    const gameBoard = document.getElementById('gameBoard');
    const isEco = Math.random() > 0.3; // 70% chance for eco symbol
    const symbol = isEco 
        ? ecoSymbols[Math.floor(Math.random() * ecoSymbols.length)]
        : badSymbols[Math.floor(Math.random() * badSymbols.length)];
    
    const item = document.createElement('div');
    item.className = 'game-item';
    item.textContent = symbol;
    item.style.left = Math.random() * (gameBoard.offsetWidth - 60) + 'px';
    
    item.onclick = () => {
        if (isEco) {
            gameScore += 10;
            item.style.animation = 'none';
            item.style.transform = 'scale(1.5)';
            item.style.transition = 'all 0.3s';
            setTimeout(() => item.remove(), 300);
        } else {
            gameScore = Math.max(0, gameScore - 5);
            item.style.animation = 'none';
            item.style.filter = 'brightness(0.5)';
            setTimeout(() => item.remove(), 300);
        }
        updateScore();
    };
    
    gameBoard.appendChild(item);
    
    // Remove item after animation ends
    setTimeout(() => {
        if (item.parentNode) {
            item.remove();
        }
    }, 3000);
}

function updateScore() {
    document.getElementById('score').textContent = gameScore;
}

function endGame() {
    gameActive = false;
    clearInterval(itemsInterval);
    
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    
    let message = '';
    let emoji = '';
    
    if (gameScore >= 200) {
        message = currentLanguage === 'bg' 
            ? 'Невероятно! Ти си еко шампион!' 
            : 'Amazing! You are an eco champion!';
        emoji = '🏆🌟';
    } else if (gameScore >= 150) {
        message = currentLanguage === 'bg' 
            ? 'Браво! Много добър резултат!' 
            : 'Bravo! Great score!';
        emoji = '🎉👏';
    } else if (gameScore >= 100) {
        message = currentLanguage === 'bg' 
            ? 'Добра работа! Продължавай така!' 
            : 'Good job! Keep it up!';
        emoji = '😊👍';
    } else {
        message = currentLanguage === 'bg' 
            ? 'Опитай отново! Можеш по-добре!' 
            : 'Try again! You can do better!';
        emoji = '💪🌱';
    }
    
    const playAgainText = currentLanguage === 'bg' ? 'Играй отново' : 'Play Again';
    
    gameBoard.innerHTML = `
        <div class="game-start">
            <div style="text-align: center;">
                <div style="font-size: 80px; margin-bottom: 20px;">${emoji}</div>
                <h3 style="font-size: 28px; color: #2d3748; margin-bottom: 15px;">${message}</h3>
                <p style="font-size: 36px; font-weight: 700; color: #667eea; margin-bottom: 30px;">
                    ${gameScore} ${currentLanguage === 'bg' ? 'точки' : 'points'}
                </p>
                <button class="game-button" onclick="startGame()">${playAgainText}</button>
            </div>
        </div>
    `;
}

// Memory Card Game
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let canFlip = true;

const cardSymbols = [
    { icon: '🚲', name: 'bike' },
    { icon: '💡', name: 'light' },
    { icon: '♻️', name: 'recycle' },
    { icon: '🌳', name: 'tree' },
    { icon: '💧', name: 'water' },
    { icon: '🍎', name: 'apple' }
];

function initMemoryGame() {
    // Reset game state
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    canFlip = true;
    
    // Update stats
    document.getElementById('moves').textContent = '0';
    document.getElementById('pairs').textContent = '0/6';
    
    // Create card pairs
    memoryCards = [...cardSymbols, ...cardSymbols];
    memoryCards = shuffleArray(memoryCards);
    
    // Render cards
    const gameContainer = document.getElementById('memoryGame');
    gameContainer.innerHTML = '';
    
    memoryCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'memory-card';
        cardElement.dataset.index = index;
        cardElement.dataset.name = card.name;
        
        cardElement.innerHTML = `
            <div class="card-front">❓</div>
            <div class="card-back">${card.icon}</div>
        `;
        
        cardElement.addEventListener('click', () => flipMemoryCard(cardElement, index));
        gameContainer.appendChild(cardElement);
    });
}

function flipMemoryCard(cardElement, index) {
    if (!canFlip) return;
    if (cardElement.classList.contains('flipped')) return;
    if (cardElement.classList.contains('matched')) return;
    if (flippedCards.length >= 2) return;
    
    cardElement.classList.add('flipped');
    flippedCards.push({ element: cardElement, index: index, name: cardElement.dataset.name });
    
    if (flippedCards.length === 2) {
        moves++;
        document.getElementById('moves').textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    canFlip = false;
    
    const [card1, card2] = flippedCards;
    
    if (card1.name === card2.name) {
        // Match found!
        setTimeout(() => {
            card1.element.classList.add('matched');
            card2.element.classList.add('matched');
            card1.element.classList.remove('flipped');
            card2.element.classList.remove('flipped');
            
            matchedPairs++;
            document.getElementById('pairs').textContent = `${matchedPairs}/6`;
            
            flippedCards = [];
            canFlip = true;
            
            // Check if game is won
            if (matchedPairs === 6) {
                setTimeout(() => showMemoryGameResult(), 500);
            }
        }, 600);
    } else {
        // No match
        setTimeout(() => {
            card1.element.classList.add('wrong');
            card2.element.classList.add('wrong');
            
            setTimeout(() => {
                card1.element.classList.remove('flipped', 'wrong');
                card2.element.classList.remove('flipped', 'wrong');
                flippedCards = [];
                canFlip = true;
            }, 500);
        }, 800);
    }
}

function showMemoryGameResult() {
    let message = '';
    let emoji = '';
    
    if (moves <= 8) {
        message = currentLanguage === 'bg' 
            ? 'Перфектно! Страхотна памет!' 
            : 'Perfect! Amazing memory!';
        emoji = '🏆🌟';
    } else if (moves <= 12) {
        message = currentLanguage === 'bg' 
            ? 'Браво! Много добре!' 
            : 'Bravo! Very good!';
        emoji = '🎉👏';
    } else if (moves <= 18) {
        message = currentLanguage === 'bg' 
            ? 'Добра работа!' 
            : 'Good job!';
        emoji = '😊👍';
    } else {
        message = currentLanguage === 'bg' 
            ? 'Успя! Опитай да подобриш резултата!' 
            : 'You did it! Try to improve your score!';
        emoji = '🎊💪';
    }
    
    const movesText = currentLanguage === 'bg' ? 'ходове' : 'moves';
    
    showNotification(`${emoji} ${message} ${moves} ${movesText}!`, 'success');
}

// Initialize memory game on page load
document.addEventListener('DOMContentLoaded', () => {
    initMemoryGame();
});

// Recycling Sorting Game
let selectedWasteItem = null;
let selectedBin = null;
let correctSorts = 0;
let wrongSorts = 0;

const wasteItems = [
    { icon: '🥤', type: 'plastic', name: 'bottle' },
    { icon: '📰', type: 'paper', name: 'newspaper' },
    { icon: '🍾', type: 'glass', name: 'glass bottle' },
    { icon: '🍎', type: 'organic', name: 'apple' },
    { icon: '🥫', type: 'general', name: 'can' },
    { icon: '📦', type: 'paper', name: 'cardboard' },
    { icon: '🏺', type: 'glass', name: 'jar' },
    { icon: '🥕', type: 'organic', name: 'carrot' },
    { icon: '🧴', type: 'plastic', name: 'shampoo bottle' },
    { icon: '📄', type: 'paper', name: 'paper' },
    { icon: '🍌', type: 'organic', name: 'banana' },
    { icon: '💡', type: 'general', name: 'light bulb' },
    { icon: '🔋', type: 'general', name: 'battery' },
    { icon: '🧃', type: 'plastic', name: 'juice box' },
    { icon: '🍊', type: 'organic', name: 'orange' },
    { icon: '🥛', type: 'plastic', name: 'milk carton' },
    { icon: '📕', type: 'paper', name: 'book' },
    { icon: '🍷', type: 'glass', name: 'wine bottle' },
    
    { icon: '🥒', type: 'organic', name: 'cucumber' },
    
    { icon: '📋', type: 'paper', name: 'cardboard' },
    { icon: '🍅', type: 'organic', name: 'tomato' },
    { icon: '🍹', type: 'glass', name: 'glass' },
    { icon: '🔔', type: 'general', name: 'metal bell' },
    { icon: '🍇', type: 'organic', name: 'grapes' },
    { icon: '⚙️', type: 'general', name: 'metal' },
    { icon: '🥑', type: 'organic', name: 'avocado' },
    { icon: '📜', type: 'paper', name: 'scroll' },
    { icon: '🧪', type: 'glass', name: 'test tube' },
    { icon: '🔩', type: 'general', name: 'bolt' }
];

let currentWasteItems = [];

function initRecyclingGame() {
    // Shuffle and select random items
    currentWasteItems = shuffleArray([...wasteItems]).slice(0, 15);
    
    // Reset stats
    correctSorts = 0;
    wrongSorts = 0;
    selectedWasteItem = null;
    selectedBin = null;
    
    updateRecyclingStats();
    renderWasteItems();
}

function renderWasteItems() {
    const grid = document.getElementById('itemsGrid');
    grid.innerHTML = '';
    
    currentWasteItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'waste-item';
        itemElement.textContent = item.icon;
        itemElement.dataset.index = index;
        itemElement.dataset.type = item.type;
        itemElement.draggable = true;
        
        // Click to select
        itemElement.addEventListener('click', () => selectWasteItem(itemElement, index));
        
        // Drag events
        itemElement.addEventListener('dragstart', (e) => {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', index);
            itemElement.classList.add('dragging');
            selectedWasteItem = { element: itemElement, index: index, type: item.type };
        });
        
        itemElement.addEventListener('dragend', () => {
            itemElement.classList.remove('dragging');
        });
        
        grid.appendChild(itemElement);
    });
    
    // Add drag over events to bins
    document.querySelectorAll('.bin').forEach(bin => {
        bin.addEventListener('dragover', (e) => {
            e.preventDefault();
            bin.classList.add('drag-over');
        });
        
        bin.addEventListener('dragleave', () => {
            bin.classList.remove('drag-over');
        });
        
        bin.addEventListener('drop', (e) => {
            e.preventDefault();
            bin.classList.remove('drag-over');
            const binType = bin.dataset.type;
            if (selectedWasteItem) {
                checkRecyclingMatch(selectedWasteItem, binType, bin);
            }
        });
    });
}

function selectWasteItem(element, index) {
    // Deselect previous item
    document.querySelectorAll('.waste-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Select new item
    element.classList.add('selected');
    selectedWasteItem = {
        element: element,
        index: index,
        type: element.dataset.type
    };
}

function selectBin(binType) {
    if (!selectedWasteItem) {
        // Highlight bin to show it was clicked
        const bin = document.querySelector(`.bin[data-type="${binType}"]`);
        bin.classList.add('selected');
        setTimeout(() => bin.classList.remove('selected'), 300);
        return;
    }
    
    const bin = document.querySelector(`.bin[data-type="${binType}"]`);
    checkRecyclingMatch(selectedWasteItem, binType, bin);
}

function checkRecyclingMatch(wasteItem, binType, binElement) {
    const isCorrect = wasteItem.type === binType;
    
    if (isCorrect) {
        // Correct sort!
        correctSorts++;
        binElement.classList.add('correct');
        wasteItem.element.classList.add('sorted');
        
        setTimeout(() => {
            wasteItem.element.remove();
            binElement.classList.remove('correct');
            
            // Remove from array
            currentWasteItems.splice(wasteItem.index, 1);
            
            // Check if game is complete
            if (currentWasteItems.length === 0) {
                setTimeout(() => showRecyclingResult(), 500);
            } else {
                renderWasteItems(); // Re-render to update indices
            }
        }, 600);
        
        // Play success notification
        const message = currentLanguage === 'bg' ? 'Браво! Правилно!' : 'Great! Correct!';
        showNotification(`✅ ${message}`, 'success');
        
    } else {
        // Wrong sort
        wrongSorts++;
        binElement.classList.add('wrong');
        wasteItem.element.classList.add('wrong');
        
        setTimeout(() => {
            binElement.classList.remove('wrong');
            wasteItem.element.classList.remove('wrong', 'selected');
        }, 600);
        
        // Play error notification
        const message = currentLanguage === 'bg' ? 'Опитай пак!' : 'Try again!';
        showNotification(`❌ ${message}`, 'error');
    }
    
    updateRecyclingStats();
    selectedWasteItem = null;
    selectedBin = null;
}

function updateRecyclingStats() {
    document.getElementById('correctSort').textContent = correctSorts;
    document.getElementById('wrongSort').textContent = wrongSorts;
}

function showRecyclingResult() {
    const total = correctSorts + wrongSorts;
    const percentage = (correctSorts / total) * 100;
    
    let message = '';
    let emoji = '';
    
    if (percentage === 100) {
        message = currentLanguage === 'bg' 
            ? 'Перфектно! Ти си еко експерт!' 
            : 'Perfect! You are an eco expert!';
        emoji = '🏆🌟';
    } else if (percentage >= 90) {
        message = currentLanguage === 'bg' 
            ? 'Отлично! Много добра работа!' 
            : 'Excellent! Great work!';
        emoji = '🎉👏';
    } else if (percentage >= 75) {
        message = currentLanguage === 'bg' 
            ? 'Браво! Добре се справи!' 
            : 'Bravo! Well done!';
        emoji = '😊👍';
    } else {
        message = currentLanguage === 'bg' 
            ? 'Добър опит! Научи повече за рециклирането!' 
            : 'Good try! Learn more about recycling!';
        emoji = '💪📚';
    }
    
    const correctText = currentLanguage === 'bg' ? 'правилни' : 'correct';
    const wrongText = currentLanguage === 'bg' ? 'грешни' : 'wrong';
    
    showNotification(
        `${emoji} ${message} ${correctSorts} ${correctText}, ${wrongSorts} ${wrongText}`,
        'success'
    );
}

function resetRecyclingGame() {
    initRecyclingGame();
}

// Initialize recycling game on page load
document.addEventListener('DOMContentLoaded', () => {
    initRecyclingGame();
});