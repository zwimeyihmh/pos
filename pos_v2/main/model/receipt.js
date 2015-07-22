/**
 * Created by wx on 7/22/15.
 */
function Receipt(cartItems, promotions) {
  this.cartItems = cartItems;
  this.promotions = promotions;
}
Receipt.prototype.print = function(){
  var newData = new GetData();
  return ('***<没钱赚商店>收据***\n'
  +'打印时间：' + newData.get() + '\n'
  + '----------------------\n'
  + getItemsString(this.cartItems)
  + '----------------------\n'
  + '挥泪赠送商品：\n'
  + getPromotionsString(this.promotions)
  + '----------------------\n'
  + '总计：' + formatPrice(this.cartItemsPrice()) + '(元)\n'
  + '节省：' + formatPrice(getAmount(this.promotions)) + '(元)\n**********************');
};
Receipt.prototype.getAmount = function(){
  var amount = 0;
  this.cartItems.forEach(function (cartItem) {
    amount += cartItem.subTotal();
  });
  return amount;
};
Receipt.prototype.cartItemsPrice = function cartItemsPrice() {
    return (getAmount(this.cartItems) - getAmount(this.promotions));
};
Receipt.prototype.getItemsString = function() {
  var itemsString = '';
  this.cartItems.forEach(function (cartItem) {
    itemsString += cartItem.getString();
  });
  return itemsString;
}
Receipt.prototype. getPromotionsString = function() {
  var promotionsSting = '';
  this.promotions.forEach(function (promotion) {
    promotionsSting += promotion.getString();
  });
  return promotionsSting;
}
