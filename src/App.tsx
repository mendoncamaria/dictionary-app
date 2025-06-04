import React, { useState, type JSX } from 'react';
import Axios from 'axios';
import './App.css';
import { FaSearch } from 'react-icons/fa';
import { FcSpeaker } from 'react-icons/fc';

// Define interfaces for the API response structure
interface Definition {
  definition: string;
  example?: string; // example is optional
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

interface Phonetic {
  text?: string; // text is optional
  audio: string;
}

interface DictionaryData {
  word: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
}
// Specify the expected response type for Axios
function App(): JSX.Element {
  const [data, setData] = useState<DictionaryData | null>(null);
  const [searchWord, setSearchWord] = useState<string>('');

  function getMeaning(): void {
    Axios.get<DictionaryData[]>(
      `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`
    )
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setData(response.data[0]);
        } else {
          setData(null); // Clear data if no results are found
        }
      })
      .catch((error) => {
        console.error('Error fetching dictionary data:', error);
        setData(null); // Clear data on error
      });
  }

  // Function to play and listen the
  // phonetics of the searched word
  function playAudio(): void {
    // Specify return type as void
    if (
      data?.phonetics &&
      data.phonetics.length > 0 &&
      data.phonetics[0].audio
    ) {
      const audio = new Audio(data.phonetics[0].audio);
      audio.play();
    }
  }

  return (
    <div className="App">
      <h1>Free Dictionary</h1>
      <div className="searchBox">
        {/* Taking user input */}
        <input
          type="text"
          placeholder="Search..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            // Specify event type
            setSearchWord(e.target.value);
          }}
        />
        <button
          onClick={() => {
            getMeaning();
          }}
        >
          <FaSearch size="20px" />
        </button>
      </div>
      {data && ( // Render only if data is not null
        <div className="showResults">
          <h2>
            {data.word}{' '}
            <button
              onClick={() => {
                playAudio();
              }}
            >
              <FcSpeaker size="26px" />
            </button>
          </h2>
          {data.meanings.length > 0 && ( // Check if meanings exist
            <>
              <h4>Parts of speech:</h4>
              <p>{data.meanings[0].partOfSpeech}</p>

              {data.meanings[0].definitions.length > 0 && ( // Check if definitions exist
                <>
                  <h4>Definition:</h4>
                  <p>{data.meanings[0].definitions[0].definition}</p>

                  {data.meanings[0].definitions[0].example && ( // Render example only if it exists
                    <>
                      <h4>Example:</h4>
                      <p>{data.meanings[0].definitions[0].example}</p>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
