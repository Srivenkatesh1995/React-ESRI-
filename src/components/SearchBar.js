import React from "react";
import genObs from "../api/genobsApi";
import axios from "axios";

class SearchBar extends React.Component {
  state = { term: "", isSubmitted: null, response: null };

  apiCall = async term => {
    const response = await axios.get(
      `/wms?SERVICE=WMS&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=TRUE&STYLES=&VERSION=1.3.0&LAYERS=generalized_observations&WIDTH=1213&HEIGHT=977&CRS=EPSG:102100&BBOX=-12200423.229911102,4896765.909300394,-10716933.384952797,6091629.535453953&crs=EPSG%3A3857&cql_filter=taxon_id%3D%27${this.state.term}%27`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      }
    );

    console.log(response.data);
    this.setState({response: response.data})
    console.log(this.state);
  };

  onInputChange(event) {
    console.log(event.target.value);
  }

  onSearchSubmit = event => {
    event.preventDefault();
    console.log("The form was submitted");
    console.log(this.state.term);
    this.setState({ isSubmitted: true });
    console.log(this.state);
    {
      this.apiCall();
    }
  };

  renderHelper() {
    console.log(this.state);
    if (this.state.isSubmitted) {
      return (
        <div className="ui bluesegment">
          {" "}
          {this.state.term} <br />
          <br />
          <label>
            {" "}
            <input type="checkbox" /> Species Observations: Number per Township{" "}
          </label>{" "}
          <br />
          <label>
            {" "}
            <input type="checkbox" /> Distribution Model{" "}
          </label>{" "}
          <br />
          <label>
            {" "}
            <input type="checkbox" /> Range Map: Occurrence{" "}
          </label>{" "}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="ui segment">
        <form
          onSubmit={this.onSearchSubmit}
          className="ui form"
        >
          <div className="field">
            <label> Begin typing or use the arrow to select a species: </label>{" "}
            <input
              type="text"
              value={this.state.term}
              onChange={e => this.setState({ term: e.target.value })}
            />{" "}
          </div>{" "}
        </form>{" "}
        {this.renderHelper()}{" "}
      </div>
    );
  }
}

export default SearchBar;
