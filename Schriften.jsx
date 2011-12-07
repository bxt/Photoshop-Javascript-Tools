/**
 * This is a Photoshop JS-Script to view and change font names
 * as used in Javascript manipulation. 
 */

if(app.documents.length > 0) {
  if(activeDocument.activeLayer && activeDocument.activeLayer.textItem) {
    var res=prompt(
      localize({en:"Enter new JS font name: ",de:"Neue JS-Schriftart eingeben: "}),
      activeDocument.activeLayer.textItem.font,
      localize({en:"JS Font",de:"JS-Schriftart"})
      );

    if(res!==null) {
      activeDocument.activeLayer.textItem.font=res;
    }
  } else {
    alert(localize({
      en:"Please select a text layer first. ",
      de:"Bitte zunächst eine Textebene wählen. "
    }));
  }
} else {
  alert(localize({
    en:"Please open a document and select a text layer. ",
    de:"Bitte zunächst ein Dokument öffnen und eine Textebene wählen. "
  }));
}

