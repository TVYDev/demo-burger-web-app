export const checkValidity = (value, rules) => {
    let isValid = true;
    value = value.trim();

    if (rules.required) {
        isValid = value !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
}