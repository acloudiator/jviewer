import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../views/src/routes';
import reducers from '../views/src/reducers/index';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
//import { ADD_ITEM } from '../views/src/actions/list_actions';

const fs = require('fs');
const { URL } = require('url');

let router = express.Router();

router.get('/', (req, res) => {
    /*
    Here we are first matching if the current url exists in the react router routes
     */
	match({ routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(500).send(error.message)
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search)
		} else if (renderProps) {

		    /*
             http://redux.js.org/docs/recipes/ServerRendering.html
		     */
			const store = createStore(reducers);

			const html = "";

			const finalState = store.getState();
			res.status(200).send(renderFullPage(html, finalState));
		} else {
			res.status(404).send('Not found')
		}
	})
});

router.get('/routemap', (req, res) => {
    res.status(200).send(renderRouteMapPage());
});

router.get('/svg', (req, res) => {
    res.status(200).send(renderSVGDemo());
});

router.get('/station', (req, res) => {
    res.status(200).send(renderStation());
});

router.get('/getrelationships', (req, res) => {
    let fileUrl = 'dist/public/data/np-new';
    try{
        let data = fs.readFileSync(fileUrl, 'utf8');
        res.status(200).send(data);
    } catch(e) {
        console.log("Error:", e.stack);
    }

});

router.get('/us-states.json', (req, res) => {
    let fileUrl = 'dist/public/data/us-states.json';
    try{
        let data = fs.readFileSync(fileUrl, 'utf8');
        res.status(200).send(data);
    } catch(e) {
        console.log("Error:", e.stack);
    }

});

router.get('/cities-lived.csv', (req, res) => {
    try{
        let data = `years,place,lat,lon
2,New York City,40.71455,-74.007124
6,San Francisco,39.4336112,-76.68106
8,Santa Cruz,36.9740181,-122.0309525
3,Santa Barbara,34.4193802,-119.6990509
10,Tucson,32.22155,-110.9697571
1,Washington DC,38.8903694,-77.0319595`;
        res.status(200).send(data);
    } catch(e) {
        console.log("Error:", e.stack);
    }

});

router.get('/stateslived.csv', (req, res) => {
    try{
        let data = `state,visited
Alabama,0
Alaska,0
Arkansas,0
Arizona,2
California,2
Colorado,1
Connecticut,1
Delaware,0
Florida,0
Georgia,0
Hawaii,0
Iowa,0
Idaho,1
Illinois,1
Indiana,0
Kansas,0
Kentucky,0
Louisiana,0
Maine,1
Maryland,1
Massachusetts,1
Michigan,0
Minnesota,1
Missouri,0
Mississippi,0
Montana,1
North Carolina,0
North Dakota,0
Nebraska,0
New Hampshire,1
New Jersey,0
New Mexico,1
Nevada,1
New York,2
Ohio,1
Oklahoma,0
Oregon,1
Pennsylvania,1
Rhode Island,1
South Carolina,0
South Dakota,0
Tennessee,0
Texas,0
Utah,1
Virginia,0
Vermont,0
Washington,1
Wisconsin,0
West Virginia,0
Wyoming,1`;
        res.status(200).send(data);
    } catch(e) {
        console.log("Error:", e.stack);
    }

});

