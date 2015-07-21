function printReceipt(tags) {
  var items = getCartItems(tags);
  var promotions = getPromotions(items);
  var receipt = '';
  receipt = '***<没钱赚商店>收据***\n'
  + getItemsString(items)
  + '----------------------\n'
  + '挥泪赠送商品：\n'
  + getPromotionsString(promotions)
  + '----------------------\n'
  + '总计：' + formatPrice(promotionsPrice(items, promotions)) + '(元)\n'
  + '节省：' + formatPrice(getAmount(promotions)) + '(元)\n**********************';
  console.log(receipt);
}
function getCartItems(tags) {
  var cartItems = [];
  tags.forEach(function (tag) {
    var count = 1;
    if (tag.indexOf('-') != -1) {
      var arrayTag = tag.split('-');
      count = parseInt(arrayTag[1]);
      tag = arrayTag[0];
    }
    getItem(tag, count, cartItems);
  });
  return cartItems;
}
function getItem(barcode, count, cartItems) {
  var cartItem = findFromCartItem(barcode, cartItems);
  if (cartItem) {
    (cartItem.count) += count;
  } else {
    var item = findFromAllItems(barcode);
    if (item) {
      cartItems.push({item: item, count: count});
    }
  }
}

function findFromCartItem(barcode, cartItems) {
  var item;
  cartItems.forEach(function (cartItem) {
    if (barcode === cartItem.item.barcode) {
      item = cartItem;
    }
  });
  return item;
}

function findFromAllItems(barcode) {
  var allItems = loadAllItems();
  var cartItem;
  allItems.forEach(function (allItem) {
    if (barcode === allItem.barcode) {
      cartItem = allItem;
    }
  });
  return cartItem;
}

function getPromotions(cartItems) {
  var promotion;
  var promotions = [];
  cartItems.forEach(function (item) {
    promotion = promoteItems(item.item);
    if (promotion) {
      promotions.push({item: promotion, count: Math.floor(item.count/3)});
    }
  });
  return promotions;
}
function promoteItems(item) {
  var promotionsLoad = loadPromotions()[0].barcodes;
  var itemPromotion;
  promotionsLoad.forEach(function (promotion) {
    if (item.barcode === promotion) {
      itemPromotion = item;
    }
  });
  return itemPromotion;
}

function getItemsString(items) {
  var itemsString = '';
  items.forEach(function (item) {
    var cartItem = item.item;
    var subTotal = getSubTotal(item.count, cartItem.price);
    if (promoteItems(cartItem)) {
      subTotal = getSubTotal((item.count - 1), cartItem.price);
    }
    itemsString += '名称：' + cartItem.name
    + '，数量：' + item.count + cartItem.unit + '，单价：'
    + formatPrice(cartItem.price) + '(元)，小计：'
    + formatPrice(subTotal) + '(元)\n';
  });
  return itemsString;
}

function getPromotionsString(promotions) {
  var promotionsSting = '';
  promotions.forEach(function (promotion) {
    var item = promotion.item;
    promotionsSting += '名称：' + item.name
    + '，数量：1' + item.unit + '\n';
  });
  return promotionsSting;
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

function promotionsPrice(items, promotions) {
  return getAmount(items) - getAmount(promotions);
}

function formatPrice(price) {
  return price.toFixed(2);
}


