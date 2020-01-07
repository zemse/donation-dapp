import React, { Component } from 'react';
import { donationContract, network } from '../../env';

const ethers = require('ethers');

export default class MakeADonation extends Component {
  state = {
    name: '',
    amount: ''
  };

  componentDidMount = async() => {
    await window.ethereum.enable();
    console.log(window.web3.currentProvider);

    const onCorrectNetwork = window.web3.currentProvider.networkVersion === (network === 'homestead' ? '1' : '42');
    console.log('onCorrectNetwork', onCorrectNetwork);
  };

  onButtonClick = async() => {
    const donationContractInstance = new ethers.Contract(
      donationContract.address,
      donationContract.abi,
      (new ethers.providers.Web3Provider(window.ethereum)).getSigner()
    );

    await donationContractInstance.donateNow(this.state.name, {
      value: ethers.utils.parseEther(this.state.amount)
    });
  };

  render = () => (
    <>
      <p>To donate enter your name and amount to donate and press send button:</p>
      <input type='text' placeholder='enter name' onChange={event => this.setState({name: event.target.value})} />
      <br />
      <input type='text' placeholder='enter amount' onChange={event => this.setState({amount: event.target.value})} />
      <br />
      <button onClick={this.onButtonClick}>Send donation transaction</button>
    </>
  );
}
