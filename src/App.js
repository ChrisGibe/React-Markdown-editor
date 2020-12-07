import React, { useState, useEffect } from "react";
import "./App.css";

// Markdown converter
import showdown from "showdown";

// Markdown text
import { sampleText } from "./sampleText";

function App() {
  const [text, setText] = useState(localStorage.getItem("text") || sampleText);

  const converter = new showdown.Converter();

  const url = "";

  /**
   * Set a new value to the text Hook
   * @param {document#event:keyboard} event 
   */
  const handleChange = (event) => {
    const textValue = event.target.value;
    setText(textValue);
  };

  /**
   * Set a new value inside the localStorage when the markdown container is updated
   */
  useEffect(() => {
    const textValue = text;
    localStorage.setItem("text", textValue);
  });

  /**
   * For download a .md file 
   * @param {document#event:click} event 
   */
  const downloadMd = (event) => {
    const md = "data:application/md;charset=utf-8," + encodeURIComponent(text);
    var el = event.currentTarget;
    el.href = md;
    el.target = "_blank";
    el.download = "data.md";
  };

   /**
   * For download a .txt file 
   * @param {document#event:click} event 
   */
  const downloadTxt = (event) => {
    const txt = document.getElementsByClassName('text-div')[0].textContent
    const text = "data:application/text;charset=utf-8," + encodeURIComponent(txt);
    var el = event.currentTarget;
    el.href = text;
    el.target = "_blank";
    el.download = "data.txt";
  };

  return (
    <div className="container">
      <h1 className="title">React Mardown editor</h1>
      <div className="row">
        <div className="col-sm-6">
          <textarea rows="35" className="form-control" value={text} onChange={handleChange}></textarea>
        </div>
        <div id="text" className="col-sm-6">
          <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(text) }} className="text-div"></div>
        </div>
      </div>
      <a href={url} className="btn btn-primary btn-lg btn-block" onClick={downloadMd}>
        Download Markdown file
      </a>
      <a href={url} className="btn btn-primary btn-lg btn-block" onClick={downloadTxt}>
        Download Text file
      </a>
    </div>
  );
}

export default App;
