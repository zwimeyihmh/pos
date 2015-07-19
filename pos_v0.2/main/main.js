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
  for(var x = 0; x < allItems.length; x++) {
    if(allItems[x].barcode === item) {
      if(inputs.length > 0 && inputs[inputs.length-1].name === allItems[x].name) {
        (inputs[inputs.length-1].count)++;
        break;
      } else {
        inputs.push({name:allItems[x].name,count:1,unit:allItems[x].unit,price:allItems[x].price});
        break;
      }
    }
  }
}
/*
 function NotInputs(element,inputs){
 for(var i = 0; i < inputs.length; i++){
 if(inputs[i].name === element){
 (inputs[i].count)++;
 return 0;
 }
 }
 return 1;
 }*/
function printInput(inputs) {
  var result = '***<没钱赚商店>收据***\n';
  var sum = 0;
  for(var i = 0; i < inputs.length; i++)
  {
    var allMoney = inputs[i].count*inputs[i].price;
    sum += allMoney;
    result += '名称：' + inputs[i].name + '，数量：' + inputs[i].count + inputs[i].unit + '，单价：'+ inputs[i].price.toFixed(2) + '(元)，小计：' +   allMoney.toFixed(2)+'(元)\n';
  }
  result += '----------------------\n总计：' + sum.toFixed(2) + '(元)\n**********************'
  console.log(result);
}
