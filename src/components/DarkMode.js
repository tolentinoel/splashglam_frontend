import React from "react";
import "../styles/DarkMode.css";

const DarkMode = () => {
  let clickedClass = "clicked";  //className to be added on the BUTTON to determine the mode
  const body = document.body; //select the body so that we can change styling when button is clicked
  const lightTheme = "light"; //className to be added on the BODY element to determine the mode
  const darkTheme = "dark"; //className to be added on the BODY element to determine the mode
  let theme

  //Could've used state but want to try new way to persist theme.
  // localStorage - browser internal memory, unlimited capacity, since didn't need high-security
  // with toggling theme, only a single property value.

// used if statement to set value of theme 
  if (localStorage) {
    theme = localStorage.getItem("theme") 
  }

  //if statement to check whether theme is currently light or dark,
  //then add className to which it corresponds
  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme)
  } else {
    body.classList.add(lightTheme)
  }

  const switchTheme = (e) => {
    if (theme === darkTheme) {
      body.classList.replace(darkTheme, lightTheme)
      e.target.classList.remove(clickedClass)
      localStorage.setItem("theme", "light")
      theme = lightTheme
    } else {
      body.classList.replace(lightTheme, darkTheme)
      e.target.classList.add(clickedClass)
      localStorage.setItem("theme", "dark")
      theme = darkTheme
    }
  };

  return (
    <button
      className={theme === "dark" ? clickedClass : ""}
      id="darkMode"
      onClick={(e) => switchTheme(e)}
    ></button>
  );
};

export default DarkMode;