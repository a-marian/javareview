import React, { useState, useEffect, useCallback } from 'react';
import './FlashCard.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const FlashCard = ({ question, code, options, correctAnswer, explanation, onAnswer, onNextQuestion }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showExplanationModal, setShowExplanationModal] = useState(false);

  // Reset states when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setShowResult(false);
    setIsFlipped(false);
    setShowExplanationModal(false);
  }, [question]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    if (explanation) setShowExplanationModal(true);
    onAnswer(answer === correctAnswer);
  };

  const closeExplanationModal = useCallback(() => {
    setShowExplanationModal(false);
    onNextQuestion?.();
  }, [onNextQuestion]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeExplanationModal();
    };
    if (showExplanationModal) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [showExplanationModal, closeExplanationModal]);

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
            <>
              <div className="result-message">
                {selectedAnswer === correctAnswer ? '✅ Correct!' : '❌ Try again!'}
              </div>
              {!explanation && (
                <button
                  type="button"
                  className="next-button"
                  onClick={() => onNextQuestion?.()}
                >
                  Next Question
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {showExplanationModal && explanation && (
        <div className="modal-overlay" onClick={closeExplanationModal} aria-hidden="true">
          <div
            className="modal-content explanation-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="explanation-title"
          >
            <div className="modal-header">
              <h3 id="explanation-title">Explanation</h3>
              <button
                type="button"
                className="modal-close"
                onClick={closeExplanationModal}
                aria-label="Close explanation"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>{explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashCard; 