function take_snapshot(){Webcam.snap(function(dataUrl){qrCodeDecoder(dataUrl);});}
function qrCodeDecoder(dataUrl){qrcode.decode(dataUrl);}
function showInfo(data){$("#qrContent").text(data);}
function callCamera(){console.log("call");if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){Webcam.set('constraints',{video:true,facingMode:"environment"});}
Webcam.attach('#example');setInterval(function(){take_snapshot();},10);qrcode.callback=showInfo;}