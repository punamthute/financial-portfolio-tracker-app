import React, { Component } from "react";
import "./main.css";
import MyStocksTable from "../components/myStocks/stocks-table";
import StockButton from "../components/stock-button/stock-button";
import Modal from "../components/modal/modal";

// let tablelength = 0;
class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPrice: 0,
      showModal: false,
      stockName: "",
      noofShares: 0,
      buyPrice: 0,
      showBtn: true,
      symbolValue: "",
      isSelected: false,
      
    };
  }

  // properties received from stock button component
  getCurrentPrice = (value, stockName, ctPrice, modalFlag) => {
    this.setState({
      currentPrice: ctPrice,
      showModal: modalFlag,
      stockName: stockName,
      isSelected: false,
      symbolValue: value,

     
    });
  };

  closeModal = modalFlag => {
    this.setState({
      showModal: modalFlag,
      isSelected: true
    });
  };
  
  addStock = (modalFlag, shares, buyPrice, tableItems) => {
    this.setState({
      showModal: modalFlag,
      noofShares: shares,
      buyPrice: buyPrice,
      showBtn: false,
      isSelected: true
    });

  };
  
  componentDidMount() {
    var d = new Date();
    console.log(d.getDay());
    if (d.getDay() === 0 || d.getDay() === 6) {
      document.getElementById("message").innerHTML =
        "Note:The currentPrice shown will be  taken from Friday as no data available on Weekend ";
    }
  }
  render() {

    let displayModal = null;

    if (this.state.showModal) {
      displayModal = (
        <Modal
          closeModal={this.closeModal}
          stockName={this.state.stockName}
          mystocks={this.mystocks}
          stockSymbol={this.state.symbolValue}
          currentPrice={this.state.currentPrice}
         
        >
          {" "}
        </Modal>
      );
    }
    return (
      <div>
        <div className="container-fluid text-center" id="nav-bar">
          <h1>
            <strong>Finance Portfolio Tracker</strong>
          </h1>
        </div>
        <br />
        <br />
        <div className="MyStocks">
          <div className="container">
            <h3>My Stocks</h3>
            <div style={{ overflowX: "auto" }}>
              <table className="table" id="showTable">
                <thead>
                  <tr>
                    <th>Stock symbol</th>
                    <th>Stock name</th>
                    <th>No.of shares</th>
                    <th>Buy price</th>
                    <th>Current price</th>
                    <th>Profit/Loss</th>
                    <th></th>
                  </tr>
                </thead>
                <MyStocksTable
                  isSelected={this.state.isSelected}
                ></MyStocksTable>
              </table>
            </div>
            <div id="message"></div>
          </div>
        </div>
        <div className="AddStocksTitle">
          <StockButton
            currentPrice={this.getCurrentPrice}
            showBtn={this.state.showBtn}
          ></StockButton>
        </div>
        <div className="AddStockForm">{displayModal}</div>
      </div>
    );
  }
}

export default Main;
