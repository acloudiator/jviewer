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

router.get('/getrelationships', (req, res) => {
    let fileUrl = 'dist/public/data/np-new';
    try{
        let data = fs.readFileSync(fileUrl, 'utf8');
        res.status(200).send(data);
    } catch(e) {
        console.log("Error:", e.stack);
    }

});
/*
In this function, you can render you html part of the webpage. You can add some meta tags or Opern Graph tags
using JS variables.
 */
function renderFullPage(html, initialState) {
	return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    	<!-- Required meta tags always come first -->
    	<meta charset="utf-8">
    	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    	<meta http-equiv="x-ua-compatible" content="ie=edge">
    	<title>Auroraland Web</title>

    	<!-- Bootstrap CSS -->
    	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css" integrity="sha384-y3tfxAZXuh4HwSYylfB+J125MxIs6mR5FOHamPBG064zB+AFeWH94NdvaCBm8qnd" crossorigin="anonymous">
    	<link rel="stylesheet" href="/public/css/style.css">
        <link rel="stylesheet" href="/public/lib/css/network.css">
        <link rel="stylesheet" href="/public/lib/css/vex-theme-os.css">
        <link rel="stylesheet" href="/public/lib/css/vex.css">
    </head>
    <body>

    	<div id="reactbody"><div>${html}</div></div>
        <div id="network" style={{backgroundColor:"#030303"}}>
            <!--div id="popUp"></div-->
            <div id="dynamicListHolder"></div>
        </div>
        <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script type="text/javascript">var fileNames = ["user.png","video_convenience.png","games_domain.png"];</script>

    	<script src="/public/js/app.bundle.js"></script>
    	<!-- jQuery first, then Bootstrap JS. -->
    	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
        <script src="https://www.atlasestateagents.co.uk/javascript/tether.min.js"></script>
    	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/js/bootstrap.min.js" integrity="sha384-vZ2WRJMwsjRMW/8U7i6PWi6AlO1L79snBrmgiDpgIWJ82z8eA5lenwvxbMV1PAh7" crossorigin="anonymous"></script>
        <script src="/public/lib/js/jquery.history.js"></script>
        <script src="/public/lib/js/jquery.rdfquery.core.min-1.0.js"></script>
        <script src="/public/lib/js/dragdealer.js"></script>
        <script src="/public/lib/js/d3.v2.min.js"></script>
        <script src="/public/lib/js/vex.min.js"></script>
        <script src="/public/lib/js/network.js"></script>
    </body>
    </html>
    `
}

export default router;
