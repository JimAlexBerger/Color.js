function Color(r, g, b) {
    if(r && g && b){
        this.r = r;
        this.g = g;
        this.b = b;
    }
    else{
        this.r = Math.round(Math.random()*255);
        this.g = Math.round(Math.random()*255);
        this.b = Math.round(Math.random()*255);
    }

    this.toString = function() {
        var ret = "#" + toHex(this.r) + toHex(this.g) + toHex(this.b);
        return ret;

        function toHex(num){
            let hex = num.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }
    }

    this.toHSV = function() {
        var ret = {};

        var max = max3(this.r, this.g, this.b);
        var dif = max - min3(this.r, this.g, this.b);
        ret.saturation = (max == 0.0)
            ? 0
            : (100 * dif / max);

        if (ret.saturation == 0)
            ret.hue = 0;
        else if (this.r == max)
            ret.hue = 60.0 * (this.g - this.b) / dif;
        else if (this.g == max)
            ret.hue = 120.0 + 60.0 * (this.b - this.r) / dif;
        else if (this.b == max)
            ret.hue = 240.0 + 60.0 * (this.r - this.g) / dif;
        if (ret.hue < 0.0)
            ret.hue += 360.0;
        ret.value = Math.round(max * 100 / 255);
        ret.hue = Math.round(ret.hue);
        ret.saturation = Math.round(ret.saturation);
        return ret;

        function min3(a, b, c) {
            return (a < b)
                ? ((a < c)
                    ? a
                    : c)
                : ((b < c)
                    ? b
                    : c);
        }
        function max3(a, b, c) {
            return (a > b)
                ? ((a > c)
                    ? a
                    : c)
                : ((b > c)
                    ? b
                    : c);
        }
    }

    this.complimentary = function() {
        var shifted = this.HSVShift(this.toHSV(),180);
        return this.fromHSV(shifted.hue, shifted.saturation, shifted.value);
    }

    this.HSVShift = function(HSV, angle) {
        HSV.hue += angle;
        while (HSV.hue>=360.0) HSV.hue-=360.0;
        while (HSV.hue<0.0) HSV.hue+=360.0;
        return HSV;
    }

    this.fromHSV = function(h, s, v) {
        var ret = new Color();

        if (s == 0) {
            ret.r = ret.g = ret.b = Math.round(v * 2.55);
        } else {
            h /= 60;
            s /= 100;
            v /= 100;
            i = Math.floor(h);
            f = h - i;
            p = v * (1 - s);
            q = v * (1 - s * f);
            t = v * (1 - s * (1 - f));
            switch (i) {
                case 0:
                    ret.r = v;
                    ret.g = t;
                    ret.b = p;
                    break;
                case 1:
                    ret.r = q;
                    ret.g = v;
                    ret.b = p;
                    break;
                case 2:
                    ret.r = p;
                    ret.g = v;
                    ret.b = t;
                    break;
                case 3:
                    ret.r = p;
                    ret.g = q;
                    ret.b = v;
                    break;
                case 4:
                    ret.r = t;
                    ret.g = p;
                    ret.b = v;
                    break;
                default:
                    ret.r = v;
                    ret.g = p;
                    ret.b = q;
            }
            ret.r = Math.round(ret.r * 255);
            ret.g = Math.round(ret.g * 255);
            ret.b = Math.round(ret.b * 255);
        }
        return ret;
    }
}
