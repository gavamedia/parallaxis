# Parallaxis.js
Standalone parallax Scrolling in JavaScript. No jQuery required.

##Overview
A fast, simple to use parallax library. Just add a `parallax-distance` attribute to the element you want to 


We utilize the **canvas element**. 

####Why we use the canvas
Traditional libraries add images or divs to your page, and position them with translate3d. Unfortunately in many designs cases, this can cause flickering, and requires a complex rewrite of your HTML/CSS to accommodate. 

####Fastest
Hardware accelerated and buttery smooth at **60 fps**.

####Smallest
Only **3 KB**

####Simplest
Elegant code that's easy to understand. **No jQuery**. Just 3 functions; no classes or gimmicks

####Responsive-ist
Uses the correct CSS background image, which could be **adjustable based on CSS**, whereas other libraries require you explicitly set a URL via a parameter


##Sample Usage
Add `parallax-distance` attribute, with a value between 1 (no parallax) and 10 (lots of parallax)

`<div parallax-distance="4">
	The background image in here will get the parallax affect.
</div>
`


##Preview
https://gavamedia.com
