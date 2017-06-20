import React from 'react'
// import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'
import { IndexLink, Link } from 'react-router'
import Particles from 'react-particles-js';

export const HomeView = () => {
  const PARTICLE_CONFIG = {
    "particles": {
      "number": {
        "value": 120,
        "density": {
          "enable": false,
          "value_area": 400
        }
      },
      "color": {
        "value": "#3CA9D1"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 2,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#c5e6f2",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 3,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  };

  return <div className="home-container">
    <div className="background">
      <Particles params={PARTICLE_CONFIG}/>
    </div>
    <div className="home">

      <h1>Hao Sun</h1>
      <h2>Too much to do, too little time</h2>
      <p>
        <Link to='/code' activeClassName='route--active'>
          Code
        </Link>
      </p>
      <p>
        <a href='https://github.com/Halooo'>
          Github
        </a>
      </p>
      <p>
        <Link to='/about' activeClassName='route--active'>
          About
        </Link>
      </p>
    </div>
  </div>;
};

export default HomeView
