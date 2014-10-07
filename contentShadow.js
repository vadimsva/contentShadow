/*
contentShadow - 1.00 [07.10.14]
Author: vadimsva
Github: https://github.com/vadimsva/contentShadow
*/
(function ($) {
	$.fn.contentShadow = function(method){
	return this.each(function() {
		var el = $(this);
		var elClass = 'contentShadow';
		
		if (el[0].tagName == 'HTML') {
			el = $('body');
		}
		
		el.wrapInner("<div class='" + elClass + "Body'><div class='" + elClass +"'></div></div>").addClass(elClass + 'Container');
		
		var cSBody = el.find('> .' + elClass +'Body');
		var cS = cSBody.find('> .' + elClass);

		var methods = {
			init : function( params ) {
				var _defaults = {
					contentPadding : 10
				};
				_options = $.extend(_defaults, params);
				
				if(el.parent().is(':visible')){
				
					function cS_init(){
						el.height(el.parent().outerHeight() - parseInt(el.parent().css('paddingTop')) - parseInt(el.parent().css('paddingBottom')) + 'px');
						cSBody.css({padding:_options.contentPadding + 'px'})
						function cS_shadow(){
							var padTop = _options.contentPadding;
							var padBottom = _options.contentPadding;
							if (el[0].tagName == 'BODY') {
								$(document).scrollTop() > 0 ? el.addClass(elClass + 'Top') : el.removeClass(elClass + 'Top');
								$(document).scrollTop() + $(window).height() == cSBody.outerHeight() - 20 + padTop + padBottom ? el.removeClass(elClass +'Bottom') : el.addClass(elClass +'Bottom');
							} else {
								cSBody.scrollTop() > 0 ? el.addClass(elClass + 'Top') : el.removeClass(elClass + 'Top');
								cSBody.scrollTop() + cSBody.outerHeight() == cS.outerHeight() + padTop + padBottom ? el.removeClass(elClass +'Bottom') : el.addClass(elClass +'Bottom');
							}
						}
						cS_shadow();
						if (el[0].tagName == 'BODY') {
							$(document).scroll(function(){
								cS_shadow();
							});
						} else {
							cSBody.scroll(function(){
								cS_shadow();
							});
						}
					}
					cS_init();
					
				}

			}
		};
		
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		}

	});
	}
})(jQuery);
