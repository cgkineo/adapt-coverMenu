define([
	"./adapt-coverMenuItemView",
	"core/js/adapt"
], function(CoverMenuItemView, Adapt) {

	var CoverMenuItemIndicatorView = CoverMenuItemView.extend({

		className: function() {
			var classes = CoverMenuItemView.prototype.className.call(this);

			return classes += " cover-menu-item-indicator";
		},

		events: {
			"click .cover-menu-item-indicator-button": "onClick"
		},

		postRender: function() {},

		onDeviceResize: function() {},

		onClick: function() {
			Adapt.trigger("coverMenu:setId", this.model.get("_id"));
		}

	}, { template: "coverMenuItemIndicator" });

	return CoverMenuItemIndicatorView;

});
