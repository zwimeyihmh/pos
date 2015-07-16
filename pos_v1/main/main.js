//TODO: Please write code in this file.
function printReceipt(inputs) {
  var newInput = [];
  for(var i = 0; i < inputs.length; i++) {
    match(inputs[i],newInput);
  }
  printInput(newInput);
}

function match(item,inputs)  {
  var allItems = loadAllItems();
  for(var i = 0; i < allItems.length; i++ ) {
    if(item.length > 10) {
;      if(item.substring(0,10) === allItems[i].barcode) {
        inputs.push({barcode:allItems[i].barcode,name:allItems[i].name,count:parseInt(item.substring(11),10),unit:allItems[i].unit,price:allItems[i].price});
        break;
      }
    }
      if(allItems[i].barcode === item) {
        if(inputs.length > 0 && inputs[inputs.length-1].name === allItems[i].name) {
          (inputs[inputs.length-1].count)++;
          break;
        } else {
          inputs.push({barcode:allItems[i].barcode,name:allItems[i].name,count:1,unit:allItems[i].unit,price:allItems[i].price});
          break;
        }
      }
  }
}

function printInput(inputs,promot) {
  var result = '***<没钱赚商店>收据***\n';
  var promo = '挥泪赠送商品：\n';
  var sum = 0;
  var save = 0;
  var allMoney;
  for(var i = 0; i < inputs.length; i++)
  {
    if(Promotion(inputs[i])){
      promo += '名称：' + inputs[i].name + '，数量：1' + inputs[i].unit + '\n'
      allMoney = (inputs[i].count-1)*inputs[i].price;
      save += inputs[i].price;
    }else{
      allMoney = inputs[i].count*inputs[i].price;
    }
    sum += allMoney;
    result += '名称：' + inputs[i].name + '，数量：' + inputs[i].count + inputs[i].unit + '，单价：'+ inputs[i].price + '(元)，小计：' +   allMoney+'(元)\n';
  }
  promo += '----------------------\n总计：' + sum + '(元)\n' + '节省：' + save + '(元)\n';
  result += '----------------------\n' + promo + '\n**********************'
  console.log(result);
}

function Promotion(input) {
  var promote = loadPromotions();
  for(var i = 0; i < promote[0].barcodes.length; i++) {
    if(input.barcode === promote[0].barcodes[i]){
      return 1;
    }
  }
  return 0;
}

