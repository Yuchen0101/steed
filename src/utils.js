export const toPercent = value => {
    if (typeof value !== 'number') {
        throw new Error('must be number');
    }
    return (value * 100).toFixed(2) + '%';
}

export const toPrice = value => {
    if (typeof value !== 'number') {
        throw new Error('must be number');
    }
    const str = String(value);
    const length = str.length;
    if (length > 10) {
        return (value / 1000000000).toFixed(3) + 'b';
    }
    if (length > 6) {
        return (value / 1000000).toFixed(3) + 'm';
    }
    if (length > 3) {
        return (value / 1000).toFixed(0) + 'k';
    }
    return value;
}
export const toPriceDiff = value => {
    if (typeof value !== 'number') {
        throw new Error('must be number');
    }
    const str = String(Math.abs(value));
    const length = str.length;
    if (length > 10) {
        if (value>0) {
            return '+$' + (value / 1000000000).toFixed(3) + 'b';
        }else {
            return '-$' + Math.abs(value / 1000000000).toFixed(3) + 'b'
        }
    }
    if (length > 6) {
        if (value > 0){
            return '+$' + (value / 1000000).toFixed(3) + 'm';
        }else {
            return '-$' + Math.abs(value / 1000000).toFixed(3) + 'm';
        }
    }
    if (length > 3) {
        if (value > 0){
            return '+$' + (value / 1000).toFixed(0) + 'k';
        }else {
            return '-$' + Math.abs(value / 1000).toFixed(0) + 'k';
        }
    }
    if (value > 0) {
        return '+$' + value;
    }else{
        return '-$' + Math.abs(value);
    }
}

export const toRank = value => {
    const str = String(value);
    const lastLetter = str[str.length - 1];

    switch(lastLetter) {
        case '1':
            return str + 'st';
        case '2':
            return str + 'nd';
        case '3':
            return str + 'rd';
        default:
            return str + 'th';
    }
}

export const formatNumber = value => {
    return value.toLocaleString('en-US');
}

export const numberWithCommas = value => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}