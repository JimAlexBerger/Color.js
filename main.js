var canvas = document.getElementById('o');
var ctx = canvas.getContext('2d');

var color = new Color(12,123,43);
ctx.fillStyle = color;
ctx.fillRect(0, 0, 100, 100);
ctx.fillStyle = color.complimentary();
ctx.fillRect(100, 100, 100, 100);

console.log(color)
console.log(color.complimentary());
