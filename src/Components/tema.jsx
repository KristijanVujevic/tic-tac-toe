import React, { useContext, useState } from "react";
import { Theme } from "../App";

const Tema = () => {
  const [theme, setTheme] = useContext(Theme);
  const [counter, setCounter] = useState(0);
  return (
    <div className={`${theme}`}>
      <label className="switch">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={(e) => {
            setTheme(e.target.checked ? "dark" : "light");
            setCounter(counter + 1);
          }}
        />
        <span className="slider round"></span>
        <div className={`${theme}`}>
          {theme === "dark" ? (
            <p>Switch to light mode</p>
          ) : (
            <p>Switch to dark mode</p>
          )}
        </div>
      </label>
      <p>You are using {theme} mode!</p>
      <p>You've switched mode {counter} times.</p>
    </div>
  );
};

export default Tema;
