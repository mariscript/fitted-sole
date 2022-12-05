import React from 'react';
import App from './App';
import { Link } from 'react-router-dom';

function ShoeDetails(props) {
    const handleClick = async shoeUrl => {
        const url = "http://localhost:8080" + shoeUrl;
        const fetchConfig = {method: "delete"}
        const response = await fetch(url, fetchConfig)
        if(response.ok) {
            window.location.reload()
        }
    }
        return (
      <div className="col">
        {props.list.map(data => {
          const shoe = data;
          return (
            <div key={shoe.href} className="card mb-3 shadow">
              <img src={shoe.picture_url} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title text-center">{shoe.manufacturer} {shoe.model_name}</h5>
                <h6 className="card-subtitle mb-2 text-muted text-center">
                    Closet: {shoe.bin.closet_name}, Section: {shoe.bin.bin_number}
                </h6>
                <p className="card-text text-center">
                    Color: {shoe.color}
                </p>
              </div>
              <div className="card-footer text-center" >
                <button onClick={() => { handleClick(shoe.href) }}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  

class ShoeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        shoeColumns: [[], [], []],
    };
  }

  async componentDidMount() {
    const url = 'http://localhost:8080/api/shoes/';

    try {
      const response = await fetch(url);
      if (response.ok) {

        const data = await response.json();
        console.log(data)
        const requests = [];
        for (let shoe of data.shoes) {
          const detailUrl = `http://localhost:8080${shoe.href}`;
          requests.push(fetch(detailUrl));
        }
        const responses = await Promise.all(requests);
        const shoeDetails = [[], [], []];
        let i = 0;
        for (const shoeResponse of responses) {
          if (shoeResponse.ok) {
            const details = await shoeResponse.json();
            shoeDetails[i].push(details);
            i = i + 1;
            if (i > 2) {
              i = 0;
            }
          } else {
            console.error(shoeResponse);
          }
        }

        this.setState({shoeDetails: shoeDetails});
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <>
        <div className="px-4 py-5 my-5 mt-0 text-center">
          <img className="bg-white rounded shadow d-block mx-auto mb-4" src="https://i.pinimg.com/originals/bb/5b/c7/bb5bc707574c35e401a97d1c323163e7.jpg" alt="" width="600" />
          <h1 className="display-5 fw-bold">Shoes</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              The only resource you'll ever need to virtually organize all of your shoes!
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link to="/shoes/new" className="btn btn-info btn-lg px-4 gap-3">Add New Shoes to Your Closet</Link>
            </div>
          </div>
        </div>
        <div className="container">
          <h2 className="text-center">Shoe Collection</h2>
          <div className="row">
            {this.state.shoeDetails.map((shoeList, index) => {
              return (
                <ShoeDetails key={index} list={shoeList} />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default ShoeList;

