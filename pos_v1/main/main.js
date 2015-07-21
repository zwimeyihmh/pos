function printReceipt(inputs) {
  var items = getCartItems(inputs);
  var promotions = getPromotions(items);
  var receipt = '';
  receipt = '***<没钱赚商店>收据***\n'
    + getItemsString(items)
    + '----------------------\n'
    +'挥泪赠送商品：\n'
    + getPromotionsString(promotions)
    + '----------------------\n'
    + '总计：' + formatPrice(promotionsPrice(items,promotions)) +'(元)\n'
    +'节省：' + formatPrice(getAmount(promotions)) + '(元)\n**********************';
  console.log(receipt);
}
function getCartItems(items) {
  var cartItems = [];
  items.forEach(function (item) {
    var count = 1;
    if (item.length > 10) {
      count = parseInt(item.substring(11), 10);
      item = item.substring(0, 10);
    }
   getItems(item,count,cartItems);
  });
  return cartItems;
}
function getItems(item,count,cartItems){
  var cartItem = findCartItems(item, cartItems);
  if (cartItem) {
    (cartItem.count) += count;
  } else {
    var allItem = findAllItems(item);
    if (allItem) {
      cartItems.push({item: allItem, count: count}) ;
    }
  }
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
function findAllItems(barcodes) {
  var allItems = loadAllItems();
  var cartItem;
  allItems.forEach(function (allItem) {
    if (barcodes === allItem.barcode) {
      cartItem = allItem;
    }
  });
  return cartItem;
}

function getPromotions(items){
  var promotion ;
  var promotions = [];
  items.forEach(function(item){
    promotion = promoteItems(item.item);
     if(promotion){
     promotions.push({item:promotion,count:1});
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
    if(promoteItems(cartItem)){
      subTotal = getSubTotal((item.count - 1),cartItem.price);
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
  promotions.forEach(function(promotion){
    var item = promotion.item;
    promotionsSting += '名称：' + item.name
      +'，数量：1' + item.unit + '\n';
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

function promotionsPrice(items,promotions){
  return getAmount(items) - getAmount(promotions);
}

function formatPrice(price) {
  return price.toFixed(2);
}


