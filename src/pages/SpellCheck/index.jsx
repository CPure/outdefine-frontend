import React, { useState } from 'react';

import SpellcheckService from '../../services/spellcheck'

const SpellCheckForm = () => {
  const [word, setWord] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [correct, setCorrect] = useState(null);
  const [isFound, setIsFound] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (word.trim() === '') {
      alert('Please enter a word.');
      return;
    }
    try {
      const response = await SpellcheckService.getSpellcheck(word);
      setIsFound(true);
      setCorrect(response.correct);
      setSuggestions(response.suggestions);
    } catch (e) {
      if (e.response?.status === 404) {
        setIsFound(false);
        setCorrect(false);
        setSuggestions([]);
      }
    }
  };

  return (
    <div data-testid="spell-check-form">
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <label htmlFor="word" style={{ marginRight: '10px' }}>Word:</label>
        <input type="text" id="word" value={word} onChange={(e) => setWord(e.target.value)} style={{ marginRight: '10px' }} />
        <button type="submit" style={{ marginRight: '10px' }}>Check spelling</button>
      </form>
      {(correct !== null) && (
        <div style={{ marginTop: '20px' }}>
          {isFound ? (correct ? (
            <p>The word is spelled correctly.</p>
          ) : (
            <p>The word is misspelled. Suggestions:</p>
          )) : (<p>The word was not found</p>)}
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {suggestions.map((suggestion) => (
              <li key={suggestion} style={{ paddingLeft: '1rem', position: 'relative' }}>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


export default SpellCheckForm;