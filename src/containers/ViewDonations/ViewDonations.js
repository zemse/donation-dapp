import React, { Component } from 'react';
import { network, donationContract } from '../../env';

const ethers = require('ethers');

export default class ViewDonations extends Component {
  state = {
    donations: []
  };

  componentDidMount = async() => {
    console.log(network);
    const provider = ethers.getDefaultProvider(network);

    const logs = await provider.getLogs({
      address: donationContract.address,
      topics: [ethers.utils.id('NewDonation(address,string,uint256)')],
      fromBlock: 0,
      toBlock: 'latest'
    });

    console.log('logs', logs);
    this.setState({
      donations: logs.map(log => {
        const obj = {
          address: ethers.utils.hexZeroPad(ethers.utils.hexStripZeros(this.sliceDataTo32Bytes(log.data,0)),20),
          // 1: this.sliceDataTo32Bytes(log.data,1),
          amount: ethers.utils.formatEther(ethers.utils.bigNumberify(this.sliceDataTo32Bytes(log.data,2))),
          // 3: this.sliceDataTo32Bytes(log.data,3)
          txHash: log.transactionHash
        };
        // console.log(obj);
        return obj;
      })
    });
  };

  sliceDataTo32Bytes = (data, index = 0) => {
    return '0x'+data.slice(2+64*index, 2+64*(index+1));
  }

  render = () => (
    <>
      <p>Following donations have been received:</p>
      {this.state.donations.map((entry,index) => {
        console.log(entry);
        if(!entry) return null;
        return (
          <div key={index} style={{border: '1px solid #0005', margin: '5px 0'}}>
            <p>Address: {entry.address}</p>
            <p>Amount Donated: {entry.amount} ETH</p>
            <p><a href={'https://kovan.etherscan.io/tx/'+entry.txHash} target="_blank">View on EtherScan</a></p>
          </div>
        );
      })}
    </>
  );
}
