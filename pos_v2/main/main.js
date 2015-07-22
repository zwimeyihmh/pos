function printReceipt(tags) {
  var items = getCartItems(tags);
  var promotions = getPromotions(items);
  //var receipt = '';
  var nowData =new GetData();
  var receipt = new Receipt(items,promotions);
  /*
  receipt = '***<没钱赚商店>收据***\n'
  + '打印时间：' + nowData.get() + '\n'
  + '----------------------\n'
  + getItemsString(items)
  + '----------------------\n'
  + '挥泪赠送商品：\n'
  + getPromotionsString(promotions)
  + '----------------------\n'
  + '总计：' + formatPrice(cartItemsPrice(items, promotions)) + '(元)\n'
  + '节省：' + formatPrice(getAmount(promotions)) + '(元)\n**********************';
  */
  console.log(receipt.print());

}

function getCartItems(tags) {
  var cartItems = [];
  tags.forEach(function (tag) {
    var count = 1;
    var ifExist = tag.indexOf('-');
    if (ifExist !== -1) {
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
      cartItems.push(new CartItem(item.barcode,item.name,item.unit,item.price,count,0));
    }
  }
}

function findFromCartItem(barcode, cartItems) {
  var item;
  cartItems.forEach(function (cartItem) {
    if (barcode === cartItem.barcode) {
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
  cartItems.forEach(function (cartItem) {
    promotion = promoteItems(cartItem);
    if (promotion) {
      cartItem.givenCount = promotion.count;
      promotions.push(promotion);
    }
  });
  return promotions;
}
function promoteItems(item) {
  var promotionsLoad = loadPromotions();
  var promotionsBarcode = promotionsLoad[0].barcodes;
  var promotion;
  promotionsBarcode.forEach(function (promotionBarcode) {
    if (item.barcode === promotionBarcode) {
      promotion = new PromotedItem(item.barcode,item.name,item.price,Math.floor(item.count/3),item.unit);
    }
  });
  return promotion;
}

function getItemsString(cartItems) {
  var itemsString = '';
  cartItems.forEach(function (cartItem) {
    itemsString += cartItem.getString();
  });
  return itemsString;
}

function getPromotionsString(promotions) {
  var promotionsSting = '';
  promotions.forEach(function (promotion) {
    promotionsSting += promotion.getString();
  });
  return promotionsSting;
}


function getAmount(items) {
  var amount = 0;
  items.forEach(function (item) {
    amount += item.subTotal();
  });
  return amount;
}



function cartItemsPrice(items, promotions) {
  return getAmount(items) - getAmount(promotions);
}

function formatPrice(price) {
  return price.toFixed(2);
}
