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

router.get('/twopoints', (req, res) => {
    res.status(200).send(renderTwoPoints());
})

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

function renderTwoPoints() {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="public/lib/css/style.css">
      </head>
      <body>
        <div id="graph">
          <h1>Connecting Two Points with a Line in D3.js</h1>
        </div>

        <!-- Scripts -->
        <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
        <script src="public/lib/js/script.js"></script>
      </body>
    </html>
    `;
}

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
      stroke: blue;
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

    d3.json("public/data/world-50m.json", function(error, world) {
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

    .route {
        stroke: green;
        stroke-width: 2px;
        fill: none;
    }

    .tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 1s;
}

.tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
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

    var router = svg.appendChild(po.svg("symbol"));
    router.setAttribute("id", "icon-router");
    router.setAttribute("display", "none");
    var routerPath = router.appendChild(po.svg("path"));
    routerPath.setAttribute("transform", "scale(1.5)");
    routerPath.setAttribute("d","M15 18v-2.016h-2.016v2.016h2.016zM11.484 18v-2.016h-1.969v2.016h1.969zM8.016 18v-2.016h-2.016v2.016h2.016zM18.984 12.984c1.078 0 2.016 0.938 2.016 2.016v3.984c0 1.078-0.938 2.016-2.016 2.016h-13.969c-1.078 0-2.016-0.938-2.016-2.016v-3.984c0-1.078 0.938-2.016 2.016-2.016h9.984v-3.984h2.016v3.984h1.969zM19.313 6.703l-0.797 0.797c-0.703-0.703-1.641-0.984-2.531-0.984s-1.781 0.281-2.484 0.984l-0.797-0.797c0.891-0.891 2.063-1.406 3.281-1.406s2.438 0.516 3.328 1.406zM20.203 5.906c-1.219-1.078-2.719-1.688-4.219-1.688s-2.953 0.609-4.172 1.688l-0.797-0.797c1.406-1.406 3.188-2.109 4.969-2.109s3.609 0.703 5.016 2.109z");
    routerPath.setAttribute("id", "icon-router");

    var server = svg.appendChild(po.svg("symbol"));
    server.setAttribute("id", "icon-server");
    server.setAttribute("display", "none");
    var serverPath = server.appendChild(po.svg("path"));
    serverPath.setAttribute("transform", "scale(1.2)");
    serverPath.setAttribute("d","M22 12h-20c-1.094 0-2 1-2 2v4c0 1 1 2 2 2h20c1 0 2-1 2-2v-4c0-1-1-2-2-2zM4 18h-2v-4h2v4zM8 18h-2v-4h2v4zM12 18h-2v-4h2v4zM16 18h-2v-4h2v4zM22 22h-20c-1.094 0-2 1-2 2v4c0 1 1 2 2 2h20c1 0 2-1 2-2v-4c0-1-1-2-2-2zM4 28h-2v-4h2v4zM8 28h-2v-4h2v4zM12 28h-2v-4h2v4zM16 28h-2v-4h2v4zM22 2h-20c-1.094 0-2 1-2 2v4c0 1 1 2 2 2h20c1 0 2-1 2-2v-4c0-1-1-2-2-2zM4 8h-2v-4h2v4zM8 8h-2v-4h2v4zM12 8h-2v-4h2v4zM16 8h-2v-4h2v4zM22 6h-2v-2h2v2z");
    serverPath.setAttribute("id", "icon-server");

    var user = svg.appendChild(po.svg("symbol"));
    user.setAttribute("id", "icon-user");
    user.setAttribute("class", "tooltip");
    var userPath = user.appendChild(po.svg("path"));
    userPath.setAttribute("transform", "scale(0.05)");
    userPath.setAttribute("d","M107.417,147.134c0-17.964,9.563-33.692,23.867-42.391v-9.39C131.284,42.778,174.058,0,226.633,0c52.579,0,95.344,42.778,95.344,95.353v12.827c11.527,9.071,18.953,23.14,18.953,38.949c0,23.207-15.976,42.629-37.51,48.024c-1.213,3.022-3.023,6.277-5.927,9.416c-6.66,7.232-16.783,11.675-30.103,13.343c-0.873,2.672-3.3,4.637-6.264,4.637h-12.666c-3.691,0-6.684-2.987-6.684-6.677s2.992-6.676,6.684-6.676h12.666c2.362,0,4.346,1.3,5.535,3.162c11.972-1.482,20.937-5.351,26.696-11.593c1.315-1.435,2.306-2.891,3.169-4.335c-1.704,0.177-3.431,0.273-5.171,0.273V97.565c5.297,0,10.412,0.842,15.2,2.385v-4.602c0-44.074-35.853-79.931-79.929-79.931c-44.073,0-79.931,35.857-79.931,79.931v3.292c3.316-0.697,6.758-1.071,10.275-1.071v99.128C129.606,196.698,107.417,174.509,107.417,147.134zM248.148,204.336h12.671c2.818,0,5.512,1.008,7.663,2.796c3.893-0.646,7.271-1.65,10.319-2.877c1.4-1.237,2.81-2.462,4.111-3.79V85.046h0.383c-14.99-15.413-35.928-25.021-59.125-25.021c-23.198,0-44.134,9.607-59.127,25.025h0.373v115.415c14.972,15.177,35.748,24.601,58.754,24.601c4.779,0,9.435-0.495,13.985-1.279c-1.447-2.021-2.324-4.478-2.324-7.15C235.832,209.851,241.362,204.336,248.148,204.336zM259.186,230.698h-70.022c-58.257,0-105.655,47.398-105.655,105.658v85.65l0.219,1.334l5.908,1.849c55.59,17.361,103.901,23.167,143.658,23.167c77.66,0,122.669-22.149,125.441-23.55l5.526-2.8h0.588v-85.65C364.849,278.097,317.449,230.698,259.186,230.698z");
    userPath.setAttribute("id", "icon-user");
    var userText = user.appendChild(po.svg("text"));
    userText.setAttribute("x", "15");
    userText.setAttribute("y", "15");
    userText.setAttribute("fill", "red");
    userText.textContent = "fill red";
    userText.setAttribute("class", "tooltiptext");

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
            + "?count=1000"
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

          let serverLoc = {};

          if (i ==  0) {
              serverLoc = d;
              u.setAttributeNS(po.ns.xlink, "href", "#icon-server");
          } else if (i == e.features.length - 1) {
              u.setAttributeNS(po.ns.xlink, "href", "#icon-router");
          } else {
              u.setAttributeNS(po.ns.xlink, "href", "#icon-user");
              u.setAttribute("id", "userdetail"+i);
              //u.setAttribute("class", "tooltip");
              //let text = u.appendChild(po.svg("text"));
              //text.setAttribute("class", "tooltiptext");
            //   let route = p.appendChild(po.svg("path"));
            //   route.setAttribute("class", "route");
            //   route.setAttribute("d", "M887.609096704553,221.74640750700695L873.3127123771042,216.79216960235163L858.8504512708448,212.33802996402227L844.2712256805119,208.43326653973645L829.628065489569,205.1242895476648L814.9764811637328,202.45304616281194L800.3724427404582,200.45532160832784L785.8700898453505,199.15908850979199L771.5193596948584,198.5830832204206L757.3637691371764,198.7357851899577L743.4385939483254,199.6149371137112L729.7696448926064,201.20767377269658L716.3727525175404,203.4912411370998L703.2539633072643,206.43420550783944L690.4103474568255,209.99799457148987L677.831247471744,214.13858900294508L665.4997686149429,218.8081941926426L657.4410664084451,209.39283389886998L648.969779009318,200.1302571412195L640.0574482158424,191.0525055570867L630.6736625619385,182.19717039195447L620.7862709697204,173.6086320206595L610.3619851458274,165.33945915552675L599.3675910236924,157.45190432314965L587.7720730567654,150.0193447393258L581.7406084683641,146.4999441546811L575.5500268196361,143.12737698420145L569.1988616879274,139.9142966232971L562.6867343110875,136.87407388439735L556.0146121651596,134.02070593249988L549.1850862761781,131.36867923438956L542.202654642685,128.93278001299026L535.073993334897,126.72784795512749L527.8081909924738,124.76847268921412L520.4169176905668,123.06863790113528L512.9144969667835,121.64132464255226L505.3178517849742,120.49809272522597L497.6463025822996,119.6486659536458L489.92120859317436,119.10055186875539L482.16546122438757,118.85872818642221L474.40285766217465,118.92542516941268L465.87674299469006,114.32570457693097L456.81791384575837,110.13657668541217L447.2031285679878,106.41701030563485L437.0234097676669,103.22901360375175L426.2901840414857,100.63455522050265L415.04083806883057,98.69124110063433L403.3419561654026,97.44711009108983L391.2884597419489,96.93538053482735L378.9977057675919,97.17031646582114L366.5992253390747,98.14532440724585L354.22243951425565,99.83384275718487L341.9853966646766,102.19275735895238L329.9869277821612,105.16738316497481L318.3031156236516,108.69680771659554L306.98753864966454,112.71860890816339L296.07398874869415,117.17241073048419L285.5803078515934,122.00217301245951L275.51233871195257,127.15738826919042L265.8674218882386,132.59346987227394L256.6372175016227,138.27161388540102L247.80984218357924,144.1583619349356L239.3714126088944,150.22502564059732L231.30711800402744,156.44707483508208L223.6019390365775,162.80354841346156L216.24111119887158,169.27651749146716L209.21040871221436,175.85061245729426L202.49630517010928,182.51261510649965L196.08605121019804,189.2511116199292L189.96769744860916,196.05619972710244L184.13008211749593,202.91924270086568L178.56279658481463,209.83266304609424L173.25613754577614,216.78976939407926L181.58151180079943,225.6313583077682L189.85922265497555,234.73677903314655L206.51716228740008,253.54010086322543L198.50810806392224,261.25263609080224L190.74001051677612,269.02382981778044L175.87191827126833,284.66373323078244");
          }
          u.setAttribute("transform", c.getAttribute("transform"));
          p.removeChild(c);
          p.appendChild(u);

      }
    }

    $("#usericon, #servericon, #routericon").click(function() {
        $(this).toggleClass("button-highlight");
        let displaystyle = (!$(this).hasClass("button-highlight") ? "none" : "");
        switch ($(this).attr("id")) {
            case "routericon":
                router.setAttribute("display", displaystyle);
                break;
            case "servericon":
                server.setAttribute("display", displaystyle);
                break;
            case "usericon":
                user.setAttribute("display", displaystyle);
                break;
        }
    })

    let dummyuserdata = {
      "username": "jshemming0",
      "online": false,
      "session": "Gembucket",
      "servicelist": "[“asset”, “aproxy”, “mixer”]",
      "service_instances": "[“asset110”, “proxy419”, “mixer82”]",
      "connection": null,
      "location": {
        "path": {
          "lat": 49.285973,
          "lon": -0.4889547
        },
        "node": {
          "id": "cd29cc0c-37bc-4ed5-9661-ce75fdeb8361"
        },
        "root": {
          "id": "b83068c8-1163-43b1-ba05-05d8a7711ec7",
          "domain": {
            "id": "ec73fcdb-eb37-4a05-89e1-d4fede535c7b",
            "ice_server_address": "60.215.71.84",
            "online": true
          }
        }
      },
      "images": {
        "hero": "http://dummyimage.com/134x193.png/ff4444/ffffff",
        "thumbnail": "http://dummyimage.com/137x140.png/cc0000/ffffff",
        "tiny": "http://dummyimage.com/x.png/cc0000/ffffff"
      }
    }

    $("body").on("mouseover", "[id^=userdetail]", function() {
        let userid = $(this).attr("id");
        // alert(dummyuserdata.session);
        // alert(dummyuserdata.servicelist);
        // alert(dummyuserdata.service_instances);
    });
        </script>
      </body>
    </html>
    `;
}

export default router;
