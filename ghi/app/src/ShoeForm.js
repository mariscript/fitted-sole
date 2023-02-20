import React from "react";

class ShoeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manufacturer: "",
      model_name: "",
      color: "",
      picture_url: "",
      bins: [],
      create: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    this.setState({ [event.target.id]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    delete data.bins;
    delete data.create;

    const ShoeUrl = "http://localhost:8080/api/shoes/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(ShoeUrl, fetchConfig);
    if (response.ok) {
      const newShoe = await response.json();
      console.log(newShoe);
      const cleared = {
        manufacturer: "",
        model_name: "",
        color: "",
        picture_url: "",
        bin: "",
        create: true,
      };
      this.setState(cleared);
    }
  }

  async componentDidMount() {
    const url = "http://localhost:8100/api/bins/";

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      this.setState({ bins: data.bins });
    }
  }

  render() {
    let createClassName = "alert alert-success d-none mb-0 mt-5 text-center";
    if (this.state.create) {
      createClassName = "alert alert-success mb-0 mt-5 text-center";
    }

    return (
      <div className="row">
        <div className="offset-3 col-6 text-center">
          <img
            src="https://www.carlaehlers.com/images/work/sneakerheads/GIF3.gif"
            className="img-fluid img-thumbnail"
          ></img>
          <div className="shadow p-4 mt-4">
            <h1>Add A New Shoe</h1>
            <form onSubmit={this.handleSubmit} id="create-shoe-form">
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleInputChange}
                  value={this.state.manufacturer}
                  placeholder="Manufacturer"
                  required
                  type="text"
                  name="manufacturer"
                  id="manufacturer"
                  className="form-control"
                />
                <label htmlFor="manufacturer">Manufacturer</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleInputChange}
                  value={this.state.model_name}
                  placeholder="Model_name"
                  required
                  type="text"
                  name="model_name"
                  id="model_name"
                  className="form-control"
                />
                <label htmlFor="model_name">Style Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleInputChange}
                  value={this.state.color}
                  placeholder="Color"
                  required
                  type="text"
                  name="color"
                  id="color"
                  className="form-control"
                />
                <label htmlFor="color">Color</label>
              </div>
              <div className="mb-3">
                <label htmlFor="picture_url" className="form-label">
                  Picture Url
                </label>
                <textarea
                  onChange={this.handleInputChange}
                  value={this.state.picture_url}
                  required
                  type="text"
                  name="picture_url"
                  id="picture_url"
                  className="form-control"
                  rows="3"
                ></textarea>
              </div>
              <div className="mb-3">
                <select
                  onChange={this.handleInputChange}
                  value={this.state.bin}
                  required
                  name="bin"
                  id="bin"
                  className="form-select"
                >
                  <option value="">Choose a Bin</option>
                  {this.state.bins.map((bin) => {
                    return (
                      <option key={bin.href} value={bin.href}>
                        Closet: {bin.closet_name}, Bin #{bin.bin_number}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button className="btn btn-info">Create</button>
            </form>
            <div className={createClassName} id="success-message">
              You Added A Shoe to Your Closet!
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShoeForm;