function renderSVGDemo() {
    return `
    <html>
    <head>
    	<title>IcoMoon - SVG Icons</title>
    	<meta charset="utf-8">
    	<meta name="viewport" content="width=device-width">
        <style>
        .icon {
        	display: inline-block;
        	color: #444444;
          width: 1em;
        	height: 1em;
        	fill: currentColor;
        }
        </style>
    </head>
    <body>
    <svg style="position: absolute; width: 0; height: 0; overflow: hidden" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">

    <symbol id="icon-router" viewBox="0 0 24 24">
        <path d="M15 18v-2.016h-2.016v2.016h2.016zM11.484 18v-2.016h-1.969v2.016h1.969zM8.016 18v-2.016h-2.016v2.016h2.016zM18.984 12.984c1.078 0 2.016 0.938 2.016 2.016v3.984c0 1.078-0.938 2.016-2.016 2.016h-13.969c-1.078 0-2.016-0.938-2.016-2.016v-3.984c0-1.078 0.938-2.016 2.016-2.016h9.984v-3.984h2.016v3.984h1.969zM19.313 6.703l-0.797 0.797c-0.703-0.703-1.641-0.984-2.531-0.984s-1.781 0.281-2.484 0.984l-0.797-0.797c0.891-0.891 2.063-1.406 3.281-1.406s2.438 0.516 3.328 1.406zM20.203 5.906c-1.219-1.078-2.719-1.688-4.219-1.688s-2.953 0.609-4.172 1.688l-0.797-0.797c1.406-1.406 3.188-2.109 4.969-2.109s3.609 0.703 5.016 2.109z"></path>
    </symbol>

    <symbol id="icon-server" viewBox="0 0 24 24">
        <path d="M22 12h-20c-1.094 0-2 1-2 2v4c0 1 1 2 2 2h20c1 0 2-1 2-2v-4c0-1-1-2-2-2zM4 18h-2v-4h2v4zM8 18h-2v-4h2v4zM12 18h-2v-4h2v4zM16 18h-2v-4h2v4zM22 22h-20c-1.094 0-2 1-2 2v4c0 1 1 2 2 2h20c1 0 2-1 2-2v-4c0-1-1-2-2-2zM4 28h-2v-4h2v4zM8 28h-2v-4h2v4zM12 28h-2v-4h2v4zM16 28h-2v-4h2v4zM22 2h-20c-1.094 0-2 1-2 2v4c0 1 1 2 2 2h20c1 0 2-1 2-2v-4c0-1-1-2-2-2zM4 8h-2v-4h2v4zM8 8h-2v-4h2v4zM12 8h-2v-4h2v4zM16 8h-2v-4h2v4zM22 6h-2v-2h2v2z"></path>
    </symbol>

    <symbol id="icon-user" viewBox="0 0 24 24">
        <path d="M7.725 2.146c-1.016 0.756-1.289 1.953-1.239 2.59 0.064 0.779 0.222 1.793 0.222 1.793s-0.313 0.17-0.313 0.854c0.109 1.717 0.683 0.976 0.801 1.729 0.284 1.814 0.933 1.491 0.933 2.481 0 1.649-0.68 2.42-2.803 3.334-2.13 0.918-4.326 2.073-4.326 4.073v1h18v-1c0-2-2.197-3.155-4.328-4.072-2.123-0.914-2.801-1.684-2.801-3.334 0-0.99 0.647-0.667 0.932-2.481 0.119-0.753 0.692-0.012 0.803-1.729 0-0.684-0.314-0.854-0.314-0.854s0.158-1.014 0.221-1.793c0.065-0.817-0.398-2.561-2.3-3.096-0.333-0.34-0.558-0.881 0.466-1.424-2.24-0.105-2.761 1.067-3.954 1.929z"></path>
    </symbol>

    </svg>

    <svg class="icon icon-router"><use xlink:href="#icon-router"></use></svg>

    <svg class="icon icon-server"><use xlink:href="#icon-server"></use></svg>

    <svg class="icon icon-user"><use xlink:href="#icon-user"></use></svg>
    </body>
    </html>
    `;
}

