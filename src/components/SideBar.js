import React from "react";
import SearchBar from "./SearchBar";

class SideBar extends React.Component {

  constructor(props) {
    super(props);
  }
  componentDidMount(){
    console.log(this.props)
  }

  render() {
    return (
      <div>
        <SearchBar />
      </div>
    );
  }
}

export default SideBar;
