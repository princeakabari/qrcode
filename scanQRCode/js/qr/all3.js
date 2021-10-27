function GF256(primitive)
{this.expTable=new Array(256);this.logTable=new Array(256);var x=1;for(var i=0;i<256;i++)
{this.expTable[i]=x;x<<=1;if(x>=0x100)
{x^=primitive;}}
for(var i=0;i<255;i++)
{this.logTable[this.expTable[i]]=i;}
var at0=new Array(1);at0[0]=0;this.zero=new GF256Poly(this,new Array(at0));var at1=new Array(1);at1[0]=1;this.one=new GF256Poly(this,new Array(at1));this.__defineGetter__("Zero",function()
{return this.zero;});this.__defineGetter__("One",function()
{return this.one;});this.buildMonomial=function(degree,coefficient)
{if(degree<0)
{throw "System.ArgumentException";}
if(coefficient==0)
{return zero;}
var coefficients=new Array(degree+1);for(var i=0;i<coefficients.length;i++)coefficients[i]=0;coefficients[0]=coefficient;return new GF256Poly(this,coefficients);}
this.exp=function(a)
{return this.expTable[a];}
this.log=function(a)
{if(a==0)
{throw "System.ArgumentException";}
return this.logTable[a];}
this.inverse=function(a)
{if(a==0)
{throw "System.ArithmeticException";}
return this.expTable[255-this.logTable[a]];}
this.multiply=function(a,b)
{if(a==0||b==0)
{return 0;}
if(a==1)
{return b;}
if(b==1)
{return a;}
return this.expTable[(this.logTable[a]+this.logTable[b])%255];}}
GF256.QR_CODE_FIELD=new GF256(0x011D);GF256.DATA_MATRIX_FIELD=new GF256(0x012D);GF256.addOrSubtract=function(a,b)
{return a^b;}
Decoder={};Decoder.rsDecoder=new ReedSolomonDecoder(GF256.QR_CODE_FIELD);Decoder.correctErrors=function(codewordBytes,numDataCodewords)
{var numCodewords=codewordBytes.length;var codewordsInts=new Array(numCodewords);for(var i=0;i<numCodewords;i++)
{codewordsInts[i]=codewordBytes[i]&0xFF;}
var numECCodewords=codewordBytes.length-numDataCodewords;try
{Decoder.rsDecoder.decode(codewordsInts,numECCodewords);}
catch(rse)
{throw rse;}
for(var i=0;i<numDataCodewords;i++)
{codewordBytes[i]=codewordsInts[i];}}
Decoder.decode=function(bits)
{var parser=new BitMatrixParser(bits);var version=parser.readVersion();var ecLevel=parser.readFormatInformation().ErrorCorrectionLevel;var codewords=parser.readCodewords();var dataBlocks=DataBlock.getDataBlocks(codewords,version,ecLevel);var totalBytes=0;for(var i=0;i<dataBlocks.length;i++)
{totalBytes+=dataBlocks[i].NumDataCodewords;}
var resultBytes=new Array(totalBytes);var resultOffset=0;for(var j=0;j<dataBlocks.length;j++)
{var dataBlock=dataBlocks[j];var codewordBytes=dataBlock.Codewords;var numDataCodewords=dataBlock.NumDataCodewords;Decoder.correctErrors(codewordBytes,numDataCodewords);for(var i=0;i<numDataCodewords;i++)
{resultBytes[resultOffset++]=codewordBytes[i];}}
var reader=new QRCodeDataBlockReader(resultBytes,version.VersionNumber,ecLevel.Bits);return reader;}
var MIN_SKIP=3;var MAX_MODULES=57;var INTEGER_MATH_SHIFT=8;var CENTER_QUORUM=2;qrcode.orderBestPatterns=function(patterns)
{function distance(pattern1,pattern2)
{xDiff=pattern1.X-pattern2.X;yDiff=pattern1.Y-pattern2.Y;return Math.sqrt((xDiff*xDiff+yDiff*yDiff));}
function crossProductZ(pointA,pointB,pointC)
{var bX=pointB.x;var bY=pointB.y;return((pointC.x-bX)*(pointA.y-bY))-((pointC.y-bY)*(pointA.x-bX));}
var zeroOneDistance=distance(patterns[0],patterns[1]);var oneTwoDistance=distance(patterns[1],patterns[2]);var zeroTwoDistance=distance(patterns[0],patterns[2]);var pointA,pointB,pointC;if(oneTwoDistance>=zeroOneDistance&&oneTwoDistance>=zeroTwoDistance)
{pointB=patterns[0];pointA=patterns[1];pointC=patterns[2];}
else if(zeroTwoDistance>=oneTwoDistance&&zeroTwoDistance>=zeroOneDistance)
{pointB=patterns[1];pointA=patterns[0];pointC=patterns[2];}
else
{pointB=patterns[2];pointA=patterns[0];pointC=patterns[1];}
if(crossProductZ(pointA,pointB,pointC)<0.0)
{var temp=pointA;pointA=pointC;pointC=temp;}
patterns[0]=pointA;patterns[1]=pointB;patterns[2]=pointC;}
function FinderPattern(posX,posY,estimatedModuleSize)
{this.x=posX;this.y=posY;this.count=1;this.estimatedModuleSize=estimatedModuleSize;this.__defineGetter__("EstimatedModuleSize",function()
{return this.estimatedModuleSize;});this.__defineGetter__("Count",function()
{return this.count;});this.__defineGetter__("X",function()
{return this.x;});this.__defineGetter__("Y",function()
{return this.y;});this.incrementCount=function()
{this.count++;}
this.aboutEquals=function(moduleSize,i,j)
{if(Math.abs(i-this.y)<=moduleSize&&Math.abs(j-this.x)<=moduleSize)
{var moduleSizeDiff=Math.abs(moduleSize-this.estimatedModuleSize);return moduleSizeDiff<=1.0||moduleSizeDiff/this.estimatedModuleSize<=1.0;}
return false;}}
function FinderPatternInfo(patternCenters)
{this.bottomLeft=patternCenters[0];this.topLeft=patternCenters[1];this.topRight=patternCenters[2];this.__defineGetter__("BottomLeft",function()
{return this.bottomLeft;});this.__defineGetter__("TopLeft",function()
{return this.topLeft;});this.__defineGetter__("TopRight",function()
{return this.topRight;});}
function FinderPatternFinder()
{this.image=null;this.possibleCenters=[];this.hasSkipped=false;this.crossCheckStateCount=new Array(0,0,0,0,0);this.resultPointCallback=null;this.__defineGetter__("CrossCheckStateCount",function()
{this.crossCheckStateCount[0]=0;this.crossCheckStateCount[1]=0;this.crossCheckStateCount[2]=0;this.crossCheckStateCount[3]=0;this.crossCheckStateCount[4]=0;return this.crossCheckStateCount;});this.foundPatternCross=function(stateCount)
{var totalModuleSize=0;for(var i=0;i<5;i++)
{var count=stateCount[i];if(count==0)
{return false;}
totalModuleSize+=count;}
if(totalModuleSize<7)
{return false;}
var moduleSize=Math.floor((totalModuleSize<<INTEGER_MATH_SHIFT)/7);var maxVariance=Math.floor(moduleSize/2);return Math.abs(moduleSize-(stateCount[0]<<INTEGER_MATH_SHIFT))<maxVariance&&Math.abs(moduleSize-(stateCount[1]<<INTEGER_MATH_SHIFT))<maxVariance&&Math.abs(3*moduleSize-(stateCount[2]<<INTEGER_MATH_SHIFT))<3*maxVariance&&Math.abs(moduleSize-(stateCount[3]<<INTEGER_MATH_SHIFT))<maxVariance&&Math.abs(moduleSize-(stateCount[4]<<INTEGER_MATH_SHIFT))<maxVariance;}
this.centerFromEnd=function(stateCount,end)
{return(end-stateCount[4]-stateCount[3])-stateCount[2]/2.0;}
this.crossCheckVertical=function(startI,centerJ,maxCount,originalStateCountTotal)
{var image=this.image;var maxI=qrcode.height;var stateCount=this.CrossCheckStateCount;var i=startI;while(i>=0&&image[centerJ+i*qrcode.width])
{stateCount[2]++;i--;}
if(i<0)
{return NaN;}
while(i>=0&&!image[centerJ+i*qrcode.width]&&stateCount[1]<=maxCount)
{stateCount[1]++;i--;}
if(i<0||stateCount[1]>maxCount)
{return NaN;}
while(i>=0&&image[centerJ+i*qrcode.width]&&stateCount[0]<=maxCount)
{stateCount[0]++;i--;}
if(stateCount[0]>maxCount)
{return NaN;}
i=startI+1;while(i<maxI&&image[centerJ+i*qrcode.width])
{stateCount[2]++;i++;}
if(i==maxI)
{return NaN;}
while(i<maxI&&!image[centerJ+i*qrcode.width]&&stateCount[3]<maxCount)
{stateCount[3]++;i++;}
if(i==maxI||stateCount[3]>=maxCount)
{return NaN;}
while(i<maxI&&image[centerJ+i*qrcode.width]&&stateCount[4]<maxCount)
{stateCount[4]++;i++;}
if(stateCount[4]>=maxCount)
{return NaN;}
var stateCountTotal=stateCount[0]+stateCount[1]+stateCount[2]+stateCount[3]+stateCount[4];if(5*Math.abs(stateCountTotal-originalStateCountTotal)>=2*originalStateCountTotal)
{return NaN;}
return this.foundPatternCross(stateCount)?this.centerFromEnd(stateCount,i):NaN;}
this.crossCheckHorizontal=function(startJ,centerI,maxCount,originalStateCountTotal)
{var image=this.image;var maxJ=qrcode.width;var stateCount=this.CrossCheckStateCount;var j=startJ;while(j>=0&&image[j+centerI*qrcode.width])
{stateCount[2]++;j--;}
if(j<0)
{return NaN;}
while(j>=0&&!image[j+centerI*qrcode.width]&&stateCount[1]<=maxCount)
{stateCount[1]++;j--;}
if(j<0||stateCount[1]>maxCount)
{return NaN;}
while(j>=0&&image[j+centerI*qrcode.width]&&stateCount[0]<=maxCount)
{stateCount[0]++;j--;}
if(stateCount[0]>maxCount)
{return NaN;}
j=startJ+1;while(j<maxJ&&image[j+centerI*qrcode.width])
{stateCount[2]++;j++;}
if(j==maxJ)
{return NaN;}
while(j<maxJ&&!image[j+centerI*qrcode.width]&&stateCount[3]<maxCount)
{stateCount[3]++;j++;}
if(j==maxJ||stateCount[3]>=maxCount)
{return NaN;}
while(j<maxJ&&image[j+centerI*qrcode.width]&&stateCount[4]<maxCount)
{stateCount[4]++;j++;}
if(stateCount[4]>=maxCount)
{return NaN;}
var stateCountTotal=stateCount[0]+stateCount[1]+stateCount[2]+stateCount[3]+stateCount[4];if(5*Math.abs(stateCountTotal-originalStateCountTotal)>=originalStateCountTotal)
{return NaN;}
return this.foundPatternCross(stateCount)?this.centerFromEnd(stateCount,j):NaN;}
this.handlePossibleCenter=function(stateCount,i,j)
{var stateCountTotal=stateCount[0]+stateCount[1]+stateCount[2]+stateCount[3]+stateCount[4];var centerJ=this.centerFromEnd(stateCount,j);var centerI=this.crossCheckVertical(i,Math.floor(centerJ),stateCount[2],stateCountTotal);if(!isNaN(centerI))
{centerJ=this.crossCheckHorizontal(Math.floor(centerJ),Math.floor(centerI),stateCount[2],stateCountTotal);if(!isNaN(centerJ))
{var estimatedModuleSize=stateCountTotal/7.0;var found=false;var max=this.possibleCenters.length;for(var index=0;index<max;index++)
{var center=this.possibleCenters[index];if(center.aboutEquals(estimatedModuleSize,centerI,centerJ))
{center.incrementCount();found=true;break;}}
if(!found)
{var point=new FinderPattern(centerJ,centerI,estimatedModuleSize);this.possibleCenters.push(point);if(this.resultPointCallback!=null)
{this.resultPointCallback.foundPossibleResultPoint(point);}}
return true;}}
return false;}
this.selectBestPatterns=function()
{var startSize=this.possibleCenters.length;if(startSize<3)
{throw "Couldn't find enough finder patterns";}
if(startSize>3)
{var totalModuleSize=0.0;var square=0.0;for(var i=0;i<startSize;i++)
{var centerValue=this.possibleCenters[i].EstimatedModuleSize;totalModuleSize+=centerValue;square+=(centerValue*centerValue);}
var average=totalModuleSize/startSize;this.possibleCenters.sort(function(center1,center2){var dA=Math.abs(center2.EstimatedModuleSize-average);var dB=Math.abs(center1.EstimatedModuleSize-average);if(dA<dB){return(-1);}else if(dA==dB){return 0;}else{return 1;}});var stdDev=Math.sqrt(square/startSize-average*average);var limit=Math.max(0.2*average,stdDev);for(var i=0;i<this.possibleCenters.length&&this.possibleCenters.length>3;i++)
{var pattern=this.possibleCenters[i];if(Math.abs(pattern.EstimatedModuleSize-average)>limit)
{this.possibleCenters.remove(i);i--;}}}
if(this.possibleCenters.length>3)
{this.possibleCenters.sort(function(a,b){if(a.count>b.count){return-1;}
if(a.count<b.count){return 1;}
return 0;});}
return new Array(this.possibleCenters[0],this.possibleCenters[1],this.possibleCenters[2]);}
this.findRowSkip=function()
{var max=this.possibleCenters.length;if(max<=1)
{return 0;}
var firstConfirmedCenter=null;for(var i=0;i<max;i++)
{var center=this.possibleCenters[i];if(center.Count>=CENTER_QUORUM)
{if(firstConfirmedCenter==null)
{firstConfirmedCenter=center;}
else
{this.hasSkipped=true;return Math.floor((Math.abs(firstConfirmedCenter.X-center.X)-Math.abs(firstConfirmedCenter.Y-center.Y))/2);}}}
return 0;}
this.haveMultiplyConfirmedCenters=function()
{var confirmedCount=0;var totalModuleSize=0.0;var max=this.possibleCenters.length;for(var i=0;i<max;i++)
{var pattern=this.possibleCenters[i];if(pattern.Count>=CENTER_QUORUM)
{confirmedCount++;totalModuleSize+=pattern.EstimatedModuleSize;}}
if(confirmedCount<3)
{return false;}
var average=totalModuleSize/max;var totalDeviation=0.0;for(var i=0;i<max;i++)
{pattern=this.possibleCenters[i];totalDeviation+=Math.abs(pattern.EstimatedModuleSize-average);}
return totalDeviation<=0.05*totalModuleSize;}
this.findFinderPattern=function(image){var tryHarder=false;this.image=image;var maxI=qrcode.height;var maxJ=qrcode.width;var iSkip=Math.floor((3*maxI)/(4*MAX_MODULES));if(iSkip<MIN_SKIP||tryHarder)
{iSkip=MIN_SKIP;}
var done=false;var stateCount=new Array(5);for(var i=iSkip-1;i<maxI&&!done;i+=iSkip)
{stateCount[0]=0;stateCount[1]=0;stateCount[2]=0;stateCount[3]=0;stateCount[4]=0;var currentState=0;for(var j=0;j<maxJ;j++)
{if(image[j+i*qrcode.width])
{if((currentState&1)==1)
{currentState++;}
stateCount[currentState]++;}
else
{if((currentState&1)==0)
{if(currentState==4)
{if(this.foundPatternCross(stateCount))
{var confirmed=this.handlePossibleCenter(stateCount,i,j);if(confirmed)
{iSkip=2;if(this.hasSkipped)
{done=this.haveMultiplyConfirmedCenters();}
else
{var rowSkip=this.findRowSkip();if(rowSkip>stateCount[2])
{i+=rowSkip-stateCount[2]-iSkip;j=maxJ-1;}}}
else
{do
{j++;}
while(j<maxJ&&!image[j+i*qrcode.width]);j--;}
currentState=0;stateCount[0]=0;stateCount[1]=0;stateCount[2]=0;stateCount[3]=0;stateCount[4]=0;}
else
{stateCount[0]=stateCount[2];stateCount[1]=stateCount[3];stateCount[2]=stateCount[4];stateCount[3]=1;stateCount[4]=0;currentState=3;}}
else
{stateCount[++currentState]++;}}
else
{stateCount[currentState]++;}}}
if(this.foundPatternCross(stateCount))
{var confirmed=this.handlePossibleCenter(stateCount,i,maxJ);if(confirmed)
{iSkip=stateCount[0];if(this.hasSkipped)
{done=haveMultiplyConfirmedCenters();}}}}
var patternInfo=this.selectBestPatterns();qrcode.orderBestPatterns(patternInfo);return new FinderPatternInfo(patternInfo);};}
function AlignmentPattern(posX,posY,estimatedModuleSize)
{this.x=posX;this.y=posY;this.count=1;this.estimatedModuleSize=estimatedModuleSize;this.__defineGetter__("EstimatedModuleSize",function()
{return this.estimatedModuleSize;});this.__defineGetter__("Count",function()
{return this.count;});this.__defineGetter__("X",function()
{return Math.floor(this.x);});this.__defineGetter__("Y",function()
{return Math.floor(this.y);});this.incrementCount=function()
{this.count++;}
this.aboutEquals=function(moduleSize,i,j)
{if(Math.abs(i-this.y)<=moduleSize&&Math.abs(j-this.x)<=moduleSize)
{var moduleSizeDiff=Math.abs(moduleSize-this.estimatedModuleSize);return moduleSizeDiff<=1.0||moduleSizeDiff/this.estimatedModuleSize<=1.0;}
return false;}}
function AlignmentPatternFinder(image,startX,startY,width,height,moduleSize,resultPointCallback)
{this.image=image;this.possibleCenters=new Array();this.startX=startX;this.startY=startY;this.width=width;this.height=height;this.moduleSize=moduleSize;this.crossCheckStateCount=new Array(0,0,0);this.resultPointCallback=resultPointCallback;this.centerFromEnd=function(stateCount,end)
{return(end-stateCount[2])-stateCount[1]/2.0;}
this.foundPatternCross=function(stateCount)
{var moduleSize=this.moduleSize;var maxVariance=moduleSize/2.0;for(var i=0;i<3;i++)
{if(Math.abs(moduleSize-stateCount[i])>=maxVariance)
{return false;}}
return true;}
this.crossCheckVertical=function(startI,centerJ,maxCount,originalStateCountTotal)
{var image=this.image;var maxI=qrcode.height;var stateCount=this.crossCheckStateCount;stateCount[0]=0;stateCount[1]=0;stateCount[2]=0;var i=startI;while(i>=0&&image[centerJ+i*qrcode.width]&&stateCount[1]<=maxCount)
{stateCount[1]++;i--;}
if(i<0||stateCount[1]>maxCount)
{return NaN;}
while(i>=0&&!image[centerJ+i*qrcode.width]&&stateCount[0]<=maxCount)
{stateCount[0]++;i--;}
if(stateCount[0]>maxCount)
{return NaN;}
i=startI+1;while(i<maxI&&image[centerJ+i*qrcode.width]&&stateCount[1]<=maxCount)
{stateCount[1]++;i++;}
if(i==maxI||stateCount[1]>maxCount)
{return NaN;}
while(i<maxI&&!image[centerJ+i*qrcode.width]&&stateCount[2]<=maxCount)
{stateCount[2]++;i++;}
if(stateCount[2]>maxCount)
{return NaN;}
var stateCountTotal=stateCount[0]+stateCount[1]+stateCount[2];if(5*Math.abs(stateCountTotal-originalStateCountTotal)>=2*originalStateCountTotal)
{return NaN;}
return this.foundPatternCross(stateCount)?this.centerFromEnd(stateCount,i):NaN;}
this.handlePossibleCenter=function(stateCount,i,j)
{var stateCountTotal=stateCount[0]+stateCount[1]+stateCount[2];var centerJ=this.centerFromEnd(stateCount,j);var centerI=this.crossCheckVertical(i,Math.floor(centerJ),2*stateCount[1],stateCountTotal);if(!isNaN(centerI))
{var estimatedModuleSize=(stateCount[0]+stateCount[1]+stateCount[2])/3.0;var max=this.possibleCenters.length;for(var index=0;index<max;index++)
{var center=this.possibleCenters[index];if(center.aboutEquals(estimatedModuleSize,centerI,centerJ))
{return new AlignmentPattern(centerJ,centerI,estimatedModuleSize);}}
var point=new AlignmentPattern(centerJ,centerI,estimatedModuleSize);this.possibleCenters.push(point);if(this.resultPointCallback!=null)
{this.resultPointCallback.foundPossibleResultPoint(point);}}
return null;}
this.find=function()
{var startX=this.startX;var height=this.height;var maxJ=startX+width;var middleI=startY+(height>>1);var stateCount=new Array(0,0,0);for(var iGen=0;iGen<height;iGen++)
{var i=middleI+((iGen&0x01)==0?((iGen+1)>>1):-((iGen+1)>>1));stateCount[0]=0;stateCount[1]=0;stateCount[2]=0;var j=startX;while(j<maxJ&&!image[j+qrcode.width*i])
{j++;}
var currentState=0;while(j<maxJ)
{if(image[j+i*qrcode.width])
{if(currentState==1)
{stateCount[currentState]++;}
else
{if(currentState==2)
{if(this.foundPatternCross(stateCount))
{var confirmed=this.handlePossibleCenter(stateCount,i,j);if(confirmed!=null)
{return confirmed;}}
stateCount[0]=stateCount[2];stateCount[1]=1;stateCount[2]=0;currentState=1;}
else
{stateCount[++currentState]++;}}}
else
{if(currentState==1)
{currentState++;}
stateCount[currentState]++;}
j++;}
if(this.foundPatternCross(stateCount))
{var confirmed=this.handlePossibleCenter(stateCount,i,maxJ);if(confirmed!=null)
{return confirmed;}}}
if(!(this.possibleCenters.length==0))
{return this.possibleCenters[0];}
throw "Couldn't find enough alignment patterns";}}
function QRCodeDataBlockReader(blocks,version,numErrorCorrectionCode)
{this.blockPointer=0;this.bitPointer=7;this.dataLength=0;this.blocks=blocks;this.numErrorCorrectionCode=numErrorCorrectionCode;if(version<=9)
this.dataLengthMode=0;else if(version>=10&&version<=26)
this.dataLengthMode=1;else if(version>=27&&version<=40)
this.dataLengthMode=2;this.getNextBits=function(numBits)
{var bits=0;if(numBits<this.bitPointer+1)
{var mask=0;for(var i=0;i<numBits;i++)
{mask+=(1<<i);}
mask<<=(this.bitPointer-numBits+1);bits=(this.blocks[this.blockPointer]&mask)>>(this.bitPointer-numBits+1);this.bitPointer-=numBits;return bits;}
else if(numBits<this.bitPointer+1+8)
{var mask1=0;for(var i=0;i<this.bitPointer+1;i++)
{mask1+=(1<<i);}
bits=(this.blocks[this.blockPointer]&mask1)<<(numBits-(this.bitPointer+1));this.blockPointer++;bits+=((this.blocks[this.blockPointer])>>(8-(numBits-(this.bitPointer+1))));this.bitPointer=this.bitPointer-numBits%8;if(this.bitPointer<0)
{this.bitPointer=8+this.bitPointer;}
return bits;}
else if(numBits<this.bitPointer+1+16)
{var mask1=0;var mask3=0;for(var i=0;i<this.bitPointer+1;i++)
{mask1+=(1<<i);}
var bitsFirstBlock=(this.blocks[this.blockPointer]&mask1)<<(numBits-(this.bitPointer+1));this.blockPointer++;var bitsSecondBlock=this.blocks[this.blockPointer]<<(numBits-(this.bitPointer+1+8));this.blockPointer++;for(var i=0;i<numBits-(this.bitPointer+1+8);i++)
{mask3+=(1<<i);}
mask3<<=8-(numBits-(this.bitPointer+1+8));var bitsThirdBlock=(this.blocks[this.blockPointer]&mask3)>>(8-(numBits-(this.bitPointer+1+8)));bits=bitsFirstBlock+bitsSecondBlock+bitsThirdBlock;this.bitPointer=this.bitPointer-(numBits-8)%8;if(this.bitPointer<0)
{this.bitPointer=8+this.bitPointer;}
return bits;}
else
{return 0;}}
this.NextMode=function()
{if((this.blockPointer>this.blocks.length-this.numErrorCorrectionCode-2))
return 0;else
return this.getNextBits(4);}
this.getDataLength=function(modeIndicator)
{var index=0;while(true)
{if((modeIndicator>>index)==1)
break;index++;}
return this.getNextBits(qrcode.sizeOfDataLengthInfo[this.dataLengthMode][index]);}
this.getRomanAndFigureString=function(dataLength)
{var length=dataLength;var intData=0;var strData="";var tableRomanAndFigure=new Array('0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',' ','$','%','*','+','-','.','index.html',':');do
{if(length>1)
{intData=this.getNextBits(11);var firstLetter=Math.floor(intData/45);var secondLetter=intData%45;strData+=tableRomanAndFigure[firstLetter];strData+=tableRomanAndFigure[secondLetter];length-=2;}
else if(length==1)
{intData=this.getNextBits(6);strData+=tableRomanAndFigure[intData];length-=1;}}
while(length>0);return strData;}
this.getFigureString=function(dataLength)
{var length=dataLength;var intData=0;var strData="";do
{if(length>=3)
{intData=this.getNextBits(10);if(intData<100)
strData+="0";if(intData<10)
strData+="0";length-=3;}
else if(length==2)
{intData=this.getNextBits(7);if(intData<10)
strData+="0";length-=2;}
else if(length==1)
{intData=this.getNextBits(4);length-=1;}
strData+=intData;}
while(length>0);return strData;}
this.get8bitByteArray=function(dataLength)
{var length=dataLength;var intData=0;var output=new Array();do
{intData=this.getNextBits(8);output.push(intData);length--;}
while(length>0);return output;}
this.getKanjiString=function(dataLength)
{var length=dataLength;var intData=0;var unicodeString="";do
{intData=getNextBits(13);var lowerByte=intData%0xC0;var higherByte=intData/0xC0;var tempWord=(higherByte<<8)+lowerByte;var shiftjisWord=0;if(tempWord+0x8140<=0x9FFC)
{shiftjisWord=tempWord+0x8140;}
else
{shiftjisWord=tempWord+0xC140;}
unicodeString+=String.fromCharCode(shiftjisWord);length--;}
while(length>0);return unicodeString;}
this.__defineGetter__("DataByte",function()
{var output=new Array();var MODE_NUMBER=1;var MODE_ROMAN_AND_NUMBER=2;var MODE_8BIT_BYTE=4;var MODE_KANJI=8;do
{var mode=this.NextMode();if(mode==0)
{if(output.length>0)
break;else
throw "Empty data block";}
if(mode!=MODE_NUMBER&&mode!=MODE_ROMAN_AND_NUMBER&&mode!=MODE_8BIT_BYTE&&mode!=MODE_KANJI)
{throw "Invalid mode: "+mode+" in (block:"+this.blockPointer+" bit:"+this.bitPointer+")";}
dataLength=this.getDataLength(mode);if(dataLength<1)
throw "Invalid data length: "+dataLength;switch(mode)
{case MODE_NUMBER:var temp_str=this.getFigureString(dataLength);var ta=new Array(temp_str.length);for(var j=0;j<temp_str.length;j++)
ta[j]=temp_str.charCodeAt(j);output.push(ta);break;case MODE_ROMAN_AND_NUMBER:var temp_str=this.getRomanAndFigureString(dataLength);var ta=new Array(temp_str.length);for(var j=0;j<temp_str.length;j++)
ta[j]=temp_str.charCodeAt(j);output.push(ta);break;case MODE_8BIT_BYTE:var temp_sbyteArray3=this.get8bitByteArray(dataLength);output.push(temp_sbyteArray3);break;case MODE_KANJI:var temp_str=this.getKanjiString(dataLength);output.push(temp_str);break;}}
while(true);return output;});}