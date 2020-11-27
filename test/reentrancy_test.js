const { contract, accounts } = require('@openzeppelin/test-environment');

const { BN, expectRevert, balance, send, ether } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

const MaliciousReentrantContract = contract.fromArtifact('MaliciousReentrantContract');
const VulReentrantWallet = contract.fromArtifact('VulReentrantWallet');

describe('Reentrancy', function () {
  const [alice, bob, charlie, attacker1] = accounts;
  beforeEach(async function () {
    // Deploy VulReentrantWallet contract
    this.vulReentrantWallet = await VulReentrantWallet.new();
    // alice deposits 50 ethers to the VulReentrantWallet
    await this.vulReentrantWallet.deposit({ value: ether('50'), from: alice });
    // bob deposists 70 ethers to the VulReentrantWallet
    await this.vulReentrantWallet.deposit({ value: ether('70'), from: bob });
    // charlie deposists 90 ethers to the VulReentrantWallet
    await this.vulReentrantWallet.deposit({ value: ether('90'), from: charlie });
    // Attacker1 deploys MaliciousReentrantContract
    this.maliciousReentrantContract = await MaliciousReentrantContract.new(this.vulReentrantWallet.address, {
      from: attacker1,
    });
    // Attacker1 deposists 10 ether to the MaliciousReentrantContract
    await this.maliciousReentrantContract.deposit({ value: ether('10'), from: attacker1 });
    // Attacker1 sends 10 ether from MaliciousReentrantContract to VulReentrantWallet
    await this.maliciousReentrantContract.callDepositOnVulWallet({ from: attacker1 });
  });

  it('execute single function reentrancy attack on VulReentrantWallet.withdraw()', async function () {
    // await expectRevert.unspecified(this.maliciousReentrantContract.callWithdrawOnVulWallet({ from: attacker1 }));
    await this.maliciousReentrantContract.callWithdrawOnVulWallet({ from: attacker1 });
    expect(await balance.current(this.maliciousReentrantContract.address)).to.be.a.bignumber.equal(ether('220'));
    console.log((await balance.current(this.maliciousReentrantContract.address)).toString());
    // expect(true).to.be.true;
  });
});
