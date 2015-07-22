function PromotedItem(barcode,name,price,count,unit){
  this.barcode = barcode;
  this.name = name;
  this.price = price;
  this.count = count;
  this.unit = unit;
}
PromotedItem.prototype.subTotal = function(){
  return this.count * this.price;
};
PromotedItem.prototype.getString = function(){
  return  ('名称：' + this.name
  + '，数量：' + this.count + this.unit + '\n');
}
