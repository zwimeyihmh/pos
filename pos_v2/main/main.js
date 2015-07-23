function printReceipt(tags) {
  var items = new Pos(tags);
  var cartItems = items.getCartItems();
  var promotions = new Pos(tags);
  var promotedItems = promotions.getPromotions(cartItems);
  var receipt = new Receipt(cartItems, promotedItems);
  console.log(receipt.printed());
}

function formatPrice(price) {
  return price.toFixed(2);
}
