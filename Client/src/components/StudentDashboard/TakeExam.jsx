import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TakeExam.css';
import Back from "../common/back/Back";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faClipboardCheck, faBookOpen } from '@fortawesome/free-solid-svg-icons';

function TakeExam() {
    const [quizzes, setQuizzes] = useState([]);
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        axios.get('http://localhost:5000/api/quizzes')
            .then(response => setQuizzes(response.data))
            .catch(error => console.error('Error fetching quizzes:', error));
    }, []);

    const selectQuiz = (quizId) => {
        const quiz = quizzes.find(q => q._id === quizId);
        setCurrentQuiz(quiz);
        setAnswers({});
    };

    const handleOptionChange = (questionId, optionText) => {
        setAnswers({
            ...answers,
            [questionId]: optionText
        });
    };

    const handleSubmitAnswers = () => {
        if (!currentQuiz || !Object.keys(answers).length) {
            alert('Please complete the quiz before submitting.');
            return;
        }
    
        const formattedAnswers = currentQuiz.questions.map(question => ({
            questionId: question._id,
            answer: answers[question._id]  
        }));
    
        axios.post('http://localhost:5000/api/submit-quiz', {
            quizId: currentQuiz._id,
            answers: formattedAnswers
        })
        .then(response => {
            console.log('Answers submitted:', response.data);
            setCurrentQuiz(null);
            setAnswers({});
            alert('Quiz submitted successfully.');
        })
        .catch(error => console.error('Submission error:', error));
    };
    
    return (
        <>
            <Back title='Take Exam' />
            <div className="TakeExam-container">
                <h1><FontAwesomeIcon icon={faBookOpen} /> Take Exam</h1>
                {currentQuiz === null ? (
                    <div>
                        <h2><FontAwesomeIcon icon={faClipboardCheck} /> Available Quizzes</h2>
                        <table className="quiz-table">
                            <thead>
                                <tr>
                                    <th>Quiz Title</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quizzes.map(quiz => (
                                    <tr key={quiz._id}>
                                        <td>{quiz.title}</td>
                                        <td>
                                            <button onClick={() => selectQuiz(quiz._id)}>
                                                <FontAwesomeIcon icon={faPlayCircle} /> Take Quiz
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>
                        <h2>{currentQuiz.title}</h2>
                        <table className="question-table">
                            <tbody>
                                {currentQuiz.questions.map((question) => (
                                    <tr key={question._id}>
                                        <td>{question.questionText}</td>
                                        <td>
                                            {question.options.map((option) => (
                                                <label key={option._id}>
                                                    <input
                                                        type="radio"
                                                        name={`question-${question._id}`}
                                                        value={option.optionText}
                                                        onChange={() => handleOptionChange(question._id, option.optionText)}
                                                        checked={answers[question._id] === option.optionText}
                                                    />
                                                    {option.optionText}
                                                </label>
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="submit-answers" onClick={handleSubmitAnswers}>
                            <FontAwesomeIcon icon={faClipboardCheck} /> Submit Answers
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default TakeExam;
