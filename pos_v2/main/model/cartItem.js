function CartItem(barcode, name, unit, price,count,givenCount) {
  this.barcode = barcode;
  this.name = name;
  this.unit = unit;
  this.price = price || 0.00;
  this.count = count;
  this.givenCount = givenCount;

}
CartItem.prototype.subTotal = function(){
  return this.price * this.count;
}
CartItem.prototype.getString = function(){
  return ('名称：' + this.name
  + '，数量：' + this.count + this.unit + '，单价：'
  + formatPrice(this.price) + '(元)，小计：'
  + formatPrice((this.count - this.givenCount)*this.price) + '(元)\n')
}

