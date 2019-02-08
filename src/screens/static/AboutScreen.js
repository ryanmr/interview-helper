import React from "react";

export function AboutScreen() {
  return (
    <div className="section">
      <div className="container">
        <div className="columns">
          <div className="column">
            <h1 className="is-size-1">About</h1>
            <div className="content">
              <p>
                This is a simple markdown editor, and it has additional features
                that make it ideal for a certain workflow we use:
              </p>
              <ul>
                <li>
                  contains pre-built interview response guides (sorry,
                  proprietary)
                </li>
                <li>built in markdown to html converter for previews</li>
                <li>built in markdown to html exporter for file generation</li>
                <li>
                  built in support for editing already exported markdown-html
                  (that are generated from the same tool)
                </li>
              </ul>
              <p>
                This was original built by{" "}
                <a href="https://ryanrampersad.com/?markdown-exporter-response">
                  Ryan
                </a>{" "}
                in January 2019.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
