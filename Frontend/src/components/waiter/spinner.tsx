import React from "react";
import spinner from "../../assets/spinner.gif";

export const Spinner = () => {
    return(
        <div className="loading-data">
        <div className="spinner-grow text-primary" role="status">
          <span className="sr-only">
            <img src={spinner} alt="spinner"></img>
          </span>
        </div>
      </div>
    )
}