define([ "core/js/views/adaptView", "core/js/adapt" ], function(AdaptView, Adapt) {

    var CoverMenuItemView = AdaptView.extend({

        className: function() {
            var classes = "cover-menu-item";
            var modelClasses = this.model.get("_classes");

            if (modelClasses) classes += " " + modelClasses;
            if (this.isVisited()) classes += " visited";
            if (this.model.get("_isOptional")) classes += " optional";
            if (this.model.get("_isComplete")) classes += " completed";
            if (this.model.get("_isLocked")) classes += " locked";

            return classes;
        },

        events: {
            "click .cover-menu-item-button": "onClick"
        },

        preRender: function() {
            this.listenTo(Adapt, "device:resize", this.onDeviceResize);
        },

        postRender: function() {
            this.setUpLayout();
            this.setBackgroundImage();
            this.$el.imageready(_.bind(this.setReadyStatus, this));
        },

        onDeviceResize: function() {
            this.setUpLayout();
        },

        onClick: function() {
            if (!this.model.get("_isLocked")) {
                Adapt.navigateToElement(this.model.get("_id"));
            }
        },

        setUpLayout: function() {
            var width = "";
            var height = "";

            if (Adapt.device.screenSize === "large") {
                width = $("#wrapper").width() + "px";
                height = $(window).height() - $(".navigation").height() + "px";
            }

            this.$el.css({ width: width, height: height });
        },

        setBackgroundImage: function() {
            var src = this.model.get("_graphic").src;

            if (src) this.$el.css("background-image", "url(" + src + ")");
        },

        isVisited: function() {
            if (this.model.get("_isVisited")) return true;

            var components = this.model.findDescendantModels("components");

            return _.find(components, function(component) {
                return component.get("_isComplete") && component.get("_isAvailable") &&
                    !component.get("_isOptional");
            });
        }

    }, { template: "coverMenuItem", type: "menu" });

    return CoverMenuItemView;

});
