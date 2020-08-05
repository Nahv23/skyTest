// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import BpkText from 'bpk-component-text';

import Header from '../Header';
import FlightInfo from '../FlightInfo';

import STYLES from './App.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const App = () => (
  <div className={getClassName('App')}>
    <Header />
    <main className={getClassName('App__main')}>
      {/* <BpkText tagName="p">Over to you...</BpkText> */}
      <FlightInfo />
    </main>
  </div>
);

export default App;
