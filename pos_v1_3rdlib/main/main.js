function printReceipt(inputs) {
  var newInput = [];
  var allItems = loadAllItems();
  var newInputs = [];
    _.map(inputs,function(input){
      match(input,newInputs);
      });
  console.log(newInputs);
//  printInput(newInputs);
}
function match(input,newInputs){
  input.length > 10 ?
   inputsOfSpecil(input,newInputs) :
    inputsOfOthers(input,newInputs);
}

function inputsOfSpecil(input,newInputs) {
  var allItems = loadAllItems();
  newInputs.push(_.find(allItems,function(allItem) {
    return allItem.barcode === input.substring(0,10);
  }),{count:input.substring(11)});

}

function inputsOfOthers(input,newInputs) {
  var allItems = loadAllItems();
  (newInputs.length) && (input === newInputs[newInputs.length-1][0]).barcode ?
    (newInputs[newInputs.length-1][1].count)++ :
  newInputs.push(_.find(allItems,function(allItem) {
    return allItem.barcode === input;
  }),{count:1});
}
function printInput(inputs,promot) {
  var result = '***<没钱赚商店>收据***\n';
  var promo = '挥泪赠送商品：\n';
  var sum = 0;
  var save = 0;
  var allMoney;
  for(var i = 0; i < inputs.length; i++)
  {
    if(Promotion(inputs[i])) {
      promo += '名称：' + inputs[i].name + '，数量：1' + inputs[i].unit + '\n'
      allMoney = (inputs[i].count-1)*inputs[i].price;
      save = _.add(save,inputs[i].price);
    } else {
      allMoney = inputs[i].count * inputs[i].price;
    }
    sum += allMoney;
    result += '名称：' + inputs[i].name + '，数量：' + inputs[i].count + inputs[i].unit + '，单价：'+ inputs[i].price.toFixed(2) + '(元)，小计：' + allMoney.toFixed(2) +'(元)\n';
  }
  promo += _.repeat('-',22) + '\n总计：' + sum.toFixed(2) + '(元)\n' + '节省：' + save.toFixed(2) + '(元)\n';
  result += _.repeat('-',22) + '\n' + promo + _.repeat('*',22);
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
