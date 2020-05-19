define([
  "core/js/views/menuView",
  "core/js/adapt",
  "./adapt-coverMenuItemView",
  "./adapt-coverMenuItemIndicatorView"
], function (MenuView, Adapt, CoverMenuItemView, CoverMenuItemIndicatorView) {

  var CoverMenuView = MenuView.extend({

    attributes: function () {
      return _.extend(MenuView.prototype.attributes.call(this), {
        "data-item-count": this.model.getAvailableChildModels().length
      });
    },

    events: {
      "click .covermenu-item__control": "onControlClick"
    },

    postRender: function () {
      var item = this.getNextIncompleteItem();

      this.listenTo(Adapt, {
        "coverMenu:setItem": this.setItem,
        "menuView:ready": this.onReady
      });

      this.setUpItems();
      this.setItem(item.id, item.index);
    },

    setItem: function (id, index) {
      this.model.set("_coverId", id);
      Adapt.offlineStorage.set("coverId", id);
      this.$el.attr("data-item-index", index);
    },

    onReady: function () {
      if (Adapt.device.screenSize !== "large") this.scroll();
      this.$(".covermenu-item__container").removeClass("no-transition");
    },

    onControlClick: function (event) {
      var index = $(event.currentTarget).hasClass("covermenu-item__control__back") ?
        parseInt(this.$el.attr("data-item-index"), 10) - 1 :
        parseInt(this.$el.attr("data-item-index"), 10) + 1;

      var models = this.model.getAvailableChildModels();

      if (index > -1 && index < models.length) {
        this.setItem(models[index].get("_id"), index);
      }
    },

    setUpItems: function () {
      var items = this.model.getAvailableChildModels();
      var $items = this.$(".covermenu-item__container");
      var $indicators = this.$(".covermenu-item__indicator__container");

      for (var i = 0, j = items.length; i < j; i++) {
        var options = { model: items[i] };

        $items.append(new CoverMenuItemView(options).$el);
        $indicators.append(new CoverMenuItemIndicatorView(options).$el);
      }
    },

    getNextIncompleteItem: function () {
      var models = this.model.getAvailableChildModels();
      var id = this.model.get("_coverId") || Adapt.offlineStorage.get("coverId");

      var index = _.findIndex(models, function (model) {
        return model.get("_id") === id;
      });

      if (index === -1) index = 0;

      for (var i = index, j = models.length; i < j; i++) {
        var model = models[i];

        if (!model.get("_isComplete")) return { id: model.get("_id"), index: i };
      }

      return { id: id, index: index };
    },

    scroll: function () {
      var $item = this.$(".covermenu-item")
        .filter("[data-adapt-id='" + this.model.get("_coverId") + "']");

      Adapt.scrollTo($item);
    },

  }, {
    template: "coverMenu",
    className: 'covermenu'
  });

  Adapt.on("router:menu", function (model) {
    $("#wrapper").append(new CoverMenuView({ model: model }).$el);
  });

});
