/**
 * @license MIT
 * @fileoverview Menage all routes
 * @copyright codewithsadee 2023 All rights reserved
 * @author codewithsadee <mohammadsadee24@gmail.com>
 */


'use strict';

// import { query } from 'express';
import {updateWeather, error404 } from './app.js';
 const defaultLocation = "#/weather?lat=25.4381302&lon=81.8338005"

 const currentLocation = function() {

    window.navigator.geolocation.getCurrentPosition(res=> {
        const { latitude, longitude } = res.coords;
        updateWeather(`lat=${latitude}`,`lon=${longitude}`);
    }, err => {
        window.location.hash = defaultLocation;
    });

 }

 /**
  * 
  * @param {string} query  Searched query
  */

 const searcheLocation = query => updateWeather(...query.split('&'));

 const routes = new Map([
    ["/current-location", currentLocation],
    ["/weather", searcheLocation]
 ]);

 const checkHash = function () {
    const requestURL = window.location.hash.slice(1);

    const [route, query] = requestURL.includes ? requestURL.split('?') : [requestURL];

    routes.get(route) ? routes.get(route)(query) : error404();

 }

 window.addEventListener("hashchange", checkHash);

 window.addEventListener("load", function () {
    if(!window.location.hash) {
        window.location.hash = "#/current-location";
    } else {
        checkHash();
    }
 });