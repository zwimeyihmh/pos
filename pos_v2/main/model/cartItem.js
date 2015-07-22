function CartItem(barcode, name, unit, price,count) {
  this.barcode = barcode;
  this.name = name;
  this.unit = unit;
  this.price = price || 0.00;
  this.count = count;
}
CartItem.prototype.subTotal = function(){
  return this.price * this.count;
}
