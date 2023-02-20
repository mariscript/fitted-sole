import React, { useEffect } from "react";
import { useState } from "react";

function HatsList() {
  const [hats, setHats] = useState([]);

  const fetchHat = async () => {
    const url = "http://localhost:8090/api/hats/";
    const res = await fetch(url);
    const hatsJSON = await res.json();
    setHats(hatsJSON.hats);
  };
  useEffect(() => {
    fetchHat();
  }, []);

  function handleDelete(id) {
    const url = `http://localhost:8090/api/hats/${id}/`;
    const fetchConfig = { method: "DELETE" };
    const response = fetch(url, fetchConfig);
    setHats(
      hats.filter(function (hat) {
        return hat.id !== id;
      })
    );
  }

  return (
    <div className="px-4 py-5 my-5 mt-0 text-center">
      <img
        className="d-block mx-auto mb-4"
        src={require("./images/cardinalshat.gif")}
        alt=""
        width="400"
      />
      <h1 className="display-5 fw-bold">Hats</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          The ultimate virtual resource for hat organization.
        </p>
        <div className="d-grid gap-4 d-sm-flex justify-content-sm-center">
          <a href="/hats/new" className="btn btn-primary btn-lg px-4 gap-3">
            Add New Hats to Your Closet
          </a>
        </div>
      </div>
      <div className="container mt-5">
        <h2 className="text-center">Hat Collection</h2>
      </div>
      <div className="row" id="tables">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Fabric</th>
              <th>Style Name</th>
              <th>Hat Color</th>
              <th>Hat Picture</th>
              <th>Locations</th>
            </tr>
          </thead>
          <tbody>
            {hats.map((hat) => {
              return (
                <tr key={hat.id}>
                  <td>{hat.fabric}</td>
                  <td>{hat.style_name}</td>
                  <td>{hat.color}</td>
                  <td>
                    <img
                      src={hat.pic_url}
                      className=""
                      alt="picture of hat"
                      width="115"
                      height="100"
                    ></img>
                  </td>
                  <td>{hat.location}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(hat.id)}
                    >
                      Delete
                    </button>
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

export default HatsList;
