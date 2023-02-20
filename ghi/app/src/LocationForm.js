import React from "react";

class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closetName: "",
      sectionNumber: "",
      shelfNumber: "",
      create: false,
    };
    this.handleClosetNameChange = this.handleClosetNameChange.bind(this);
    this.handleSectionNumberChange = this.handleSectionNumberChange.bind(this);
    this.handleShelfNumberChange = this.handleShelfNumberChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClosetNameChange(event) {
    const value = event.target.value;
    this.setState({ closetName: value });
  }

  handleSectionNumberChange(event) {
    const value = event.target.value;
    this.setState({ sectionNumber: value });
  }

  handleShelfNumberChange(event) {
    const value = event.target.value;
    this.setState({ shelfNumber: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    data.closet_name = data.closetName;
    data.section_number = data.sectionNumber;
    data.shelf_number = data.shelfNumber;
    delete data.closetName;
    delete data.sectionNumber;
    delete data.shelfNumber;
    delete data.create;
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
        sectionNumber: "",
        shelfNumber: "",
        create: true,
      };
      this.setState(cleared);
    }
  }

  render() {
    let createClassName = "alert alert-success d-none mb-0 text-center";
    if (this.state.create) {
      createClassName = "alert alert-success mb-0 mt-5 text-center";
    }
    return (
      <div className="container" id="wardrobe">
        <div className="row">
          <div className="offset-3 col-6 text-center">
            <img
              src="https://media3.giphy.com/media/QYkeCyy7JyRpeh5lk4/giphy.gif?cid=ecf05e47frnu8f7prre6znbwvo3115hjsf5m2tnhp2s8x0mt&rid=giphy.gif&ct=g"
              className="img-fluid img-thumbnail "
            ></img>
            <div className="shadow p-4 mt-4" id="forms">
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
                    onChange={this.handleSectionNumberChange}
                    value={this.state.sectionNumber}
                    placeholder="Section Number"
                    required
                    type="number"
                    name="section_number"
                    id="section_number"
                    className="form-control"
                  />
                  <label htmlFor="room_count">Section Number</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handleShelfNumberChange}
                    value={this.state.shelfNumber}
                    placeholder="Shelf Number"
                    required
                    type="number"
                    name="shelf_number"
                    id="shelf_number"
                    className="form-control"
                  />
                  <label htmlFor="Shelf Number">Shelf Number</label>
                </div>
                <button className="btn btn-secondary">Create</button>
              </form>
              <div className={createClassName} id="success-message">
                You Added A Location to Your Closet!
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LocationForm;
