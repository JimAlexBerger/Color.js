var canvas2 = document.getElementById('p');
var ctx2 = canvas2.getContext('2d');

var myImageData = ctx2.createImageData(canvas2.width, canvas2.height);
var data = myImageData.data;

var tempColor = new Color();
for (var i = 0; i < data.length/10; i += 4) {
    var width = (i / 4) % 360;
    var height = Math.floor((i / 4) / 360);
    tempColor = tempColor.fromHSV(width, 100, height);
    data[i] = tempColor.r; // red
    data[i + 1] = tempColor.g; // green
    data[i + 2] = tempColor.b; // blue
    data[i + 3] = 255; // blue
}
ctx2.putImageData(myImageData, 0, 0);


var canvas = document.getElementById('o');
var ctx = canvas.getContext('2d');

var color = new Color();

var degree = 0;
animate();

function animate() {
    k.innerHTML = color.shiftColor(degree).name();

    //Tegn firkant med farge
    ctx.fillStyle = color.shiftColor(degree);
    ctx.fillRect(0, 0, 200, 200);
    //Tegn 50% lys

    ctx.fillStyle = color.shiftColor(degree).setLightness(50);
    ctx.fillRect(200, 200, 200, 200);

    //Tegn mørkere
    ctx.fillStyle = color.shiftColor(degree).shiftLightness(-25);
    ctx.fillRect(200, 0, 200, 200);

    //Tegn lysere
    ctx.fillStyle = color.shiftColor(degree).shiftLightness(25);
    ctx.fillRect(0, 200, 200, 200);

    //Tegn komplimenter firkant
    ctx.fillStyle = color.shiftColor(degree).complimentary();
    ctx.fillRect(100, 100, 200, 200);

    degree++;
    if (degree > 360) {
        degree = 0;
    }

    window.requestAnimationFrame(animate);
}
