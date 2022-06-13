import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [click, setClick] = useState(1);
  const [translate, setTranslate] = useState("");
  const [tag, setTag] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://quotes15.p.rapidapi.com/quotes/random/",
      headers: {
        "X-RapidAPI-Key": "e935234824msh7e36cd3687ef3cbp1c2676jsna57b8a12a462",
        "X-RapidAPI-Host": "quotes15.p.rapidapi.com",
      },
    };

    const fetchAdvice = () => {
      axios
        .request(options)
        .then(function (response) {
          setState(response.data.content)
          setTag(response.data.tags[0])
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    fetchAdvice();
  }, [click]);

  //   --------------
  useEffect(() => {
    setLoading(true);
    const originalText = state;
    const options = {
      method: "GET",
      url: "https://nlp-translation.p.rapidapi.com/v1/translate",
      params: { text: originalText, to: "vi", from: "en" },
      headers: {
        "X-RapidAPI-Key": "e935234824msh7e36cd3687ef3cbp1c2676jsna57b8a12a462",
        "X-RapidAPI-Host": "nlp-translation.p.rapidapi.com",
      },
    };

    let trans = () => {
      axios
        .request(options)
        .then(function (response) {
          setTranslate(response.data.translated_text.vi);
          setLoading(false);
        })
        .catch(function (error) {
          setLoading(true);
        });
    };
    trans();
  }, [state]);

  return (
    <div className="app">
      <div className="card" id="card">
        <div className="headers">
          <h1 className="head">{state}</h1>
          <p className='p'>Tag: <i>{tag}</i></p>
          {!loading ? (
            <button
              className="button"
              onClick={() => setClick(click + 1)}
            >
              {" "}
              Random Quote
            </button>
          ) : (
            <button className="button disable">Random Quote</button>
          )}
        </div>
        
        {/* ko co loading thi moi hien thi ra */}
        <div className="body">
          {!loading && <h1>{translate}</h1>}
          {loading && <FontAwesomeIcon icon={faSpinner} className="loading" />}
        </div>
      </div>
    </div>
  );
}

export default App;
