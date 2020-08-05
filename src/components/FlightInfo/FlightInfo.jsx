// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useState, useEffect } from 'react';
import LongArrowRightIconSm from 'bpk-component-icon/sm/long-arrow-right';
import { withAlignment } from 'bpk-component-icon';
import { lineHeightBase, iconSizeSm, colors } from 'bpk-tokens/tokens/base.es6';
import BpkText from 'bpk-component-text';
import { withButtonAlignment, withRtlSupport } from 'bpk-component-icon';
import ArrowIcon from 'bpk-component-icon/sm/long-arrow-right';
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

const AlignedArrowIcon = withButtonAlignment(withRtlSupport(ArrowIcon));

const getClassName = className => STYLES[className] || 'UNKNOWN';

const AlignedArrow = withAlignment(
  LongArrowRightIconSm, lineHeightBase, iconSizeSm
);

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


    <BpkCard>
      <BpkTable className={getClassName('info-table')}>
        <BpkTableBody>
          <BpkTableRow>
            <BpkTableCell>
              <BpkSmallFlightIcon className="abc-icon__flight" />
              </BpkTableCell>
            <BpkTableCell>
              <div>
                Time-depart
              </div>
              <div className={getClassName('info-grey')}>
                airport
                </div>
            </BpkTableCell>
            <BpkTableCell> <AlignedArrow fill={colors.colorSkyGrayTint03} className={getClassName('arrow')}/> </BpkTableCell>
            <BpkTableCell>
              <div>
                Time-arrival
              </div>
              <div className={getClassName('info-grey')}>
                airport
              </div>
            </BpkTableCell>
            <BpkTableCell>
              <div className={getClassName('info-grey')}>
                Time
              </div>
              <div>
                Direct?
              </div>
            </BpkTableCell>
          </BpkTableRow>
          <BpkTableRow>
            <BpkTableCell>
            <BpkSmallFlightIcon className="abc-icon__flight" />
              </BpkTableCell>
            <BpkTableCell>
              <div>
                Time-depart
              </div>
              <div className={getClassName('info-grey')}>
                airport
              </div>
            </BpkTableCell>
            <BpkTableCell> <AlignedArrow fill={colors.colorSkyGrayTint03} className={getClassName('arrow')}/> </BpkTableCell>
            <BpkTableCell>
              <div>
                Time-arrival
                </div>
              <div className={getClassName('info-grey')}>
                airport
                </div>
            </BpkTableCell>
            <BpkTableCell>
              <div className={getClassName('info-grey')}>
                Time
                </div>
              <div>
                Direct?
                </div>
            </BpkTableCell>
          </BpkTableRow>
        </BpkTableBody>
      </BpkTable>
      <div className={getClassName('card-footer-row')}>
        <div>
          <BpkText>
            Price
            <BpkText className={getClassName('info-grey')}><br />pagweb</BpkText>
          </BpkText>
        </div>
        <BpkButton large>Select</BpkButton>
      </div>
    </BpkCard>
  )
};

export default FlightInfo;
