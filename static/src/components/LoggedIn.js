import React, { useState, useEffect } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";

const LoggedIn = () => {
  const [products, setProducts] = useState([]);
  const [voted, setVoted] = useState({
    "world-of-authcraft": "",
    "ocean-explorer": "",
    "dinosaur-park": "",
    "cars-vr": "",
    "robin-hood": "",
    "real-world-vr": "",
  });

  const {
    getTokenSilently,
    loading,
    user,
    logout,
    isAuthenticated,
  } = useAuth0();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const token = await getTokenSilently();
        // Send a GET request to the server and add the signed in user's
        // access token in the Authorization header
        const response = await fetch("http://localhost:8080/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = await response.json();

        setProducts(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    getProducts();
  }, []);

  const vote = async (slug, type, index) => {
    try {
      const token = await getTokenSilently();
      // Send a POST request to the Go server for the selected product
      // with the vote type
      const response = await fetch(
        `http://localhost:8080/products/${slug}/feedback`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ vote: type }),
        }
      );
      // Since this is just for demonstration and we're not actually
      // persisting this data, we'll just set the product vote status here
      // if the product exists
      if (response.ok) {
        setVoted({
          ...voted,
          [slug]: [type],
        });
      } else console.log(response.status);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="jumbotron text-center mt-5">
        {isAuthenticated && (
          <span
            className="btn btn-primary float-right"
            onClick={() => logout()}
          >
            LOG OUT
          </span>
        )}
        <spacer type="horizontal" width="100" height="100"></spacer>
        <h1>Go Language Evaluation</h1>
        <hr></hr>
        <h2>Austin Gerner and Raymond Hear</h2>
        <h3>Advanced Software Paradigms (CSCI 6221)</h3>
        <spacer type="horizontal" width="100" height="100"> </spacer>
        <br></br>
        <p>
          Hi, {user.name}! This is a mock application to test Go's potential use in production.
        </p>
        <div className="row">
          {products.map(function (product, index) {
            const prodSlug = product.Slug;
            return (
              <div className="col-sm-4" key={index}>
                <div className="card mb-4">
                  <div className="card-header">{product.Name}</div>
                  <div className="card-body">{product.Description}</div>
                  <div className="card-footer">
                    <a onClick={() => vote(product.Slug, "Upvoted", index)}
                      className="btn btn-default float-left">
                      <FiThumbsUp />
                    </a>
                    <small className="text-muted">{voted[prodSlug]}</small>
                    <a onClick={() => vote(product.Slug, "Downvoted", index)}
                      className="btn btn-default float-right">
                      <FiThumbsDown />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LoggedIn;