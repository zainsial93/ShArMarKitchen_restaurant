export const formatCurrency = (amount) => {
    // Assuming amount is in Rupees (PKR)
    const pkr = Number(amount);
    if (isNaN(pkr)) return amount;

    // Exchange rate: 1 USD = 278 PKR (Approx)
    const usd = (pkr / 278).toFixed(2);

    // Format: $0.54 / Rs 150
    return `$${usd} / Rs ${pkr}`;
};
