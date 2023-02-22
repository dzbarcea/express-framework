import React from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      dealership: [],
      tempBrand: "",
      tempType: "",
      tempYear: "",
      delBrand: "",
      delType: "",
      delYear: "",
      success: true,
    };
  }

  componentDidMount() {
    fetch("/betting")
      .then((res) => res.json())
      .then((dealer) => this.setState({ dealership: dealer.info }));

    console.log(this.state.dealership);
  }

  getData() {
    fetch("/betting")
      .then((res) => res.json())
      .then((dealer) => this.setState({ dealership: dealer.info }));

    console.log(this.state.dealership);
  }

  putData() {
    let data = {
      brand: this.state.tempBrand,
      type: this.state.tempType,
      year: this.state.tempYear,
    };
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("/betting", options);
  }

  delData() {
    let data = {
      brand: this.state.delBrand,
      type: this.state.delType,
      year: this.state.delYear,
    };
    let options = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("/betting", options);
  }

  handleChange() {
    this.setState({ [window.event.target.name]: window.event.target.value });
  }

  render() {
    return (
      <div className="App">
        <button
          onClick={() => {
            this.getData();
          }}
        >
          Get Data
        </button>
        <form
          onSubmit={() => {
            this.putData();
          }}
        >
          Enter Brand:
          <input
            type="text"
            name="tempBrand"
            value={this.state.tempBrand}
            onChange={() => {
              this.handleChange();
            }}
          ></input>
          Enter Model:
          <input
            type="text"
            name="tempType"
            value={this.state.tempType}
            onChange={() => {
              this.handleChange();
            }}
          ></input>
          Enter Year:
          <input
            type="text"
            name="tempYear"
            value={this.state.tempYear}
            onChange={() => {
              this.handleChange();
            }}
          ></input>
          <input type="submit" value="Submit"></input>
        </form>

        <h1>Delete a Record</h1>
        <form
          onSubmit={() => {
            this.delData();
          }}
        >
          Enter Brand:
          <input
            type="text"
            name="delBrand"
            value={this.state.delBrand}
            onChange={() => {
              this.handleChange();
            }}
          ></input>
          Enter Model:
          <input
            type="text"
            name="delType"
            value={this.state.delType}
            onChange={() => {
              this.handleChange();
            }}
          ></input>
          Enter Year:
          <input
            type="text"
            name="delYear"
            value={this.state.delYear}
            onChange={() => {
              this.handleChange();
            }}
          ></input>
          <input type="submit" value="Submit"></input>
        </form>

        <ol>
          {this.state.dealership.map((cars) => (
            <li key={cars.year}>
              Brand: {cars.brand}, Model: {cars.type}, Year: {cars.year}
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default App;
