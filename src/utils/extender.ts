Math.toByte = degrees => {
    let b = Math.floor((degrees % 360) * 256 / 360)
    if (b < -128) b += 256
    else if (b > 127) b -= 256
    return b;
};

Math.limit = (value: number, min = 0, max = 128) => Math.min(Math.max(value, min), max);