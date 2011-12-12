/*
 * This is Javascript for Adobe Photoshop CS3 to export multiple images for printing
 */

// Include the utilities
#include util.jsxinc
#include Progressor.jsxinc

// Set a script name
var scriptName={en:"export script (print)",de:"Export-Skript (Druck)"};

// Saving options
var jpgOpts = new JPEGSaveOptions();
    jpgOpts.embedColorProfile=true;
    jpgOpts.quality=12; // highest

var log='';

var fileList=File.openDialog(localize({en:"Choose files to export for print",de:"Wählen Sie Dateien zum exportieren für den Druck"}),undefined,true);

if(fileList) {

// Porgress bar widget
var progressor = Progressor(scriptName);

for(var i=0;i<fileList.length && !progressor.isCancelRequested();i++) {
  progressor.progress(i,fileList.length); // update progress bar
  
  var doc=app.open(fileList[i]);
  
  // check some common errors
  
  if(doc.colorProfileName!=="ISO Coated v2 300% (ECI)") // ensure color profile
    log+='File '+fileList[i].name+' had color profile '+doc.colorProfileName+'\n';
  
  if(doc.resolution!==300) // ensure 300dpi
    log+='File '+fileList[i].name+' had dpi '+doc.resolution+'\n';
  
  
  doc.flatten();
  
  doc.saveAs(buildFilename(activeDocument.fullName,'printexport',undefined,'jpg'),jpgOpts,true);
  doc.close(SaveOptions.DONOTSAVECHANGES);
  
}

progressor.done();

log+='Exported '+fileList.length+' documents.\n';

alert(log);

} // if(fileList) {