function Receipt(cartItems, promotions) {
  this.cartItems = cartItems;
  this.promotions = promotions;
}
Receipt.prototype.printed = function(){
  var nowData = new GetData();
  return ('***<没钱赚商店>收据***\n'
  +'打印时间：' + nowData.get() + '\n'
  + '----------------------\n'
  + this.getItemsString()
  + '----------------------\n'
  + '挥泪赠送商品：\n'
  + this.getPromotionsString()
  + '----------------------\n'
  + '总计：' + formatPrice(this.cartItemsPrice()) + '(元)\n'
  + '节省：' + formatPrice(this.getPromotedAmount()) + '(元)\n**********************');
};

Receipt.prototype.getAmount = function(){
  var amount = 0;
  this.cartItems.forEach(function (cartItem) {
    amount += cartItem.subTotal();
  });
  return amount;
};

Receipt.prototype.getPromotedAmount = function(){
  var amount = 0;
  this.promotions.forEach(function (promotion) {
    amount += promotion.subTotal();
  });
  return amount;
};

Receipt.prototype.cartItemsPrice = function cartItemsPrice() {
    return (this.getAmount() - this.getPromotedAmount());
};

Receipt.prototype.getItemsString = function() {
  var itemsString = '';
  this.cartItems.forEach(function (cartItem) {
    itemsString += cartItem.getString();
  });
  return itemsString;
};

Receipt.prototype. getPromotionsString = function() {
  var promotionsSting = '';
  this.promotions.forEach(function (promotion) {
    promotionsSting += promotion.getString();
  });
  return promotionsSting;
};
