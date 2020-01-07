import React from 'react';
import NavigationElement from './NavigationElement';
import './Navigation.css';

const Navigation = props => (
  <div className="navigation-group">
    <NavigationElement heading="View Donations" />
    <NavigationElement heading="Make a Donation" />
  </div>
);

export default Navigation;
