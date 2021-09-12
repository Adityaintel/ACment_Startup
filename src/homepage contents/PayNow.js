import React from 'react';
import './InfoPages.css';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

function PayNow () {
  return (
    <div className="homepage__pages">
      <div className="infoPage__back">
        <Link to="/">
          <FontAwesome name="arrow-circle-left" className="backIcon" />
        </Link>
      </div>
      <div className="infoPage__content">
        <h2>Subscription</h2>
        <p>
          Are you learning too fast or getting stuck wanting help with ?Want more perks like personalised
          worksheets, notes, practise sets or having any problems or doubts related to anything ? We are
          here to help you in your way, subscribe to get the best out of everything you learn . Ask your
          problems directly to the best mentors and get answers .Get advice and consultations from experts.
        </p>
      </div>
    </div>
  );
}

export default PayNow;
