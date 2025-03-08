import React, { useState, useEffect } from 'react';
import './FlashCard.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const FlashCard = ({ question, code, options, correctAnswer, onAnswer }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // Reset states when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setShowResult(false);
    setIsFlipped(false);
  }, [question]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    onAnswer(answer === correctAnswer);
  };

  return (
    <div className={`flash-card ${isFlipped ? 'flipped' : ''}`}>
      <div className="flash-card-inner">
      <h2>{question}</h2>
        <div className="flash-card-front">
        
          <div className="code-container">
            <SyntaxHighlighter
              language="java"
              style={vscDarkPlus}
              showLineNumbers={true}
            >
              {code}
            </SyntaxHighlighter>
          </div>
          <div className="options-container">
            {options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  showResult
                    ? option === correctAnswer
                      ? 'correct'
                      : option === selectedAnswer
                      ? 'incorrect'
                      : ''
                    : ''
                }`}
                onClick={() => handleAnswerClick(option)}
                disabled={showResult}
              >
                {option}
              </button>
            ))}
          </div>
          {showResult && (
            <div className="result-message">
              {selectedAnswer === correctAnswer ? '✅ Correct!' : '❌ Try again!'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlashCard; 