// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useState, useEffect } from 'react';


const FlightInfo = () => {
  const [dataFlight, setDataFlight] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    fetch('./flights.json')
      .then(response => response.json())
      .then(data => {
        setDataFlight(data);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(`Some error happened: ${err}`);
      });
  }, [setDataFlight]);

  return (
    <h1>
      Hello
    </h1>
  )
};

export default FlightInfo;
