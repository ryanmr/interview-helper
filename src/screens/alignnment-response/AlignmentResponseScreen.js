import React, { useState, useRef, useEffect } from "react";
import markdownit from "markdown-it";
import { DateTime } from "luxon";
import _ from "lodash";
import { document as htmlDoc } from "../../documents/html-document";
import { downloadFile } from "../../helpers/download-file-helper";
import {
  getCandidateName,
  getInterviewerName
} from "../../helpers/content-parser-helper";
import { getMarkdownContentFromHtml } from "../../helpers/html-parser-helper";
import { getDocument } from "../../helpers/fetch-document-helper";

export function AlignmentResponseScreen() {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [clearLevel, setClearLevel] = useState(0);

  const [isDropping, setIsDropping] = useState(false);

  const mdRef = useRef(markdownit("commonmark"));

  const inputRef = useRef();
  const fileSelectorRef = useRef();
  const sectionRef = useRef();

  function handleFileDrop(event) {
    event.stopPropagation();
    event.preventDefault();

    setIsDropping(false);

    const dt = event.dataTransfer;
    const files = dt.files;

    if (files.length > 0) {
      const file = files[0];
      handleFile(file);
    }
  }

  function handleDragEnter(event) {
    event.stopPropagation();
    event.preventDefault();
    setIsDropping(true);
  }

  function handleDragEnd(event) {
    event.stopPropagation();
    event.preventDefault();
    setIsDropping(false);
  }

  function handleDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  useEffect(() => {
    document.body.addEventListener("drop", handleFileDrop);
    document.body.addEventListener("dragenter", handleDragEnter);
    document.body.addEventListener("dragover", handleDragOver);
    document.body.addEventListener("dragend", handleDragEnd);
    document.body.addEventListener("dragexit", handleDragEnd);

    return () => {
      document.body.removeEventListener("drop", handleFileDrop);
      document.body.removeEventListener("dragover", handleDragOver);
      document.body.removeEventListener("dragenter", handleDragEnter);
      document.body.removeEventListener("dragexit", handleDragEnd);
      document.body.removeEventListener("dragexit", handleDragEnd);
    };
  });

  // markdownRef
  const renderedMarkdown = mdRef.current.render(content);

  async function autofillResponseTemplate() {
    if (content && content.length > 0) {
      return;
    }

    const now = DateTime.local();
    const formattedDate = now.toFormat("DDDD");
    const documentFilename = "va-response.md";
    try {
      const document = await getDocument(documentFilename);
      let nextTechDoc = document.trim().replace("$date", formattedDate);
      setContent(nextTechDoc);
    } catch (err) {
      setError(`Error: ${err.message}; ${documentFilename}`);
    }
  }

  function saveDocument() {
    if (!content || content.length < 0) {
      return;
    }

    const candidateName = getCandidateName(content);
    const interviewerName = getInterviewerName(content);

    // prevent blanks
    if (candidateName.includes("candidate")) {
      setError("Please add the candidate name.");
      return;
    }
    if (interviewerName.includes("interviewer")) {
      setError("Please add your interviewer name.");
      return;
    }

    const regularFilename = `Vision-Alignment Response for ${candidateName} by ${interviewerName}`;
    const formattedFilename = _.kebabCase(_.deburr(_.trim(regularFilename)));
    const filename = `${formattedFilename}.html`;

    let nextHtmlDoc = "";
    nextHtmlDoc = htmlDoc.trim().replace("$content", renderedMarkdown);
    nextHtmlDoc = nextHtmlDoc.replace("$markdown", content);
    nextHtmlDoc = nextHtmlDoc.replace("$title", "V & A Interview Response");

    downloadFile({
      filename,
      type: "text/html",
      content: nextHtmlDoc
    });
  }

  function triggerFileSelector() {
    fileSelectorRef.current.click();
  }

  function handleFileSelectionChange(event) {
    if (!event.target.files || !event.target.files[0]) {
      return;
    }
    const file = event.target.files[0];
    handleFile(file);
  }

  function handleFile(file) {
    const reader = new FileReader();
    reader.onload = fileEvent => {
      const html = fileEvent.target.result;
      try {
        const markdown = getMarkdownContentFromHtml(html);
        setContent(markdown);
      } catch (error) {
        setError(error.message);
      }
    };
    reader.readAsText(file);
  }

  function handleClear() {
    if (clearLevel === 0) {
      setClearLevel(1);
    } else if (clearLevel === 1) {
      setContent("");
      setClearLevel(0);
    }
  }

  return (
    <section
      ref={sectionRef}
      className="section"
      style={{ paddingTop: "1rem" }}
    >
      {error && (
        <div className="container" style={{ marginBottom: "1rem" }}>
          <div className="notification">
            <button className="delete" onClick={() => setError("")} />
            <p>{error}</p>
          </div>
        </div>
      )}
      {isDropping && (
        <div className="container" style={{ marginBottom: "1rem" }}>
          <div className="notification">
            <p>
              Drop your previously generated <em>HTML file</em> and we'll get
              your markdown back so you can edit it.
            </p>
          </div>
        </div>
      )}

      <div className="columns">
        <div className="column">
          {/* auto buttons */}
          <button
            className="button is-secondary"
            onClick={autofillResponseTemplate}
            disabled={content && content.length > 0}
          >
            Autofill Template
          </button>
          &nbsp;
          <button
            className="button is-secondary"
            onClick={triggerFileSelector}
            disabled={content && content.length > 0}
          >
            Upload &amp; Edit
          </button>
          <input
            type="file"
            ref={fileSelectorRef}
            onChange={handleFileSelectionChange}
            style={{ display: "none" }}
          />
          &nbsp;
          <button
            className={`button ${
              clearLevel === 0 ? "is-secondary" : "is-warning"
            }`}
            onClick={handleClear}
          >
            Clear{clearLevel === 0 ? "" : "?!"}
          </button>
        </div>
        <div className="column has-text-right">
          <button className="button is-secondary" onClick={saveDocument}>
            Save
          </button>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <textarea
            ref={inputRef}
            value={content}
            onChange={e => setContent(e.target.value)}
            className="textarea has-text-monospace"
            placeholder="add your markdown template here"
            style={{ minHeight: "80vh", position: "sticky", top: "1rem" }}
          />
        </div>
        <div className="column">
          <div className="box">
            {content ? (
              <div className="content">
                <div dangerouslySetInnerHTML={{ __html: renderedMarkdown }} />
              </div>
            ) : (
              <div className="has-text-centered">
                <i>how are you?</i>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
