const db = require("./db")

// testing number
module.exports.absolute = function (number) {
    return number >= 0 ? number : -number;

}

// testing strings
module.exports.greet = function (name) {
    return "Welcome " + name;
}

// testing arrays 
module.exports.getCurrencies = function () {
    return ['USD', "AUD", 'EUR'];
}

module.exports.getProduct = function (productId) {
    return { id: productId, price: 10, desc: "great" };
}

module.exports.registerUser = function (username) {
    if (!username) throw new Error("Username is required.");
    return { id: new Date().getTime(), username: username };
}

// mock function 
module.exports.applyDiscount = function (order) {
    const customer = db.getCustomerSync(order.customerId);

    if (customer.points > 10)
        order.totalPrice *= 0.9;
}
