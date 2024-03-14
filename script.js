import React, { useState, useEffect } from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import { Button, Container, Row, Col } from "https://esm.sh/react-bootstrap";

const QuoteMachine = () => {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuote, setCurrentQuote] = useState({});

  useEffect(() => {
    const fetchQuotes = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          "https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
        );
        const data = await response.json();
        setQuotes(data.quotes);
        setCurrentQuote(data.quotes[Math.floor(Math.random() * quotes.length)]);
      } catch (error) {
        console.log("Error fetching quotes:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  const getRandomQuote = () => {
    if (quotes.length === 0) {
      return "No quotes availables";
    }
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote);
  };

  return (
    <Container id="wrapper">
      <Container id="quote-box">
        <Row id="quote-row">
          <Col md="auto">
            <i class="fa fa-quote-left"> </i>
            <span id="text"> {currentQuote.quote}</span>
          </Col>
        </Row>

        <Row id="author-row">
          <Col>
            <p id="author"> - {currentQuote.author}</p>
          </Col>
        </Row>

        <Row id="button-row">
          <Col>
            <a
              href={`twitter.com/intent/tweet?text=${encodeURIComponent(
                currentQuote.quote
              )}`}
              id="tweet-quote"
            >
              <i class="fa fa-twitter" />
            </a>
          </Col>
          <Col>
            <Button
              id="new-quote"
              variant="success"
              className="d-flex justify-content-end"
              onClick={getRandomQuote}
            >
              {" "}
              New Quote{" "}
            </Button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

ReactDOM.render(<QuoteMachine />, document.getElementById("quoteGenerator"));
