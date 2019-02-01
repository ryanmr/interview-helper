import React, { useEffect } from "react";

export function useBeforeUnload(fn) {
  function handleOnBeforeUnload(event) {
    event.preventDefault();
    event.stopPropagation();
    event.returnValue = "";

    return "Are you sure you want leave?";
  }

  useEffect(() => {
    window.addEventListener("beforeunload", handleOnBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleOnBeforeUnload);
    };
  });
}
