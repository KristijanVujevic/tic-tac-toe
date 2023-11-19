import React, { useContext } from "react";
import { Theme } from "../App";

const Tema = () => {
  const [theme, setTheme] = useContext(Theme);

  return (
    <div className={`${theme}`}>
      <label className="switch">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={(e) => {
            setTheme(e.target.checked ? "dark" : "light");
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
    </div>
  );
};

export default Tema;
