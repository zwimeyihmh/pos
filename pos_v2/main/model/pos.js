function Pos(tags) {
  this.tags = tags;
}

Pos.prototype.getCartItems = function () {
  var cartItems = [];
  for (var i = 0; i < this.tags.length; i++) {
    var count = 1;
    var tag = this.tags[i];
    var ifExist = this.tags[i].indexOf('-');
    if (ifExist !== -1) {
      var arrayTag = this.tags[i].split('-');
      count = parseInt(arrayTag[1]);
      tag = arrayTag[0];
    }
    this.getItem(tag, count, cartItems);
  }
  return cartItems;
};

Pos.prototype.getItem = function (barcode, count, cartItems) {
  var cartItem = this.findFromCartItem(barcode, cartItems);
  if (cartItem) {
    (cartItem.count) += count;
  } else {
    var item = this.findFromAllItems(barcode);
    if (item) {
      cartItems.push(new CartItem(item.barcode, item.name, item.unit, item.price, count, 0));
    }
  }
};

Pos.prototype.findFromCartItem = function (barcode, cartItems) {
  var item;
  cartItems.forEach(function (cartItem) {
    if (barcode === cartItem.barcode) {
      item = cartItem;
    }
  });
  return item;
};

Pos.prototype.findFromAllItems = function (barcode) {
  var allItems = loadAllItems();
  var cartItem;
  allItems.forEach(function (allItem) {
    if (barcode === allItem.barcode) {
      cartItem = allItem;
    }
  });
  return cartItem;
}


Pos.prototype.getPromotions = function (cartItems) {
  var promotion;
  var promotions = [];
  for (var i = 0; i < cartItems.length; i++) {
    promotion = this.promoteItems(cartItems[i]);
    if (promotion) {

      cartItems[i].givenCount = promotion.count;
      promotions.push(promotion);
    }
  }
  return promotions;
};

Pos.prototype.promoteItems = function (item) {
  var promotionsLoad = loadPromotions();
  var promotionsBarcode = promotionsLoad[0].barcodes;
  var promotion;
  promotionsBarcode.forEach(function (promotionBarcode) {
    if (item.barcode === promotionBarcode) {
      promotion = new PromotedItem(item.barcode, item.name, item.price, Math.floor(item.count / 3), item.unit);
    }
  });
  return promotion;
};
