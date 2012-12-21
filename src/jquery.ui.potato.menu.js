/*!
 *	jquery.ui.potato.menu
 *
 *	Copyright (c) 2009-2012 makoto_kw, http://www.makotokw.com
 *	Licensed under the MIT license.
 *
 *	@author makoto_kw
 *	@version 1.2
 */
(function($) {
	var defaults = {
		vertical:false,
		menuItemSelector: 'li',
		menuGroupSelector: 'ul',
		rootClass:'potato-menu',
		menuItemClass:'potato-menu-item',
		menuGroupClass:'potato-menu-group',
		verticalClass:'potato-menu-vertical',
		horizontalClass:'potato-menu-horizontal',
		hasVerticalClass:'potato-menu-has-vertical',
		hasHorizontalClass:'potato-menu-has-horizontal',
		hoverClass:'potato-menu-hover',
		showDuration: 350,
		hideDuration: 100
	};
	function menu() {
		var option = (typeof(arguments[0])!='string') ? $.extend(defaults,arguments[0]) : $.extend(defaults,{});

		// Horizontal:
		// ul.potato-menu-group,potato-menu-horizontal
		//   > li.potato-menu-item,potato-menu-has-vertical
		//     > ul.potato-menu-group,potato-menu-vertical
		//       > li.potato-menu-item,potato-menu-has-horizontal
		//        > ....
		//
		// Vertical
		// ul.potato-menu-group,potato-menu-vertical
		//   > li.potato-menu-item,potato-menu-has-horizontal
		//     > ul.potato-menu-group,potato-menu-horizontal
		//       > li.potato-menu-item,potato-menu-has-vertical
		//        > ....
		var topMenuGroupClass = (option.vertical) ? option.verticalClass : option.horizontalClass,
			$menu = $(this).addClass(option.rootClass+' '+option.menuGroupClass+' '+topMenuGroupClass),
			$menuItems = $menu.find(option.menuItemSelector).addClass(option.menuItemClass),
			$menuGroups = $menu.find(option.menuGroupSelector).addClass(option.menuGroupClass);
		
		$menuItems.hover(
			function(e) {
				$(this).addClass(option.hoverClass);
			},
			function(e) {
				$(this).removeClass(option.hoverClass);
			}
		);
		$menuGroups.parent().each(function(index){
			var $parentMenuItem = $(this); // menu item that has menu group
			var displayDirection = ($parentMenuItem.parent().hasClass(option.horizontalClass)) ? 'bottom' : 'right';
			$parentMenuItem.addClass((displayDirection == 'bottom') ? option.hasVerticalClass : option.hasHorizontalClass);
			var $menuGroup = $parentMenuItem.find(option.menuGroupSelector+':first').addClass(option.verticalClass);
			$parentMenuItem.hover(
				function(e) {
					var offset = {left:'', top:''};
					if (displayDirection == 'bottom') {
						offset.left = 0;
					} else {
						offset.left = $(this).width() + 'px';
						offset.top = '0px';
					}
					$menuGroup.css(offset).fadeIn(option.showDuration);
				},
				function(e) {
					$menuGroup.fadeOut(option.hideDuration);
				}
			);
		});
		$menu.find('a[href^="#"]').click(function() {
			$menuGroups.fadeOut(option.hideDuration);
			return ($(this).attr('href') != '#');
		});
		return this;
	}
	$.fn.extend({
		ptMenu:menu
	});
})(jQuery);