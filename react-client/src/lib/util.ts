export function currencyFormat(amount: number) {
    return `$${(amount/100).toFixed(2)}`;
}

export function filterEmptyValues(values:Object) {
    return Object.fromEntries(Object.entries(values).filter(
        ([, value])=> value!=='' && value!== undefined && value.length!==0));
}