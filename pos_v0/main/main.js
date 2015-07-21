//TODO: Please write code in this file.
function printReceipt(inputs) {
  var receipt = '***<没钱赚商店>收据***\n'
    + getItemsString(inputs) + '----------------------\n总计：'
    + formatPrice(getAmount(inputs)) +
    '(元)\n**********************';
  console.log(receipt);
}

function getItemsString(items) {
  var itemsString = '';
  items.forEach(function (item) {
    itemsString += '名称：'
      + item.name + '，数量：'
      + item.count + item.unit +
      '，单价：' + formatPrice(item.price) +
      '(元)，小计：' + formatPrice(getSubTotal(item.count, item.price)) + '(元)\n';
  })
  return itemsString;
}

function getAmount(items) {
  var amount = 0;
  items.forEach(function (item) {
    amount += getSubTotal(item.count, item.price);
  });
  return amount;
}
function getSubTotal(count, price) {
  return count * price;
}

function formatPrice(price) {
  return price.toFixed(2);
}

