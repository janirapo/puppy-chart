import chai from 'chai';

const addTwoNumbers = (x, y) => x + y;

describe('addTwoNumbers()', function () {
    it('should add two numbers', function () {

        // 1. ARRANGE
        const x = 5;
        const y = 1;
        const sum1 = x + y;

        // 2. ACT
        const sum2 = addTwoNumbers(x, y);

        // 3. ASSERT
        chai.expect(sum2).to.be.equal(sum1);

    });
});
