/* eslint-disable max-len */
const { contract, accounts } = require('@openzeppelin/test-environment');

const { BN, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

const InsecCalculator = contract.fromArtifact('InsecCalculator');
const SecCalculator = contract.fromArtifact('SecCalculator');
const InsecBecToken = contract.fromArtifact('InsecBecToken');
const SecBecToken = contract.fromArtifact('SecBecToken');

describe('Overflow / Underflow', function () {
  const [attacker1, attacker2, attacker3] = accounts;
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
  context('Insecured InsecBecToken', function () {
    before(async function () {
      this.insecBecToken = await InsecBecToken.new();
    });
    it(`overflow: ${attacker1} with 0 BEC tokens will send 578960446186580977117854925043439539266349.923328202820197287 BEC tokens to ${attacker2} and ${attacker3}`, async function () {
      await this.insecBecToken.batchTransfer(
        [attacker2, attacker3],
        new BN('57896044618658097711785492504343953926634992332820282019728792003956564819968'),
        { from: attacker1 }
      );
      expect(await this.insecBecToken.balanceOf(attacker2)).to.be.a.bignumber.equal(
        new BN('57896044618658097711785492504343953926634992332820282019728792003956564819968')
      );
      expect(await this.insecBecToken.balanceOf(attacker3)).to.be.a.bignumber.equal(
        new BN('57896044618658097711785492504343953926634992332820282019728792003956564819968')
      );
    });
  });
  context('Secured SecBecToken', function () {
    before(async function () {
      this.secBecToken = await SecBecToken.new();
    });
    it('reverts on overflow: 57896044618658097711785492504343953926634992332820282019728792003956564819968 * 2 => reverts', async function () {
      await expectRevert(
        this.secBecToken.batchTransfer(
          [attacker2, attacker3],
          new BN('57896044618658097711785492504343953926634992332820282019728792003956564819968'),
          { from: attacker1 }
        ),
        'SafeMath: multiplication overflow'
      );
    });
  });
});
