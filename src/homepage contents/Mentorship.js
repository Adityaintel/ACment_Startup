import React from 'react';
import './InfoPages.css';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

function Mentorship () {
  return (
    <div className="homepage__pages">
      <div className="infoPage__back">
        <Link to="/">
          <FontAwesome name="arrow-circle-left" className="backIcon" />
        </Link>
      </div>
      <div className="infoPage__content">
        <h2>Mentorship</h2>
        <p>
          A mentor is an experienced senior who guides you and helps you
          achieve success by showing you the correct path and the right
          measures required for your goal. He is there to boost your self-confidence
          whenever you're feeling low and is someone who believes in you even when you
          might not believe in yourself. He constantly reminds you of your capabilities
          and, and is there to help you throughout the way, wishing nothing but the best
          for you. He helps his protegé realise his hidden potential and direct it towards the right end.
        </p>
      </div>
    </div>
  );
}

export default Mentorship;
