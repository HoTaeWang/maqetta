/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/date/locale",["../_base/lang","../_base/array","../date","../cldr/supplemental","../i18n","../regexp","../string","../i18n!../cldr/nls/gregorian"],function(_1,_2,_3,_4,_5,_6,_7,_8){
var _9={};
_1.setObject("dojo.date.locale",_9);
function _a(_b,_c,_d,_e){
return _e.replace(/([a-z])\1*/ig,function(_f){
var s,pad,c=_f.charAt(0),l=_f.length,_10=["abbr","wide","narrow"];
switch(c){
case "G":
s=_c[(l<4)?"eraAbbr":"eraNames"][_b.getFullYear()<0?0:1];
break;
case "y":
s=_b.getFullYear();
switch(l){
case 1:
break;
case 2:
if(!_d.fullYear){
s=String(s);
s=s.substr(s.length-2);
break;
}
default:
pad=true;
}
break;
case "Q":
case "q":
s=Math.ceil((_b.getMonth()+1)/3);
pad=true;
break;
case "M":
case "L":
var m=_b.getMonth();
if(l<3){
s=m+1;
pad=true;
}else{
var _11=["months",c=="L"?"standAlone":"format",_10[l-3]].join("-");
s=_c[_11][m];
}
break;
case "w":
var _12=0;
s=_9._getWeekOfYear(_b,_12);
pad=true;
break;
case "d":
s=_b.getDate();
pad=true;
break;
case "D":
s=_9._getDayOfYear(_b);
pad=true;
break;
case "e":
case "c":
var d=_b.getDay();
if(l<2){
s=(d-_4.getFirstDayOfWeek(_d.locale)+8)%7;
break;
}
case "E":
d=_b.getDay();
if(l<3){
s=d+1;
pad=true;
}else{
var _13=["days",c=="c"?"standAlone":"format",_10[l-3]].join("-");
s=_c[_13][d];
}
break;
case "a":
var _14=_b.getHours()<12?"am":"pm";
s=_d[_14]||_c["dayPeriods-format-wide-"+_14];
break;
case "h":
case "H":
case "K":
case "k":
var h=_b.getHours();
switch(c){
case "h":
s=(h%12)||12;
break;
case "H":
s=h;
break;
case "K":
s=(h%12);
break;
case "k":
s=h||24;
break;
}
pad=true;
break;
case "m":
s=_b.getMinutes();
pad=true;
break;
case "s":
s=_b.getSeconds();
pad=true;
break;
case "S":
s=Math.round(_b.getMilliseconds()*Math.pow(10,l-3));
pad=true;
break;
case "v":
case "z":
s=_9._getZone(_b,true,_d);
if(s){
break;
}
l=4;
case "Z":
var _15=_9._getZone(_b,false,_d);
var tz=[(_15<=0?"+":"-"),_7.pad(Math.floor(Math.abs(_15)/60),2),_7.pad(Math.abs(_15)%60,2)];
if(l==4){
tz.splice(0,0,"GMT");
tz.splice(3,0,":");
}
s=tz.join("");
break;
default:
throw new Error("dojo.date.locale.format: invalid pattern char: "+_e);
}
if(pad){
s=_7.pad(s,l);
}
return s;
});
};
_9._getZone=function(_16,_17,_18){
if(_17){
return _3.getTimezoneName(_16);
}else{
return _16.getTimezoneOffset();
}
};
_9.format=function(_19,_1a){
_1a=_1a||{};
var _1b=_5.normalizeLocale(_1a.locale),_1c=_1a.formatLength||"short",_1d=_9._getGregorianBundle(_1b),str=[],_1e=_1.hitch(this,_a,_19,_1d,_1a);
if(_1a.selector=="year"){
return _1f(_1d["dateFormatItem-yyyy"]||"yyyy",_1e);
}
var _20;
if(_1a.selector!="date"){
_20=_1a.timePattern||_1d["timeFormat-"+_1c];
if(_20){
str.push(_1f(_20,_1e));
}
}
if(_1a.selector!="time"){
_20=_1a.datePattern||_1d["dateFormat-"+_1c];
if(_20){
str.push(_1f(_20,_1e));
}
}
return str.length==1?str[0]:_1d["dateTimeFormat-"+_1c].replace(/\{(\d+)\}/g,function(_21,key){
return str[key];
});
};
_9.regexp=function(_22){
return _9._parseInfo(_22).regexp;
};
_9._parseInfo=function(_23){
_23=_23||{};
var _24=_5.normalizeLocale(_23.locale),_25=_9._getGregorianBundle(_24),_26=_23.formatLength||"short",_27=_23.datePattern||_25["dateFormat-"+_26],_28=_23.timePattern||_25["timeFormat-"+_26],_29;
if(_23.selector=="date"){
_29=_27;
}else{
if(_23.selector=="time"){
_29=_28;
}else{
_29=_25["dateTimeFormat-"+_26].replace(/\{(\d+)\}/g,function(_2a,key){
return [_28,_27][key];
});
}
}
var _2b=[],re=_1f(_29,_1.hitch(this,_2c,_2b,_25,_23));
return {regexp:re,tokens:_2b,bundle:_25};
};
_9.parse=function(_2d,_2e){
var _2f=/[\u200E\u200F\u202A\u202E]/g,_30=_9._parseInfo(_2e),_31=_30.tokens,_32=_30.bundle,re=new RegExp("^"+_30.regexp.replace(_2f,"")+"$",_30.strict?"":"i"),_33=re.exec(_2d&&_2d.replace(_2f,""));
if(!_33){
return null;
}
var _34=["abbr","wide","narrow"],_35=[1970,0,1,0,0,0,0],_36="",_37=_2.every(_33,function(v,i){
if(!i){
return true;
}
var _38=_31[i-1],l=_38.length,c=_38.charAt(0);
switch(c){
case "y":
if(l!=2&&_2e.strict){
_35[0]=v;
}else{
if(v<100){
v=Number(v);
var _39=""+new Date().getFullYear(),_3a=_39.substring(0,2)*100,_3b=Math.min(Number(_39.substring(2,4))+20,99);
_35[0]=(v<_3b)?_3a+v:_3a-100+v;
}else{
if(_2e.strict){
return false;
}
_35[0]=v;
}
}
break;
case "M":
case "L":
if(l>2){
var _3c=_32["months-"+(c=="L"?"standAlone":"format")+"-"+_34[l-3]].concat();
if(!_2e.strict){
v=v.replace(".","").toLowerCase();
_3c=_2.map(_3c,function(s){
return s.replace(".","").toLowerCase();
});
}
v=_2.indexOf(_3c,v);
if(v==-1){
return false;
}
}else{
v--;
}
_35[1]=v;
break;
case "E":
case "e":
case "c":
var _3d=_32["days-"+(c=="c"?"standAlone":"format")+"-"+_34[l-3]].concat();
if(!_2e.strict){
v=v.toLowerCase();
_3d=_2.map(_3d,function(d){
return d.toLowerCase();
});
}
v=_2.indexOf(_3d,v);
if(v==-1){
return false;
}
break;
case "D":
_35[1]=0;
case "d":
_35[2]=v;
break;
case "a":
var am=_2e.am||_32["dayPeriods-format-wide-am"],pm=_2e.pm||_32["dayPeriods-format-wide-pm"];
if(!_2e.strict){
var _3e=/\./g;
v=v.replace(_3e,"").toLowerCase();
am=am.replace(_3e,"").toLowerCase();
pm=pm.replace(_3e,"").toLowerCase();
}
if(_2e.strict&&v!=am&&v!=pm){
return false;
}
_36=(v==pm)?"p":(v==am)?"a":"";
break;
case "K":
if(v==24){
v=0;
}
case "h":
case "H":
case "k":
if(v>23){
return false;
}
_35[3]=v;
break;
case "m":
_35[4]=v;
break;
case "s":
_35[5]=v;
break;
case "S":
_35[6]=v;
}
return true;
});
var _3f=+_35[3];
if(_36==="p"&&_3f<12){
_35[3]=_3f+12;
}else{
if(_36==="a"&&_3f==12){
_35[3]=0;
}
}
var _40=new Date(_35[0],_35[1],_35[2],_35[3],_35[4],_35[5],_35[6]);
if(_2e.strict){
_40.setFullYear(_35[0]);
}
var _41=_31.join(""),_42=_41.indexOf("d")!=-1,_43=_41.indexOf("M")!=-1;
if(!_37||(_43&&_40.getMonth()>_35[1])||(_42&&_40.getDate()>_35[2])){
return null;
}
if((_43&&_40.getMonth()<_35[1])||(_42&&_40.getDate()<_35[2])){
_40=_3.add(_40,"hour",1);
}
return _40;
};
function _1f(_44,_45,_46,_47){
var _48=function(x){
return x;
};
_45=_45||_48;
_46=_46||_48;
_47=_47||_48;
var _49=_44.match(/(''|[^'])+/g),_4a=_44.charAt(0)=="'";
_2.forEach(_49,function(_4b,i){
if(!_4b){
_49[i]="";
}else{
_49[i]=(_4a?_46:_45)(_4b.replace(/''/g,"'"));
_4a=!_4a;
}
});
return _47(_49.join(""));
};
function _2c(_4c,_4d,_4e,_4f){
_4f=_6.escapeString(_4f);
if(!_4e.strict){
_4f=_4f.replace(" a"," ?a");
}
return _4f.replace(/([a-z])\1*/ig,function(_50){
var s,c=_50.charAt(0),l=_50.length,p2="",p3="";
if(_4e.strict){
if(l>1){
p2="0"+"{"+(l-1)+"}";
}
if(l>2){
p3="0"+"{"+(l-2)+"}";
}
}else{
p2="0?";
p3="0{0,2}";
}
switch(c){
case "y":
s="\\d{2,4}";
break;
case "M":
case "L":
s=(l>2)?"\\S+?":"1[0-2]|"+p2+"[1-9]";
break;
case "D":
s="[12][0-9][0-9]|3[0-5][0-9]|36[0-6]|"+p2+"[1-9][0-9]|"+p3+"[1-9]";
break;
case "d":
s="3[01]|[12]\\d|"+p2+"[1-9]";
break;
case "w":
s="[1-4][0-9]|5[0-3]|"+p2+"[1-9]";
break;
case "E":
case "e":
case "c":
s="\\S+";
break;
case "h":
s="1[0-2]|"+p2+"[1-9]";
break;
case "k":
s="1[01]|"+p2+"\\d";
break;
case "H":
s="1\\d|2[0-3]|"+p2+"\\d";
break;
case "K":
s="1\\d|2[0-4]|"+p2+"[1-9]";
break;
case "m":
case "s":
s="[0-5]\\d";
break;
case "S":
s="\\d{"+l+"}";
break;
case "a":
var am=_4e.am||_4d["dayPeriods-format-wide-am"],pm=_4e.pm||_4d["dayPeriods-format-wide-pm"];
s=am+"|"+pm;
if(!_4e.strict){
if(am!=am.toLowerCase()){
s+="|"+am.toLowerCase();
}
if(pm!=pm.toLowerCase()){
s+="|"+pm.toLowerCase();
}
if(s.indexOf(".")!=-1){
s+="|"+s.replace(/\./g,"");
}
}
s=s.replace(/\./g,"\\.");
break;
default:
s=".*";
}
if(_4c){
_4c.push(_50);
}
return "("+s+")";
}).replace(/[\xa0 ]/g,"[\\s\\xa0]");
};
var _51=[];
_9.addCustomFormats=function(_52,_53){
_51.push({pkg:_52,name:_53});
};
_9._getGregorianBundle=function(_54){
var _55={};
_2.forEach(_51,function(_56){
var _57=_5.getLocalization(_56.pkg,_56.name,_54);
_55=_1.mixin(_55,_57);
},this);
return _55;
};
_9.addCustomFormats("dojo.cldr","gregorian");
_9.getNames=function(_58,_59,_5a,_5b){
var _5c,_5d=_9._getGregorianBundle(_5b),_5e=[_58,_5a,_59];
if(_5a=="standAlone"){
var key=_5e.join("-");
_5c=_5d[key];
if(_5c[0]==1){
_5c=undefined;
}
}
_5e[1]="format";
return (_5c||_5d[_5e.join("-")]).concat();
};
_9.isWeekend=function(_5f,_60){
var _61=_4.getWeekend(_60),day=(_5f||new Date()).getDay();
if(_61.end<_61.start){
_61.end+=7;
if(day<_61.start){
day+=7;
}
}
return day>=_61.start&&day<=_61.end;
};
_9._getDayOfYear=function(_62){
return _3.difference(new Date(_62.getFullYear(),0,1,_62.getHours()),_62)+1;
};
_9._getWeekOfYear=function(_63,_64){
if(arguments.length==1){
_64=0;
}
var _65=new Date(_63.getFullYear(),0,1).getDay(),adj=(_65-_64+7)%7,_66=Math.floor((_9._getDayOfYear(_63)+adj-1)/7);
if(_65==_64){
_66++;
}
return _66;
};
return _9;
});
