/* eslint-disable max-len */
const { contract } = require('@openzeppelin/test-environment');

const { BN, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

const InsecCalculator = contract.fromArtifact('InsecCalculator');
const SecCalculator = contract.fromArtifact('SecCalculator');

describe('Overflow / Underflow', function () {
  context('Insecured InsecCalculator', function () {
    before(async function () {
      this.insecCalculator = await InsecCalculator.new();
    });

    it('overflows: 10 + 115792089237316195423570985008687907853269984665640564039457584007913129639935 == 9', async function () {
      expect(
        await this.insecCalculator.add(
          new BN(10),
          new BN('115792089237316195423570985008687907853269984665640564039457584007913129639935')
        )
      ).to.be.a.bignumber.equal(new BN(9));
    });

    it('underflows: 1337 - 313373 == 115792089237316195423570985008687907853269984665640564039457584007913129327900', async function () {
      expect(await this.insecCalculator.sub(new BN(1337), new BN(313373))).to.be.a.bignumber.equal(
        new BN('115792089237316195423570985008687907853269984665640564039457584007913129327900')
      );
    });
  });

  context('Secured SecCalculator with SafeMath.sol', async function () {
    before(async function () {
      this.secCalculator = await SecCalculator.new();
    });

    it('reverts on overflow: 10 + 115792089237316195423570985008687907853269984665640564039457584007913129639935 => reverts', async function () {
      await expectRevert(
        this.secCalculator.add(
          new BN(10),
          new BN('115792089237316195423570985008687907853269984665640564039457584007913129639935')
        ),
        'SafeMath: addition overflow'
      );
    });

    it('reverts on underflow: 1337 - 313373 => reverts', async function () {
      await expectRevert(this.secCalculator.sub(new BN(1337), new BN(313373)), 'SafeMath: subtraction overflow');
    });
  });
});
