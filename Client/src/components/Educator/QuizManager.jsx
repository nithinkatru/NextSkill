import React, { useState } from 'react';
import axios from 'axios';
import './QuizManager.css';

function ManageQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newOptions, setNewOptions] = useState([{ optionText: '', isCorrect: false }]);

  // Function to handle changes to the quiz title input
  const handleQuizTitleChange = (e) => {
    console.log('Quiz Title Changed:', e.target.value);
    setQuizTitle(e.target.value);
  };

  // Function to handle changes to the new question text input
  const handleNewQuestionTextChange = (e) => {
    console.log('New Question Text Changed:', e.target.value);
    setNewQuestionText(e.target.value);
  };

  // Function to handle changes to the option text inputs
  const handleOptionTextChange = (index, text) => {
    console.log(`Option Text Changed at index ${index}:`, text);
    const updatedOptions = newOptions.map((option, i) =>
      i === index ? { ...option, optionText: text } : option
    );
    setNewOptions(updatedOptions);
  };

  // Function to handle changes to the option correctness checkboxes
  const handleOptionCorrectChange = (index) => {
    console.log(`Option Correctness Toggled at index ${index}`);
    const updatedOptions = newOptions.map((option, i) =>
      i === index ? { ...option, isCorrect: !option.isCorrect } : option
    );
    setNewOptions(updatedOptions);
  };

  // Function to add a new option input field
  const handleAddOption = () => {
    console.log('Adding New Option');
    setNewOptions([...newOptions, { optionText: '', isCorrect: false }]);
  };

  // Function to add the new question and its options to the list of questions
  const handleAddQuestion = () => {
    console.log('Adding New Question');
    setQuestions([...questions, { questionText: newQuestionText, options: newOptions }]);
    setNewQuestionText('');
    setNewOptions([{ optionText: '', isCorrect: false }]);
  };

  // Function to remove a question from the list of questions
  const handleRemoveQuestion = (questionIndex) => {
    console.log(`Removing Question at index ${questionIndex}`);
    const updatedQuestions = questions.filter((_, i) => i !== questionIndex);
    setQuestions(updatedQuestions);
  };

  // Function to submit the quiz
  const handleSubmitQuiz = async () => {
    const newQuiz = {
      title: quizTitle,
      questions: questions
    };
    console.log('Submitting Quiz:', newQuiz);
  
    // Change the URL to match your server's port
    try {
      const response = await axios.post('http://localhost:5000/api/quizzes', newQuiz);
      console.log('Quiz Submitted Successfully:', response.data);
      setQuizzes([...quizzes, response.data]);
      setQuizTitle('');
      setQuestions([]);
    } catch (error) {
      console.error('Error Submitting Quiz:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="manage-quizzes-container">
      <h2>Manage Quizzes</h2>
      <div>
        <input
          type="text"
          placeholder="Quiz Title"
          value={quizTitle}
          onChange={handleQuizTitleChange}
        />
      </div>
      {questions.map((question, index) => (
        <div className="question-container" key={index}>
          <p>{question.questionText}</p>
          {question.options.map((option, optIndex) => (
            <div key={optIndex}>
              {option.optionText} - {option.isCorrect ? "Correct" : "Incorrect"}
            </div>
          ))}
          <button onClick={() => handleRemoveQuestion(index)}>Remove Question</button>
        </div>
      ))}
      <div>
        <input
          type="text"
          placeholder="New Question Text"
          value={newQuestionText}
          onChange={handleNewQuestionTextChange}
        />
        {newOptions.map((option, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Option Text"
              value={option.optionText}
              onChange={(e) => handleOptionTextChange(index, e.target.value)}
            />
            <input
              type="checkbox"
              checked={option.isCorrect}
              onChange={() => handleOptionCorrectChange(index)}
            />
            <label>{option.isCorrect ? "Correct" : "Incorrect"}</label>
          </div>
        ))}
        <button onClick={handleAddOption}>Add Option</button>
        <button onClick={handleAddQuestion}>Add Question to Quiz</button>
      </div>
      <button onClick={handleSubmitQuiz}>Submit Quiz</button>
    </div>
  );
}

export default ManageQuizzes;
