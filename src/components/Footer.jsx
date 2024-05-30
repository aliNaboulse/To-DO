import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>ALI NABOULSE Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
