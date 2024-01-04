const lib = require("../lib")
const db = require("../db")

describe("absolute", () => {

    it("absolute - should return a positie number if input is positive", () => {
        const result = lib.absolute(1)
        expect(result).toBe(1);
    });

    it("absolute - should return a positie number if input is negative", () => {
        const result = lib.absolute(-1)
        expect(result).toBe(1);
    })

    it("absolute - should return 0  if input is 0", () => {
        const result = lib.absolute(0)
        expect(result).toBe(0);
    })


})

describe("greet", () => {
    it("should return the greeting message", () => {
        const result = lib.greet("ravi");
        expect(result).toMatch(/ravi/);
        expect(result).toContain("ravi")
    })
});

describe("getCurrencies", () => {
    it("should return supported currencies", () => {
        const result = lib.getCurrencies();

        // Too general 
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        // Too specific 
        expect(result[0]).toBe("USD");
        expect(result[1]).toBe("AUD");
        expect(result[2]).toBe("EUR");
        expect(result.length).toBe(3);

        // Ideal
        expect(result).toEqual(expect.arrayContaining(['USD', "AUD", 'EUR']))
    })
})

describe("getProducts", () => {
    it("should return teh product with the given id", () => {
        const result = lib.getProduct(1);
        // expect(result).toEqual({ id: 1, price: 10 })

        expect(result).toMatchObject({ id: 1, price: 10 })
        expect(result).toHaveProperty("id", 1)
    })
})

// handling exception
describe("registerUser", () => {
    it("should throw if username is falsy", () => {
        const args = [null, undefined, NaN, '', 0, false]
        args.forEach(a => {
            expect(() => { lib.registerUser(a) }).toThrow();
        })
    });

    it("shold return a userObjectif valid username is passed", () => {
        const result = lib.registerUser("ravi");
        expect(result).toMatchObject({ username: "ravi" })
        expect(result.id).toBeGreaterThan(0)
    })
});

describe("applyDiscount", () => {
    it("should apply 10% discount if customer has more than 10 points", () => {
        db.getCustomerSync = function (customerId) {
            console.log("fake Reading...")
            return { id: customerId, points: 20 }
        }
        const order = { customerId: 1, totalPrice: 10 }
        lib.applyDiscount(order)
        expect(order.totalPrice).toBe(9);
    })
})
