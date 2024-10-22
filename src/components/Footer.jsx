import React from "react";

function Footer() {
  return (
    <div className="footer">
      <a href="https://www.themoviedb.org/" target="_blank">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN8TpRfeoLQp1Qkwmz5t7pskPsggM9K_Noxg&s"
          alt=""
          className="img-tmdb"
        />
      </a>
      <p>© 2024 <span className="span-footer">MyApp.</span> All rights reserved.</p>
    </div>
  );
}

export default Footer;
