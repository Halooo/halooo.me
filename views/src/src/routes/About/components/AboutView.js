import React from 'react'
// import DuckImage from '../assets/Duck.jpg'
import './About.scss'
import { IndexLink, Link } from 'react-router'

export const AboutView = () => {
    return <div className="about-container">
      <div className="title"><h1>Timeline</h1></div>
      <div className="timeline-container">
        <article className="edu">
          <h2>Education</h2>
          <figure className="edu-figure">
            <figcaption>WWSI</figcaption>
            <h6>2011 - NOW</h6>
            <p>
              <b>Warsaw School of Computer Science</b>
              is a private university established on the basis of the decision of the Minister of Science and Higher Education dated 19th July 2000.
              <br />
              Faculty: <b>Software Engineering</b>
            </p>
          </figure>
        </article>
        <article className="work">
          <h2>Work</h2>
          <figure>
            <figcaption>WWSI</figcaption>
            <h6>2011 - NOW</h6>
            <p>
              <b>Warsaw School of Computer Science</b>
              is a private university established on the basis of the decision of the Minister of Science and Higher Education dated 19th July 2000.
              <br />
              Faculty: <b>Software Engineering</b>
            </p>
          </figure>
        </article>
      </div>
    </div>;
};

export default AboutView