function renderStation() {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    	<title>Map Visualization Test</title>
    	<meta name="generator" content="TextMate http://macromates.com/">
    	<meta name="author" content="Sanjay Kairam">
            <script type = 'text/javascript' src="http://mbostock.github.com/d3/d3.js?2.4.6"></script>
            <script type = 'text/javascript' src="http://polymaps.org/polymaps.min.js?2.5.0"></script>

    	<style type="text/css">
    @import url("http://polymaps.org/style.css");

    	html, body {
    		height: 100%;
    		background: #E6E6E6;
    		margin: 0;
    		font: 10px sans-serif;
    	}

    	svg {
    		display: block;
    	}

    	#map {
    		width: 960px;
    		height: 500px;
    	}

    	.layer circle {
    		fill: steelblue;
    		fill-opacity: .8;
    		stroke: white;
    	}

    	circle.garage-circle {
    		fill-opacity: .5;
    		stroke: white;

    	}

    	</style>
    </head>
    <body>
    	<div id="map">
    	</div>
    	<script type="text/javascript">

    		// ====================
    		// CONSTANTS AND SCALES
    		// ====================
    		var fillCol = d3.scale.linear()
    			.domain([0, 1])
    			.range(["green", "red"]);

    		var dotSize = d3.scale.linear()
    			.domain([0, 1, 10, 100, 1000])
    			.range([4, 6, 8, 9, 12]);

    		// ===================
    		// POLLING SFPARK DATA
    		// ===================
    		var reqURL = 'http://api.sfpark.org/sfpark/rest/availabilityservice?lat=37.79&long=-122.41&radius=3&uom=mile&response=json&jsoncallback=addGarages&pricing=yes';

    		var scriptTag = document.createElement('SCRIPT');
    		scriptTag.src = reqURL;

    		document.getElementsByTagName('HEAD')[0].appendChild(scriptTag);

    		// =========================
    		// DRAWING MAIN MAP ELEMENTS
    		// =========================
    		var po = org.polymaps;

    		var map = po.map()
    			.container(d3.select("#map").append("svg:svg").node())
    			.center({lat:37.775, lon:-122.425})
    			.zoom(13)
    			.add(po.drag())
    			.add(po.wheel().smooth(false))
    			.add(po.dblclick())
    			.add(po.arrow());

    		map.add(po.image()
    		    .url(po.url("http://{S}tile.cloudmade.com"
    		    + "/83a0ee76ff0049748b22c0c831ab5f73" // CloudMade Developer API Key
    		    + "/998/256/{Z}/{X}/{Y}.png")
    		    .hosts(["a.", "b.", "c.", ""])));

    		map.add(po.compass()
    			.pan("none"));

    		/*
    		 * LOCATIONS (PRIMARY DATA OBJECT)
    		 * FIELDS:
    		 * "geometry" : {
    				"coordinates": [long, lat]
    				"longitude": float
    				"latitude": float
    				"type": "Point"
    			}
    		 * "info" : {
    				"type": either "ON" or "OFF"
    				"name": "<garage-name>"
    				"desc": usually the address as a string			[off-street parking only]
    				"inter": closest intersection as string			[off-street parking only]
    				"tel": telephone # as a string					[off-street parking only]
    				"occupied": # spots occupied					[on-street only? not sure]
    				"operated": # total spots						[on-street only? not sure]
    			}
    		* "ophrs": just store full JSON object for now 			[off-street only]
    		* "rates": just store full JSON object for now			[off-street only]
    		*/
    		var locations = [];

    		// ===========================================================
    		// CALLBACK FUNCTION WHICH PROCESSES DATA RETURNED FROM SFPARK
    		// ===========================================================
    		var addGarages = function(data) {
    			var num_records = data.NUM_RECORDS;
    			var records = data.AVL;

    			for (var i = 0 ; i < num_records ; i++) {
    				locObj = new LocationObject(records[i]);
    				//console.log(locObj);
    				locations.push(locObj);
    			}

    			var layer = d3.select("#map svg")
    				.insert("svg:g", ".compass")
    				.attr("id", "point-layer");

    			var marker = layer.selectAll("g")
    				.data(locations)
    				.enter().append("svg:g")
    				.attr("transform", transform);

    			marker.append("svg:circle")
    				.attr("class", "garage-circle")
    				.attr("r", circleSize)
    				.style("fill", fillColor);

    			marker.append("svg:title")
    				.attr("x", 7)
    				.attr("dy", ".31em")
    				.text(function(d) {return d.info.oper + " spaces, " + (d.info.oper - d.info.occ) + " open."; });

    			map.on("move", function() {
    				layer.selectAll("g").attr("transform", transform);
    			});

    			function fillColor(d) {
    				return ((d.info.oper > 0) && (d.info.occ >= 0)) ? fillCol(d.info.occ / d.info.oper) : "gray";
    			}

    			function circleSize(d) {
    				return ((d.info.oper > 0) && (d.info.occ >= 0)) ? dotSize(d.info.oper - d.info.occ) : 7;
    			}

    			// HELPER FUNCTIONS FOR ADDGARAGES
    			function LocationObject(record) {
    				this.geometry = new GeometryObject(record.LOC);

    				var locData = record.LOC.split(",");
    				this.longitude = parseFloat(locData[0]);
    				this.latitude = parseFloat(locData[1]);

    				//console.log(this.geometry);
    				this.info = new InfoObject(record);
    				this.ophrs = ((record.OPHRS == undefined) ? -1 : record.OPHRS);
    				this.rates = ((record.RATES == undefined) ? -1 : record.RATES);

    			}

    			function GeometryObject(locString) {
    				var locData = locString.split(",");
    				longitude = parseFloat(locData[0]);
    				latitude = parseFloat(locData[1]);
    				this.coordinates = [longitude, latitude];
    				this.type = "Point";
    			}

    			function InfoObject(record) {
    				this.type = record.TYPE;
    				this.name = record.NAME;
    				this.desc = record.DESC;
    				this.inter = record.INTER;
    				this.tel = record.TEL;
    				this.occ = ((record.OCC == undefined) ? -1 : parseInt(record.OCC));
    				this.oper = ((record.OPER == undefined) ? -1 : parseInt(record.OPER));
    			}


    			function transform(d) {
    				d = map.locationPoint({lon: d.longitude, lat: d.latitude})
    				return "translate(" + d.x + "," + d.y + ")";
    			}
    		}

    	</script>
    </body>
    </html>
    `;
}

function renderRouteMapPage() {
    return `
    <!DOCTYPE html>
    <meta charset="utf-8">
    <style>

    body {
      background: #fcfcfa;
    }

    .stroke {
      fill: none;
      stroke: #000;
      stroke-width: 3px;
    }

    .fill {
      fill: #fff;
    }

    .graticule {
      fill: none;
      stroke: #777;
      stroke-width: .5px;
      stroke-opacity: .5;
    }

    .land {
      fill: #bbb;
    }

    .boundary {
      fill: none;
      stroke: #fff;
      stroke-width: .5px;
    }

    .points circle {
      fill: #fff;
      stroke: red;
      stroke-width: 2px;
    }

    .points text {
      font: 11px sans-serif;
      text-anchor: middle;
      text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;
    }

    .route {
      fill: none;
      stroke: red;
      stroke-width: 3px;
    }

    </style>
    <body>
    <script src="//d3js.org/d3.v3.min.js"></script>
    <script src="//d3js.org/d3.geo.projection.v0.min.js"></script>
    <script src="//d3js.org/topojson.v1.min.js"></script>
    <script>

    var width = 960,
        height = 570;

    var places = {
      HNL: [-157 - 55 / 60 - 21 / 3600, 21 + 19 / 60 + 07 / 3600],
      HKG: [113 + 54 / 60 + 53 / 3600, 22 + 18 / 60 + 32 / 3600],
      SVO: [37 + 24 / 60 + 53 / 3600, 55 + 58 / 60 + 22 / 3600],
      HAV: [-82 - 24 / 60 - 33 / 3600, 22 + 59 / 60 + 21 / 3600],
      CCS: [-66 - 59 / 60 - 26 / 3600, 10 + 36 / 60 + 11 / 3600],
      UIO: [-78 - 21 / 60 - 31 / 3600, 0 + 06 / 60 + 48 / 3600]
    };

    var route = {
      type: "LineString",
      coordinates: [
        places.HNL,
        places.HKG,
        places.SVO,
        places.HAV,
        places.CCS,
        places.UIO
      ]
    };

    var projection = d3.geo.kavrayskiy7()
        .scale(170)
        .rotate([-40, 0])
        .translate([width / 2, height / 2])
        .precision(.1);

    var path = d3.geo.path()
        .projection(projection);

    var graticule = d3.geo.graticule();

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.append("defs").append("path")
        .datum({type: "Sphere"})
        .attr("id", "sphere")
        .attr("d", path);

    svg.append("use")
        .attr("class", "stroke")
        .attr("xlink:href", "#sphere");

    svg.append("use")
        .attr("class", "fill")
        .attr("xlink:href", "#sphere");

    svg.append("path")
        .datum(graticule)
        .attr("class", "graticule")
        .attr("d", path);

    svg.append("path")
        .datum(route)
        .attr("class", "route")
        .attr("d", path);

    var point = svg.append("g")
        .attr("class", "points")
      .selectAll("g")
        .data(d3.entries(places))
      .enter().append("g")
        .attr("transform", function(d) { return "translate(" + projection(d.value) + ")"; });

    point.append("circle")
        .attr("r", 4.5);

    point.append("text")
        .attr("y", 10)
        .attr("dy", ".71em")
        .text(function(d) { return d.key; });

    d3.json("/mbostock/raw/4090846/world-50m.json", function(error, world) {
      if (error) throw error;

      svg.insert("path", ".graticule")
          .datum(topojson.feature(world, world.objects.land))
          .attr("class", "land")
          .attr("d", path);

      svg.insert("path", ".graticule")
          .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
          .attr("class", "boundary")
          .attr("d", path);
    });

    d3.select(self.frameElement).style("height", height + "px");

    </script>
    `;
}
/*
In this function, you can render you html part of the webpage. You can add some meta tags or Opern Graph tags
using JS variables.
 */
function renderFullPage(html, initialState) {
/*	return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    	<!-- Required meta tags always come first -->
    	<meta charset="utf-8">
    	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    	<meta http-equiv="x-ua-compatible" content="ie=edge">
    	<title>Auroraland Web</title>
        <style type="text/css">
        #right {
            display: flex;
            justify-content: center;
            align-items: center;
            resize: both;
            overflow: auto;
        }
        #blank-point {
            resize: both;
        }
        </style>
    </head>
    <body>
        <div id="right">
    	   <div id="blank-point"></div>
        </div>
    	<script src="/public/js/app.bundle.js"></script>
    </body>
    </html>
    `;*/
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <script type="text/javascript" src="https://cdn.rawgit.com/simplegeo/polymaps/v2.3.0/polymaps.min.js"></script>
        <script type="text/javascript" src="https://cdn.rawgit.com/simplegeo/polymaps/v2.3.0/lib/raphaeljs/icons.js"></script>
        <script type="text/javascript" src="https://cdn.rawgit.com/simplegeo/polymaps/v2.3.0/lib/crimespotting/crimespotting.js"></script>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha256-k2WSCIexGzOj3Euiig+TlR8gA0EmPjuc79OEeY5L45g=" crossorigin="anonymous"></script>
        <link rel="stylesheet" type="text/css" href="/public/css/buttons.css">
        <link rel="stylesheet" type="text/css" href="/public/css/style.css">
        <style type="text/css">

    @import url("https://cdn.rawgit.com/simplegeo/polymaps/v2.3.0/examples/example.css");

    html, body {
      height: 100%;
      background: #E6E6E6;
    }

    svg {
      display: block;
    }

    .layer use {
      stroke: #ccc;
      stroke-opacity: .5;
    }
        </style>
      </head>
      <body>
        <div style="position:fixed; left:10px; top:10px">
            <button id="usericon" class="button button-3d button-highlight button-box button-jumbo"></button>
            <button id="routericon" class="button button-3d button-box button-jumbo"></button>
            <button id="servericon" class="button button-3d button-box button-jumbo "></button>
        <div>
        <script type="text/javascript">

    var po = org.polymaps;

    var svg = document.body.appendChild(po.svg("svg")),
        defs = svg.appendChild(po.svg("defs"));

    /* Create three linear gradients for each category. */
    defs.appendChild(gradient("#D90000", "#A30000")).setAttribute("id", "gradient-violent");
    defs.appendChild(gradient("#23965E", "#1A7046")).setAttribute("id", "gradient-property");
    defs.appendChild(gradient("#3489BA", "#27678B")).setAttribute("id", "gradient-quality");

    var symbol = svg.appendChild(po.svg("symbol"));
    symbol.setAttribute("id", "icon-router");
    var path = symbol.appendChild(po.svg("path"));
    path.setAttribute("transform", "scale(1.5)");
    path.setAttribute("d","M15 18v-2.016h-2.016v2.016h2.016zM11.484 18v-2.016h-1.969v2.016h1.969zM8.016 18v-2.016h-2.016v2.016h2.016zM18.984 12.984c1.078 0 2.016 0.938 2.016 2.016v3.984c0 1.078-0.938 2.016-2.016 2.016h-13.969c-1.078 0-2.016-0.938-2.016-2.016v-3.984c0-1.078 0.938-2.016 2.016-2.016h9.984v-3.984h2.016v3.984h1.969zM19.313 6.703l-0.797 0.797c-0.703-0.703-1.641-0.984-2.531-0.984s-1.781 0.281-2.484 0.984l-0.797-0.797c0.891-0.891 2.063-1.406 3.281-1.406s2.438 0.516 3.328 1.406zM20.203 5.906c-1.219-1.078-2.719-1.688-4.219-1.688s-2.953 0.609-4.172 1.688l-0.797-0.797c1.406-1.406 3.188-2.109 4.969-2.109s3.609 0.703 5.016 2.109z");
    path.setAttribute("id", "icon-router");

    symbol = svg.appendChild(po.svg("symbol"));
    symbol.setAttribute("id", "icon-server");
    path = symbol.appendChild(po.svg("path"));
    path.setAttribute("transform", "scale(1.2)");
    path.setAttribute("d","M22 12h-20c-1.094 0-2 1-2 2v4c0 1 1 2 2 2h20c1 0 2-1 2-2v-4c0-1-1-2-2-2zM4 18h-2v-4h2v4zM8 18h-2v-4h2v4zM12 18h-2v-4h2v4zM16 18h-2v-4h2v4zM22 22h-20c-1.094 0-2 1-2 2v4c0 1 1 2 2 2h20c1 0 2-1 2-2v-4c0-1-1-2-2-2zM4 28h-2v-4h2v4zM8 28h-2v-4h2v4zM12 28h-2v-4h2v4zM16 28h-2v-4h2v4zM22 2h-20c-1.094 0-2 1-2 2v4c0 1 1 2 2 2h20c1 0 2-1 2-2v-4c0-1-1-2-2-2zM4 8h-2v-4h2v4zM8 8h-2v-4h2v4zM12 8h-2v-4h2v4zM16 8h-2v-4h2v4zM22 6h-2v-2h2v2z");
    path.setAttribute("id", "icon-server");

    symbol = svg.appendChild(po.svg("symbol"));
    symbol.setAttribute("id", "icon-user");
    path = symbol.appendChild(po.svg("path"));
    path.setAttribute("transform", "scale(0.05)");
    path.setAttribute("d","M107.417,147.134c0-17.964,9.563-33.692,23.867-42.391v-9.39C131.284,42.778,174.058,0,226.633,0c52.579,0,95.344,42.778,95.344,95.353v12.827c11.527,9.071,18.953,23.14,18.953,38.949c0,23.207-15.976,42.629-37.51,48.024c-1.213,3.022-3.023,6.277-5.927,9.416c-6.66,7.232-16.783,11.675-30.103,13.343c-0.873,2.672-3.3,4.637-6.264,4.637h-12.666c-3.691,0-6.684-2.987-6.684-6.677s2.992-6.676,6.684-6.676h12.666c2.362,0,4.346,1.3,5.535,3.162c11.972-1.482,20.937-5.351,26.696-11.593c1.315-1.435,2.306-2.891,3.169-4.335c-1.704,0.177-3.431,0.273-5.171,0.273V97.565c5.297,0,10.412,0.842,15.2,2.385v-4.602c0-44.074-35.853-79.931-79.929-79.931c-44.073,0-79.931,35.857-79.931,79.931v3.292c3.316-0.697,6.758-1.071,10.275-1.071v99.128C129.606,196.698,107.417,174.509,107.417,147.134zM248.148,204.336h12.671c2.818,0,5.512,1.008,7.663,2.796c3.893-0.646,7.271-1.65,10.319-2.877c1.4-1.237,2.81-2.462,4.111-3.79V85.046h0.383c-14.99-15.413-35.928-25.021-59.125-25.021c-23.198,0-44.134,9.607-59.127,25.025h0.373v115.415c14.972,15.177,35.748,24.601,58.754,24.601c4.779,0,9.435-0.495,13.985-1.279c-1.447-2.021-2.324-4.478-2.324-7.15C235.832,209.851,241.362,204.336,248.148,204.336zM259.186,230.698h-70.022c-58.257,0-105.655,47.398-105.655,105.658v85.65l0.219,1.334l5.908,1.849c55.59,17.361,103.901,23.167,143.658,23.167c77.66,0,122.669-22.149,125.441-23.55l5.526-2.8h0.588v-85.65C364.849,278.097,317.449,230.698,259.186,230.698z");
    path.setAttribute("id", "icon-user");

    /* Create a marker path. */
    defs.appendChild(icons.marker()).setAttribute("id", "marker");



    var map = po.map()
        .container(svg)
        .center({lat: 37.787, lon: -122.228})
        .zoomRange([10, 16])
        .add(po.interact());

    map.add(po.image()
        .url(po.url("http://{S}tile.cloudmade.com"
        + "/1a1b06b230af4efdbb989ea99e9841af" // http://cloudmade.com/register
        + "/998/256/{Z}/{X}/{Y}.png")
        .hosts(["a.", "b.", "c.", ""])));

    map.add(po.geoJson()
        .url(crimespotting("http://oakland.crimespotting.org"
            + "/crime-data"
            + "?count=100"
            + "&format=json"
            + "&bbox={B}"
            + "&dstart=2010-04-01"
            + "&dend=2010-04-01"))
        .on("load", load)
        .clip(false)
        .scale("fixed")
        .zoom(12));

    /* Post-process the GeoJSON points and replace them with markers! */
    function load(e) {
      e.features.sort(function(a, b) {
        return b.data.geometry.coordinates[1] - a.data.geometry.coordinates[1];
      });
      for (var i = 0; i < e.features.length; i++) {
          var f = e.features[i],
              d = f.data,
              c = f.element,
              p = c.parentNode,
              u = f.element = po.svg("use");

          if (i ==  0) {
              u.setAttributeNS(po.ns.xlink, "href", "#icon-server");
          } else if (i == e.features.length - 1) {
              u.setAttributeNS(po.ns.xlink, "href", "#icon-router");
          } else {
              u.setAttributeNS(po.ns.xlink, "href", "#icon-user");
          }
          u.setAttribute("transform", c.getAttribute("transform"));
          p.removeChild(c);
          p.appendChild(u);
      }
    }

    /* Helper method for constructing a linear gradient. */
    function gradient(a, b) {
      var g = po.svg("linearGradient");
      g.setAttribute("x1", 0);
      g.setAttribute("y1", 1);
      g.setAttribute("x2", 0);
      g.setAttribute("y2", 0);
      var s0 = g.appendChild(po.svg("stop"));
      s0.setAttribute("offset", "0%");
      s0.setAttribute("stop-color", a);
      var s1 = g.appendChild(po.svg("stop"));
      s1.setAttribute("offset", "100%");
      s1.setAttribute("stop-color", b);
      return g;
    }
    $("#usericon, #servericon, #routericon").click(function() {
        $(this).toggleClass("button-highlight");
    })
        </script>
      </body>
    </html>
    `;
}

export default router;
