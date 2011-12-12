/*
 * This is Javascript for Adobe Photoshop CS3 to export multiple images for web
 */

// Include the utilities
#include util.jsxinc
#include Progressor.jsxinc

// Set a script name
var scriptName={en:"export script (web)",de:"Export-Skript (Web)"};

// Saving options
var jpgOpts = new JPEGSaveOptions();
    jpgOpts.embedColorProfile=true;
    jpgOpts.quality=10; // high enough

var log='';

var fileList=File.openDialog(localize({en:"Choose files to export for web",de:"Wählen Sie Dateien zum exportieren für des Web"}),undefined,true);

if(fileList) {

// Porgress bar widget
var progressor = Progressor(scriptName);

for(var i=0;i<fileList.length && !progressor.isCancelRequested();i++) {
  progressor.progress(i,fileList.length); // update progress bar
  
  var doc=app.open(fileList[i]);
    
  doc.flatten();
  
  doc.resizeImage(UnitValue(1000,"px"));
  
  doc.saveAs(buildFilename(activeDocument.fullName,'webexport',undefined,'jpg'),jpgOpts,true);
  doc.close(SaveOptions.DONOTSAVECHANGES);
  
}

progressor.done();

} // if(fileList) {