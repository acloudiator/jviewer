import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map, MarkerGroup } from 'react-d3-map';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, browserHistory } from 'react-router';
import reducers from './src/reducers/index';
import routes from './src/routes';
import { MapOrthographic } from 'react-d3-map-orthographic';

/*
Here we are getting the initial state injected by the server. See routes/index.js for more details
 */

// var Map = require('react-d3-map').Map;
// var MarkerGroup = require('react-d3-map').MarkerGroup;

const initialState = window.__INITIAL_STATE__;
var topojson = require('topojson');

var uk = require('../data/uk.json');
var ukdata = topojson.feature(uk, uk.objects.places);

var ca = require('../data/us_ca.json');

var data = [
    {"type": "Feature",
    "properties": {
      "text": "this is a Point!!!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-122.391701,37.794113]
    }},
    {"type": "Feature",
    "properties": {
      "text": "this is a Point!!!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-115.062072,36.380623]
    }},
    {"type": "Feature",
    "properties": {
      "text": "this is a Point!!!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-122.61395999999999, 40.742705]
    }},
    {"type": "Feature",
    "properties": {
      "text": "this is a Point!!!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-122.42030199999999, 40.91825]
    }},
]

var width = 1920;
var height = 1080;
// set your zoom scale
var scale = 1 << 13;
// min and max of your zoom scale
var scaleExtent = [1 << 7, 1 << 20]
// set your center point
var center = [-94.5820759, 39.1011212];
// set your popupContent
var popupContent = function(d) { return d.properties.text; }
var onMarkerMouseOut= function(dom , d, i) {
  console.log('out')
}
var onMarkerMouseOver= function(dom, d, i) {
  console.log('over')
}
var onMarkerClick= function(dom, d, i) {
  console.log('click')
}
var onMarkerCloseClick= function(id) {
  console.log('close click')
}
/*
While creating a store, we will inject the initial state we received from the server to our app.
 */
ReactDOM.render(
    <Map
      width= {width}
      height= {height}
      scale= {scale}
      scaleExtent= {scaleExtent}
      center= {center}
    >
        <MarkerGroup
            key= {"domain"}
            data= {ca}
            popupContent= {popupContent}
            onClick= {onMarkerClick}
            onCloseClick= {onMarkerCloseClick}
            onMouseOver= {onMarkerMouseOver}
            onMouseOut= {onMarkerMouseOut}
            markerClass= {"your-marker-css-class"}
        />
        <MarkerGroup
            key= {"user"}
            data= {ukdata}
            popupContent= {popupContent}
            onClick= {onMarkerClick}
            onCloseClick= {onMarkerCloseClick}
            onMouseOver= {onMarkerMouseOver}
            onMouseOut= {onMarkerMouseOut}
            markerClass= {"your-marker-css-class-2"}
        />
    </Map>,
    document.getElementById("blank-point")
);
