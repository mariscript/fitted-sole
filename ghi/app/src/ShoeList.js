import React, { useEffect } from "react";
import { useState } from "react";



function ShoesList() {
  const [shoes, setShoes] = useState([]);



  const fetchShoes = async () => {
    const url = "http://localhost:8080/api/shoes/";
    const res = await fetch(url);
    const shoesJSON = await res.json();
    setShoes(shoesJSON.shoes);
  };
  useEffect(() => {
    fetchShoes();
  }, []);

  function handleDelete(id) {
    const url = `http://localhost:8080/api/shoes/${id}/`;
    const fetchConfig = { method: "DELETE" };
    const response = fetch(url, fetchConfig);
    setShoes(
      shoes.filter(function (shoe) {
        return shoe.id !== id;
      })
    );
  }

//   function handleUpdate(id) {
//   const url = `http://localhost:8080/api/shoes/${id}/`;
//   const fetchConfig = {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(updatedShoe),
//   };
//   fetch(url, fetchConfig)
//     .then((response) => response.json())
//     .then((updatedShoe) => {
//       setShoes((prevShoes) => {
//         const index = prevShoes.findIndex((shoe) => shoe.id === id);
//         if (index === -1) {
//           return prevShoes;
//         }
//         const newShoes = [...prevShoes];
//         newShoes[index] = updatedShoe;
//         return newShoes;
//       });
//       // Redirect to shoe form
//       history.push(`/shoes/${id}`);
//     })
//     .catch((error) => console.error(error));
// }



  return (
    <div className="px-4 py-5 my-5 mt-0 text-center">
      <img
        className="mx-auto mb-4"
        src={require("./images/sneakers.gif")}
        alt=""
        width="600"
      />
      <h1 className="display-5 fw-bold">Shoes</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Your go-to solution for virtual shoe organization.
        </p>
        <div className="d-grid gap-4 d-sm-flex justify-content-sm-center">
          <a href="/shoes/new" className="btn btn-primary btn-lg px-4 gap-3">
            Add New Shoes to Your Closet
          </a>
        </div>
      </div>
      <div className="container mt-5">
        <h2 className="text-center">Shoe Collection</h2>
      </div>
      <div className="row" id="tables">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Manufacturer</th>
              <th>Model</th>
              <th>Color</th>
              <th>Picture</th>
              <th>Bin</th>
            </tr>
          </thead>
          <tbody>
            {shoes.map((shoe) => {
              return (
                <tr key={shoe.id}>
                  <td>{shoe.manufacturer}</td>
                  <td>{shoe.model_name}</td>
                  <td>{shoe.color}</td>
                  <td>
                    <img
                      src={shoe.picture_url}
                      className=""
                      alt="picture of specific shoe"
                      width="130"
                      height="100"
                    ></img>
                  </td>
                  <td>{shoe.bin}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(shoe.id)}
                    >
                      Delete
                    </button>
                  </td>
                    <td>
                    {/* <button
                      className="btn btn-info"
                      onClick={() => handleUpdate(shoe.id)}
                    >
                      Update
                    </button> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShoesList;
