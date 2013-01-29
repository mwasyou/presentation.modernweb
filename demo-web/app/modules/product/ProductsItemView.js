define([
    "backbone",
    "underscore",
    "modules/cart/Cart",
    "text!modules/product/ProductsItemView.html"
], function (Backbone, _, Cart, productsItemTemplate) {
    "use strict";

    var ProductsItemView = Backbone.View.extend({

        tagName : "li",

        events : {
            "click button" : "addToCart",
            "click" : "showProduct"
        },

        initialize : function () {
            this.template = _.template(productsItemTemplate);
            this.render();
            this.listenTo(this.model, "change", this.render);
        },

        render : function () {
            this.$el.empty();
            this.$el.html(this.template(this.model.toJSON()));
        },

        addToCart : function (e) {
            Cart.globalCart.addToCart(new Cart.Model({
                product : this.model
            }));
            e.stopPropagation();
        },

         showProduct : function () {
             Backbone.history.navigate("product/" + this.model.id, true);
         }
    });

    return ProductsItemView;
});