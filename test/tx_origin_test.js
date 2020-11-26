const { contract, accounts } = require('@openzeppelin/test-environment');

const { BN, expectRevert, balance, send, ether } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

const MaliciousContract = contract.fromArtifact('MaliciousContract');
const TxWallet = contract.fromArtifact('TxWallet');

describe('Authorization bypass through tx.origin', function () {
  const [alice, attacker] = accounts;
  const walletBalance = ether('13');

  beforeEach(async function () {
    this.txWallet = await TxWallet.new({ from: alice });
    // https://github.com/OpenZeppelin/openzeppelin-test-helpers/blob/master/test/src/balance.test.js
    await send.ether(alice, this.txWallet.address, walletBalance);
    this.maliciousContract = await MaliciousContract.new(this.txWallet.address, { from: attacker });
  });

  it('is vulnerable to auth bypass through tx.origin on calling TxWallet.vulnerableTransferTo', async function () {
    const attackerBalanceBeforeHack = await balance.current(attacker);
    await this.maliciousContract.stealEthersFromVulnerableFunction({ from: alice });
    expect(await balance.current(attacker)).to.be.a.bignumber.equal(walletBalance.add(attackerBalanceBeforeHack));
  });

  it('is protected from auth bypass through tx.origin on calling TxWallet.safeTransferTo', async function () {
    await expectRevert(
      this.maliciousContract.stealEthersFromSafeSafeFunction({ from: alice }),
      'TxWallet: Only owner can transfer ethers'
    );
  });
});
