//TODO: Please write code in this file.
function printReceipt(inputs){
  var newInput = [];
  for(var i = 0; i < inputs.length; i++){
    match(inputs[i],newInput);
  }
  console.log(newInput);
  printInput(newInput);

}
function match(item,inputs){
  var allItems = loadAllItems();
  for(var x = 0; x < allItems.length; x++){
    if(allItems[x].barcode === item) {
      if(inputs.length > 0 && inputs[inputs.length-1].name === allItems[x].name){
        (inputs[inputs.length-1].count)++;
        break;
      }
      // if(NotInputs(allItems[x].name,inputs)){
      else{
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
    result += '名称：' + inputs[i].name + '，数量：' + inputs[i].count + inputs[i].unit + '，单价：'+ inputs[i].price + '.00(元)，小计：' +   allMoney+'.00(元)\n';
  }
  result += '----------------------\n总计：' + sum + '.00(元)\n**********************'
  console.log(result);
}




/*
function printReceipt(inputs) {
  var newInputs = [];
  for(var i = 0; i < inputs.length; i++){
    matchId(inputs[i],newInputs);
  }


  printInputs(newInputs);
  //PrintInputs(newInputs);
}
function matchId(input,inputs)
{
  var allItems = loadAllItems();
  for(var i = 0; i < allItems.length; i++){
    if(input === allItems[i].barcode){
      inputs.push(allItems[i]);
      break;
    }
  }
}


function printInputs(inputs) {
  var result = '***<没钱赚商店>收据***\n';
  var sum = 0;
  for(var i = 0; i < inputs.length; i = i+count)
  {
    var count = SameName(i,inputs);
    var allMoney = count * inputs[i].price;
    sum += allMoney;
    result += '名称：' + inputs[i].name + '，数量：' + count + inputs[i].unit + '，单价：'+ inputs[i].price + '.00(元)，小计：' +   allMoney+'.00(元)\n';
  }
  result += '----------------------\n总计：' + sum + '.00(元)\n**********************'
  console.log(result);
}
function SameName(i,inputs){
  var count = 1;
  for(var x = i+1; x < inputs.length; x++)
  {
    if(inputs[i].name === inputs[x].name)
    {
      count++;
    }
  }
  return count;
}
*/

