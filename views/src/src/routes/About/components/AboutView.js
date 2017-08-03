import React from 'react'
// import DuckImage from '../assets/Duck.jpg'
import './About.scss'
import { IndexLink, Link } from 'react-router'

export const AboutView = React.createClass({

  getDefaultProps() {
    return {
      courses: [
        "Design Functional Programs",
        "Object-Oriented Software Development",
        "Foundations of Sequential Programs",
        "Calculus",
        "Linear Algebra",
        "Global Financial Markets",
        "Corporate Finance",
        "Financial Accounting",
        "Managerial Accounting"
      ],
      applebyCourses:{
        "Courses": [
          "AP Computer Science (4.0)",
          "AP Calculus BC (5.0)",
          "AP Chemistry (5.0)",
          "AP Physics (4.0)",
          "AP Macroeconomics (4.0)",
          "etc."
        ],
        "International Volunteering": [
          "Helped Natives(Naso people) in Panama rebuild the community center and waterline",
          "After the government destroy the native's homeland, our group of 16 people " +
          "helped them to rebuild some of their infrastructures to supply clean water from the mountains",
          "We lived with the local family for 14 days and learned to deal with cultural differences " +
          "including food, language and many more",
        ],
        "Volunteering": [
          "Over 250 hours of volunteering experience",
          "Volunteered at Mississauga Chinese Association for 2 years, and as a leader for 1 year",
          "Volunteered for parks and primary schools in Oakville for their green works including " +
          "flower planting and invading species removing"
        ]
      },
      gomeProj: {
        "Developing Platform": [
          "Vue.js, Bootstrap3 based front-end part of web application (SPA)",
          "Visualize SVN tag management and Git Flow operation.",
          "Purpose is to simplify version control and lower the risk of human error, " +
          "which can be easily created from direct command line operation"
        ],
        "Data Platform": [
          "Vue.js and Express.js based SSR web application. Data is displayed using ECharts2.0",
          "For business analysis purpose. Process raw data from database and display user friendly data",
          "Modularized data for different types of components including multi-level selection and pagination." +
          "Provide proper Restful api for front-end to use"
        ]
      },
      apphelpProj: {
        "Application Deployment Automation for Apple": [
          "React.js (with Redux) and AWS based serverless web application (SPA)",
          "For key and certificate transfers used in application deployment",
          "Used AWS Lambda, DynamoDB, S3 and IoT Websockets to achieve secure and fast key transfer",
          "This application is for agent use. The advatage of serverless application is that " +
          "the expense is based on usage and the cost for maintaining and updating server is zero"
        ],
        "Project Phoenix": [
          "AngularJS, Express.js and AWS DynamoDB based web application (SPA)",
          "Record and display project testing and deployment history, " +
          "and broadcast real time information to Slack chanel",
          "Integrate toolbox for developers' daily use including JSON(JWT) encode/decode tool and etc."
        ]
      }
    }
  },
  showUl() {
    let ulEl = document.querySelector('.show-list');
    let liEl = document.querySelectorAll('.course');
    if (ulEl.style.height == "auto") {
      ulEl.style.height = 0;
    } else {
      ulEl.style.height = "auto";
    }
    // if (liEl[0].style.display == "block") {
    //   liEl.forEach((item)=> {
    //     item.style.display = "none";
    //   })
    // } else {
    //   liEl.forEach((item)=> {
    //     item.style.display = "block";
    //   })
    // }
  },
  // hideUl() {
  //   let ulEl = document.querySelector('.show-list');
  //   let liEl = document.querySelectorAll('.course');
  //   ulEl.style.height = 0;
  //   liEl.forEach((item)=> {
  //     item.style.display = "none";
  //   })
  // },

  render() {
    const courses = this.props.courses;
    const appleby = this.props.applebyCourses;
    const gomeProj = this.props.gomeProj;
    const apphelpProj = this.props.apphelpProj;
    let applebyLi = [];
    let gomeLi = [];
    let apphelpLi =[];

    for (const item in appleby) {
      applebyLi.push(<h4><b>{item}</b></h4>);
      for (const descr of appleby[item]) {
        applebyLi.push(<p>{descr}</p>);
      }
    }
    for (const item in gomeProj) {
      gomeLi.push(<h4><b>{item}</b></h4>);
      for (const descr of gomeProj[item]) {
        gomeLi.push(<p>{descr}</p>);
      }
    }
    for (const item in apphelpProj) {
      apphelpLi.push(<h4><b>{item}</b></h4>);
      for (const descr of apphelpProj[item]) {
        apphelpLi.push(<p>{descr}</p>);
      }
    }

    return <div className="about-container">
      <div className="title"><h1>Timeline</h1></div>
      <div className="timeline-container">
        <article className="edu">
          <h2>Education</h2>
          <figure className="edu-figure">
            <figcaption>University of Waterloo</figcaption>
            <h4>Undergraduate</h4>
            <h6>2015 - Current</h6>
            <h6>Waterloo, Ontario</h6>
            <p>
              <b>Computing and Financial Management</b>
            </p>
            <div className="show-list">
              <a><b>Courses <i className="fa fa-angle-down" aria-hidden="true" /></b></a>
              <ul className="courses">
                {courses.map((course, index) => {
                  return <li className="course" key={ index }>{course}</li>;
                })}
              </ul>
            </div>
          </figure>
          <figure className="edu-figure">
            <figcaption>Appleby College</figcaption>
            <h4>Secondary Education</h4>
            <h6>2012 - 2015</h6>
            <h6>Oakville, Ontario</h6>
            <p><b>grade 10 - 12</b></p>
            <div className="show-list">
              <a><b>Courses <i className="fa fa-angle-down" aria-hidden="true" /></b></a>
              <ul className="courses"><li>{applebyLi}</li></ul>
            </div>
          </figure>
        </article>
        <article className="work">
          <h2>Work</h2>
          <figure>
            <figcaption>AppHelp by AppDirect</figcaption>
            <h4>Web Application Developer</h4>
            <h6>Jan 2017 - Sept 2016</h6>
            <h6>Montréal, Québec</h6>
            <p>Developed web applications and helped front-end group transfer from AngularJS to React.js</p>
            <p>Displayed strong self-motivation at work and self-learning skills</p>
            <p>Hosted learning and discussion sessions during lunchtime to share knowledge and review codes
              with colleagues, at the same time showed good communication and presenting skills</p>
            <p>Collaborated very well with team members, team leader and some coworkers from other teams</p>
            <div className="show-list">
              <a><b>Projects <i className="fa fa-angle-down" aria-hidden="true" /></b></a>
              <ul className="courses">
                <li>{apphelpLi}</li>
              </ul>
            </div>
          </figure>
          <figure>
            <figcaption>GOME Electrical Appliances</figcaption>
            <h4>Front-end Engineer</h4>
            <h6>May 2016 - Sept 2016</h6>
            <h6>Beijing, China</h6>
            <p>Maintained and developed multiple data and infrastructure platforms for internal use</p>
            <p>Displayed excellent teamwork skill while collaborating with eight other team members</p>
            <div className="show-list">
              <a><b>Projects <i className="fa fa-angle-down" aria-hidden="true" /></b></a>
              <ul className="courses">
                <li>{gomeLi}</li>
              </ul>
            </div>
          </figure>
        </article>
      </div>
    </div>;
  }
});

export default AboutView
