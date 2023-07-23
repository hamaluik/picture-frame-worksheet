<h1 align="center">
  Picture Frame Worksheet
  <br>
  <a href="https://picture-frame-worksheet.pages.dev/"><img alt="icon" width="128" height="128" src="./public/favicon.svg"></a>
</h1>
<div align="center">
  A simple tool for calculating picture frame dimensions.
</div>
<div align="center">
  Deployed on <a href="https://pages.cloudflare.com/">Cloudflare Pages</a> at <a href="https://picture-frame-worksheet.pages.dev/">https://picture-frame-worksheet.pages.dev/</a>.
</div>
<br />
<div align="center">
  <img alt="GitHub" src="https://img.shields.io/github/license/hamaluik/picture-frame-worksheet?style=flat-square">
</div>

## Motivation

Michael Alm created an excellent [worksheet](https://www.almfab.com/store/p/free-picture-frame-worksheet) for calculating picture frame sizes. This aims to be a dynamic [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) version of that, with additions and changes that make sense for me.

## Features

### Current

* Calculating inner mitered dimensions for frames depending on art size
* Support for flush, matted, and float mounts
    + Matted and float mounts require entering the reveal
* Support for fractional dimensions (i.e. `3 1/2` is correctly interpreted as `3.5` and all math is done using these fractions)
* An automatically drawn and dimensioned 
* A cutlist for rough dimensions and final dimensions
* Progressive web-app, fully offline enabled
* Dark and print modes (print the page directly to get an organized, immediately useable worksheet to take into the shop)
* Save and load worksheets to/from localstorage
* Worksheet sharing links

### Planned

* Tweaking “advanced” parameters such as rough stock buffer length, lip dimensions, etc
* Optionally display jig cut-off dimensions (take into account the lip dimensions)
* More default shape profiles to choose from
    + Beveled
    + Triangular
    + Lipped
    + Rounded
* Per-profile editable extra dimensions
* A blank shape profile box to draw your own profile on
* Art depth calculations
* A preview of the final frame

