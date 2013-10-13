Photoshop-Javascript-Tools
==========================

Version 0.9.2

[News](http://bernhardhaeussner.de/blog/tags/Photoshop "News")

Contents
--------

The Photoshop Javascript Tools include some handy scripts tested in 
Adobe Photoshop CS3. Supported languages are German and English. 

For end users: (*)

* Hilfslinien.jsx: Create guide lines for margin, midlines and golden ratio
* Schriften.jsx: View and change font names as used in JS

For Javascript developers:

* example.jsx: Simple template batch processing script for including text from JSON data
* Progressor.jsxinc: A progress bar UI
* util.jsxinc: Utility functions for file renaming and number formating
* dates.jsxinc: Date utilities
* Holidays.jsxinc: Calculate repeating days for a year based on .hld files
* cal.jsx: Example for creating a neat calendar with holidays
* webexport.jsx: Example for batch exporting to resized JPEGs
* printexport.jsx: Similar, but checking for 300dpi and color profile too

Installing
----------

To install simply copy the files listed at (*) into the directoy 
`Adobe Photoshop CS3/Presets/Scripts/` or 
`Adobe Photoshop CS3/Vorgaben/Skripten/`. 

Then set your `JSINCLUDE` enviroment variable to the path of this
directory, e.g. `/c/Program Files/Photoshop-Javascript-Tools/`

Progressor.jsxinc: A progress bar UI
------------------------------------

![image](https://f.cloud.github.com/assets/639509/1323014/007bedba-345e-11e3-8cf6-b6b92cc1f223.png)

The Progressor allows you to watch your script proceed. You can use it
in your code like this:

    #include Progressor.jsxinc
    
    for (var i = 0; i < data.length && !progressor.isCancelRequested(); i++) {
      progressor.progress(i,data.length); // update progress bar
      
      // ...
    }
    
    progressor.done();

If you don't have a simple loop like this, you can use a custom way to call `progress`.
