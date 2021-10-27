var QRcdr;function GetUrlFile(t){var e=document.getElementById("myInput");e.select(),e.setSelectionRange(0,99999),document.execCommand("copy"),document.getElementById("myTooltip").innerHTML="URL Copied",$.ajax({url:"lib/copyFile.php",type:"post",dataType:"json",data:{path:t+".svg"},success:function(t){}}),showModel()}function outFunc(){document.getElementById("myTooltip").innerHTML="Copy URL"}!function(t){"use strict";t.fn.extend({qrcdr:function(e){var a,n,o,c,s,l,i,r,d,p,h,u,v,g,m,f,w,b,C,y,k,x,M,z,L,I,P,T,E,q,H,O=this,S='<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 48 48"><path d="M28.9,18.4l-3.4,3.4V10.5C25.5,9.7,24.8,9,24,9s-1.5,0.7-1.5,1.5v11.4l-3.4-3.4c-0.6-0.6-1.5-0.6-2.1,0 c-0.6,0.6-0.6,1.5,0,2.1l6,6c0.6,0.6,1.5,0.6,2.1,0c0,0,0,0,0,0l6-6c0.6-0.6,0.6-1.5,0-2.1C30.5,17.9,29.5,17.9,28.9,18.4z"/><path d="M42,30V13.5L28.5,0H12C8.7,0,6,2.7,6,6v24c-1.7,0.1-3,1.4-3,3.1v5.8c0,1.7,1.3,3,3,3.1v0c0,3.3,2.7,6,6,6h24 c3.3,0,6-2.7,6-6v0c1.7-0.1,3-1.4,3-3.1v-5.8C45,31.4,43.7,30.1,42,30z M36,45H12c-1.7,0-3-1.3-3-3h30C39,43.7,37.7,45,36,45z M16.6,37.2c-0.2-0.2-0.4-0.3-0.7-0.4c-0.3-0.1-0.6-0.2-1.1-0.3c-0.6-0.1-1.1-0.3-1.6-0.5c-0.4-0.2-0.8-0.5-1-0.8 c-0.2-0.3-0.4-0.8-0.4-1.3c0-0.5,0.1-0.9,0.4-1.3c0.3-0.4,0.6-0.7,1.1-0.9c0.5-0.2,1.1-0.3,1.7-0.3c0.5,0,1,0.1,1.4,0.2 c0.4,0.1,0.7,0.3,1,0.5c0.3,0.2,0.4,0.4,0.6,0.7c0.1,0.2,0.2,0.5,0.2,0.7c0,0.2-0.1,0.4-0.2,0.6s-0.3,0.3-0.6,0.3 c-0.2,0-0.4-0.1-0.5-0.2c-0.1-0.1-0.2-0.3-0.3-0.5c-0.2-0.3-0.3-0.6-0.6-0.8c-0.2-0.2-0.6-0.3-1.1-0.3c-0.5,0-0.8,0.1-1.1,0.3 s-0.4,0.4-0.4,0.7c0,0.2,0,0.3,0.1,0.4c0.1,0.1,0.2,0.2,0.4,0.3c0.2,0.1,0.3,0.2,0.5,0.2c0.2,0.1,0.4,0.1,0.8,0.2 c0.5,0.1,0.9,0.2,1.3,0.4c0.4,0.1,0.7,0.3,1,0.5c0.3,0.2,0.5,0.4,0.6,0.7s0.2,0.7,0.2,1.1c0,0.5-0.1,1-0.4,1.4 c-0.3,0.4-0.7,0.7-1.2,1c-0.5,0.2-1.1,0.4-1.8,0.4c-0.9,0-1.6-0.2-2.1-0.5c-0.4-0.2-0.7-0.5-1-0.9c-0.2-0.4-0.4-0.8-0.4-1.1 c0-0.2,0.1-0.4,0.2-0.5s0.3-0.2,0.6-0.2c0.2,0,0.3,0.1,0.5,0.2c0.1,0.1,0.2,0.3,0.3,0.5c0.1,0.3,0.2,0.5,0.4,0.7s0.3,0.3,0.5,0.5 c0.2,0.1,0.5,0.2,0.9,0.2c0.5,0,0.9-0.1,1.3-0.4c0.3-0.2,0.5-0.5,0.5-0.9C16.9,37.7,16.8,37.4,16.6,37.2z M19.5,32.4 c0-0.2,0.1-0.4,0.2-0.5s0.4-0.2,0.6-0.2c0.3,0,0.5,0.1,0.6,0.3c0.1,0.2,0.2,0.5,0.4,0.9l2,5.8l2-5.8c0.1-0.3,0.2-0.5,0.2-0.6 c0.1-0.1,0.1-0.2,0.3-0.3c0.1-0.1,0.3-0.1,0.5-0.1c0.2,0,0.3,0,0.4,0.1c0.1,0.1,0.2,0.2,0.3,0.3s0.1,0.2,0.1,0.4c0,0.1,0,0.2,0,0.3 S27,32.8,27,32.9c0,0.1-0.1,0.2-0.1,0.3l-2.1,5.6c-0.1,0.2-0.2,0.4-0.2,0.6c-0.1,0.2-0.2,0.4-0.3,0.5s-0.2,0.3-0.4,0.4 s-0.4,0.1-0.6,0.1c-0.2,0-0.4,0-0.6-0.1c-0.2-0.1-0.3-0.2-0.4-0.4c-0.1-0.2-0.2-0.3-0.3-0.5c-0.1-0.2-0.1-0.4-0.2-0.6l-2.1-5.6 c0-0.1-0.1-0.2-0.1-0.3c0-0.1-0.1-0.2-0.1-0.3C19.5,32.5,19.5,32.4,19.5,32.4z M30.4,38.3c0.5,0.5,1.1,0.8,1.9,0.8 c0.4,0,0.8-0.1,1.1-0.2c0.4-0.1,0.7-0.3,1.1-0.5v-1.4h-1.4c-0.3,0-0.6,0-0.7-0.1c-0.2-0.1-0.3-0.3-0.3-0.5c0-0.2,0.1-0.4,0.2-0.5 c0.1-0.1,0.3-0.2,0.6-0.2h2c0.2,0,0.5,0,0.6,0.1c0.2,0,0.3,0.1,0.4,0.3c0.1,0.1,0.2,0.4,0.2,0.7v1.7c0,0.2,0,0.4-0.1,0.5 c0,0.1-0.1,0.2-0.2,0.4s-0.3,0.2-0.4,0.3c-0.5,0.3-1,0.5-1.5,0.6s-1,0.2-1.6,0.2c-0.7,0-1.3-0.1-1.8-0.3c-0.5-0.2-1-0.5-1.4-0.9 c-0.4-0.4-0.7-0.9-0.9-1.4c-0.2-0.6-0.3-1.2-0.3-1.9c0-0.7,0.1-1.3,0.3-1.8c0.2-0.6,0.5-1,0.9-1.4s0.9-0.7,1.4-0.9 c0.6-0.2,1.2-0.3,1.9-0.3c0.6,0,1.1,0.1,1.5,0.2s0.8,0.4,1.1,0.6c0.3,0.2,0.5,0.5,0.6,0.7c0.1,0.3,0.2,0.5,0.2,0.7 c0,0.2-0.1,0.4-0.2,0.6s-0.4,0.2-0.6,0.2c-0.1,0-0.2,0-0.4-0.1c-0.1-0.1-0.2-0.1-0.3-0.2c-0.2-0.3-0.4-0.6-0.5-0.8 c-0.1-0.2-0.4-0.3-0.6-0.4c-0.3-0.1-0.6-0.2-1-0.2c-0.4,0-0.8,0.1-1.1,0.2s-0.6,0.3-0.8,0.6s-0.4,0.6-0.5,1 c-0.1,0.4-0.2,0.8-0.2,1.3C29.7,37,29.9,37.8,30.4,38.3z M39,30H9V6c0-1.7,1.3-3,3-3h16.5v6c0,2.5,2,4.5,4.5,4.5h6V30z"/></svg>',V='<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 48 48"><path d="M28.9,18.4l-3.4,3.4V10.5C25.5,9.7,24.8,9,24,9s-1.5,0.7-1.5,1.5v11.4l-3.4-3.4c-0.6-0.6-1.5-0.6-2.1,0 c-0.6,0.6-0.6,1.5,0,2.1l6,6c0.6,0.6,1.5,0.6,2.1,0c0,0,0,0,0,0l6-6c0.6-0.6,0.6-1.5,0-2.1C30.5,17.9,29.5,17.9,28.9,18.4z"/><path d="M42,30V13.5L28.5,0H12C8.7,0,6,2.7,6,6v24c-1.7,0.1-3,1.4-3,3.1v5.8c0,1.7,1.3,3,3,3.1v0c0,3.3,2.7,6,6,6h24 c3.3,0,6-2.7,6-6v0c1.7-0.1,3-1.4,3-3.1v-5.8C45,31.4,43.7,30.1,42,30z M36,45H12c-1.7,0-3-1.3-3-3h30C39,43.7,37.7,45,36,45z M11.5,39.3v-6.6c0-0.4,0.1-0.7,0.3-0.8s0.5-0.2,0.8-0.2h2.2c0.7,0,1.2,0.1,1.5,0.2c0.4,0.1,0.7,0.3,0.9,0.5s0.4,0.5,0.6,0.8 s0.2,0.7,0.2,1.1c0,0.9-0.3,1.5-0.8,2s-1.3,0.7-2.4,0.7h-1.6v2.4c0,0.3-0.1,0.6-0.2,0.8s-0.4,0.3-0.6,0.3c-0.3,0-0.5-0.1-0.6-0.3 S11.5,39.6,11.5,39.3z M19.5,39.3v-6.6c0-0.3,0-0.5,0.1-0.7c0.1-0.2,0.2-0.3,0.4-0.4s0.4-0.2,0.6-0.2c0.2,0,0.3,0,0.4,0.1 s0.2,0.1,0.3,0.2s0.2,0.2,0.3,0.3s0.2,0.3,0.3,0.4l3.3,5.1v-5.1c0-0.3,0.1-0.6,0.2-0.7s0.3-0.2,0.6-0.2c0.3,0,0.4,0.1,0.6,0.2 s0.2,0.4,0.2,0.7v6.8c0,0.8-0.3,1.1-0.9,1.1c-0.2,0-0.3,0-0.4-0.1s-0.2-0.1-0.4-0.2s-0.2-0.2-0.3-0.3s-0.2-0.3-0.3-0.4l-3.3-5v5 c0,0.3-0.1,0.6-0.2,0.7s-0.3,0.3-0.6,0.3c-0.2,0-0.4-0.1-0.6-0.3S19.5,39.7,19.5,39.3z M30.7,38.2c0.5,0.5,1.1,0.8,1.9,0.8 c0.4,0,0.8-0.1,1.1-0.2s0.7-0.3,1.1-0.5V37h-1.3c-0.3,0-0.6,0-0.7-0.1s-0.2-0.3-0.2-0.5c0-0.2,0.1-0.4,0.2-0.5s0.3-0.2,0.6-0.2h2 c0.2,0,0.4,0,0.6,0.1s0.3,0.1,0.4,0.3s0.2,0.4,0.2,0.7v1.6c0,0.2,0,0.4-0.1,0.5s-0.1,0.2-0.2,0.4s-0.3,0.2-0.4,0.3 c-0.5,0.3-1,0.5-1.5,0.6s-1,0.2-1.6,0.2c-0.7,0-1.3-0.1-1.8-0.3s-1-0.5-1.4-0.9s-0.7-0.9-0.9-1.4s-0.3-1.2-0.3-1.8 c0-0.7,0.1-1.3,0.3-1.8s0.5-1,0.9-1.4s0.9-0.7,1.4-0.9s1.2-0.3,1.9-0.3c0.6,0,1.1,0.1,1.5,0.2s0.8,0.3,1.1,0.6s0.5,0.5,0.6,0.7 s0.2,0.5,0.2,0.7c0,0.2-0.1,0.4-0.2,0.6s-0.4,0.2-0.6,0.2c-0.1,0-0.2,0-0.4-0.1s-0.2-0.1-0.3-0.2c-0.2-0.3-0.4-0.6-0.5-0.8 s-0.3-0.3-0.6-0.4s-0.6-0.2-1-0.2c-0.4,0-0.8,0.1-1.1,0.2s-0.6,0.3-0.8,0.6s-0.4,0.6-0.5,1S30,35.4,30,35.9 C30,36.9,30.3,37.6,30.7,38.2z M39,30H9V6c0-1.7,1.3-3,3-3h16.5v6c0,2.5,2,4.5,4.5,4.5h6V30z"/><path d="M15.5,35.4c0.3-0.1,0.5-0.2,0.6-0.4s0.2-0.5,0.2-0.8c0-0.4-0.1-0.7-0.3-0.9c-0.3-0.3-0.8-0.4-1.5-0.4h-1.2v2.6h1.2 C14.8,35.5,15.2,35.5,15.5,35.4z"/></svg>',j='<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 48 48"><path d="M28.9,18.4l-3.4,3.4V10.5C25.5,9.7,24.8,9,24,9s-1.5,0.7-1.5,1.5v11.4l-3.4-3.4c-0.6-0.6-1.5-0.6-2.1,0 c-0.6,0.6-0.6,1.5,0,2.1l6,6c0.6,0.6,1.5,0.6,2.1,0l6-6c0.6-0.6,0.6-1.5,0-2.1C30.5,17.9,29.5,17.9,28.9,18.4z"/><path d="M24.6,39c0.2,0,0.3-0.1,0.5-0.1c0.2-0.1,0.3-0.2,0.5-0.3c0.6-0.5,0.9-1.4,0.9-2.6c0-0.9-0.1-1.5-0.4-2 c-0.3-0.4-0.6-0.7-1-0.8C24.8,33,24.3,33,23.8,33h-1.2v6h1.4C24.2,39,24.5,39,24.6,39z"/><path d="M42,30V13.5L28.5,0H12C8.7,0,6,2.7,6,6v24c-1.7,0.1-3,1.4-3,3.1v5.8c0,1.7,1.3,3,3,3.1c0,3.3,2.7,6,6,6h24c3.3,0,6-2.7,6-6 c1.7-0.1,3-1.4,3-3.1v-5.8C45,31.4,43.7,30.1,42,30z M36,45H12c-1.7,0-3-1.3-3-3h30C39,43.7,37.7,45,36,45z M12.5,39.5v-6.8 c0-0.4,0.1-0.7,0.3-0.8c0.2-0.2,0.5-0.3,0.9-0.3H16c0.7,0,1.2,0.1,1.6,0.2c0.4,0.1,0.7,0.3,0.9,0.5c0.3,0.2,0.5,0.5,0.6,0.9 c0.1,0.3,0.2,0.7,0.2,1.1c0,0.9-0.3,1.6-0.8,2C17.9,36.7,17.1,37,16,37h-1.6v2.5c0,0.4-0.1,0.6-0.3,0.8c-0.2,0.2-0.4,0.3-0.6,0.3 c-0.3,0-0.5-0.1-0.7-0.3C12.6,40.1,12.5,39.8,12.5,39.5z M20.8,39.1v-6.5c0-0.4,0.1-0.7,0.3-0.8c0.2-0.2,0.5-0.3,0.8-0.3h2.3 c0.6,0,1.1,0.1,1.6,0.2c0.4,0.1,0.8,0.3,1.2,0.6c0.9,0.8,1.4,2,1.4,3.6c0,0.5,0,1-0.1,1.5c-0.1,0.4-0.2,0.8-0.4,1.2 c-0.2,0.4-0.4,0.7-0.7,0.9c-0.2,0.2-0.5,0.4-0.8,0.5c-0.3,0.1-0.6,0.2-0.9,0.3s-0.7,0.1-1.1,0.1h-2.3c-0.3,0-0.6-0.1-0.7-0.1 c-0.2-0.1-0.3-0.2-0.3-0.4C20.8,39.7,20.8,39.4,20.8,39.1z M34.6,35.2c0.3,0,0.5,0.1,0.6,0.2c0.1,0.1,0.2,0.3,0.2,0.5 c0,0.2-0.1,0.4-0.2,0.5c-0.1,0.1-0.3,0.2-0.6,0.2h-2.9v2.9c0,0.4-0.1,0.6-0.2,0.8s-0.4,0.3-0.6,0.3s-0.5-0.1-0.6-0.3 c-0.2-0.2-0.2-0.5-0.2-0.8v-6.8c0-0.3,0-0.5,0.1-0.6s0.2-0.3,0.4-0.4s0.4-0.1,0.6-0.1h4.2c0.3,0,0.5,0.1,0.6,0.2 C36,31.9,36,32,36,32.2c0,0.2-0.1,0.4-0.2,0.5c-0.1,0.1-0.4,0.2-0.6,0.2h-3.5v2.3H34.6z M39,30H9V6c0-1.7,1.3-3,3-3h16.5v6 c0,2.5,2,4.5,4.5,4.5h6V30z"/><path d="M16.6,35.5c0.3-0.1,0.5-0.2,0.6-0.4c0.2-0.2,0.2-0.5,0.2-0.8c0-0.4-0.1-0.7-0.3-1c-0.3-0.3-0.8-0.4-1.6-0.4h-1.2v2.7h1.2 C16,35.6,16.3,35.6,16.6,35.5z"/></svg>',B='<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16"><path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/><path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"/></svg>',R='<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" class="icon-spin"><path d="M0 11c.511-6.158 5.685-11 12-11s11.489 4.842 12 11h-2.009c-.506-5.046-4.793-9-9.991-9s-9.485 3.954-9.991 9h-2.009zm21.991 2c-.506 5.046-4.793 9-9.991 9s-9.485-3.954-9.991-9h-2.009c.511 6.158 5.685 11 12 11s11.489-4.842 12-11h-2.009z"/></svg>';return this.each(function(){var e=t(this);if(e.data("qrcdr"))return!0;if(a=e.find(".qrcdr-form"),c=a.find(":submit"),e.find(".qrcdr-form :input"),q=e.find("#collapseSettings :input"),n=e.find('.qrcdr-form :input[type="text"], .qrcdr-form textarea'),o=e.find('.qrcdr-form :input:not([type="text"]):not(textarea), .qrcolorpicker :input'),s=e.find(".linksholder"),l=e.find(".qrcolorpicker"),i=e.find(".colorpickerback"),r=e.find(".preloader"),d=e.find(".alert_placeholder .toast-body"),p=e.find("#trans-bg"),h=e.find(".resultholder"),u=e.find(".generate_qrcode"),v=e.find(".holdresult"),y=e.find(".setvalue"),k=e.find(".yesdonation"),x=e.find(".nodonation"),g=e.find(".collapse-control"),m=e.find(".collapse-control-reverse"),L=e.find("input[name=btc_account]"),f=e.find("#upmarker"),w=e.find("#event"),I=e.find("#collapseSettings :input"),P=e.find('a[data-toggle="tab"]'),T=t("#getsec").val(),E=e.find("#qrcdr-relative").val(),H=e.find(".qrcdr-slider-input"),"no",e.data("qrcdr",!0),O.getSettings=function(){return e=I.filter(function(e,a){return""!=t(a).val()}).serializeArray(),a={},t(e).each(function(t,e){a[e.name]=e.value}),a;var e,a},O.updateCode=function(){return U()},location.hash){const t=location.href.split("#");e.find('a[data-toggle="tab"][href="#'+t[1]+'"]').tab("show")}function _(t,e){t.parent(".qrcdr-slider").find(".qrcdr-slider-value").html(e+"%")}t("[maxlength]").maxlength({alwaysShow:!0,validate:!0,appendToParent:!0}),t(".toast").toast(),H.each(function(){var e=t(this).val();_(t(this),e)}),H.on("input",function(){var e=t(this).val();_(t(this),e)}),l.spectrum({type:"text",showPalette:!1,showAlpha:!1,showButtons:!1,allowEmpty:!1,preferredFormat:"hex",change:N}),g.on("change",function(){var e=t(this).data("target");t(this).prop("checked")?t(e).collapse("show"):t(e).collapse("hide")}),m.on("change",function(){var e=t(this).data("target");t(this).prop("checked")?t(e).collapse("hide"):t(e).collapse("show")}),m.each(function(){var e=t(this).data("target");t(this).prop("checked")?t(e).collapse("hide"):t(e).collapse("show")}),p.on("change",function(){t(this).prop("checked")?(i.spectrum("set","transparent"),i.spectrum("disable")):(i.spectrum("set","#ffffff"),i.spectrum("enable"))}),p.prop("checked")?(i.spectrum("set","transparent"),i.spectrum("disable")):(i.spectrum("set","#ffffff"),i.spectrum("enable"));var A=document.getElementsByClassName("needs-validation");Array.prototype.filter.call(A,function(t){t.addEventListener("submit",function(e){e.preventDefault(),e.stopPropagation(),t.classList.add("was-validated")},!1)});function U(){t(".toast").toast("hide"),clearTimeout(C),u.attr("disabled",!0),s.html(""),h.data("gradient",!1),C=setTimeout(function(){a[0].checkValidity()||c.click(),i.spectrum("enable"),r.fadeIn(100,function(){var a=e.find(T+" :input"),n="section="+T+"&";n+=a.filter(function(e,a){return""!=t(a).val()}).serialize(),n+="&",n+=q.filter(function(e,a){return""!=t(a).val()}).serialize(),t.ajax({type:"POST",url:E+"ajax/process.php",cache:!1,data:n}).fail(function(e){d.html(e.statusText),t(".toast").toast("show")}).done(function(e){p.prop("checked")&&i.spectrum("disable");var a=JSON.parse(e);a.hasOwnProperty("errore")?(d.html(a.errore),t(".toast").toast("show"),h.html('<img src="'+a.placeholder+'">'),r.fadeOut("slow")):(u.attr("disabled",!1),h.html(a.content),h.data("gradient",a.gradient),r.fadeOut("slow"),v.val(e))})})},1e3)}function N(e){var a=e.target;t(a).hasClass("nopreview")||(u.attr("disabled",!0),s.html(""),clearTimeout(C),C=setTimeout(function(){U()},1e3))}function F(){var a=v.val();t.ajax({type:"POST",url:E+"ajax/create.php",cache:!1,data:{create:a}}).fail(function(e){d.html(e.statusText),t(".toast").toast("show")}).done(function(a){if(a.length){var n=JSON.parse(a);if(n.error)alert(n.error);else{var o=n.filedir+"/"+n.basename,c='<button style="color:black;" onclick="showModel()" class="btn btn-default svgtopng" data-path="'+o+'">'+V+'</button><a href="#" class="btn btn-default d-none preload-png">'+R+'</a><a class="serve-png d-none" href="'+o+'.png" download="'+n.basename+'.png" data-path="'+o+'">PNG</a>';c=c+'<a style="color:black;" onclick="showModel()" class="btn btn-default serve-svg" href="'+o+'.svg" download="'+n.basename+'.svg">'+S+"</a>",h.data("gradient")||(c=c+'<a style="color:black;" onclick="showModel()" target="_blank" class="btn btn-default" href="'+E+"pdf/?f="+n.basename+'">'+j+"</a>"),c=(c=(c=c+'<span class="tooltip2"><button class="btn btn-default" style="color:black"   onclick=GetUrlFile("'+o+'") onmouseout="outFunc()"><span class="tooltiptext" id="myTooltip" style="font-size:1rem;">Copy URL</span><i class="fa fa-code"></i></button></span>')+'<input type="text" class="offscreen" aria-hidden="true" value="https://4qrcode.com/URL/'+o+'.svg" id="myInput">')+'<button style="color:black;" onclick="showModel()" class="btn btn-default print">'+B+"</button>",s.html(c),u.attr("disabled",!0),e.find(".print").on("click",function(){var e,a;e=t(".serve-svg").attr("href"),(a=window.open("about:blank","_new")).document.open(),a.document.write('<html><head></head><body onload="window.print()" onafterprint="window.close()"><img src="'+e+'"/></body></html>'),a.document.close()})}}})}function D(){if(t("#map-canvas").length){M=t("#map-canvas").data("lat"),z=t("#map-canvas").data("lng");var e,a,n=new google.maps.LatLng(M,z),o=document.getElementById("pac-input"),c=document.getElementById("latlong"),s=document.getElementById("latbox"),l=document.getElementById("lngbox"),i={zoom:10,center:n};b=new google.maps.Map(document.getElementById("map-canvas"),i),a=new google.maps.places.SearchBox(o),e=new google.maps.Marker({map:b,draggable:!0,animation:google.maps.Animation.DROP,position:n}),google.maps.event.addListener(e,"dragend",function(t){var a=e.getPosition().lat()+","+e.getPosition().lng();r(a)}),b.controls[google.maps.ControlPosition.TOP_LEFT].push(c),s.value.length>0&&l.value.length>0&&d(Number(s.value),Number(l.value)),google.maps.event.addListener(a,"places_changed",function(){var t=a.getPlaces();if(0!=t.length)for(var n,o=0;n=t[o];o++)e.setPosition(n.geometry.location),b.setCenter(n.geometry.location),r()})}var r=function(){s.value=e.getPosition().lat(),l.value=e.getPosition().lng(),U()},d=function(t,a){b.setCenter({lat:t,lng:a}),e.setPosition({lat:t,lng:a}),r()};t("#latbox, #lngbox").on("input",function(){s.value.length>0&&l.value.length>0&&d(Number(s.value),Number(l.value))})}n.on("input",N),o.on("change",function(e){var a=e.target;t(a).hasClass("nopreview")||U()}),u.on("click",function(){F()}),t(document).on("click",".svgtopng",function(){var e,a,n,o,c,s,l,i;l=t(".svgtopng"),i=l.parent().find(".serve-png"),c=l.parent().find(".preload-png"),l.addClass("d-none"),c.removeClass("d-none"),o=i.attr("download"),s=l.data("path")+".svg",e=new Image,a=document.createElement("canvas"),n=a.getContext("2d"),t("#svgtopng"),e.onload=function(){var s=2*e.width,r=2*e.height;a.width=s,a.height=r,n.drawImage(e,0,0,s,r);var d=a.toDataURL();t.ajax({type:"POST",url:E+"ajax/png.php",cache:!1,data:{imgdata:d,filename:o}}).fail(function(t){alert(getdata.tatusText)}).done(function(t){"error"==t?alert("File not found"):(c.addClass("d-none"),l.removeClass("d-none"),i[0].click())})},e.src=s}),f.on("change",function(e){if(t(this).removeClass("is-invalid"),this.files[0].type.match("image.*")){var a=this.files[0],n=new Image;n.crossOrigin="Anonymous";var o=new FileReader;a.type.indexOf("svg")>0&&"svg",o.onload=function(e){t(".logoselecta label").removeClass("active").find("input").removeAttr("checked");var a='<img src="'+e.target.result+'" class="user_watermark">';t(".custom-watermark .hold-custom-watermark").html(a),n.src=t(".logoselecta .btn-group-toggle label").last().find("img").attr("src"),t(".custom-watermark").addClass("active"),t(".custom-watermark input").val(e.target.result).prop("checked",!0)},o.readAsDataURL(a),n.onload=function(){var e=document.createElement("canvas"),a=this.width,o=this.height;if(0==a||0==o)return t("#upmarker").addClass("is-invalid"),t(".logoselecta .btn-group-toggle label").last().remove(),!1;e.getContext("2d").drawImage(n,0,0),a>o?(o*=400/a,a=400):(a*=400/o,o=400),e.width=a,e.height=o,e.getContext("2d").drawImage(n,0,0,a,o);var c=e.toDataURL();t(".logoselecta .btn-group-toggle label").last().find("img").attr("src",c),t(".logoselecta .btn-group-toggle label").last().find("input[name='optionlogo']").val(c)}}else t(this).addClass("is-invalid")}),t(".logoselecta img").each(function(){var e=t(this);if("svg"==e.attr("data-src").split(".").pop()){var a=new Image;a.crossOrigin="Anonymous",a.onload=function(){var t=this.width,n=this.height;if(!t||!n)return e.parent().remove(),!1;var o=document.createElement("canvas"),c=o.getContext("2d");t>n?(n*=400/t,t=400):(t*=400/n,n=400),o.width=t,o.height=n,c.drawImage(a,0,0,t,n);var s=o.toDataURL();e.parent().find("input").attr("value",s)},a.src=e.attr("src")}}),w.length&&(t(".datetimepicker-input").datetimepicker({format:"LLL"}),t(".datetimepicker-input").on("change.datetimepicker",function(e){var a=t(this).data("timestamp");t(a).attr("value",e.date.unix())})),function(e,a){if(t("#wpol-admin-map").length){if(M=t("#wpol-admin-map").data("lat"),z=t("#wpol-admin-map").data("lng"),"undefined"==typeof ol||null===ol)return console.log("WARNING: OpenLayers Library not loaded"),!1;var n=ol.proj.fromLonLat([z,M]),o=new ol.View({center:n,zoom:4});b=new ol.Map({target:"wpol-admin-map",view:o,layers:[new ol.layer.Tile({source:new ol.source.OSM})],controls:ol.control.defaults({attributionOptions:{collapsible:!0}}),interactions:ol.interaction.defaults({mouseWheelZoom:!1})});var c,s=document.getElementById(a),l=new ol.Overlay({position:n,positioning:"center-center",element:s,stopEvent:!1,dragging:!1});b.addOverlay(l),b.getInteractions().forEach(function(t){t instanceof ol.interaction.DragPan&&(c=t)}),s.addEventListener("mousedown",function(t){c.setActive(!1),l.set("dragging",!0)}),b.on("pointermove",function(t){!0===l.get("dragging")&&l.setPosition(t.coordinate)}),b.on("pointerup",function(e){if(!0===l.get("dragging")){c.setActive(!0),l.set("dragging",!1);var a=e.coordinate,n=ol.proj.toLonLat(a);t(".venomaps-get-lat").val(n[1]),t(".venomaps-get-lon").val(n[0]),U()}}),t(".venomaps-get-coordinates").on("click",function(){var e=t(this),a=t(".venomaps-set-address").val();if(a.length>3){e.hide();var n=encodeURIComponent(a);t.ajax({url:"https://nominatim.openstreetmap.org/search?q="+n+"&format=json",type:"GET"}).done(function(e){var a,n,c,s;n=(a=e)[0].lat,c=a[0].lon,s=ol.proj.fromLonLat([c,n]),l.setPosition(s),o.setCenter(s),o.setZoom(6),t(".venomaps-get-lat").val(n),t(".venomaps-get-lon").val(c),U()}).always(function(){e.fadeIn()})}}),t(".setinput-latlon").on("input",function(){!function(t,e){var a=ol.proj.fromLonLat([e,t]);l.setPosition(a),o.setCenter(a)}(t(".venomaps-get-lat").val(),t(".venomaps-get-lon").val())})}}(0,"infomarker_admin"),D(),P.on("shown.bs.tab",function(e){T=t(e.target).attr("href"),t("#getsec").val(T);var a=location.href.split("#")[0]+T;history.replaceState(null,null,a),"#location"==T&&(D(),t("#wpol-admin-map").length&&b.updateSize())}),y.on("change",function(){var e=t(this).val(),a=t(this).data("target");t(a).html(e)}),t("#pp_type").on("change",function(){"_donations"===t(this).val()?(x.addClass("d-none"),k.removeClass("col-sm-3")):(x.removeClass("d-none"),k.addClass("col-sm-3"))}),L.on("input",function(){var e=L.val();t.ajax({method:"POST",url:E+"ajax/btc-check.php",data:{btc_account:e}}).done(function(t){t?L.removeClass("is-invalid").addClass("is-valid"):L.removeClass("is-valid").addClass("is-invalid")})})})}})}(jQuery),$(document).ready(function(){QRcdr=$(".qrcdr").qrcdr()});

