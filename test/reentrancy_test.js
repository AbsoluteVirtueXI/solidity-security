const { contract, accounts } = require('@openzeppelin/test-environment');

const { BN, expectRevert, balance, send, ether } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

const MaliciousReentrantContract = contract.fromArtifact('MaliciousReentrantContract');
const MaliciousCrossReentrantContract = contract.fromArtifact('MaliciousCrossReentrantContract');

const VulReentrantWallet = contract.fromArtifact('VulReentrantWallet');

describe('Reentrancy', function () {
  const [alice, bob, charlie, attacker1, hiddenWallet] = accounts;
  beforeEach(async function () {
    // Deploy VulReentrantWallet contract
    this.vulReentrantWallet = await VulReentrantWallet.new();
    // alice deposits 5 ethers to the VulReentrantWallet
    await this.vulReentrantWallet.deposit({ value: ether('5'), from: alice });
    // bob deposists 7 ethers to the VulReentrantWallet
    await this.vulReentrantWallet.deposit({ value: ether('7'), from: bob });
    // charlie deposists 9 ethers to the VulReentrantWallet
    await this.vulReentrantWallet.deposit({ value: ether('9'), from: charlie });
    // Attacker1 deploys MaliciousReentrantContract
    this.maliciousReentrantContract = await MaliciousReentrantContract.new(this.vulReentrantWallet.address, {
      from: attacker1,
    });
    // Attacker1 deposists 1 ether to the MaliciousReentrantContract
    await this.maliciousReentrantContract.deposit({ value: ether('1'), from: attacker1 });
    // Attacker1 sends 1 ether from MaliciousReentrantContract to VulReentrantWallet
    await this.maliciousReentrantContract.callDepositOnVulWallet({ from: attacker1 });
    // Attacker1 deploys MaliciousCrossReentrantContract
    this.maliciousCrossReentrantContract = await MaliciousCrossReentrantContract.new(
      this.vulReentrantWallet.address,
      hiddenWallet,
      {
        from: attacker1,
      }
    );
    // Attacker1 deposists 1 ether to the MaliciousCrossReentrantContract
    await this.maliciousCrossReentrantContract.deposit({ value: ether('1'), from: attacker1 });
    // Attacker1 sends 1 ether from MaliciousCrossReentrantContract to VulReentrantWallet
    await this.maliciousCrossReentrantContract.callDepositOnVulWallet({ from: attacker1 });
  });

  it('executes single function reentrancy attack on VulReentrantWallet.withdraw()', async function () {
    // await expectRevert.unspecified(this.maliciousReentrantContract.callWithdrawOnVulWallet({ from: attacker1 }));
    await this.maliciousReentrantContract.callWithdrawOnVulWallet({ from: attacker1 });
    expect(await balance.current(this.maliciousReentrantContract.address)).to.be.a.bignumber.equal(ether('23'));
  });

  it('executes cross-function reentrancy attack on VulReentrantWallet.transfer()', async function () {
    await this.maliciousCrossReentrantContract.callWithdrawOnVulWallet({ from: attacker1 });
    expect(
      await balance.current(this.maliciousCrossReentrantContract.address),
      'bad contract balance'
    ).to.be.a.bignumber.equal(ether('1'));
    expect(
      await this.vulReentrantWallet.balanceOf(hiddenWallet),
      'bad hiddenWallet balance in VulReentrantWallet'
    ).to.be.a.bignumber.equal(ether('1'));
  });
});
