import React, { Component } from "react";
import "./stocks-table.css";
import axios from "axios";
class StocksTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelected: false,
      tableData: [],
      isCLicked: false
    };
  }
  componentDidMount() {
    this.setTableContents();
  }
  componentDidUpdate() {
    this.setTableContents();
  }

  // to set contents for the table
  setTableContents = () => {
    axios
      .get("https://financial-portfolio-4be1a.firebaseio.com/mystock.json")
      .then(res => {
      
        this.setState({
          tableData: res.data
        });
      })
      .catch(err => console.log("error:" + err));

   
  };

  stopTracking = event => {
    event.preventDefault();
    const id = event.target.value;
    axios
      .delete(`https://financial-portfolio-4be1a.firebaseio.com/mystocks.${id}.json`)
      .catch(err => {
        console.log(err);
        alert("Network issue check  console for error.");
      });

    axios.post(`https://financial-portfolio-4be1a.firebaseio.com/allstocks.json`, {
      name: this.state.tableData[id].name,
      symbol: this.state.tableData[id].symbol
    });
  };
  render() {
  
    let showContent;
    const isSelected = this.props.isSelected;
    if (this.state.tableData !== null) {
      const tableData = Object.entries(this.state.tableData);
     
      if (isSelected || tableData.length > 0) {
        showContent = tableData.map(row => {
          return (
            <tr key={row[1].symbol}>
              <td>{row[1].symbol}</td>
              <td>{row[1].name}</td>
              <td>{row[1].share}</td>
              <td>{row[1].buyprice}</td>
              <td>{row[1].currentPrice}</td>
              <td>{row[1].profitLoss}</td>
              <td>
                <button
                  type="button"
                  className="StopTrackingBtn"
                  
                  id="stopTrack"
                  value={row[0]}
                  onClick={this.stopTracking}
                >
                  Stop Tracking
                </button>
              </td>
            </tr>
          );
        });
      }
    } else {
      showContent = (
        <tr className="text-center">
          <td colSpan="7">
            <strong>No Stocks have been selected</strong>
          </td>
        </tr>
      );
    }

    return <tbody>{showContent}</tbody>;
  }
}

export default StocksTable;
