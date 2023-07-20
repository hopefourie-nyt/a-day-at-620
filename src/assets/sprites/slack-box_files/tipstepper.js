var tipStepper=function(cookieName,callback,element,force){this.steps=[];this.ready=false;this.currentStep=0;this.cookieName=cookieName?cookieName:'tipStepper';this.element=element?element:'*';this.force=force?force:false;this.settings={buttons:true,footer:true,nextText:'Next',backText:'Back',doneText:'Done',skipText:'Skip',showSkip:true,showBack:true,carretTopHeight:7,dev:false,animate:true,showCounter:true,}
this.callback=callback;this.template='<div id="step-container" class="step-container"><div id="step-close" class="step-close"></div><div id="step-explained" class="step-explained"> <div id="caret" class="caret"></div><div id="step-data" class="step-data"></div><div id="step-footer" class="step-footer"> <div id="step-controls" class="step-controls"><div id="step-counter"class="step-counter"><span id="step-current" class="step-current"></span>/<span id="step-length" class="step-length"></span></div> <button type="button" class="step-skip" id="step-skip"> Skip </button> <button type="button" class="step-button step-left" id="step-left"> Back </button> <button type="button" class="step-button step-right" id="step-right"> Next </button> </div></div></div></div>';}
tipStepper.prototype.init=function(){if(this.checkCookie()&&!this.force)return;$('body').append(this.template);$('#step-container').show();this.listeners();this.fetch();this.container();this.start();}
tipStepper.prototype.checkCookie=function(){var a=this.cookieName;var b=document.cookie.match('(^|;)\\s*'+a+'\\s*=\\s*([^;]+)');return b?b.pop():'';}
tipStepper.prototype.listeners=function(){var _this=this;$('#step-left').on('click',function(){_this.left();});$('#step-right').on('click',function(){_this.right();});$('#step-skip').on('click',function(){_this.finish();});$('#step-close').on('mousedown touchstart',function(){_this.finish();});}
tipStepper.prototype.left=function(){this.currentStep--;this.step();}
tipStepper.prototype.right=function(){this.currentStep++;if(this.currentStep>(this.steps.length-1))
return this.finish();this.step();}
tipStepper.prototype.container=function(){var domWidth=$(document).width();var domHeight=$(document).height();$('#step-container').width(domWidth);}
tipStepper.prototype.start=function(){this.check();this.doSettings();this.step();}
tipStepper.prototype.doSettings=function(){if(this.settings.animate)
$('#step-explained').addClass('animate');else
$('#step-explained').removeClass('animate');}
tipStepper.prototype.step=function(){$('#step-data').html(this.steps[this.currentStep].data);if(this.steps[this.currentStep].header)
{$('#step-data').prepend('<h5>'+this.steps[this.currentStep].header+'</h5>');}
this.position(this.steps[this.currentStep].element);this.checkButtons();this.updateCounter();}
tipStepper.prototype.updateCounter=function(){if(!this.settings.showCounter)
{$('#step-counter').remove();return;}
$('#step-current').text(this.currentStep+1);$('#step-length').text(this.steps.length);}
tipStepper.prototype.position=function(element){var pos=element.offset();var element_height=element[0].clientHeight;var element_width=element[0].clientWidth;var top=pos.top+element_height;var left=pos.left;var caretLeft=(element_width/2);top+=this.settings.carretTopHeight;$('#caret').removeClass('bottom');if((left+$('#step-explained')[0].clientWidth)>$('.step-container').width())
{left=(pos.left-$('#step-explained')[0].clientWidth)+element_width;caretLeft=($('.step-explained')[0].clientWidth-(element_width/2));}
if((top+$('#step-explained')[0].clientWidth)>$(document).height())
{top=(pos.top-$('#step-explained')[0].clientHeight);$('#caret').addClass('bottom');}
if(Math.abs(caretLeft)>$('#step-explained')[0].clientWidth)
{caretLeft=15;}
$('#step-explained').css({left:left,top:top});$('#step-explained #caret').css({left:caretLeft});this.windowPosition(top);}
tipStepper.prototype.windowPosition=function(top){if(top>($(window).height()/2))
{var scrollTop=top/2;$(window).scrollTop(scrollTop);}
else
{$(window).scrollTop(0);}}
tipStepper.prototype.check=function(){if(!this.settings.buttons)$('#step-controls').remove();if(!this.settings.footer)$('#step-footer').remove();if(!this.settings.showSkip)$('#step-skip').remove();if(!this.settings.showBack)$('#step-left').remove();}
tipStepper.prototype.checkButtons=function(){$('#step-left').removeAttr('disabled');$('#step-right').text(this.settings.nextText);if(this.currentStep==0)
{$('#step-left').attr('disabled','disabled');}
if(this.currentStep==(this.steps.length-1))
{$('#step-right').text(this.settings.doneText);}}
tipStepper.prototype.finish=function(){var d=new Date();d.setTime(d.getTime()+(32*24*60*60*1000));var expires="expires="+d.toUTCString();if(!this.settings.dev)document.cookie=this.cookieName+"=true; "+expires+"; path=/";$('#step-container').remove();if(this.callback)
{return this.callback();}}
tipStepper.prototype.fetch=function(){var _this=this;$(this.element).each(function(){if($(this).attr('data-step'))
{var data=$(this).attr('data-step');var element=$(this);var header=$(this).attr('data-step-header');var order=$(this).attr('data-step-order');order=order?order:(9*99);if($(this).attr('data-step-inner'))
{data=$(this).html();}
var obj={data:data,element:element,header:header,order:order,};_this.steps.push(obj);}
_this.ready=true;});this.steps.sort(function(a,b){return parseFloat(a.order)-parseFloat(b.order);});}