define([
  "core/js/views/menuItemView",
],
  function (MenuItemView) {

    var CoverMenuItemView = MenuItemView.extend({

      events: {
        "click .js-btn-click": "onClickMenuItemButton"
      },

      onClickMenuItemButton: function () {
        if (event && event.preventDefault) event.preventDefault();
        if (this.model.get('_isLocked')) return;
        Backbone.history.navigate('#/id/' + this.model.get('_id'), { trigger: true });
      },

      postRender: function () {
        this.$el.imageready(this.setReadyStatus.bind(this));
        this.setBackgroundImage();
      },

      setBackgroundImage: function () {
        var graphic = this.model.get("_graphic");
        var src = graphic && graphic.src;

        if (src) this.$el.css("background-image", "url(" + src + ")");
      }

    }, {
      template: "coverMenuItem",
      className: "covermenu-item"
    });

    return CoverMenuItemView;

  });