// this script for border bottom 
$(document).ready(function() {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // true for mobile device
    }else{
        // is web browser 
        var getTime = localStorage.getItem("qrcode");
        if (new Date().getTime() > getTime){
            var time = 1000 * 60 * 60 * 120;
            localStorage.setItem("qrcode", new Date().getTime()+time);
            setTimeout(function() {
            $('#saveTool').modal();
            }, 20000);
        }
    }   
});
    // this script to show the model 
    function showModel(){
    setTimeout(function() {
        $('#exampleModal').modal();
    }, 2000);
    }

// this for designe navbar onclick show navbar mobile 
    $("#flip").click(function(){ 
    $("#panel").slideToggle("slow");
    });

    // this script for toggle plus and minus button in frame ... 
    $("#btn1").click(function(){
        $("#plus1").toggle();
        $("#minus1").toggle();

        $("#plus2").show();
        $("#plus3").show();
        $("#plus4").show();
        $("#plus5").show();
        $("#minus2").hide();
        $("#minus3").hide();
        $("#minus4").hide();
        $("#minus5").hide();
    
    });

    $("#btn2").click(function(){
        $("#plus2").toggle();
        $("#minus2").toggle();

        $("#plus1").show();
        $("#plus3").show();
        $("#plus4").show();
        $("#plus5").show();
        $("#minus1").hide();
        $("#minus3").hide();
        $("#minus4").hide();
        $("#minus5").hide();
    });

    $("#btn3").click(function(){
        $("#plus3").toggle();
        $("#minus3").toggle();

        $("#plus1").show();
        $("#plus2").show();
        $("#plus4").show();
        $("#plus5").show();
        $("#minus1").hide();
        $("#minus2").hide();
        $("#minus4").hide();
        $("#minus5").hide();
    });
    
    $("#btn4").click(function(){
        $("#plus4").toggle();
        $("#minus4").toggle();

        $("#plus2").show();
        $("#plus3").show();
        $("#plus1").show();
        $("#plus5").show();
        $("#minus2").hide();
        $("#minus3").hide();
        $("#minus1").hide();
        $("#minus5").hide();
    });

    $("#btn5").click(function(){
        $("#plus5").toggle();
        $("#minus5").toggle();

        $("#plus2").show();
        $("#plus3").show();
        $("#plus1").show();
        $("#plus4").show();
        $("#minus2").hide();
        $("#minus3").hide();
        $("#minus1").hide();
        $("#minus4").hide();
    });
    // end script 