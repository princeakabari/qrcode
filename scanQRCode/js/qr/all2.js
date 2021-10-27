function BitMatrix(width,height)
{if(!height)
height=width;if(width<1||height<1)
{throw "Both dimensions must be greater than 0";}
this.width=width;this.height=height;var rowSize=width>>5;if((width&0x1f)!=0)
{rowSize++;}
this.rowSize=rowSize;this.bits=new Array(rowSize*height);for(var i=0;i<this.bits.length;i++)
this.bits[i]=0;this.__defineGetter__("Width",function()
{return this.width;});this.__defineGetter__("Height",function()
{return this.height;});this.__defineGetter__("Dimension",function()
{if(this.width!=this.height)
{throw "Can't call getDimension() on a non-square matrix";}
return this.width;});this.get_Renamed=function(x,y)
{var offset=y*this.rowSize+(x>>5);return((URShift(this.bits[offset],(x&0x1f)))&1)!=0;}
this.set_Renamed=function(x,y)
{var offset=y*this.rowSize+(x>>5);this.bits[offset]|=1<<(x&0x1f);}
this.flip=function(x,y)
{var offset=y*this.rowSize+(x>>5);this.bits[offset]^=1<<(x&0x1f);}
this.clear=function()
{var max=this.bits.length;for(var i=0;i<max;i++)
{this.bits[i]=0;}}
this.setRegion=function(left,top,width,height)
{if(top<0||left<0)
{throw "Left and top must be nonnegative";}
if(height<1||width<1)
{throw "Height and width must be at least 1";}
var right=left+width;var bottom=top+height;if(bottom>this.height||right>this.width)
{throw "The region must fit inside the matrix";}
for(var y=top;y<bottom;y++)
{var offset=y*this.rowSize;for(var x=left;x<right;x++)
{this.bits[offset+(x>>5)]|=1<<(x&0x1f);}}}}
function DataBlock(numDataCodewords,codewords)
{this.numDataCodewords=numDataCodewords;this.codewords=codewords;this.__defineGetter__("NumDataCodewords",function()
{return this.numDataCodewords;});this.__defineGetter__("Codewords",function()
{return this.codewords;});}
DataBlock.getDataBlocks=function(rawCodewords,version,ecLevel)
{if(rawCodewords.length!=version.TotalCodewords)
{throw "ArgumentException";}
var ecBlocks=version.getECBlocksForLevel(ecLevel);var totalBlocks=0;var ecBlockArray=ecBlocks.getECBlocks();for(var i=0;i<ecBlockArray.length;i++)
{totalBlocks+=ecBlockArray[i].Count;}
var result=new Array(totalBlocks);var numResultBlocks=0;for(var j=0;j<ecBlockArray.length;j++)
{var ecBlock=ecBlockArray[j];for(var i=0;i<ecBlock.Count;i++)
{var numDataCodewords=ecBlock.DataCodewords;var numBlockCodewords=ecBlocks.ECCodewordsPerBlock+numDataCodewords;result[numResultBlocks++]=new DataBlock(numDataCodewords,new Array(numBlockCodewords));}}
var shorterBlocksTotalCodewords=result[0].codewords.length;var longerBlocksStartAt=result.length-1;while(longerBlocksStartAt>=0)
{var numCodewords=result[longerBlocksStartAt].codewords.length;if(numCodewords==shorterBlocksTotalCodewords)
{break;}
longerBlocksStartAt--;}
longerBlocksStartAt++;var shorterBlocksNumDataCodewords=shorterBlocksTotalCodewords-ecBlocks.ECCodewordsPerBlock;var rawCodewordsOffset=0;for(var i=0;i<shorterBlocksNumDataCodewords;i++)
{for(var j=0;j<numResultBlocks;j++)
{result[j].codewords[i]=rawCodewords[rawCodewordsOffset++];}}
for(var j=longerBlocksStartAt;j<numResultBlocks;j++)
{result[j].codewords[shorterBlocksNumDataCodewords]=rawCodewords[rawCodewordsOffset++];}
var max=result[0].codewords.length;for(var i=shorterBlocksNumDataCodewords;i<max;i++)
{for(var j=0;j<numResultBlocks;j++)
{var iOffset=j<longerBlocksStartAt?i:i+1;result[j].codewords[iOffset]=rawCodewords[rawCodewordsOffset++];}}
return result;}
function BitMatrixParser(bitMatrix)
{var dimension=bitMatrix.Dimension;if(dimension<21||(dimension&0x03)!=1)
{throw "Error BitMatrixParser";}
this.bitMatrix=bitMatrix;this.parsedVersion=null;this.parsedFormatInfo=null;this.copyBit=function(i,j,versionBits)
{return this.bitMatrix.get_Renamed(i,j)?(versionBits<<1)|0x1:versionBits<<1;}
this.readFormatInformation=function()
{if(this.parsedFormatInfo!=null)
{return this.parsedFormatInfo;}
var formatInfoBits=0;for(var i=0;i<6;i++)
{formatInfoBits=this.copyBit(i,8,formatInfoBits);}
formatInfoBits=this.copyBit(7,8,formatInfoBits);formatInfoBits=this.copyBit(8,8,formatInfoBits);formatInfoBits=this.copyBit(8,7,formatInfoBits);for(var j=5;j>=0;j--)
{formatInfoBits=this.copyBit(8,j,formatInfoBits);}
this.parsedFormatInfo=FormatInformation.decodeFormatInformation(formatInfoBits);if(this.parsedFormatInfo!=null)
{return this.parsedFormatInfo;}
var dimension=this.bitMatrix.Dimension;formatInfoBits=0;var iMin=dimension-8;for(var i=dimension-1;i>=iMin;i--)
{formatInfoBits=this.copyBit(i,8,formatInfoBits);}
for(var j=dimension-7;j<dimension;j++)
{formatInfoBits=this.copyBit(8,j,formatInfoBits);}
this.parsedFormatInfo=FormatInformation.decodeFormatInformation(formatInfoBits);if(this.parsedFormatInfo!=null)
{return this.parsedFormatInfo;}
throw "Error readFormatInformation";}
this.readVersion=function()
{if(this.parsedVersion!=null)
{return this.parsedVersion;}
var dimension=this.bitMatrix.Dimension;var provisionalVersion=(dimension-17)>>2;if(provisionalVersion<=6)
{return Version.getVersionForNumber(provisionalVersion);}
var versionBits=0;var ijMin=dimension-11;for(var j=5;j>=0;j--)
{for(var i=dimension-9;i>=ijMin;i--)
{versionBits=this.copyBit(i,j,versionBits);}}
this.parsedVersion=Version.decodeVersionInformation(versionBits);if(this.parsedVersion!=null&&this.parsedVersion.DimensionForVersion==dimension)
{return this.parsedVersion;}
versionBits=0;for(var i=5;i>=0;i--)
{for(var j=dimension-9;j>=ijMin;j--)
{versionBits=this.copyBit(i,j,versionBits);}}
this.parsedVersion=Version.decodeVersionInformation(versionBits);if(this.parsedVersion!=null&&this.parsedVersion.DimensionForVersion==dimension)
{return this.parsedVersion;}
throw "Error readVersion";}
this.readCodewords=function()
{var formatInfo=this.readFormatInformation();var version=this.readVersion();var dataMask=DataMask.forReference(formatInfo.DataMask);var dimension=this.bitMatrix.Dimension;dataMask.unmaskBitMatrix(this.bitMatrix,dimension);var functionPattern=version.buildFunctionPattern();var readingUp=true;var result=new Array(version.TotalCodewords);var resultOffset=0;var currentByte=0;var bitsRead=0;for(var j=dimension-1;j>0;j-=2)
{if(j==6)
{j--;}
for(var count=0;count<dimension;count++)
{var i=readingUp?dimension-1-count:count;for(var col=0;col<2;col++)
{if(!functionPattern.get_Renamed(j-col,i))
{bitsRead++;currentByte<<=1;if(this.bitMatrix.get_Renamed(j-col,i))
{currentByte|=1;}
if(bitsRead==8)
{result[resultOffset++]=currentByte;bitsRead=0;currentByte=0;}}}}
readingUp^=true;}
if(resultOffset!=version.TotalCodewords)
{throw "Error readCodewords";}
return result;}}
DataMask={};DataMask.forReference=function(reference)
{if(reference<0||reference>7)
{throw "System.ArgumentException";}
return DataMask.DATA_MASKS[reference];}
function DataMask000()
{this.unmaskBitMatrix=function(bits,dimension)
{for(var i=0;i<dimension;i++)
{for(var j=0;j<dimension;j++)
{if(this.isMasked(i,j))
{bits.flip(j,i);}}}}
this.isMasked=function(i,j)
{return((i+j)&0x01)==0;}}
function DataMask001()
{this.unmaskBitMatrix=function(bits,dimension)
{for(var i=0;i<dimension;i++)
{for(var j=0;j<dimension;j++)
{if(this.isMasked(i,j))
{bits.flip(j,i);}}}}
this.isMasked=function(i,j)
{return(i&0x01)==0;}}
function DataMask010()
{this.unmaskBitMatrix=function(bits,dimension)
{for(var i=0;i<dimension;i++)
{for(var j=0;j<dimension;j++)
{if(this.isMasked(i,j))
{bits.flip(j,i);}}}}
this.isMasked=function(i,j)
{return j%3==0;}}
function DataMask011()
{this.unmaskBitMatrix=function(bits,dimension)
{for(var i=0;i<dimension;i++)
{for(var j=0;j<dimension;j++)
{if(this.isMasked(i,j))
{bits.flip(j,i);}}}}
this.isMasked=function(i,j)
{return(i+j)%3==0;}}
function DataMask100()
{this.unmaskBitMatrix=function(bits,dimension)
{for(var i=0;i<dimension;i++)
{for(var j=0;j<dimension;j++)
{if(this.isMasked(i,j))
{bits.flip(j,i);}}}}
this.isMasked=function(i,j)
{return(((URShift(i,1))+(j/3))&0x01)==0;}}
function DataMask101()
{this.unmaskBitMatrix=function(bits,dimension)
{for(var i=0;i<dimension;i++)
{for(var j=0;j<dimension;j++)
{if(this.isMasked(i,j))
{bits.flip(j,i);}}}}
this.isMasked=function(i,j)
{var temp=i*j;return(temp&0x01)+(temp%3)==0;}}
function DataMask110()
{this.unmaskBitMatrix=function(bits,dimension)
{for(var i=0;i<dimension;i++)
{for(var j=0;j<dimension;j++)
{if(this.isMasked(i,j))
{bits.flip(j,i);}}}}
this.isMasked=function(i,j)
{var temp=i*j;return(((temp&0x01)+(temp%3))&0x01)==0;}}
function DataMask111()
{this.unmaskBitMatrix=function(bits,dimension)
{for(var i=0;i<dimension;i++)
{for(var j=0;j<dimension;j++)
{if(this.isMasked(i,j))
{bits.flip(j,i);}}}}
this.isMasked=function(i,j)
{return((((i+j)&0x01)+((i*j)%3))&0x01)==0;}}
DataMask.DATA_MASKS=new Array(new DataMask000(),new DataMask001(),new DataMask010(),new DataMask011(),new DataMask100(),new DataMask101(),new DataMask110(),new DataMask111());function ReedSolomonDecoder(field)
{this.field=field;this.decode=function(received,twoS)
{var poly=new GF256Poly(this.field,received);var syndromeCoefficients=new Array(twoS);for(var i=0;i<syndromeCoefficients.length;i++)syndromeCoefficients[i]=0;var dataMatrix=false;var noError=true;for(var i=0;i<twoS;i++)
{var eval=poly.evaluateAt(this.field.exp(dataMatrix?i+1:i));syndromeCoefficients[syndromeCoefficients.length-1-i]=eval;if(eval!=0)
{noError=false;}}
if(noError)
{return;}
var syndrome=new GF256Poly(this.field,syndromeCoefficients);var sigmaOmega=this.runEuclideanAlgorithm(this.field.buildMonomial(twoS,1),syndrome,twoS);var sigma=sigmaOmega[0];var omega=sigmaOmega[1];var errorLocations=this.findErrorLocations(sigma);var errorMagnitudes=this.findErrorMagnitudes(omega,errorLocations,dataMatrix);for(var i=0;i<errorLocations.length;i++)
{var position=received.length-1-this.field.log(errorLocations[i]);if(position<0)
{throw "ReedSolomonException Bad error location";}
received[position]=GF256.addOrSubtract(received[position],errorMagnitudes[i]);}}
this.runEuclideanAlgorithm=function(a,b,R)
{if(a.Degree<b.Degree)
{var temp=a;a=b;b=temp;}
var rLast=a;var r=b;var sLast=this.field.One;var s=this.field.Zero;var tLast=this.field.Zero;var t=this.field.One;while(r.Degree>=Math.floor(R/2))
{var rLastLast=rLast;var sLastLast=sLast;var tLastLast=tLast;rLast=r;sLast=s;tLast=t;if(rLast.Zero)
{throw "r_{i-1} was zero";}
r=rLastLast;var q=this.field.Zero;var denominatorLeadingTerm=rLast.getCoefficient(rLast.Degree);var dltInverse=this.field.inverse(denominatorLeadingTerm);while(r.Degree>=rLast.Degree&&!r.Zero)
{var degreeDiff=r.Degree-rLast.Degree;var scale=this.field.multiply(r.getCoefficient(r.Degree),dltInverse);q=q.addOrSubtract(this.field.buildMonomial(degreeDiff,scale));r=r.addOrSubtract(rLast.multiplyByMonomial(degreeDiff,scale));}
s=q.multiply1(sLast).addOrSubtract(sLastLast);t=q.multiply1(tLast).addOrSubtract(tLastLast);}
var sigmaTildeAtZero=t.getCoefficient(0);if(sigmaTildeAtZero==0)
{throw "ReedSolomonException sigmaTilde(0) was zero";}
var inverse=this.field.inverse(sigmaTildeAtZero);var sigma=t.multiply2(inverse);var omega=r.multiply2(inverse);return new Array(sigma,omega);}
this.findErrorLocations=function(errorLocator)
{var numErrors=errorLocator.Degree;if(numErrors==1)
{return new Array(errorLocator.getCoefficient(1));}
var result=new Array(numErrors);var e=0;for(var i=1;i<256&&e<numErrors;i++)
{if(errorLocator.evaluateAt(i)==0)
{result[e]=this.field.inverse(i);e++;}}
if(e!=numErrors)
{throw "Error locator degree does not match number of roots";}
return result;}
this.findErrorMagnitudes=function(errorEvaluator,errorLocations,dataMatrix)
{var s=errorLocations.length;var result=new Array(s);for(var i=0;i<s;i++)
{var xiInverse=this.field.inverse(errorLocations[i]);var denominator=1;for(var j=0;j<s;j++)
{if(i!=j)
{denominator=this.field.multiply(denominator,GF256.addOrSubtract(1,this.field.multiply(errorLocations[j],xiInverse)));}}
result[i]=this.field.multiply(errorEvaluator.evaluateAt(xiInverse),this.field.inverse(denominator));if(dataMatrix)
{result[i]=this.field.multiply(result[i],xiInverse);}}
return result;}}