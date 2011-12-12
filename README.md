Photoshop-Javascript-Tools
==========================

Version 0.9.1

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

Then set your JSINCLUDE enviroment variable to the path of this
directory, e.g. /c/Program Files/Photoshop-Javascript-Tools/
