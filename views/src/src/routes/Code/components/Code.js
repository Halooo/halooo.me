import React from 'react'
import './Code.scss'

export const Code = (props) => (
  <div className="code-container">
    <h1>Code</h1>
    <p className="page-desc">
      Here are some projects and practice codes that I have worked on:
    </p>
    <h3>
      Javascript Learning (
      <a href="https://github.com/Halooo/ife/tree/master/javascriptPractice">source code</a>)
    </h3>
    <p>
      Demos are in Mandarin and English
    </p>
    <h4>
      Arrays
    </h4>
    <p className="desc">
      <a href="https://jsfiddle.net/haosun0226/t3mxoda5/">
        Array input & visualized search
      </a>
    </p>
    <p className="desc">
      <a href="https://jsfiddle.net/haosun0226/4gbjcft1/">
        Array input & visualized bubble sort
      </a>
    </p>
    <h4>
      <a href="https://jsbin.com/sahuvim/3/edit?html,output">
        Binary Search Tree (ES6 classes)
      </a>
    </h4>
    <p className="desc">
      Visualized BST pre-order, in-order and post-order search
    </p>
    <h4>
      <a href="https://jsbin.com/locofiv/1/edit?html,js,output">
        Black and Red Tree (ES6 classes)
      </a>
    </h4>
    <p className="desc">
      Visualized Black and Red Tree with search, add, delete and delete branch
    </p>
    <h4>
      <a href="https://jsbin.com/piguqis/edit?html,js,output">
        General Tree (ES6 classes)
      </a>
    </h4>
    <p className="desc">
      Visualized General Tree with depth-first search, add, delete node(s)
    </p>

    <h4>
      <a href="https://github.com/Halooo/test_genetic_algorithm">
        Genetic Algorithm
      </a>
    </h4>
    <p className="desc">
      Using genetic algorithm to find fairly optimized bundle choice from list of choices and bundles.
    </p>
    <br/>
    <h3>
      <a href="https://share-parking.herokuapp.com/">Shared Parking</a> (
      <a href="https://github.com/Halooo/shared-parking">source code</a>)
    </h3>
    <p>
      Share parking pass with others. Parking passes purchased in University of Waterloo last for one entire day,
      but most of students only park for few hours. This application helps student to share their parking passes to
      make the most efficient use of the passes and save money. <br /> <br />
      The project uses React.js + KOA2(Node.js) + Mongodb
      and Material Design style. It is hosted on Heroku and the view is (currently) made for mobile only.
      Functionality includes sign up, login, listing a parking pass, view listed parking pass and deleting own listed passes.
    </p>

    <h3>
      <a href="https://github.com/Halooo/crawler_test">Node.js Crawler</a> (<a href="https://github.com/Halooo/crawler_test/blob/master/crawlers/canuck.js">source code</a>)
    </h3>
    <p>
      *screen shots on GitHub. Tutorial is in Mandarin
      <br />
      Node.js crawler which detects appearance of keywords on web pages and send notification to users through Slack messages.
    </p>

    <h3>
      <a href="https://mdmkep-slides.herokuapp.com/">React Slides</a> (<a href="https://github.com/Halooo/mdmkep-slides">source code</a>)
    </h3>
    <p>
      Slides created using React + React Router + WebSocket + Node.js. Modified Spectacle boilerplate (add WebSocket feature) to allow remote control of slides by swiping on phone screens.
    </p>

    <h3>
      Chamber Crawler 3000 (<a href="https://github.com/Halooo/cc3k">source code</a>)
    </h3>
    <p>
      A rouge-like console game in C++. It is a practice project of OOP design patterns. The game design UML is in uml.pdf. Game supports WASD controls for both Windows and Unix platforms.
    </p>

    <h3>
      <a href="https://http://vendingmachinexam.netlify.com/">Waterloo Helper</a>
    </h3>
    <p>
      Some useful tools for University of Waterloo students look up their exam schedules and find a vending machine in a specific building
    </p>
  </div>
);

Code.propTypes = {
  counter     : React.PropTypes.number.isRequired,
  doubleAsync : React.PropTypes.func.isRequired,
  increment   : React.PropTypes.func.isRequired
};

export default Code
