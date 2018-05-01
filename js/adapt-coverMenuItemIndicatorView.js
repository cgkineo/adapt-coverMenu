define([
    "./adapt-coverMenuItemView",
    "core/js/adapt"
], function(CoverMenuItemView, Adapt) {

    var CoverMenuItemIndicatorView = CoverMenuItemView.extend({

        attributes: function() {
            var models = this.model.getParent().getAvailableChildModels();

            return _.extend(CoverMenuItemView.prototype.attributes.call(this), {
                "data-item-index": models.indexOf(this.model)
            });
        },

        className: function() {
            var classes = CoverMenuItemView.prototype.className.call(this);

            return classes += " cover-menu-item-indicator";
        },

        events: {
            "click .cover-menu-item-indicator-button": "onClick"
        },

        postRender: function() {},

        onClick: function() {
            var index = this.$el.data("item-index");

            Adapt.trigger("coverMenu:setItem", this.model.get("_id"), index);
        }

    }, { template: "coverMenuItemIndicator" });

    return CoverMenuItemIndicatorView;

});
