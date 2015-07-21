function printReceipt(inputs) {
  var receipt = '';
  var items = getItems(inputs);
  receipt = '***<没钱赚商店>收据***\n'
    + getItemsString(items) + '----------------------\n总计：'
    + formatPrice(getAmount(items)) +
    '(元)\n**********************';
  console.log(receipt);

}

function getItems(items) {
  var cartItems = [];
  items.forEach(function (item) {
    var cartItem = findCartItems(item.barcode, cartItems);
    if (cartItem) {
      (cartItem.count)++;
    } else {
      cartItems.push({item: item, count: 1});
    }
  });
  return cartItems;
}

function findCartItems(barcode, cartItems) {
  var item;
  cartItems.forEach(function (cartItem) {
    if (barcode === cartItem.item.barcode) {
      item = cartItem;
    }
  });
  return item;
}

function getItemsString(items) {
  var itemsString = '';
  items.forEach(function (item) {
    var cartItem = item.item;
    itemsString += '名称：'
      + cartItem.name + '，数量：'
      + item.count + cartItem.unit +
      '，单价：' + formatPrice(cartItem.price) +
      '(元)，小计：' + formatPrice(getSubTotal(item.count, cartItem.price)) + '(元)\n';
  });
  return itemsString;
}

function getAmount(items) {
  var amount = 0;
  items.forEach(function (item) {
    amount += getSubTotal(item.count, item.item.price);
  });
  return amount;
}

function getSubTotal(count, price) {
  return count * price;
}

function formatPrice(price) {
  return price.toFixed(2);
}

