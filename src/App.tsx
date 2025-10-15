import { useState, type JSX } from 'react';
import Axios from 'axios';
import './App.css';
import { IoVolumeHighOutline } from 'react-icons/io5';
import Search from './components/Search';

interface Definition {
  length: number;
  definition: string;
  example?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

interface Phonetic {
  text?: string;
  audio: string;
}

interface DictionaryData {
  word: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
}

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
          // You might want a state for "No Results Found" here
          setData(null);
        }
      })
      .catch((error) => {
        console.error('Error fetching dictionary data:', error);
        // You might want a state for "Error" here
        setData(null);
      });
  }

  // Updated function to find the best audio file
  function playAudio(): void {
    const audioUrl = data?.phonetics.find((p) => p.audio)?.audio;
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  }

  return (
    <div className="App">
      <div className="card">
        <h1>My Mini Dictionary</h1>
        <Search setSearchWord={setSearchWord} getMeaning={getMeaning} />
        {data ? (
          <div className="showResults">
            <div className="main-word">
              {data.word}
              {data.phonetics.some((p) => p.audio) && (
                <button
                  onClick={playAudio}
                  aria-label={`Listen to pronunciation of ${data.word}`}
                >
                  <IoVolumeHighOutline size="28px" color="#708A9E" />
                </button>
              )}
              {data.meanings.length > 0 && (
                <span className="part-of-speech-tag">
                  {data.meanings[0].partOfSpeech}
                </span>
              )}
            </div>

            {/* Phonetic Text */}
            {data.phonetics.length > 0 &&
              data.phonetics.find((p) => p.text) && (
                <p className="phonetics">
                  {data.phonetics.find((p) => p.text)?.text}
                </p>
              )}

            {/* Meanings Loop */}
            {data.meanings.map((meaning, meaningIndex) => (
              // Only render the first meaning's tag here, as it's cleaner
              <div key={meaningIndex}>
                {/* Render a tag for subsequent meanings if needed, otherwise skip */}
                {meaningIndex > 0 && (
                  <h4 className="section-heading">{meaning.partOfSpeech}</h4>
                )}

                {meaning.definitions.map((def, defIndex) => (
                  <div key={defIndex} className="definition-block">
                    <h4 className="section-heading">
                      Definition {def.length === 1 ? null : defIndex + 1}:
                    </h4>
                    <p>{def.definition}</p>

                    {def.example && (
                      <>
                        <h4 className="section-heading">Example:</h4>
                        <p className="example-text">
                          {/* Use italics for example text */}
                          "{def.example}"
                        </p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          // Display a message when no data is found or before search
          <div className="showResults">
            <h4
              className="section-heading"
              style={{ textAlign: 'center', marginTop: '50px' }}
            >
              Start searching to find your word!
            </h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
