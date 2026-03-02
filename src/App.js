import React, { useState } from 'react';
import FlashCard from './components/FlashCard';
import flashCardsData from './static/data/flashCards.json';
import './App.css';

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function App() {
  const [shuffledCards, setShuffledCards] = useState(() =>
    shuffleArray(flashCardsData.flashCards)
  );
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentCardIndex < shuffledCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setShuffledCards(shuffleArray(flashCardsData.flashCards));
    setCurrentCardIndex(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="app">
      <h1>Java Quiz</h1>
      {showScore ? (
        <div className="score-container">
          <h2>Quiz Complete!</h2>
          <p>Your score: {score} out of {shuffledCards.length}</p>
          <button className="reset-button" onClick={resetQuiz}>
            Try Again
          </button>
        </div>
      ) : (
        <>
          <FlashCard
            {...shuffledCards[currentCardIndex]}
            onAnswer={handleAnswer}
            onNextQuestion={handleNextQuestion}
          />
        </>
      )}
    </div>
  );
}

export default App;
