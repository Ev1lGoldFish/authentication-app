import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (event) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User logged out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setProducts(result);
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="home-container">
        <div className="text-content">
          Dear <strong>{loggedInUser}</strong>, if you are able to see the image
          of the lovely corgi below(or the text 'dog-picture'), it means you
          have successfully logged in and accessed protected content. <br />
          <br />
          Here is what happened behind the scenes: <br />
          When you created your account, a new user was created on a back-end
          mongoDB. When you tried to log in, the server checked the database
          against the email with which you tried to log-in and if a match was
          found, a new JWT token was created which was used to authenticate you,
          and once successfully authenticated, you were redireted to the home
          page.
          <br />
          Please use the following resources if you interested in learning more
          about JSON Web Token:
          <ul>
            <a href="https://en.wikipedia.org/wiki/JSON_Web_Token">Wikipedia</a>
            <br />
            <a href="https://www.geeksforgeeks.org/json-web-token-jwt/">
              GeeksforGeeks
            </a>
          </ul>
        </div>
        <div>
          {products &&
            products?.map((item, index) => (
              <img
                key={index}
                src={item.src}
                alt="dog-picture"
                className="image"
              />
            ))}
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Home;
