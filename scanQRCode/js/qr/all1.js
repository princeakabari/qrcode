qrcode={};qrcode.imagedata=null;qrcode.width=0;qrcode.height=0;qrcode.qrCodeSymbol=null;qrcode.debug=false;qrcode.maxImgSize=1024*1024;qrcode.sizeOfDataLengthInfo=[[10,9,8,8],[12,11,16,10],[14,13,16,12]];qrcode.callback=null;qrcode.decode=function(src){if(arguments.length==0)
{var canvas_qr=document.getElementById("qr-canvas");var context=canvas_qr.getContext('2d');qrcode.width=canvas_qr.width;qrcode.height=canvas_qr.height;qrcode.imagedata=context.getImageData(0,0,qrcode.width,qrcode.height);qrcode.result=qrcode.process(context);if(qrcode.callback!=null)
qrcode.callback(qrcode.result);return qrcode.result;}
else
{var image=new Image();image.onload=function(){var canvas_qr=document.createElement('canvas');var context=canvas_qr.getContext('2d');var nheight=image.height;var nwidth=image.width;if(image.width*image.height>qrcode.maxImgSize)
{var ir=image.width/image.height;nheight=Math.sqrt(qrcode.maxImgSize/ir);nwidth=ir*nheight;}
canvas_qr.width=nwidth;canvas_qr.height=nheight;context.drawImage(image,0,0,canvas_qr.width,canvas_qr.height);qrcode.width=canvas_qr.width;qrcode.height=canvas_qr.height;try{qrcode.imagedata=context.getImageData(0,0,canvas_qr.width,canvas_qr.height);}catch(e){qrcode.result="Cross domain image reading not supported in your browser! Save it to your computer then drag and drop the file!";if(qrcode.callback!=null)
qrcode.callback(qrcode.result);return;}
try
{qrcode.result=qrcode.process(context);}
catch(e)
{}
if(qrcode.callback!==null)
qrcode.callback(qrcode.result);}
image.src=src;}}
qrcode.isUrl=function(s)
{var regexp=/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;return regexp.test(s);}
qrcode.decode_url=function(s)
{var escaped="";try{escaped=escape(s);}
catch(e)
{console.log(e);escaped=s;}
var ret="";try{ret=decodeURIComponent(escaped);}
catch(e)
{console.log(e);ret=escaped;}
return ret;}
qrcode.decode_utf8=function(s)
{if(qrcode.isUrl(s))
return qrcode.decode_url(s);else
return s;}
qrcode.process=function(ctx){var start=new Date().getTime();var image=qrcode.grayScaleToBitmap(qrcode.grayscale());if(qrcode.debug)
{for(var y=0;y<qrcode.height;y++)
{for(var x=0;x<qrcode.width;x++)
{var point=(x*4)+(y*qrcode.width*4);qrcode.imagedata.data[point]=image[x+y*qrcode.width]?0:0;qrcode.imagedata.data[point+1]=image[x+y*qrcode.width]?0:0;qrcode.imagedata.data[point+2]=image[x+y*qrcode.width]?255:0;}}
ctx.putImageData(qrcode.imagedata,0,0);}
var detector=new Detector(image);var qRCodeMatrix=detector.detect();if(qrcode.debug)
ctx.putImageData(qrcode.imagedata,0,0);var reader=Decoder.decode(qRCodeMatrix.bits);var data=reader.DataByte;var str="";for(var i=0;i<data.length;i++)
{for(var j=0;j<data[i].length;j++)
str+=String.fromCharCode(data[i][j]);}
var end=new Date().getTime();var time=end-start;return qrcode.decode_utf8(str);}
qrcode.getPixel=function(x,y){if(qrcode.width<x){throw "point error";}
if(qrcode.height<y){throw "point error";}
point=(x*4)+(y*qrcode.width*4);p=(qrcode.imagedata.data[point]*33+qrcode.imagedata.data[point+1]*34+qrcode.imagedata.data[point+2]*33)/100;return p;}
qrcode.binarize=function(th){var ret=new Array(qrcode.width*qrcode.height);for(var y=0;y<qrcode.height;y++)
{for(var x=0;x<qrcode.width;x++)
{var gray=qrcode.getPixel(x,y);ret[x+y*qrcode.width]=gray<=th?true:false;}}
return ret;}
qrcode.getMiddleBrightnessPerArea=function(image)
{var numSqrtArea=4;var areaWidth=Math.floor(qrcode.width/numSqrtArea);var areaHeight=Math.floor(qrcode.height/numSqrtArea);var minmax=new Array(numSqrtArea);for(var i=0;i<numSqrtArea;i++)
{minmax[i]=new Array(numSqrtArea);for(var i2=0;i2<numSqrtArea;i2++)
{minmax[i][i2]=new Array(0,0);}}
for(var ay=0;ay<numSqrtArea;ay++)
{for(var ax=0;ax<numSqrtArea;ax++)
{minmax[ax][ay][0]=0xFF;for(var dy=0;dy<areaHeight;dy++)
{for(var dx=0;dx<areaWidth;dx++)
{var target=image[areaWidth*ax+dx+(areaHeight*ay+dy)*qrcode.width];if(target<minmax[ax][ay][0])
minmax[ax][ay][0]=target;if(target>minmax[ax][ay][1])
minmax[ax][ay][1]=target;}}}}
var middle=new Array(numSqrtArea);for(var i3=0;i3<numSqrtArea;i3++)
{middle[i3]=new Array(numSqrtArea);}
for(var ay=0;ay<numSqrtArea;ay++)
{for(var ax=0;ax<numSqrtArea;ax++)
{middle[ax][ay]=Math.floor((minmax[ax][ay][0]+minmax[ax][ay][1])/2);}}
return middle;}
qrcode.grayScaleToBitmap=function(grayScale)
{var middle=qrcode.getMiddleBrightnessPerArea(grayScale);var sqrtNumArea=middle.length;var areaWidth=Math.floor(qrcode.width/sqrtNumArea);var areaHeight=Math.floor(qrcode.height/sqrtNumArea);var bitmap=new Array(qrcode.height*qrcode.width);for(var ay=0;ay<sqrtNumArea;ay++)
{for(var ax=0;ax<sqrtNumArea;ax++)
{for(var dy=0;dy<areaHeight;dy++)
{for(var dx=0;dx<areaWidth;dx++)
{bitmap[areaWidth*ax+dx+(areaHeight*ay+dy)*qrcode.width]=(grayScale[areaWidth*ax+dx+(areaHeight*ay+dy)*qrcode.width]<middle[ax][ay])?true:false;}}}}
return bitmap;}
qrcode.grayscale=function(){var ret=new Array(qrcode.width*qrcode.height);for(var y=0;y<qrcode.height;y++)
{for(var x=0;x<qrcode.width;x++)
{var gray=qrcode.getPixel(x,y);ret[x+y*qrcode.width]=gray;}}
return ret;}
function URShift(number,bits)
{if(number>=0)
return number>>bits;else
return(number>>bits)+(2<<~bits);}
Array.prototype.remove=function(from,to){var rest=this.slice((to||from)+1||this.length);this.length=from<0?this.length+from:from;return this.push.apply(this,rest);};function ECB(count,dataCodewords)
{this.count=count;this.dataCodewords=dataCodewords;this.__defineGetter__("Count",function()
{return this.count;});this.__defineGetter__("DataCodewords",function()
{return this.dataCodewords;});}
function ECBlocks(ecCodewordsPerBlock,ecBlocks1,ecBlocks2)
{this.ecCodewordsPerBlock=ecCodewordsPerBlock;if(ecBlocks2)
this.ecBlocks=new Array(ecBlocks1,ecBlocks2);else
this.ecBlocks=new Array(ecBlocks1);this.__defineGetter__("ECCodewordsPerBlock",function()
{return this.ecCodewordsPerBlock;});this.__defineGetter__("TotalECCodewords",function()
{return this.ecCodewordsPerBlock*this.NumBlocks;});this.__defineGetter__("NumBlocks",function()
{var total=0;for(var i=0;i<this.ecBlocks.length;i++)
{total+=this.ecBlocks[i].length;}
return total;});this.getECBlocks=function()
{return this.ecBlocks;}}
function Version(versionNumber,alignmentPatternCenters,ecBlocks1,ecBlocks2,ecBlocks3,ecBlocks4)
{this.versionNumber=versionNumber;this.alignmentPatternCenters=alignmentPatternCenters;this.ecBlocks=new Array(ecBlocks1,ecBlocks2,ecBlocks3,ecBlocks4);var total=0;var ecCodewords=ecBlocks1.ECCodewordsPerBlock;var ecbArray=ecBlocks1.getECBlocks();for(var i=0;i<ecbArray.length;i++)
{var ecBlock=ecbArray[i];total+=ecBlock.Count*(ecBlock.DataCodewords+ecCodewords);}
this.totalCodewords=total;this.__defineGetter__("VersionNumber",function()
{return this.versionNumber;});this.__defineGetter__("AlignmentPatternCenters",function()
{return this.alignmentPatternCenters;});this.__defineGetter__("TotalCodewords",function()
{return this.totalCodewords;});this.__defineGetter__("DimensionForVersion",function()
{return 17+4*this.versionNumber;});this.buildFunctionPattern=function()
{var dimension=this.DimensionForVersion;var bitMatrix=new BitMatrix(dimension);bitMatrix.setRegion(0,0,9,9);bitMatrix.setRegion(dimension-8,0,8,9);bitMatrix.setRegion(0,dimension-8,9,8);var max=this.alignmentPatternCenters.length;for(var x=0;x<max;x++)
{var i=this.alignmentPatternCenters[x]-2;for(var y=0;y<max;y++)
{if((x==0&&(y==0||y==max-1))||(x==max-1&&y==0))
{continue;}
bitMatrix.setRegion(this.alignmentPatternCenters[y]-2,i,5,5);}}
bitMatrix.setRegion(6,9,1,dimension-17);bitMatrix.setRegion(9,6,dimension-17,1);if(this.versionNumber>6)
{bitMatrix.setRegion(dimension-11,0,3,6);bitMatrix.setRegion(0,dimension-11,6,3);}
return bitMatrix;}
this.getECBlocksForLevel=function(ecLevel)
{return this.ecBlocks[ecLevel.ordinal()];}}
Version.VERSION_DECODE_INFO=new Array(0x07C94,0x085BC,0x09A99,0x0A4D3,0x0BBF6,0x0C762,0x0D847,0x0E60D,0x0F928,0x10B78,0x1145D,0x12A17,0x13532,0x149A6,0x15683,0x168C9,0x177EC,0x18EC4,0x191E1,0x1AFAB,0x1B08E,0x1CC1A,0x1D33F,0x1ED75,0x1F250,0x209D5,0x216F0,0x228BA,0x2379F,0x24B0B,0x2542E,0x26A64,0x27541,0x28C69);Version.VERSIONS=buildVersions();Version.getVersionForNumber=function(versionNumber)
{if(versionNumber<1||versionNumber>40)
{throw "ArgumentException";}
return Version.VERSIONS[versionNumber-1];}
Version.getProvisionalVersionForDimension=function(dimension)
{if(dimension%4!=1)
{throw "Error getProvisionalVersionForDimension";}
try
{return Version.getVersionForNumber((dimension-17)>>2);}
catch(iae)
{throw "Error getVersionForNumber";}}
Version.decodeVersionInformation=function(versionBits)
{var bestDifference=0xffffffff;var bestVersion=0;for(var i=0;i<Version.VERSION_DECODE_INFO.length;i++)
{var targetVersion=Version.VERSION_DECODE_INFO[i];if(targetVersion==versionBits)
{return this.getVersionForNumber(i+7);}
var bitsDifference=FormatInformation.numBitsDiffering(versionBits,targetVersion);if(bitsDifference<bestDifference)
{bestVersion=i+7;bestDifference=bitsDifference;}}
if(bestDifference<=3)
{return this.getVersionForNumber(bestVersion);}
return null;}
function buildVersions()
{return new Array(new Version(1,new Array(),new ECBlocks(7,new ECB(1,19)),new ECBlocks(10,new ECB(1,16)),new ECBlocks(13,new ECB(1,13)),new ECBlocks(17,new ECB(1,9))),new Version(2,new Array(6,18),new ECBlocks(10,new ECB(1,34)),new ECBlocks(16,new ECB(1,28)),new ECBlocks(22,new ECB(1,22)),new ECBlocks(28,new ECB(1,16))),new Version(3,new Array(6,22),new ECBlocks(15,new ECB(1,55)),new ECBlocks(26,new ECB(1,44)),new ECBlocks(18,new ECB(2,17)),new ECBlocks(22,new ECB(2,13))),new Version(4,new Array(6,26),new ECBlocks(20,new ECB(1,80)),new ECBlocks(18,new ECB(2,32)),new ECBlocks(26,new ECB(2,24)),new ECBlocks(16,new ECB(4,9))),new Version(5,new Array(6,30),new ECBlocks(26,new ECB(1,108)),new ECBlocks(24,new ECB(2,43)),new ECBlocks(18,new ECB(2,15),new ECB(2,16)),new ECBlocks(22,new ECB(2,11),new ECB(2,12))),new Version(6,new Array(6,34),new ECBlocks(18,new ECB(2,68)),new ECBlocks(16,new ECB(4,27)),new ECBlocks(24,new ECB(4,19)),new ECBlocks(28,new ECB(4,15))),new Version(7,new Array(6,22,38),new ECBlocks(20,new ECB(2,78)),new ECBlocks(18,new ECB(4,31)),new ECBlocks(18,new ECB(2,14),new ECB(4,15)),new ECBlocks(26,new ECB(4,13),new ECB(1,14))),new Version(8,new Array(6,24,42),new ECBlocks(24,new ECB(2,97)),new ECBlocks(22,new ECB(2,38),new ECB(2,39)),new ECBlocks(22,new ECB(4,18),new ECB(2,19)),new ECBlocks(26,new ECB(4,14),new ECB(2,15))),new Version(9,new Array(6,26,46),new ECBlocks(30,new ECB(2,116)),new ECBlocks(22,new ECB(3,36),new ECB(2,37)),new ECBlocks(20,new ECB(4,16),new ECB(4,17)),new ECBlocks(24,new ECB(4,12),new ECB(4,13))),new Version(10,new Array(6,28,50),new ECBlocks(18,new ECB(2,68),new ECB(2,69)),new ECBlocks(26,new ECB(4,43),new ECB(1,44)),new ECBlocks(24,new ECB(6,19),new ECB(2,20)),new ECBlocks(28,new ECB(6,15),new ECB(2,16))),new Version(11,new Array(6,30,54),new ECBlocks(20,new ECB(4,81)),new ECBlocks(30,new ECB(1,50),new ECB(4,51)),new ECBlocks(28,new ECB(4,22),new ECB(4,23)),new ECBlocks(24,new ECB(3,12),new ECB(8,13))),new Version(12,new Array(6,32,58),new ECBlocks(24,new ECB(2,92),new ECB(2,93)),new ECBlocks(22,new ECB(6,36),new ECB(2,37)),new ECBlocks(26,new ECB(4,20),new ECB(6,21)),new ECBlocks(28,new ECB(7,14),new ECB(4,15))),new Version(13,new Array(6,34,62),new ECBlocks(26,new ECB(4,107)),new ECBlocks(22,new ECB(8,37),new ECB(1,38)),new ECBlocks(24,new ECB(8,20),new ECB(4,21)),new ECBlocks(22,new ECB(12,11),new ECB(4,12))),new Version(14,new Array(6,26,46,66),new ECBlocks(30,new ECB(3,115),new ECB(1,116)),new ECBlocks(24,new ECB(4,40),new ECB(5,41)),new ECBlocks(20,new ECB(11,16),new ECB(5,17)),new ECBlocks(24,new ECB(11,12),new ECB(5,13))),new Version(15,new Array(6,26,48,70),new ECBlocks(22,new ECB(5,87),new ECB(1,88)),new ECBlocks(24,new ECB(5,41),new ECB(5,42)),new ECBlocks(30,new ECB(5,24),new ECB(7,25)),new ECBlocks(24,new ECB(11,12),new ECB(7,13))),new Version(16,new Array(6,26,50,74),new ECBlocks(24,new ECB(5,98),new ECB(1,99)),new ECBlocks(28,new ECB(7,45),new ECB(3,46)),new ECBlocks(24,new ECB(15,19),new ECB(2,20)),new ECBlocks(30,new ECB(3,15),new ECB(13,16))),new Version(17,new Array(6,30,54,78),new ECBlocks(28,new ECB(1,107),new ECB(5,108)),new ECBlocks(28,new ECB(10,46),new ECB(1,47)),new ECBlocks(28,new ECB(1,22),new ECB(15,23)),new ECBlocks(28,new ECB(2,14),new ECB(17,15))),new Version(18,new Array(6,30,56,82),new ECBlocks(30,new ECB(5,120),new ECB(1,121)),new ECBlocks(26,new ECB(9,43),new ECB(4,44)),new ECBlocks(28,new ECB(17,22),new ECB(1,23)),new ECBlocks(28,new ECB(2,14),new ECB(19,15))),new Version(19,new Array(6,30,58,86),new ECBlocks(28,new ECB(3,113),new ECB(4,114)),new ECBlocks(26,new ECB(3,44),new ECB(11,45)),new ECBlocks(26,new ECB(17,21),new ECB(4,22)),new ECBlocks(26,new ECB(9,13),new ECB(16,14))),new Version(20,new Array(6,34,62,90),new ECBlocks(28,new ECB(3,107),new ECB(5,108)),new ECBlocks(26,new ECB(3,41),new ECB(13,42)),new ECBlocks(30,new ECB(15,24),new ECB(5,25)),new ECBlocks(28,new ECB(15,15),new ECB(10,16))),new Version(21,new Array(6,28,50,72,94),new ECBlocks(28,new ECB(4,116),new ECB(4,117)),new ECBlocks(26,new ECB(17,42)),new ECBlocks(28,new ECB(17,22),new ECB(6,23)),new ECBlocks(30,new ECB(19,16),new ECB(6,17))),new Version(22,new Array(6,26,50,74,98),new ECBlocks(28,new ECB(2,111),new ECB(7,112)),new ECBlocks(28,new ECB(17,46)),new ECBlocks(30,new ECB(7,24),new ECB(16,25)),new ECBlocks(24,new ECB(34,13))),new Version(23,new Array(6,30,54,74,102),new ECBlocks(30,new ECB(4,121),new ECB(5,122)),new ECBlocks(28,new ECB(4,47),new ECB(14,48)),new ECBlocks(30,new ECB(11,24),new ECB(14,25)),new ECBlocks(30,new ECB(16,15),new ECB(14,16))),new Version(24,new Array(6,28,54,80,106),new ECBlocks(30,new ECB(6,117),new ECB(4,118)),new ECBlocks(28,new ECB(6,45),new ECB(14,46)),new ECBlocks(30,new ECB(11,24),new ECB(16,25)),new ECBlocks(30,new ECB(30,16),new ECB(2,17))),new Version(25,new Array(6,32,58,84,110),new ECBlocks(26,new ECB(8,106),new ECB(4,107)),new ECBlocks(28,new ECB(8,47),new ECB(13,48)),new ECBlocks(30,new ECB(7,24),new ECB(22,25)),new ECBlocks(30,new ECB(22,15),new ECB(13,16))),new Version(26,new Array(6,30,58,86,114),new ECBlocks(28,new ECB(10,114),new ECB(2,115)),new ECBlocks(28,new ECB(19,46),new ECB(4,47)),new ECBlocks(28,new ECB(28,22),new ECB(6,23)),new ECBlocks(30,new ECB(33,16),new ECB(4,17))),new Version(27,new Array(6,34,62,90,118),new ECBlocks(30,new ECB(8,122),new ECB(4,123)),new ECBlocks(28,new ECB(22,45),new ECB(3,46)),new ECBlocks(30,new ECB(8,23),new ECB(26,24)),new ECBlocks(30,new ECB(12,15),new ECB(28,16))),new Version(28,new Array(6,26,50,74,98,122),new ECBlocks(30,new ECB(3,117),new ECB(10,118)),new ECBlocks(28,new ECB(3,45),new ECB(23,46)),new ECBlocks(30,new ECB(4,24),new ECB(31,25)),new ECBlocks(30,new ECB(11,15),new ECB(31,16))),new Version(29,new Array(6,30,54,78,102,126),new ECBlocks(30,new ECB(7,116),new ECB(7,117)),new ECBlocks(28,new ECB(21,45),new ECB(7,46)),new ECBlocks(30,new ECB(1,23),new ECB(37,24)),new ECBlocks(30,new ECB(19,15),new ECB(26,16))),new Version(30,new Array(6,26,52,78,104,130),new ECBlocks(30,new ECB(5,115),new ECB(10,116)),new ECBlocks(28,new ECB(19,47),new ECB(10,48)),new ECBlocks(30,new ECB(15,24),new ECB(25,25)),new ECBlocks(30,new ECB(23,15),new ECB(25,16))),new Version(31,new Array(6,30,56,82,108,134),new ECBlocks(30,new ECB(13,115),new ECB(3,116)),new ECBlocks(28,new ECB(2,46),new ECB(29,47)),new ECBlocks(30,new ECB(42,24),new ECB(1,25)),new ECBlocks(30,new ECB(23,15),new ECB(28,16))),new Version(32,new Array(6,34,60,86,112,138),new ECBlocks(30,new ECB(17,115)),new ECBlocks(28,new ECB(10,46),new ECB(23,47)),new ECBlocks(30,new ECB(10,24),new ECB(35,25)),new ECBlocks(30,new ECB(19,15),new ECB(35,16))),new Version(33,new Array(6,30,58,86,114,142),new ECBlocks(30,new ECB(17,115),new ECB(1,116)),new ECBlocks(28,new ECB(14,46),new ECB(21,47)),new ECBlocks(30,new ECB(29,24),new ECB(19,25)),new ECBlocks(30,new ECB(11,15),new ECB(46,16))),new Version(34,new Array(6,34,62,90,118,146),new ECBlocks(30,new ECB(13,115),new ECB(6,116)),new ECBlocks(28,new ECB(14,46),new ECB(23,47)),new ECBlocks(30,new ECB(44,24),new ECB(7,25)),new ECBlocks(30,new ECB(59,16),new ECB(1,17))),new Version(35,new Array(6,30,54,78,102,126,150),new ECBlocks(30,new ECB(12,121),new ECB(7,122)),new ECBlocks(28,new ECB(12,47),new ECB(26,48)),new ECBlocks(30,new ECB(39,24),new ECB(14,25)),new ECBlocks(30,new ECB(22,15),new ECB(41,16))),new Version(36,new Array(6,24,50,76,102,128,154),new ECBlocks(30,new ECB(6,121),new ECB(14,122)),new ECBlocks(28,new ECB(6,47),new ECB(34,48)),new ECBlocks(30,new ECB(46,24),new ECB(10,25)),new ECBlocks(30,new ECB(2,15),new ECB(64,16))),new Version(37,new Array(6,28,54,80,106,132,158),new ECBlocks(30,new ECB(17,122),new ECB(4,123)),new ECBlocks(28,new ECB(29,46),new ECB(14,47)),new ECBlocks(30,new ECB(49,24),new ECB(10,25)),new ECBlocks(30,new ECB(24,15),new ECB(46,16))),new Version(38,new Array(6,32,58,84,110,136,162),new ECBlocks(30,new ECB(4,122),new ECB(18,123)),new ECBlocks(28,new ECB(13,46),new ECB(32,47)),new ECBlocks(30,new ECB(48,24),new ECB(14,25)),new ECBlocks(30,new ECB(42,15),new ECB(32,16))),new Version(39,new Array(6,26,54,82,110,138,166),new ECBlocks(30,new ECB(20,117),new ECB(4,118)),new ECBlocks(28,new ECB(40,47),new ECB(7,48)),new ECBlocks(30,new ECB(43,24),new ECB(22,25)),new ECBlocks(30,new ECB(10,15),new ECB(67,16))),new Version(40,new Array(6,30,58,86,114,142,170),new ECBlocks(30,new ECB(19,118),new ECB(6,119)),new ECBlocks(28,new ECB(18,47),new ECB(31,48)),new ECBlocks(30,new ECB(34,24),new ECB(34,25)),new ECBlocks(30,new ECB(20,15),new ECB(61,16))));}
function PerspectiveTransform(a11,a21,a31,a12,a22,a32,a13,a23,a33)
{this.a11=a11;this.a12=a12;this.a13=a13;this.a21=a21;this.a22=a22;this.a23=a23;this.a31=a31;this.a32=a32;this.a33=a33;this.transformPoints1=function(points)
{var max=points.length;var a11=this.a11;var a12=this.a12;var a13=this.a13;var a21=this.a21;var a22=this.a22;var a23=this.a23;var a31=this.a31;var a32=this.a32;var a33=this.a33;for(var i=0;i<max;i+=2)
{var x=points[i];var y=points[i+1];var denominator=a13*x+a23*y+a33;points[i]=(a11*x+a21*y+a31)/denominator;points[i+1]=(a12*x+a22*y+a32)/denominator;}}
this.transformPoints2=function(xValues,yValues)
{var n=xValues.length;for(var i=0;i<n;i++)
{var x=xValues[i];var y=yValues[i];var denominator=this.a13*x+this.a23*y+this.a33;xValues[i]=(this.a11*x+this.a21*y+this.a31)/denominator;yValues[i]=(this.a12*x+this.a22*y+this.a32)/denominator;}}
this.buildAdjoint=function()
{return new PerspectiveTransform(this.a22*this.a33-this.a23*this.a32,this.a23*this.a31-this.a21*this.a33,this.a21*this.a32-this.a22*this.a31,this.a13*this.a32-this.a12*this.a33,this.a11*this.a33-this.a13*this.a31,this.a12*this.a31-this.a11*this.a32,this.a12*this.a23-this.a13*this.a22,this.a13*this.a21-this.a11*this.a23,this.a11*this.a22-this.a12*this.a21);}
this.times=function(other)
{return new PerspectiveTransform(this.a11*other.a11+this.a21*other.a12+this.a31*other.a13,this.a11*other.a21+this.a21*other.a22+this.a31*other.a23,this.a11*other.a31+this.a21*other.a32+this.a31*other.a33,this.a12*other.a11+this.a22*other.a12+this.a32*other.a13,this.a12*other.a21+this.a22*other.a22+this.a32*other.a23,this.a12*other.a31+this.a22*other.a32+this.a32*other.a33,this.a13*other.a11+this.a23*other.a12+this.a33*other.a13,this.a13*other.a21+this.a23*other.a22+this.a33*other.a23,this.a13*other.a31+this.a23*other.a32+this.a33*other.a33);}}
PerspectiveTransform.quadrilateralToQuadrilateral=function(x0,y0,x1,y1,x2,y2,x3,y3,x0p,y0p,x1p,y1p,x2p,y2p,x3p,y3p)
{var qToS=this.quadrilateralToSquare(x0,y0,x1,y1,x2,y2,x3,y3);var sToQ=this.squareToQuadrilateral(x0p,y0p,x1p,y1p,x2p,y2p,x3p,y3p);return sToQ.times(qToS);}
PerspectiveTransform.squareToQuadrilateral=function(x0,y0,x1,y1,x2,y2,x3,y3)
{dy2=y3-y2;dy3=y0-y1+y2-y3;if(dy2==0.0&&dy3==0.0)
{return new PerspectiveTransform(x1-x0,x2-x1,x0,y1-y0,y2-y1,y0,0.0,0.0,1.0);}
else
{dx1=x1-x2;dx2=x3-x2;dx3=x0-x1+x2-x3;dy1=y1-y2;denominator=dx1*dy2-dx2*dy1;a13=(dx3*dy2-dx2*dy3)/denominator;a23=(dx1*dy3-dx3*dy1)/denominator;return new PerspectiveTransform(x1-x0+a13*x1,x3-x0+a23*x3,x0,y1-y0+a13*y1,y3-y0+a23*y3,y0,a13,a23,1.0);}}
PerspectiveTransform.quadrilateralToSquare=function(x0,y0,x1,y1,x2,y2,x3,y3)
{return this.squareToQuadrilateral(x0,y0,x1,y1,x2,y2,x3,y3).buildAdjoint();}
function DetectorResult(bits,points)
{this.bits=bits;this.points=points;}
function Detector(image)
{this.image=image;this.resultPointCallback=null;this.sizeOfBlackWhiteBlackRun=function(fromX,fromY,toX,toY)
{var steep=Math.abs(toY-fromY)>Math.abs(toX-fromX);if(steep)
{var temp=fromX;fromX=fromY;fromY=temp;temp=toX;toX=toY;toY=temp;}
var dx=Math.abs(toX-fromX);var dy=Math.abs(toY-fromY);var error=-dx>>1;var ystep=fromY<toY?1:-1;var xstep=fromX<toX?1:-1;var state=0;for(var x=fromX,y=fromY;x!=toX;x+=xstep)
{var realX=steep?y:x;var realY=steep?x:y;if(state==1)
{if(this.image[realX+realY*qrcode.width])
{state++;}}
else
{if(!this.image[realX+realY*qrcode.width])
{state++;}}
if(state==3)
{var diffX=x-fromX;var diffY=y-fromY;return Math.sqrt((diffX*diffX+diffY*diffY));}
error+=dy;if(error>0)
{if(y==toY)
{break;}
y+=ystep;error-=dx;}}
var diffX2=toX-fromX;var diffY2=toY-fromY;return Math.sqrt((diffX2*diffX2+diffY2*diffY2));}
this.sizeOfBlackWhiteBlackRunBothWays=function(fromX,fromY,toX,toY)
{var result=this.sizeOfBlackWhiteBlackRun(fromX,fromY,toX,toY);var scale=1.0;var otherToX=fromX-(toX-fromX);if(otherToX<0)
{scale=fromX/(fromX-otherToX);otherToX=0;}
else if(otherToX>=qrcode.width)
{scale=(qrcode.width-1-fromX)/(otherToX-fromX);otherToX=qrcode.width-1;}
var otherToY=Math.floor(fromY-(toY-fromY)*scale);scale=1.0;if(otherToY<0)
{scale=fromY/(fromY-otherToY);otherToY=0;}
else if(otherToY>=qrcode.height)
{scale=(qrcode.height-1-fromY)/(otherToY-fromY);otherToY=qrcode.height-1;}
otherToX=Math.floor(fromX+(otherToX-fromX)*scale);result+=this.sizeOfBlackWhiteBlackRun(fromX,fromY,otherToX,otherToY);return result-1.0;}
this.calculateModuleSizeOneWay=function(pattern,otherPattern)
{var moduleSizeEst1=this.sizeOfBlackWhiteBlackRunBothWays(Math.floor(pattern.X),Math.floor(pattern.Y),Math.floor(otherPattern.X),Math.floor(otherPattern.Y));var moduleSizeEst2=this.sizeOfBlackWhiteBlackRunBothWays(Math.floor(otherPattern.X),Math.floor(otherPattern.Y),Math.floor(pattern.X),Math.floor(pattern.Y));if(isNaN(moduleSizeEst1))
{return moduleSizeEst2/7.0;}
if(isNaN(moduleSizeEst2))
{return moduleSizeEst1/7.0;}
return(moduleSizeEst1+moduleSizeEst2)/14.0;}
this.calculateModuleSize=function(topLeft,topRight,bottomLeft)
{return(this.calculateModuleSizeOneWay(topLeft,topRight)+this.calculateModuleSizeOneWay(topLeft,bottomLeft))/2.0;}
this.distance=function(pattern1,pattern2)
{xDiff=pattern1.X-pattern2.X;yDiff=pattern1.Y-pattern2.Y;return Math.sqrt((xDiff*xDiff+yDiff*yDiff));}
this.computeDimension=function(topLeft,topRight,bottomLeft,moduleSize)
{var tltrCentersDimension=Math.round(this.distance(topLeft,topRight)/moduleSize);var tlblCentersDimension=Math.round(this.distance(topLeft,bottomLeft)/moduleSize);var dimension=((tltrCentersDimension+tlblCentersDimension)>>1)+7;switch(dimension&0x03)
{case 0:dimension++;break;case 2:dimension--;break;case 3:throw "Error";}
return dimension;}
this.findAlignmentInRegion=function(overallEstModuleSize,estAlignmentX,estAlignmentY,allowanceFactor)
{var allowance=Math.floor(allowanceFactor*overallEstModuleSize);var alignmentAreaLeftX=Math.max(0,estAlignmentX-allowance);var alignmentAreaRightX=Math.min(qrcode.width-1,estAlignmentX+allowance);if(alignmentAreaRightX-alignmentAreaLeftX<overallEstModuleSize*3)
{throw "Error";}
var alignmentAreaTopY=Math.max(0,estAlignmentY-allowance);var alignmentAreaBottomY=Math.min(qrcode.height-1,estAlignmentY+allowance);var alignmentFinder=new AlignmentPatternFinder(this.image,alignmentAreaLeftX,alignmentAreaTopY,alignmentAreaRightX-alignmentAreaLeftX,alignmentAreaBottomY-alignmentAreaTopY,overallEstModuleSize,this.resultPointCallback);return alignmentFinder.find();}
this.createTransform=function(topLeft,topRight,bottomLeft,alignmentPattern,dimension)
{var dimMinusThree=dimension-3.5;var bottomRightX;var bottomRightY;var sourceBottomRightX;var sourceBottomRightY;if(alignmentPattern!=null)
{bottomRightX=alignmentPattern.X;bottomRightY=alignmentPattern.Y;sourceBottomRightX=sourceBottomRightY=dimMinusThree-3.0;}
else
{bottomRightX=(topRight.X-topLeft.X)+bottomLeft.X;bottomRightY=(topRight.Y-topLeft.Y)+bottomLeft.Y;sourceBottomRightX=sourceBottomRightY=dimMinusThree;}
var transform=PerspectiveTransform.quadrilateralToQuadrilateral(3.5,3.5,dimMinusThree,3.5,sourceBottomRightX,sourceBottomRightY,3.5,dimMinusThree,topLeft.X,topLeft.Y,topRight.X,topRight.Y,bottomRightX,bottomRightY,bottomLeft.X,bottomLeft.Y);return transform;}
this.sampleGrid=function(image,transform,dimension)
{var sampler=GridSampler;return sampler.sampleGrid3(image,dimension,transform);}
this.processFinderPatternInfo=function(info)
{var topLeft=info.TopLeft;var topRight=info.TopRight;var bottomLeft=info.BottomLeft;var moduleSize=this.calculateModuleSize(topLeft,topRight,bottomLeft);if(moduleSize<1.0)
{throw "Error";}
var dimension=this.computeDimension(topLeft,topRight,bottomLeft,moduleSize);var provisionalVersion=Version.getProvisionalVersionForDimension(dimension);var modulesBetweenFPCenters=provisionalVersion.DimensionForVersion-7;var alignmentPattern=null;if(provisionalVersion.AlignmentPatternCenters.length>0)
{var bottomRightX=topRight.X-topLeft.X+bottomLeft.X;var bottomRightY=topRight.Y-topLeft.Y+bottomLeft.Y;var correctionToTopLeft=1.0-3.0/modulesBetweenFPCenters;var estAlignmentX=Math.floor(topLeft.X+correctionToTopLeft*(bottomRightX-topLeft.X));var estAlignmentY=Math.floor(topLeft.Y+correctionToTopLeft*(bottomRightY-topLeft.Y));for(var i=4;i<=16;i<<=1)
{alignmentPattern=this.findAlignmentInRegion(moduleSize,estAlignmentX,estAlignmentY,i);break;}}
var transform=this.createTransform(topLeft,topRight,bottomLeft,alignmentPattern,dimension);var bits=this.sampleGrid(this.image,transform,dimension);var points;if(alignmentPattern==null)
{points=new Array(bottomLeft,topLeft,topRight);}
else
{points=new Array(bottomLeft,topLeft,topRight,alignmentPattern);}
return new DetectorResult(bits,points);}
this.detect=function()
{var info=new FinderPatternFinder().findFinderPattern(this.image);return this.processFinderPatternInfo(info);}}
GridSampler={};GridSampler.checkAndNudgePoints=function(image,points)
{var width=qrcode.width;var height=qrcode.height;var nudged=true;for(var offset=0;offset<points.length&&nudged;offset+=2)
{var x=Math.floor(points[offset]);var y=Math.floor(points[offset+1]);if(x<-1||x>width||y<-1||y>height)
{throw "Error.checkAndNudgePoints ";}
nudged=false;if(x==-1)
{points[offset]=0.0;nudged=true;}
else if(x==width)
{points[offset]=width-1;nudged=true;}
if(y==-1)
{points[offset+1]=0.0;nudged=true;}
else if(y==height)
{points[offset+1]=height-1;nudged=true;}}
nudged=true;for(var offset=points.length-2;offset>=0&&nudged;offset-=2)
{var x=Math.floor(points[offset]);var y=Math.floor(points[offset+1]);if(x<-1||x>width||y<-1||y>height)
{throw "Error.checkAndNudgePoints ";}
nudged=false;if(x==-1)
{points[offset]=0.0;nudged=true;}
else if(x==width)
{points[offset]=width-1;nudged=true;}
if(y==-1)
{points[offset+1]=0.0;nudged=true;}
else if(y==height)
{points[offset+1]=height-1;nudged=true;}}}
GridSampler.sampleGrid3=function(image,dimension,transform)
{var bits=new BitMatrix(dimension);var points=new Array(dimension<<1);for(var y=0;y<dimension;y++)
{var max=points.length;var iValue=y+0.5;for(var x=0;x<max;x+=2)
{points[x]=(x>>1)+0.5;points[x+1]=iValue;}
transform.transformPoints1(points);GridSampler.checkAndNudgePoints(image,points);try
{for(var x=0;x<max;x+=2)
{var xpoint=(Math.floor(points[x])*4)+(Math.floor(points[x+1])*qrcode.width*4);var bit=image[Math.floor(points[x])+qrcode.width*Math.floor(points[x+1])];qrcode.imagedata.data[xpoint]=bit?255:0;qrcode.imagedata.data[xpoint+1]=bit?255:0;qrcode.imagedata.data[xpoint+2]=0;qrcode.imagedata.data[xpoint+3]=255;if(bit)
bits.set_Renamed(x>>1,y);}}
catch(aioobe)
{throw "Error.checkAndNudgePoints";}}
return bits;}
GridSampler.sampleGridx=function(image,dimension,p1ToX,p1ToY,p2ToX,p2ToY,p3ToX,p3ToY,p4ToX,p4ToY,p1FromX,p1FromY,p2FromX,p2FromY,p3FromX,p3FromY,p4FromX,p4FromY)
{var transform=PerspectiveTransform.quadrilateralToQuadrilateral(p1ToX,p1ToY,p2ToX,p2ToY,p3ToX,p3ToY,p4ToX,p4ToY,p1FromX,p1FromY,p2FromX,p2FromY,p3FromX,p3FromY,p4FromX,p4FromY);return GridSampler.sampleGrid3(image,dimension,transform);}
var FORMAT_INFO_MASK_QR=0x5412;var FORMAT_INFO_DECODE_LOOKUP=new Array(new Array(0x5412,0x00),new Array(0x5125,0x01),new Array(0x5E7C,0x02),new Array(0x5B4B,0x03),new Array(0x45F9,0x04),new Array(0x40CE,0x05),new Array(0x4F97,0x06),new Array(0x4AA0,0x07),new Array(0x77C4,0x08),new Array(0x72F3,0x09),new Array(0x7DAA,0x0A),new Array(0x789D,0x0B),new Array(0x662F,0x0C),new Array(0x6318,0x0D),new Array(0x6C41,0x0E),new Array(0x6976,0x0F),new Array(0x1689,0x10),new Array(0x13BE,0x11),new Array(0x1CE7,0x12),new Array(0x19D0,0x13),new Array(0x0762,0x14),new Array(0x0255,0x15),new Array(0x0D0C,0x16),new Array(0x083B,0x17),new Array(0x355F,0x18),new Array(0x3068,0x19),new Array(0x3F31,0x1A),new Array(0x3A06,0x1B),new Array(0x24B4,0x1C),new Array(0x2183,0x1D),new Array(0x2EDA,0x1E),new Array(0x2BED,0x1F));var BITS_SET_IN_HALF_BYTE=new Array(0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4);function FormatInformation(formatInfo)
{this.errorCorrectionLevel=ErrorCorrectionLevel.forBits((formatInfo>>3)&0x03);this.dataMask=(formatInfo&0x07);this.__defineGetter__("ErrorCorrectionLevel",function()
{return this.errorCorrectionLevel;});this.__defineGetter__("DataMask",function()
{return this.dataMask;});this.GetHashCode=function()
{return(this.errorCorrectionLevel.ordinal()<<3)|dataMask;}
this.Equals=function(o)
{var other=o;return this.errorCorrectionLevel==other.errorCorrectionLevel&&this.dataMask==other.dataMask;}}
FormatInformation.numBitsDiffering=function(a,b)
{a^=b;return BITS_SET_IN_HALF_BYTE[a&0x0F]+BITS_SET_IN_HALF_BYTE[(URShift(a,4)&0x0F)]+BITS_SET_IN_HALF_BYTE[(URShift(a,8)&0x0F)]+BITS_SET_IN_HALF_BYTE[(URShift(a,12)&0x0F)]+BITS_SET_IN_HALF_BYTE[(URShift(a,16)&0x0F)]+BITS_SET_IN_HALF_BYTE[(URShift(a,20)&0x0F)]+BITS_SET_IN_HALF_BYTE[(URShift(a,24)&0x0F)]+BITS_SET_IN_HALF_BYTE[(URShift(a,28)&0x0F)];}
FormatInformation.decodeFormatInformation=function(maskedFormatInfo)
{var formatInfo=FormatInformation.doDecodeFormatInformation(maskedFormatInfo);if(formatInfo!=null)
{return formatInfo;}
return FormatInformation.doDecodeFormatInformation(maskedFormatInfo^FORMAT_INFO_MASK_QR);}
FormatInformation.doDecodeFormatInformation=function(maskedFormatInfo)
{var bestDifference=0xffffffff;var bestFormatInfo=0;for(var i=0;i<FORMAT_INFO_DECODE_LOOKUP.length;i++)
{var decodeInfo=FORMAT_INFO_DECODE_LOOKUP[i];var targetInfo=decodeInfo[0];if(targetInfo==maskedFormatInfo)
{return new FormatInformation(decodeInfo[1]);}
var bitsDifference=this.numBitsDiffering(maskedFormatInfo,targetInfo);if(bitsDifference<bestDifference)
{bestFormatInfo=decodeInfo[1];bestDifference=bitsDifference;}}
if(bestDifference<=3)
{return new FormatInformation(bestFormatInfo);}
return null;}
function ErrorCorrectionLevel(ordinal,bits,name)
{this.ordinal_Renamed_Field=ordinal;this.bits=bits;this.name=name;this.__defineGetter__("Bits",function()
{return this.bits;});this.__defineGetter__("Name",function()
{return this.name;});this.ordinal=function()
{return this.ordinal_Renamed_Field;}}
ErrorCorrectionLevel.forBits=function(bits)
{if(bits<0||bits>=FOR_BITS.length)
{throw "ArgumentException";}
return FOR_BITS[bits];}
var L=new ErrorCorrectionLevel(0,0x01,"L");var M=new ErrorCorrectionLevel(1,0x00,"M");var Q=new ErrorCorrectionLevel(2,0x03,"Q");var H=new ErrorCorrectionLevel(3,0x02,"H");var FOR_BITS=new Array(M,L,H,Q);