import React, { useState } from 'react';
import FlashCard from './components/FlashCard';
import flashCardsData from './data/flashCards.json';
import './App.css';

function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentCardIndex < flashCardsData.flashCards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
      } else {
        setShowScore(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentCardIndex(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="app">
      <h1>Java Code Review Flash Cards</h1>
      {showScore ? (
        <div className="score-container">
          <h2>Quiz Complete!</h2>
          <p>Your score: {score} out of {flashCardsData.flashCards.length}</p>
          <button className="reset-button" onClick={resetQuiz}>
            Try Again
          </button>
        </div>
      ) : (
        <>
          <div className="progress">
            Question {currentCardIndex + 1} of {flashCardsData.flashCards.length}
          </div>
          <FlashCard
            {...flashCardsData.flashCards[currentCardIndex]}
            onAnswer={handleAnswer}
          />
        </>
      )}
    </div>
  );
}

export default App;
