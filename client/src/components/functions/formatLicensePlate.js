const formatLicensePlate = (value) => {
    value = value.replace(/\s+/g, '').toUpperCase();

    if (value.length > 3) {
        value = value.slice(0, 3) + ' ' + value.slice(3);
    }

    if (value.length > 8) {
        value = value.slice(0, 8);
    }

    return value;
}

export default formatLicensePlate;