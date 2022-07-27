import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";

import "./App.css";
import ScrollReveal from "scrollreveal";

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
          setState(response.data.content);
          setTag(response.data.tags[0]);
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    fetchAdvice();
  }, [click]);

  //   --------------
  // useEffect(() => {
  //   setLoading(true);
  //   const originalText = state;
  //   const options = {
  //     method: "GET",
  //     url: "https://nlp-translation.p.rapidapi.com/v1/translate",
  //     params: { text: originalText, to: "vi", from: "en" },
  //     headers: {
  //       "X-RapidAPI-Key": "e935234824msh7e36cd3687ef3cbp1c2676jsna57b8a12a462",
  //       "X-RapidAPI-Host": "nlp-translation.p.rapidapi.com",
  //     },
  //   };

  //   let trans = () => {
  //     axios
  //       .request(options)
  //       .then(function (response) {

  //         setTranslate(response.data.translated_text.vi);
  //         setLoading(false);
  //         ScrollReveal().reveal('.trans', {delay : 900 , origin: 'bottom', interval: 700})

  //       })
  //       .catch(function (error) {
  //         setLoading(true);
  //       });
  //   };
  //   trans();
  // }, [state]);

  useEffect(() => {
    setLoading(true);
    const originalText = state;
    const options = {
      method: "POST",
      url: "https://deep-translate1.p.rapidapi.com/language/translate/v2",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "e935234824msh7e36cd3687ef3cbp1c2676jsna57b8a12a462",
        "X-RapidAPI-Host": "deep-translate1.p.rapidapi.com",
      },
      data: `{"q":${originalText},"source":"en","target":"vi"}`,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
        setLoading(false);

      });
  }, [state]);

  // ----ScrollReveal----
  useEffect(() => {
    ScrollReveal({
      reset: true,
      distance: "60px",
      duration: 2500,
      delay: 400,
    });
    ScrollReveal().reveal(".card", { delay: 500, origin: "top" });
    ScrollReveal().reveal(".body", { delay: 700, origin: "bottom" });
  }, []);
  return (
    <div className="app">
      <div className="card" id="card">
        <div className="headers">
          <h1 className="head">{state}</h1>
          <p className="p">
            Tag: <i>{tag}</i>
          </p>
          {!loading ? (
            <button className="button" onClick={() => setClick(click + 1)}>
              {" "}
              Random Quote
            </button>
          ) : (
            <button className="button disable">Random Quote</button>
          )}
        </div>

        {/* ko co loading thi moi hien thi ra */}
        <div className="body">
          {!loading && <h1 className="trans">{translate}</h1>}
          {loading && <FontAwesomeIcon icon={faSpinner} className="loading" />}
        </div>
      </div>
    </div>
  );
}

export default App;
