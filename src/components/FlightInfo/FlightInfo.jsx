// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useState, useEffect, useCallback } from 'react';
import { BpkExtraLargeSpinner, SPINNER_TYPES } from 'bpk-component-spinner';
import LongArrowRightIconSm from 'bpk-component-icon/sm/long-arrow-right';
import { withAlignment } from 'bpk-component-icon';
import { lineHeightBase, iconSizeSm, colors } from 'bpk-tokens/tokens/base.es6';
import BpkText from 'bpk-component-text';
import BpkButton from 'bpk-component-button';
import BpkCard from 'bpk-component-card';
import BpkSmallFlightIcon from 'bpk-component-icon/sm/flight';
import {
  BpkTable,
  BpkTableBody,
  BpkTableRow,
  BpkTableCell,
} from 'bpk-component-table';

import STYLES from './FlightInfo.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const AlignedArrow = withAlignment(
  LongArrowRightIconSm,
  lineHeightBase,
  iconSizeSm,
);

const FlightInfo = () => {
  const [dataFlight, setDataFlight] = useState(null);
  let content = '';

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

  const getInfoLegs = (legID, option) => {
    const legObjectInfoSelected = dataFlight.legs[parseInt(legID.split("_")[1] - 1)];

    if (option === 1) {
      const hours = Math.floor(legObjectInfoSelected.duration_mins / 60);
      const minutes = legObjectInfoSelected.duration_mins % 60;
      return `${hours}h ${minutes}`;
    }

    return legObjectInfoSelected;
  };

  if (dataFlight !== null && dataFlight.itineraries.length > 0) {
    content = dataFlight.itineraries.map((itinerary, idx) => {
      return (
        <BpkCard className={getClassName('card')} key={idx}>
          <BpkTable className={getClassName('info-table')}>
            <BpkTableBody>
              <BpkTableRow>
                <BpkTableCell>
                  <BpkSmallFlightIcon className="abc-icon__flight" />
                </BpkTableCell>
                <BpkTableCell>
                  <div className={getClassName('departure-time-info')}>
                    {`${getInfoLegs(itinerary.legs[0], 0).departure_time.split('T')[1]}`}
                  </div>
                  <div className={getClassName('info-grey')}>
                    {`${getInfoLegs(itinerary.legs[0], 0).departure_airport}`}
                  </div>
                </BpkTableCell>
                <BpkTableCell> <AlignedArrow fill={colors.colorSkyGrayTint03} className={getClassName('arrow')} /> </BpkTableCell>
                <BpkTableCell>
                  <div className={getClassName('departure-time-info')}>
                    {`${getInfoLegs(itinerary.legs[0], 0).arrival_time.split('T')[1]}`}
                  </div>
                  <div className={getClassName('info-grey')}>
                    {`${getInfoLegs(itinerary.legs[0]).arrival_airport}`}
                  </div>
                </BpkTableCell>
                <BpkTableCell className={getClassName('col-table-5')}>
                  <div className={getClassName('duration-info')}>
                    {`${getInfoLegs(itinerary.legs[0], 1)}`}
                  </div>
                  <br />
                  <div className={getClassName('stops')}>
                    {getInfoLegs(itinerary.legs[0], 0).stops === 0 ?
                      <BpkText className={getClassName('without-stops')}>Direct</BpkText>
                      :
                      <BpkText className={getClassName('with-stops')}> {`${getInfoLegs(itinerary.legs[0], 0).stops}`} Stop</BpkText>
                    }
                  </div>
                </BpkTableCell>
              </BpkTableRow>
              <BpkTableRow>
                <BpkTableCell>
                  <BpkSmallFlightIcon className="abc-icon__flight" />
                </BpkTableCell>
                <BpkTableCell>
                  <div className={getClassName('departure-time-info')}>
                    {`${getInfoLegs(itinerary.legs[1], 0).departure_time.split('T')[1]}`}
                  </div>
                  <div className={getClassName('info-grey')}>
                    {`${getInfoLegs(itinerary.legs[1]).departure_airport}`}
                  </div>
                </BpkTableCell>
                <BpkTableCell> <AlignedArrow fill={colors.colorSkyGrayTint03} className={getClassName('arrow')} /> </BpkTableCell>
                <BpkTableCell>
                  <div className={getClassName('departure-time-info')}>
                    {`${getInfoLegs(itinerary.legs[1], 0).arrival_time.split('T')[1]}`}
                  </div>
                  <div className={getClassName('info-grey')}>
                    {`${getInfoLegs(itinerary.legs[1], 0).arrival_airport}`}
                  </div>
                </BpkTableCell>
                <BpkTableCell className={getClassName('col-table-5')}>
                  <div className={getClassName('duration-info')}>
                    {`${getInfoLegs(itinerary.legs[1], 1)}`}
                  </div>
                  <br />
                  <div className={getClassName('stops')}>
                    {getInfoLegs(itinerary.legs[1], 0).stops === 0 ?
                      <BpkText className={getClassName('without-stops')}>Direct</BpkText>
                      :
                      <BpkText className={getClassName('with-stops')}> {`${getInfoLegs(itinerary.legs[1], 0).stops}`} Stop</BpkText>
                    }
                  </div>
                </BpkTableCell>
              </BpkTableRow>
            </BpkTableBody>
          </BpkTable>
          <div className={getClassName('card-footer-row')}>
            <div>
              <BpkText className={getClassName('itinerary-price')}>
                {itinerary.price}
                <BpkText className={getClassName('info-grey-light')}>
                  <br />
                  {itinerary.agent}
                </BpkText>
              </BpkText>
            </div>
            <BpkButton className={getClassName('button-select')}>Select</BpkButton>
          </div>
        </BpkCard>
      )
    })
    return (
      content
    )
    // eslint-disable-next-line no-else-return
  } else {
    return (
      <div className={getClassName('spinner')}>
        <BpkExtraLargeSpinner type={SPINNER_TYPES.primary} />
      </div>
    );
  }
};

export default FlightInfo;
