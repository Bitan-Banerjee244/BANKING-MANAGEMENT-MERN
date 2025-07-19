export const generateAccountNumber = () => {
    const prefix = 'AC';
    const timestamp = Date.now();
    const random = Math.floor(100 + Math.random() * 900);
    return `${prefix}${timestamp}${random}`;
}
