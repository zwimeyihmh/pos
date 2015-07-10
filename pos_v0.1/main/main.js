//TODO: Please write code in this file.
function printReceipt(inputs) {
  var result = '***<没钱赚商店>收据***\n';
  var sum = 0;
  for(var i = 0; i < inputs.length; i = i+count)
  {
    var count = SameName(i,inputs);
    var allMoney = count * inputs[i].price;
    sum += allMoney;
    result += '名称：' + inputs[i].name + '，数量：' + count + inputs[i].unit + '，单价：'+ inputs[i].price + '.00(元)，小计：' +   allMoney+'.00(元)\n';
  }
  result += '----------------------\n总计：' + sum + '.00(元)\n**********************';
  console.log(result);
}
function SameName(i,inputs){
  var count = 1;
  for(var x = i+1; x < inputs.length; x++) {
    if(inputs[i].name === inputs[x].name) {
      count++;
    }
  }
  return count;
}


/*
function printReceipt(inputs) {
  var result = '***<没钱赚商店>收据***\n';
  var temp = [];
  var sum = 0;
  combineInputs(inputs,temp);
  for(var i = 0; i < temp.length; i++)
  {
    var allMoney = temp[i].count*temp[i].value.price;
    sum += allMoney;
    result += '名称：' + temp[i].value.name + '，数量：' + temp[i].count + temp[i].value.unit + '，单价：'+ temp[i].value.price + '.00(元)，小计：' +   allMoney+'.00(元)\n';
  }
  result += '----------------------\n总计：' + sum + '.00(元)\n**********************';
  console.log(result);
}

function combineInputs(inputs,temp) {
  for(var i = 0; i < inputs.length; i++) {
    if(NotInTemp(inputs[i].name,temp)) {
      temp.push({value:inputs[i],count:1});
    }
  }
}

function NotInTemp(element,temp)
{
	for(var i = 0; i < temp.length; i++) {
		if(element === temp[i].value.name) {
				temp[i].count++;
				return 0;
 		 }
	}
return 1;
}
 */
