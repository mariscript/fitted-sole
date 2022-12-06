import React, { useEffect } from 'react';
import {useState} from 'react'


function HatsList() {
    const [hats, setHats] = useState([])

    const fetchHat = async () => {
        const url = 'http://localhost:8090/api/hats/'
        const res = await fetch(url)
        const hatsJSON = await res.json()
        setHats(hatsJSON.hats)
    }
    useEffect(() => {
        fetchHat()
    }, [])

    function handleDelete(id) {
        const url = `http://localhost:8090/api/hats/${id}/`
        const fetchConfig = {method: 'DELETE'}
        const response = fetch(url, fetchConfig)
        setHats(hats.filter(
            function(hat) {
                return hat.id !== id;
            }
        ))
    }


    return (
      <div className="px-4 py-5 my-5 mt-0 text-center">
      <img className="bg-white rounded shadow d-block mx-auto mb-4" src="https://cdn.theathletic.com/app/uploads/2021/05/26001329/Cardinals.gif" alt="" width="600" />
      <h1 className="display-5 fw-bold">Hats</h1>
      <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              The only resource you'll ever need to virtually organize all your hats!
            </p>
            <div className="d-grid gap-4 d-sm-flex justify-content-sm-center">
              <a href="/hats/new" className="btn btn-info btn-lg px-4 gap-3">Add New Hats to Your Closet</a>
            </div>
            </div>
            <div className="container mt-5">
            <h2 className="text-center">Hat Collection</h2>
            </div>
            <div className="row">
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
            {hats.map(hat => {
                return (
                <tr key={hat.id}>
                    <td>{ hat.fabric }</td>
                    <td>{ hat.style_name }</td>
                    <td>{ hat.color }</td>
                    <td>
                    <img src={hat.pic_url} className="" alt= "..." width="100" height="100"></img>
                    </td>
                    <td>{ hat.location }</td>
                    <td><button variant="outline-danger" onClick={() => handleDelete(hat.id)}>Delete</button></td>
                </tr>
                )
            })}
            </tbody>
        </table>
        </div>
      </div>
    )
}

export default HatsList;
