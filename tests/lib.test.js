const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");

describe("absolute  ", () => {
  it("should return a positive number if input is positive", () => {
    const result = lib.absoulte(1);
    expect(result).toBe(1);
  });
  it("should return a positive number if input is negative", () => {
    const result = lib.absoulte(-1);
    expect(result).toBe(1);
  });
  it("should return a 0 if input is 0", () => {
    const result = lib.absoulte(0);
    expect(result).toBe(0);
  });
});

describe("greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Shital");
    expect(result).toMatch(/Shital/);
    expect(result).toContain("Shital");
  });
});

//Testing Arrays

describe("getCurrencies", () => {
  it("should return supported currencies", () => {
    const result = lib.getCurrencies();

    //Too general
    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    //Too specific
    expect(result[0]).toBe("USD");
    expect(result[1]).toBe("AUD");

    //Proper way
    expect(result).toContain("USD");
    expect(result).toContain("AUD");
    expect(result).toContain("EUR");

    //Ideal way
    expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));
  });
});

//Testing Objects
describe("getProduct", () => {
  it("should return the product with the given id", () => {
    const result = lib.getProduct(1);
    expect(result).toEqual({ id: 1, price: 10 });
    expect(result).toMatchObject({ id: 1, price: 10 });
  });
});

//Testing Exceptions
describe("registerUser", () => {
  it("should throw error if username is falsy", () => {
    //Null
    //undefined
    //NaN
    //""
    //0
    //false
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });

  it("should return a user object if valid username is passed", () => {
    const result = lib.registerUser("Shital");
    expect(result).toMatchObject({ username: "Shital" });
    expect(result.id).toBeGreaterThan(0);
  });
});
//Note: When testing exceptions, we need to wrap in fat arrow functions

//Mock fucntions

describe("applyDiscount", () => {
  it("should apply 10% discount if customer has more than 10 points", () => {
    //creating a FAKE or Mock function
    db.getCustomerSync = function (customerId) {
      console.log("Fake reading customer...");
      return { id: customerId, points: 20 };
    };

    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe("notifyCustomer", () => {
  it("should send an email to the customer", () => {
    jest.mockFunction = jest.fn();

    // mockFunction.mockReturnValue(1)
    // mockFunction.mockResolvedValue(1)
    // mockFunction.mockRejectedValue(new Error("some messages here.."))
    // const result = await mockFunction()

    db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });
    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });

    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe("a");
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    
  });
});
