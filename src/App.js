import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './containers/Navigation/Navigation';
import ViewDonations from './containers/ViewDonations/ViewDonations';
import MakeADonation from './containers/MakeADonation/MakeADonation';
import './App.css';

const ethers = require('ethers');
window.ethers = ethers;

// window.env = {
//   timeally: {
//     address: '0x5630ee5f247bd6b61991fbb2f117bbeb45990876',
//     abi: (require('./ethereum/TimeAlly_0.json')).abi
//   }
// };

window.provider = ethers.getDefaultProvider();
// window.timeallyInstance = new ethers.Contract(
//   window.env.timeally.address,
//   window.env.timeally.abi,
//   window.provider
// );

const App = props => (
  <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <Navigation />
        <div style={{marginTop:'50px', overflow:'scroll'}}>
          <Switch>
            <Route path="/make-a-donation" exact component={MakeADonation} />
            <Route path="/view-donations" exact component={ViewDonations} />
          </Switch>
        </div>
      </header>
    </div>
  </BrowserRouter>
)

export default App;
