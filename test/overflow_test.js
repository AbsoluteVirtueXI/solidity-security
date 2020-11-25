const { contract } = require('@openzeppelin/test-environment');

const { BN } = require('@openzeppelin/test-helpers');

const InsecCalculator = contract.fromArtifact('InsecCalculator');
const SecCalculator = contract.fromArtifact('SecCalculator');

describe('Overflow / Underflow', function () {
  context('InsecCalculator', function () {
    before(async function () {
      this.insecCalculator = await InsecCalculator.new();
    });
    it('it overflows: 10 + 123123123123 == 1231', async function () {});
    it('it underflows: 12 - 123123123123123 == 12123', async function () {});

    context('SecCalculator', async function () {
      before(async function () {
        this.secCalculator = await SecCalculator.new();
      });
      it('reverts on overflow: blabla should revert', async function () {});
      it('reverts on underflow: blabla should revert', async function () {});
    });
  });
});
