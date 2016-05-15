var changeColor = function (imageTag, imageSrc, modifiers) {

    getDataUriRecolored(imageSrc, modifiers, function (dataUri) {
        imageTag.src = dataUri;

        imageTag.style.visibility = "";
    });
};

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   {number}  r       The red color value
 * @param   {number}  g       The green color value
 * @param   {number}  b       The blue color value
 * @return  {Array}           The HSL representation
 */
var rgbToHsl = function (r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
        case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
        case g:
            h = (b - r) / d + 2;
            break;
        case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
    }

    return [h, s, l];
};

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
var hslToRgb = function (h, s, l) {
    var r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);

    return [r, g, b];
};

//https://davidwalsh.name/convert-image-data-uri-javascript
function getDataUriRecolored(url, modifiers, callback) {
    var image = new Image();

    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

        var context = canvas.getContext('2d');
        context.drawImage(this, 0, 0);

        var imageMap = context.getImageData(0, 0, this.naturalWidth, this.naturalHeight);
        var imageData = imageMap.data;

        var p, r, g, b, hsl, h, s, l, mod, m, rgb;
        for (p = 0; p < imageData.length; p += 4) {
            r = imageData[p];
            g = imageData[p + 1];
            b = imageData[p + 2];
            //a = imageData[p + 2];

            hsl = rgbToHsl(r, g, b);

            h = hsl[0];
            s = hsl[1];
            l = hsl[2];

            //alter the hue of only the right pixels
            for (m = 0; m < modifiers.length; m++) {
                mod = modifiers[m];
                if (h >= mod.low && h <= mod.high) {
                    h = (h - mod.low + mod.add) % 1;
                    //only apply one mod per pixel
                    break;
                }
            }

            rgb = hslToRgb(h, s, l);

            imageData[p] = rgb[0];
            imageData[p + 1] = rgb[1];
            imageData[p + 2] = rgb[2];
        }
        context.putImageData(imageMap, 0, 0);

        callback(canvas.toDataURL('image/png'));
    };

    image.src = url;
}