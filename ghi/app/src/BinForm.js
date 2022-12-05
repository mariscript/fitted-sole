import React from "react";

class BinForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closetName: "",
      binNumber: "",
      binSize: "",
      create: false
    };
    this.handleClosetNameChange = this.handleClosetNameChange.bind(this);
    this.handleBinNumberChange = this.handleBinNumberChange.bind(this);
    this.handleBinSizeChange = this.handleBinSizeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClosetNameChange(event) {
    const value = event.target.value;
    this.setState({ closetName: value });
  }

  handleBinNumberChange(event) {
    const value = event.target.value;
    this.setState({ binNumber: value });
  }

  handleBinSizeChange(event) {
    const value = event.target.value;
    this.setState({ binSize: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    data.closet_name = data.closetName;
    data.bin_number = data.binNumber;
    data.bin_size= data.binSize;
    delete data.closetName;
    delete data.binNumber;
    delete data.binSize;
    delete data.create;
    console.log(data);

    const BinUrl = "http://localhost:8100/api/bins/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(BinUrl, fetchConfig);
    if (response.ok) {
      const newBin = await response.json();
      console.log(newBin);

      const cleared = {
        closetName: "",
        binNumber: "",
        binSize: "",
        create: true,
      };
      this.setState(cleared);
    }
  }



  render() {
    let createClassName = 'alert alert-success d-none mb-0 mt-5 text-center';
    if (this.state.create) {
        createClassName = 'alert alert-success mb-0 mt-5 text-center';
    }
    return (
      <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create A New Bin</h1>
              <form onSubmit={this.handleSubmit} id="create-bin-form">
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
                    onChange={this.handleBinNumberChange}
                    value={this.state.binNumber}
                    placeholder="Bin Number"
                    required
                    type="number"
                    name="bin_number"
                    id="bin_number"
                    className="form-control"
                  />
                  <label htmlFor="room_count">Bin Number</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handleBinSizeChange}
                    value={this.state.binSize}
                    placeholder="Bin Size"
                    required
                    type="number"
                    name="bin_size"
                    id="bin_size"
                    className="form-control"
                  />
                  <label htmlFor="Bin Size">Bin Size</label>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
              <div className={createClassName} id="success-message">
                    You Added A Bin to Your Closet!
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BinForm;
