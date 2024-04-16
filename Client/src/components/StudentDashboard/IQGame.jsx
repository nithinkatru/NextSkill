import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCircle, faCaretUp as faTriangle } from '@fortawesome/free-solid-svg-icons';
import './IQGame.css';

const shapeTypes = [
    { name: 'star', icon: faStar },
    { name: 'circle', icon: faCircle },
    { name: 'triangle', icon: faTriangle }
];

function IQGame() {
    const [shapes, setShapes] = useState(new Array(10).fill(null).map(() => shapeTypes[Math.floor(Math.random() * shapeTypes.length)]));
    const [activeShapes, setActiveShapes] = useState(new Array(10).fill(false));
    const [selectedShape, setSelectedShape] = useState('');
    const [correctClicks, setCorrectClicks] = useState(0);
    const [incorrectClicks, setIncorrectClicks] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        if (!selectedShape || gameOver) return;

        const interval = setInterval(() => {
            const newShapes = shapes.map(() => shapeTypes[Math.floor(Math.random() * shapeTypes.length)]);
            setActiveShapes(newShapes.map(() => Math.random() < 0.3));
            setShapes([...newShapes]);
        }, 1000);

        return () => clearInterval(interval);
    }, [selectedShape, gameOver]);

    const handleShapeClick = (index) => {
        if (gameOver) return;

        if (activeShapes[index] && shapes[index].name === selectedShape) {
            setCorrectClicks(prev => prev + 1);
            if (correctClicks + 1 === 5) {
                alert('Congratulations! You won!');
                setGameOver(true);
            }
        } else {
            setIncorrectClicks(prev => prev + 1);
            if (incorrectClicks + 1 === 5) {
                alert('Game over! Too many incorrect taps.');
                setGameOver(true);
            }
        }

        setActiveShapes(prev => 
            prev.map((isActive, idx) => idx === index ? false : isActive)
        );
    };

    const handleStartGame = () => {
        setShapes(new Array(10).fill(null).map(() => shapeTypes[Math.floor(Math.random() * shapeTypes.length)]));
        setActiveShapes(new Array(10).fill(false));
        setCorrectClicks(0);
        setIncorrectClicks(0);
        setGameOver(false);
        setSelectedShape('');
    };

    return (
        <div className="IQGame-container">
            <h2>Memory Challenge Game</h2>
            {gameOver ? (
                <>
                    <p>Game Over! Would you like to play again?</p>
                    <button onClick={handleStartGame}>Start New Game</button>
                </>
            ) : (
                <>
                    {!selectedShape && (
                        <div>
                            <p>Select your shape:</p>
                            <select onChange={(e) => setSelectedShape(e.target.value)} value={selectedShape}>
                                <option value="">Choose a shape</option>
                                {shapeTypes.map((shape, index) => (
                                    <option key={index} value={shape.name}>{shape.name}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div className="shapes-container">
                        {shapes.map((shape, index) => (
                            <div key={index} className={`shape ${activeShapes[index] ? 'active' : ''} ${shape.name}`} onClick={() => handleShapeClick(index)}>
                                <FontAwesomeIcon icon={shape.icon} size="lg" />
                            </div>
                        ))}
                    </div>
                    <p>Score: Correct Clicks - {correctClicks}, Incorrect Clicks - {incorrectClicks}</p>
                </>
            )}
        </div>
    );
}

export default IQGame;
