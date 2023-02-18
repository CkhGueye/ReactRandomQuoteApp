import "./styles.css";
import { FaTwitter, FaQuoteLeft } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";

export default function App() {
  const [quotes, setQuotes] = useState("");
  const [randomNumb, setRandomNumb] = useState(0);

  async function getQuotesData() {
    const response = await fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }

  const getRandomNumb = useCallback(() => {
    const random = Math.floor(Math.random() * quotes.length);
    setRandomNumb(random);
    return random;
  }, [quotes.length]);

  useEffect(() => {
    getQuotesData().then((data) => {
      setQuotes(data.quotes);
    });
    getRandomNumb();
  }, [getRandomNumb]);

  if (!quotes) return "loading...";
  return (
    <div id="app">
      <div id="quote-box">
        <FaQuoteLeft />
        <div className="block-text">
          <p id="text">{quotes[randomNumb].quote}</p>
        </div>
        <div className="block-author">
          <span id="author">~ {quotes[randomNumb].author}</span>
        </div>
        <div className="block-btn">
          <a
            title="publish on twitter"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              quotes[randomNumb]?.quote + " " + quotes[randomNumb]?.author
            )}`}
            id="tweet-quote"
            className="button"
            target="_top"
          >
            <FaTwitter />
          </a>
          <button id="new-quote" className="button" onClick={getRandomNumb}>
            New quote
          </button>
        </div>
      </div>
      <div className="footer">
        Designed and coded by{" "}
        <a href="https://linkedin.com/in/cheikhouwgueye">cheikhouw</a>
      </div>
    </div>
  );
}
