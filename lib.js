//Testing Numbers

module.exports.absoulte = function (number) {
  return number >= 0 ? number : -number;
};

//Testing Strings

module.exports.greet = function (name) {
  return "Welcone " + name;
};

//Testing Arrays
module.exports.getCurrencies = function () {
  return ["USD", "AUD", "EUR"];
};

//Testing Objects
module.exports.getProduct = function (productId) {
  return { id: productId, price: 10 };
};

//Testing Exceptions
module.exports.registerUser = function (username) {
  if (!username) throw new Error("Username is required.");

  return { id: new Date().getTime(), username: username };
};
