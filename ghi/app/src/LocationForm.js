import React from "react";

class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closetName: "",
      locationNumber: "",
      locationSize: "",
    };
    this.handleClosetNameChange = this.handleClosetNameChange.bind(this);
    this.handleLocationNumberChange = this.handleLocationNumberChange.bind(this);
    this.handleLocationSizeChange = this.handleLocationSizeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClosetNameChange(event) {
    const value = event.target.value;
    this.setState({ closetName: value });
  }

  handleLocationNumberChange(event) {
    const value = event.target.value;
    this.setState({ locationNumber: value });
  }

  handleLocationSizeChange(event) {
    const value = event.target.value;
    this.setState({ locationSize: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    data.closet_name = data.closetName;
    data.location_number = data.locationNumber;
    data.location_size= data.locationSize;
    delete data.closetName;
    delete data.locationNumber;
    delete data.locationSize;
    console.log(data);

    const locationUrl = "http://localhost:8100/api/locations/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      const newLocation = await response.json();
      console.log(newLocation);

      const cleared = {
        closetName: "",
        locationNumber: "",
        locationSize: "",
      };
      this.setState(cleared);
    }
  }



  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create A New Location</h1>
              <form onSubmit={this.handleSubmit} id="create-location-form">
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handleClosetNameChange}
                    value={this.state.closetName}
                    placeholder="Closet Name"
                    required
                    type="text"
                    name="closet_name"
                    id="closet_name"
                    className="form-control"
                  />
                  <label htmlFor="name">Closet Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handlelocationNumberChange}
                    value={this.state.locationNumber}
                    placeholder="Location Number"
                    required
                    type="number"
                    name="location_number"
                    id="location_number"
                    className="form-control"
                  />
                  <label htmlFor="room_count">Location Number</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handleLocationSizeChange}
                    value={this.state.locationSize}
                    placeholder="Location Size"
                    required
                    type="number"
                    name="location_size"
                    id="location_size"
                    className="form-control"
                  />
                  <label htmlFor="Location Size">Location Size</label>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LocationForm;
