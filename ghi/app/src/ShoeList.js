import React, { useEffect } from 'react';
import App from './App';
import {useState} from 'react'


function ShoesList() {
    const [shoes, setShoes] = useState([])

    const fetchShoes = async () => {
        const url = 'http://localhost:8080/api/shoes/'
        const res = await fetch(url)
        const shoesJSON = await res.json()
        setShoes(shoesJSON.shoes)
    }
    useEffect(() => {
        fetchShoes()
    }, [])

    function handleDelete(id) {
        const url = `http://localhost:8080/api/shoes/${id}/`
        const fetchConfig = {method: 'DELETE'}
        const response = fetch(url, fetchConfig)
        setShoes(shoes.filter(
            function(shoe) {
                return shoe.id !== id;
            }
        ))
        // find hat by id and remove from shoes array
    }


    return (
      <div className="px-4 py-5 my-5 mt-0 text-center">
      <img className="bg-white rounded shadow d-block mx-auto mb-4" src="https://i.pinimg.com/originals/bb/5b/c7/bb5bc707574c35e401a97d1c323163e7.jpg" alt="" width="600" />
      <h1 className="display-5 fw-bold">Shoes</h1>
      <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              The only resource you'll ever need to virtually organize all your shoes!
            </p>
            <div className="d-grid gap-4 d-sm-flex justify-content-sm-center">
              <a href="/shoes/new" className="btn btn-info btn-lg px-4 gap-3">Add New Shoes to Your Closet</a>
            </div>
            </div>
            <div className="container mt-5">
            <h2 className="text-center">Shoe Collection</h2>
            </div>
            <div className="row">
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Manufacturer</th>
                <th>Model Name</th>
                <th>Shoe Color</th>
                <th>Shoe Picture</th>
                <th>Bins</th>
            </tr>
            </thead>
            <tbody>
            {shoes.map(shoe => {
                return (
                <tr key={shoe.id}>
                    <td>{ shoe.manufacturer }</td>
                    <td>{ shoe.model_name }</td>
                    <td>{ shoe.color }</td>
                    <td>
                    <img src={shoe.picture_url} className="" alt= "..." width="100" height="100"></img>
                    </td>
                    <td>{ shoe.bin }</td>
                    <td><button variant="outline-danger" onClick={() => handleDelete(shoe.id)}>Delete</button></td>
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


