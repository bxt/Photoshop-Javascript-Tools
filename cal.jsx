/*
 * This is a calendar Javascript for Adobe Photoshop CS3
 */

// Include the utilities
#include util.jsxinc
#include dates.jsxinc
#include Progressor.jsxinc
#include Holidays.jsxinc

// Set a script name
var scriptName={en:"calendar script",de:"Kalender-Skript"};

// Saving options
var psdOpts = new PhotoshopSaveOptions();

// Porgress bar widget
var progressor = Progressor(scriptName);

var lineColor = new SolidColor();
lineColor.rgb.hexValue="dddddd";

var kwColor = lineColor;

var normalDaytextColor = new SolidColor();
normalDaytextColor.rgb.hexValue="182b43";

var saturdayDaytextColor = new SolidColor();
saturdayDaytextColor.rgb.hexValue="5d718b";

var holidayDaytextColor = new SolidColor();
holidayDaytextColor.rgb.hexValue="839ab7";

// sans-serif:
//var monthNameFont="MyriadPro-Light";
//var dayNameFont="MyriadPro-Regular";

// serif:
var monthNameFont="GaramondPremrPro-Med";
var dayNameFont="GaramondPremrPro";

var holidays=createHolidaysFromFileExtendedScript(
  new File(activeDocument.fullName.path+"/germany-bavaria.hld"));
  //new File(activeDocument.fullName.path+"/usa.hld"));

var yearLayername={en:"calendar, year %1",de:"Kalender, Jahr %1"};
var monthLayername={en:"month %1",de:"Monat %1"};

function mm(x) {return new UnitValue(x,"mm");}
function pxc(x) {x.baseUnit=UnitValue(1/300,"in"); return x.as("px");}

if (app.documents.length > 0) { // check if file is opened
  
  var year=2012;
  
  var supergroup=activeDocument.layerSets.add();
  supergroup.name=localize(yearLayername,year);
  
  var premonth=-3;
  var prekw=-3;
  var group;
  for(
      var i=1,
          d=new Date(year,0,i);
      d.getFullYear()==year && !progressor.isCancelRequested();
      d=new Date(year,0,++i)) {
    
    
    if(d.getMonth()!=premonth) {
      //if(premonth!=-3) break; // only 1 month
      group=supergroup.layerSets.add();
      group.name=localize(monthLayername,(1+d.getMonth()));
      //group.visible=false;
      
      var monthName = group.artLayers.add();
      monthName.kind=LayerKind.TEXT;
      monthName.name="month "+(1+d.getMonth())+" name";
      monthName.textItem.color=normalDaytextColor;
      monthName.textItem.size=24;
      monthName.textItem.font=monthNameFont;
      monthName.textItem.kind=TextType.POINTTEXT // PARAGRAPHTEXT
      monthName.textItem.justification = Justification.RIGHT;
      monthName.textItem.contents=monthNames[d.getMonth()]+" "+d.getFullYear();
      monthName.rotate(-90);
      monthName.textItem.position=[97.7,17];
      
      premonth=d.getMonth();
    }
    
    var x=mm(105),y=mm(17+d.getDate()*4);
    
    var dayGroup=group.layerSets.add();
    dayGroup.name=d.toLocaleString();
    
    var dayLine=dayGroup.artLayers.add();
    dayLine.name="line "+d.getDate();
    var yL=y+mm(0.65);
    var xL=x-mm(3.5);
    activeDocument.selection.select([[pxc(xL),pxc(yL)],[pxc(xL),pxc(yL+mm(0.2))],[pxc(xL+mm(40)),pxc(yL+mm(0.2))],[pxc(xL+mm(40)),pxc(yL)]]);
    activeDocument.selection.fill(lineColor);
    activeDocument.selection.deselect();
    
    var textColor=normalDaytextColor;
    if(d.getDay()==6/*sat*/) textColor=saturdayDaytextColor;
    if(d.getDay()==0/*sun*/) textColor=holidayDaytextColor;
    
    var myHoliday=holidays.getDaysForDate(d);
    var myHolidayString='';
    for(var hd=0;myHoliday && hd<myHoliday.length;hd++) {
      if(myHoliday[hd].free) textColor=holidayDaytextColor;
      if(hd!=0) myHolidayString=myHolidayString+', ';
      myHolidayString=myHolidayString+myHoliday[hd].name;
    }
    
    var dayName = dayGroup.artLayers.add();
    dayName.kind=LayerKind.TEXT;
    dayName.name="date "+d.getDate();
    dayName.textItem.color=textColor;
    dayName.textItem.size=10;
    dayName.textItem.font=dayNameFont;
    dayName.textItem.kind=TextType.POINTTEXT // PARAGRAPHTEXT
    dayName.textItem.justification = Justification.RIGHT;
    dayName.textItem.contents=d.getDate();
    dayName.textItem.position=[x,y];
    
    var dayOfWeek = dayGroup.artLayers.add();
    dayOfWeek.kind=LayerKind.TEXT;
    dayOfWeek.name="dow "+d.getDay();
    dayOfWeek.textItem.color=textColor;
    dayOfWeek.textItem.size=6;
    dayOfWeek.textItem.font=dayNameFont;
    dayOfWeek.textItem.kind=TextType.POINTTEXT // PARAGRAPHTEXT
    dayOfWeek.textItem.justification = Justification.LEFT;
    dayOfWeek.textItem.contents=dayOfWeekNames[d.getDay()%dayOfWeekNames.length];
    dayOfWeek.textItem.position=[x+mm(0.5),y];
    
    if(kw(d)!=prekw) {
      
      var kwText = dayGroup.artLayers.add();
      kwText.kind=LayerKind.TEXT;
      kwText.name="kw "+kw(d);
      kwText.textItem.color=kwColor;
      kwText.textItem.size=6;
      kwText.textItem.font=dayNameFont;
      kwText.textItem.kind=TextType.POINTTEXT // PARAGRAPHTEXT
      kwText.textItem.justification = Justification.RIGHT;
      kwText.textItem.contents=kw(d);
      kwText.textItem.position=[xL+mm(40),y];
      
      prekw=kw(d);
    }
    
    if(myHolidayString) {
      
      var myHolidayT = dayGroup.artLayers.add();
      myHolidayT.kind=LayerKind.TEXT;
      myHolidayT.name="holiday "+d.getDate();
      myHolidayT.textItem.color=textColor;
      if(textColor==normalDaytextColor) {
        myHolidayT.opacity=50;
      }
      myHolidayT.textItem.size=6;
      myHolidayT.textItem.font=dayNameFont;
      myHolidayT.textItem.kind=TextType.POINTTEXT // PARAGRAPHTEXT
      myHolidayT.textItem.justification = Justification.LEFT;
      myHolidayT.textItem.contents=myHolidayString;
      myHolidayT.textItem.position=[x+mm(4.5),y];
      
    }
    
    if(new Date(year,0,1+i).getMonth()!=d.getMonth()) {
      // Save copy and export
      activeDocument.saveAs(buildFilename(activeDocument.fullName,monthNames[d.getMonth()],(1+d.getMonth()),'psd'),psdOpts,true);
      try{
        group.remove();
      } catch(e) {}
    }
    
    progressor.progress(i,366); // update progress bar
  }
  //group.visible=true;
  
}


progressor.done();