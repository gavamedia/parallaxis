# Parallaxis
A fast, powerful parallax background library, written in pure JavaScript. No jQuery required.

## Overview

**_Fastest -_** Hardware accelerated and buttery smooth.

**_Smallest -_** Only **3 kb total**. Other parallax libraries are over 100 kb with jQuery.

**_Simplest -_** Add **1 attribute** to your HTML. No other parameters.

**_Responsive-ist -_** Total responsive design support. Automatically uses the correct image on any device.



## Technical Overview

We achieve the parallax effect in a unique way, by utilizing the **canvas element**, which is faster, and causes less problems than other methods.

#### Understandable code
Simple, documented code that's easy to read. Only **3 functions**; no classes, objects, or gimmicks.

#### Compatibility
Fully iOS and Android compatible – no hacks necessary. Compatible with all browsers released since 2011, including Internet Explorer 9.

#### The problem with manually positioning elements
[Many popular libraries](http://markdalgleish.com/projects/stellar.js/docs/) position your parallax elements with `translate`, or even `left` or `top`. None of these are hardware accelerated, and perform poorly on the majority of devices.

#### The problem with translate3d
While hardware accelerated, this method can require a complex rewrite of your code to prevent flickering. [See example of translate3d's flickering here](https://gavamedia.github.io/parallaxis#translate3d).

#### Why use the canvas
Drawing to the canvas is hardware accelerated, and prevents the flickering experienced when using other methods. In some cases, it even performs faster than `translate3d` - especially on pages with several large parallax backgrounds.


## Basic Example
Add a **`parallax-distance`** attribute to any element, with a value between **1** (it's close, so little parallax) and **10** (it's far, so lots of parallax). The parallax effect will be applied to the background image.

    <div parallax-distance="4">Background gets parallax effect</div>



## Responsive Example
Parallaxis will automatically use the correct background image.

#### HTML:

    <div parallax-distance="4">
      The responsive background image will get the parallax effect.
    </div>


#### Responsive CSS:

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

## Including in Your Project
Download the latest build from git-hub, or link to the latest build here:

    <script src="https://cdn.rawgit.com/gavamedia/parallaxis/master/parallaxis.min.js"></script>



## Live Previews
* https://gavamedia.com
* http://mlsidxapi.com

## Benchmarks

https://gavamedia.github.io/parallaxis
