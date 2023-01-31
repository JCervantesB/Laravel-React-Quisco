export const formatearDinero = cantidad => {
    return cantidad.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }); // 1,000.00
}