#parallaxis.js
A fast, powerful parallax library, written in pure JavaScript. No jQuery required.

##Overview

**_Fastest -_** Hardware accelerated and buttery smooth at **60 fps**.

**_Smallest -_** Only **3 kb total**. Other parallax libraries are over 100 kb with jQuery.

**_Simplest -_** Add **1 attribute** to your HTML. No other parameters.

**_Responsive-ist -_** Total responsive design support, automatically using the correct image on any device.



##Technical Overview

We achieve the parallax effect in a unique way, by utilizing the **canvas element**, which is faster, and more compatible than other methods.

####Why use the canvas
Traditional parallax libraries add divs to your page, and position them with translate3d. Unfortunately this can require a complex rewrite of your HTML & CSS to prevent flickering when you have other elements on top. [See example of translate3d's flickering here](https://gavamedia.github.io/parallaxis#translate3d).

####Understandable Code
Simple, documented code that's easy to read. Only **3 functions**; no classes, objects, or gimmicks.


####Compatibility
Fully iOS and Android compatible – no hacks necessary. Compatible with all browsers released since 2011, including Internet Explorer 9.


##Sample Usage
Add a `parallax-distance` attribute to any element, with a value between 1 (it's close, so little parallax) and 10 (it's far, so lots of parallax). The parallax effect will be applied to its background image.


**HTML:**

    <div parallax-distance="4">
      The background image in here will get the parallax effect.
    </div>

    <script src="https://cdn.rawgit.com/gavamedia/parallaxis/master/parallaxis.min.js"></script>


**Responsive CSS:**

    /* Mobile */
    div {
      background-image:url('mobile.jpg');
    }


    /* Desktop */
    @media (min-width: 768px) {

      div {
        background-image:url('desktop.jpg');
      }

    }

Parallaxis will automatically use the correct background image.


##Live Preview
https://gavamedia.com

##Benchmarks

https://gavamedia.github.io/parallaxis
