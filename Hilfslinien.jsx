/**
 * Sript creates guide lines for borders
 * and at some ratios
 */


var
    VERTICAL = "Vrtc",/* | */
    HORIZONTAL = "Hrzn",/* - */
    PHI = -( (1-Math.sqrt(5))/2 ),
    ONE_MINUS_PHI = 1-PHI;

function createGuide( offs,orientation ) {
  var id8 = charIDToTypeID( "Mk  " );
  var desc4 = new ActionDescriptor();
  var id9 = charIDToTypeID( "Nw  " );
  var desc5 = new ActionDescriptor();
  var id10 = charIDToTypeID( "Pstn" );
  var id11 = charIDToTypeID( "#Rlt" );
  desc5.putUnitDouble( id10, id11, offs.as("pt") );
  var id12 = charIDToTypeID( "Ornt" );
  var id13 = charIDToTypeID( "Ornt" );
  var id14 = charIDToTypeID( orientation );
  desc5.putEnumerated( id12, id13, id14 );
  var id15 = charIDToTypeID( "Gd  " );
  desc4.putObject( id9, id15, desc5 );
  executeAction( id8, desc4, DialogModes.NO );
}

function createGuideFrame( size ) {
  var height=activeDocument.height;
  var width=activeDocument.width;
  
  createGuide( size,HORIZONTAL );
  createGuide( size,VERTICAL );
  createGuide( height-size,HORIZONTAL );
  createGuide( width-size, VERTICAL );
}

function createGuideMids( ) {
  var height=activeDocument.height;
  var width=activeDocument.width;
  createGuide( height/2,HORIZONTAL );
  createGuide( width/2, VERTICAL );
}

function createGuideGoldenRatio(border,v1,v2,h1,h2) {
  var height=activeDocument.height;
  var width=activeDocument.width;
  if(h2) createGuide( border + (height-2*border)*PHI,HORIZONTAL );
  if(v2) createGuide( border + (width-2*border)*PHI, VERTICAL );
  if(h1) createGuide( border + (height-2*border)*ONE_MINUS_PHI,HORIZONTAL );
  if(v1) createGuide( border + (width-2*border)*ONE_MINUS_PHI, VERTICAL );
}

var
  msgWindowTitle = localize({de:"Hilfslinen-Erstellung",en:"Create Guides"}),
  msgBorderPanel = localize({de:"Rand",en:"Margin"}),
  msgMidsPanel = localize({de:"Mitten",en:"Midlines"}),
  msgMidsCb = localize({de:"Mittellinien",en:"Midlines"}),
  msgGoldenRatTitle = localize({de:"Goldener Schnitt",en:"Golden Ratio"}),
  msgBuild = localize({de:"Erstellen",en:"Create"}),
  msgCancel = localize({de:"Abbrechen",en:"Cancel"})
;

var guidelinerResource =
"dialog { \
  alignChildren:['left', 'top'], \
  text: '"+msgWindowTitle+"', \
  borderPnl: Panel { text:'"+msgBorderPanel+"', orientation:'column',alignChildren:['left', 'top'],\
    cb: Checkbox { \
      text:'"+msgBorderPanel+"', value:false \
    }, \
    grp: Group { \
      st: StaticText { text:'Abstand zum Rand:' }, \
      et: EditText { characters:5, justify:'right',text:'1' } \
      stmm: StaticText { text:'mm' }, \
    } \
  }, \
  midsPnl: Panel { text:'"+msgMidsPanel+"', orientation:'column',\
    cb: Checkbox { \
      text:'"+msgMidsCb+"', value:false \
    }, \
  }, \
  goldenRatioPnl: Panel { text:'"+msgGoldenRatTitle+"',orientation:'column',\
    grp: Group { \
      vertical1Cb: Checkbox { text:'|1', value:false}, \
      vertical2Cb: Checkbox { text:'|2', value:false}, \
      horizontal1Cb: Checkbox { text:'-1', value:false}, \
      horizontal2Cb: Checkbox { text:'-2', value:false}, \
    } \
  }, \
  btnGrp: Group { orientation:'row',alignment:'right', \
    buildBtn: Button { text:'"+msgBuild+"', properties:{name:'ok'} }, \
    cancelBtn: Button { text:'"+msgCancel+"', properties:{name:'cancel'} } \
  } \
}";

var dlg = new Window(guidelinerResource);
var returnValue = dlg.show()
if(returnValue===1) {
  var border=UnitValue(0,"mm");
  if(dlg.borderPnl.cb.value) {
    border=UnitValue(dlg.borderPnl.grp.et.text,"mm");
    createGuideFrame(border);
  }
  if(dlg.midsPnl.cb.value) {
    createGuideMids();
  }
  var g=dlg.goldenRatioPnl.grp;
  createGuideGoldenRatio(
    border,
    g.vertical1Cb.value,
    g.vertical2Cb.value,
    g.horizontal1Cb.value,
    g.horizontal2Cb.value
  );
} else {
  // aborted, returnValue===2
}

