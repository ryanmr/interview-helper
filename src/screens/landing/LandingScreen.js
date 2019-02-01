import React from "react";
import { Link } from "react-router-dom";
import { AppNavigation } from "../../components/AppNavigation";

export function LandingScreen() {
  return (
    <>
      <AppNavigation />
      <div className="section">
        <div className="container">
          <div className="columns">
            <div className="column has-text-centered">
              <div className="box">
                <Link to="/app/technical-response">
                  <h1 className="is-size-1">Technical Response</h1>
                </Link>
              </div>
            </div>
            {/* <div className="column has-text-centered">
              <div className="box">
                <Link to="/app/vision-response">
                  <h1 className="is-size-1">Vision Response</h1>
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
