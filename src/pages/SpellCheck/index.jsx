import React, { useState } from 'react';

import SpellcheckService from '../../services/spellcheck'

const SpellCheckForm = () => {
  const [word, setWord] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [correct, setCorrect] = useState(null);
  const [isFound, setIsFound] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await SpellcheckService.getSpellcheck(word);
        setIsFound(true);
        setCorrect(response.correct);
        setSuggestions(response.suggestions);
    }catch(e)
    {
        if(e.response?.status === 404){
            setIsFound(false);
            setCorrect(false);
            setSuggestions([]);
        }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="word">Word:</label>
        <input type="text" id="word" value={word} onChange={(e) => setWord(e.target.value)} />
        <button type="submit">Check spelling</button>
      </form>
      {(correct !== null ) && (
        <div>          
          {isFound ? ( correct ? (
            <p>The word is spelled correctly.</p>
          ) : (
            <p>The word is misspelled. Suggestions:</p>
          )) : ( <p>The word was not found</p> ) }
          <ul>
            {suggestions.map((suggestion) => (
              <li key={suggestion}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default SpellCheckForm;