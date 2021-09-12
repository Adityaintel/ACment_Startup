import React from 'react';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import './InfoPages.css';

function AboutUs () {
  return (
    <div className="homepage__pages">
      <div className="infoPage__back">
        <Link to="/">
          <FontAwesome name="arrow-circle-left" className="backIcon" />
        </Link>
      </div>
      <div className="infoPage__content">
        <h2>About Us</h2>
        <p>
          We are here to serve you with one of the best quality content ,which saves
          your time and gives you guidance to make your dreams come true. Inspiring you
          with our mentor and keeping your determination consistent with their guidance is
          our goal. Let us help you with your first step towards learning with confidence.
          We are here accompanying your journey and turning it into a success. No doubts will
          remain inside you ,it will take time but surely these doubts will be reduced as concepts
          turn inside out . Always remember, if they can, so can you!We believe in your potential,
          you are much more than you know we will help to acknowledge this to you
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
