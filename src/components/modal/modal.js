import React, { Component } from 'react';
import './modal.css';
import Backdrop from './backdrop/backdrop';
import axios from 'axios';

class Modal extends Component{

    constructor(props) {
        super(props)
    
        this.state = {
             modalFlag : false ,
             no_of_shares : 0 ,
             buy_price :0 ,
             date : '',
             inputFlag :true 
        }

        this.closeModal = this.closeModal.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.mystocks = this.mystocks.bind(this);
    }
    closeModal = () =>{
          this.props.closeModal(false);
    }
    mystocks = () =>{
       
        // to handle empty input fields 
        if(document.getElementById("noShares").value==='' || document.getElementById("buyPrice").value===''
            || document.getElementById("buyDate").value===''){
            document.getElementById("errorMsg").innerHTML="Please fill all the fields";
        
        }
        else{
  
            let profitLoss = (this.props.currentPrice-this.state.buy_price)*this.state.no_of_shares;
            axios.post('https://financial-portfolio-4be1a.firebaseio.com/mystocks.json',{
                symbol: this.props.stockSymbol,
                name: this.props.stockName ,
                share: this.state.no_of_shares ,
                buyprice: this.state.buy_price,
                date: this.state.date,
                currentPrice : this.props.currentPrice,
                profitLoss : profitLoss
            })
            
            console.log(this.props.stockKey);
            axios.delete(`https://financial-portfolio-4be1a.firebaseio.com/allstocks.AF9R4LM7IEL50XAS.json`);

            
            let data={ 
                shareCount : this.state.no_of_shares,
                buy_price :this.state.buy_price ,
                stockName : this.props.stockName ,
                stockSymbol :this.props.stockSymbol ,
                currentPrice : this.props.currentPrice ,
                profitLoss : profitLoss
            }  
                    
            this.props.mystocks(false,this.state.no_of_shares,this.state.buy_price,data);
        }   
    }
    // to set state according to input
    handleInput = (event)=>{
       let val = event.target.value;
      
       if(event.target.name==='no_of_shares'){
            this.setState({
                no_of_shares : val
            })
       }
       else if(event.target.name==='buy-price'){
        this.setState({
            buy_price : val
        })
       }
       else{
           this.setState({
               date:val
           })
       }
       
       
    }
    render(){
       
        return(
            <div>
                <Backdrop></Backdrop>
                <div style={{height: '500px', textAlign: 'center', position: 'fixed', 
                        backgroundColor: '#fff', zIndex: '500', left: '15%', top: '10%', 
                        boxSizing: 'border-box', width: '70%', borderRadius:'10px'}}>
                        <h2>Add {this.props.stockName} to My Stocks</h2>  <br/><br/>  
                        <form>
                            <label htmlFor='name'> Company Name</label> : {this.props.stockName}<br/><br/>
                            
                            <label htmlFor="name">No. of Shares</label> : <input id='noShares' type='number' placeholder='No. of Shares'
                                    name='no_of_shares'   onChange={this.handleInput}></input>
                                <br/><br/>
                            <label htmlFor="name">>Buy Price</label> : <input type="number" id='buyPrice' placeholder='Buying Price'
                                    name='buy-price'    onChange={this.handleInput}></input>
                                <br/><br/>
                            <label htmlFor="name">Buy Date</label> : <input type='Date' id='buyDate' name='date'
                                    onChange={this.handleInput}></input>
                            <br/><br/>
                            
                        </form>
                       
                        <button type='button' className='AddButton' style={{backgroundColor:"yellow",height:"10px",textAlign:"center",paddingTop:"2px"}} id='addForm' onClick={this.addStock}>Add</button>
                       <button type="button" className='closeButton' style={{backgroundColor:"red",height:"10px",textAlign:"center",paddingTop:"2px",color:"white"}} id="closeBtn" onClick={this.closeModal}>Close</button><br/><br/>
                       <div id="errorMsg"></div>
                 </div>
            </div>
        )
    }
}



export default Modal;