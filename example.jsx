/*
 * This is a sample Javascript for Adobe Photoshop CS3
 * 
 * Open the included example.psd in PS and then run this
 * script. A progress bar shows a status and the script
 * populates the direcotry with planet greeting images. 
 */

// Include the utilities
#include util.jsxinc
#include Progressor.jsxinc

// Set a script name
var scriptName={en:"example script",de:"Beispiel-Skript"};

// Saving options
var psdOpts = new PhotoshopSaveOptions();
var jpgOpts = new JPEGSaveOptions();
    jpgOpts.embedColorProfile=true;
    jpgOpts.quality=12; // highest

// Input data
var data=[
  {name:"world"},
  {name:"venus"},
  {name:"mars"},
  {name:"pluto",comment:"You're not a real planet though. But still, welcome. "}
];

// Porgress bar widget
var progressor = Progressor(scriptName);


var fileI = 0; // file counter

if (app.documents.length > 0) { // check if file is opened
  for (var dataI = 0; dataI < data.length && !progressor.isCancelRequested(); dataI++) {
    progressor.progress(dataI,data.length); // update progress bar
      
    var textGroup = activeDocument.layerSets[0]; // find our layer group
    
    // Substitute new text
    textGroup.artLayers[0].textItem.contents="Hello, "+data[dataI].name+"!";
    if(data[dataI].comment) {
      textGroup.artLayers[1].textItem.contents=data[dataI].comment;
    } else {
      textGroup.artLayers[1].textItem.contents="Welcome to Photoshop scripting.";
    }
    
    // Save copy and export
    activeDocument.saveAs(buildFilename(activeDocument.fullName,data[dataI].name,dataI,'psd'),psdOpts,true);
    activeDocument.saveAs(buildFilename(activeDocument.fullName,data[dataI].name,dataI,'jpg'),jpgOpts,true);
    fileI++;
  }
}
progressor.done();
