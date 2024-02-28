import { useEffect } from "react";

export function useKey(key, callback) {
  useEffect(() => {
    function back(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        callback();
      }
    }
    document.addEventListener("keydown", back);
    return function () {
      document.removeEventListener("keydown", back);
    };
  }, [key, callback]);
}
