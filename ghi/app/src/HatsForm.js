import React from "react";

class HatsForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fabric: "",
            style_name: "",
            color: "",
            pic_url: "",
            locations: [],
            create:false,
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.value
        this.setState({[event.target.id]: value})
    }


    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.locations;
        delete data.create;

        const hatUrl = 'http://localhost:8090/api/hats/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        }

        const response = await fetch(hatUrl, fetchConfig);
        if (response.ok) {
            const newHat = await response.json()
            console.log(newHat)
            const cleared = {
                fabric: '',
                style_name: '',
                color: '',
                pic_url: '',
                location: '',
                create: true,
            };
            this.setState(cleared);
        }
    }


    async componentDidMount() {
        const url = 'http://localhost:8100/api/locations/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({locations: data.locations})
        };
    }

    render() {
        let createClassName = 'alert alert-success d-none mb-0 mt-5 text-center';
        if (this.state.create) {
            createClassName = 'alert alert-success mb-0 mt-5 text-center';
        }

        return (
            <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Add A Hat to Your Closet</h1>
                <form onSubmit={this.handleSubmit} id="create-hat-form">
                <div className="form-floating mb-3">
                    <input onChange={this.handleInputChange} value={this.state.fabric}
                    placeholder="Fabric" required type="text" name="fabric" id="fabric"
                    className="form-control"/>
                    <label htmlFor="fabric">Fabric</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={this.handleInputChange} value={this.state.style}
                    placeholder="Style_name" required type="text" name="style_name" id="style_name"
                    className="form-control"/>
                    <label htmlFor="style_name">Style Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={this.handleInputChange} value={this.state.color}
                    placeholder="Color" required type="text" name="color" id="color"
                    className="form-control"/>
                    <label htmlFor="color">Color</label>
                </div>
                <div className="mb-3">
                    <label htmlFor="pic_url" className="form-label">Pic Url</label>
                    <textarea onChange={this.handleInputChange} value={this.state.pic_url}
                    required type="text" name="pic_url" id="pic_url"
                    className="form-control" rows="3"></textarea>
                </div>
                <div className="mb-3">
                    <select onChange={this.handleInputChange} value={this.state.location}
                    required name="location" id="location" className="form-select">
                    <option value="">Choose a Location</option>
                    {this.state.locations.map(location => {
                            return (
                                <option key={location.href} value={location.href}>
                                    Closet: {location.closet_name}, Section: {location.section_number}, Shelf: {location.shelf_number}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <button className="btn btn-info">Create</button>
                </form>
                <div className={createClassName} id="success-message">
                    You Added A Hat to Your Closet!
                </div>
            </div>
            </div>
        </div>
        );
    }
}

export default HatsForm;
