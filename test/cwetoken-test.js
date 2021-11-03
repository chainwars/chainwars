const CWEToken = artifacts.require("CWEToken");
const CWTierProviderMock = artifacts.require("CWTierProviderMock");

let blockTier5;
let tp;

contract("CWEToken", ([owner, test1, test2]) => {
    it("should put 250 mik CWEToken in the creator account", () =>
        CWEToken.deployed()
            .then(instance => instance.balanceOf(owner))
            .then(balance => {
                assert.equal(
                    balance.valueOf(),
                    web3.utils.toWei(250e6.toString()),
                    "250 mil wasn't in the first account"
                );
            }))
    it("voting power should be exact as the balance when no TierProvider set", async () => {
        let cwe;
        await CWEToken.deployed().then(_cwe => cwe = _cwe);
        await cwe.transfer(test1, web3.utils.toWei("500"), {from: owner});

        const balance = await cwe.balanceOf(test1);
        const votesPower = await cwe.getVotes(test1);

        assert.equal(
            balance.toString(),
            votesPower.toString(),
            "votest power doesn't equal the balance"
        );
    });
    it("Setting TierProvider default by balance", async () => {
        let cwe;
        await CWEToken.deployed().then(_cwe => cwe = _cwe);
        tp = await CWTierProviderMock.new();
        await cwe.setTierProvider(tp.address);
    });
    it("voting power 1; Tier1", async () => {
        await CWEToken.deployed()
            .then(async cwe => {
                await cwe.transfer(test2, web3.utils.toWei("1"), {from: owner})
                return cwe;
            })
            .then(cwe => cwe.getVotes(test2))
            .then(power => assert.equal(
                power.valueOf(),
                web3.utils.toWei("1"),
                "Balance 5 not Tier1")
            );
    });
    it("voting power 5; Tier1", async () => {
        await CWEToken.deployed()
            .then(async cwe => {
                await cwe.transfer(test2, web3.utils.toWei("4"), {from: owner})
                return cwe;
            })
            .then(cwe => cwe.getVotes(test2))
            .then(power => assert.equal(
                power.valueOf(),
                web3.utils.toWei("1"),
                "Balance 5 not Tier1")
            );
    });
    it("voting power 2000; Tier1", async () => {
        await CWEToken.deployed()
            .then(async cwe => {
                await cwe.transfer(test2, web3.utils.toWei("1995"), {from: owner})
                return cwe;
            })
            .then(cwe => cwe.getVotes(test2))
            .then(power => assert.equal(
                power.valueOf(),
                web3.utils.toWei("1"),
                "Balance 2000 not Tier1")
            );
    });
    it("voting power 2001; Tier2", async () => {
        await CWEToken.deployed()
            .then(async cwe => {
                await cwe.transfer(test2, web3.utils.toWei("1"), {from: owner})
                return cwe;
            })
            .then(cwe => cwe.getVotes(test2))
            .then(power => assert.equal(
                power.valueOf(),
                web3.utils.toWei("2"),
                "Balance 2001 not Tier2")
            );
    });
    it("voting power 6000; Tier2", async () => {
        await CWEToken.deployed()
            .then(async cwe => {
                await cwe.transfer(test2, web3.utils.toWei("3999"), {from: owner})
                return cwe;
            })
            .then(cwe => cwe.getVotes(test2))
            .then(power => assert.equal(
                power.valueOf(),
                web3.utils.toWei("2"),
                "Balance 6000 not Tier2")
            );
    });
    it("voting power 6001; Tier3", async () => {
        await CWEToken.deployed()
            .then(async cwe => {
                await cwe.transfer(test2, web3.utils.toWei("1"), {from: owner})
                return cwe;
            })
            .then(cwe => cwe.getVotes(test2))
            .then(power => assert.equal(
                power.valueOf(),
                web3.utils.toWei("3"),
                "Balance 6001 not Tier3")
            );
    });
    it("voting power 18000; Tier3", async () => {
        await CWEToken.deployed()
            .then(async cwe => {
                await cwe.transfer(test2, web3.utils.toWei("11999"), {from: owner})
                return cwe;
            })
            .then(cwe => cwe.getVotes(test2))
            .then(power => assert.equal(
                power.valueOf(),
                web3.utils.toWei("3"),
                "Balance 18000 not Tier3")
            );
    });
    it("voting power 18001; Tier4", async () => {
        await CWEToken.deployed()
            .then(async cwe => {
                await cwe.transfer(test2, web3.utils.toWei("1"), {from: owner})
                return cwe;
            })
            .then(cwe => cwe.getVotes(test2))
            .then(power => assert.equal(
                power.valueOf(),
                web3.utils.toWei("4"),
                "Balance 18001 not Tier4")
            );
    });
    it("voting power 54000; Tier4", async () => {
        await CWEToken.deployed()
            .then(async cwe => {
                await cwe.transfer(test2, web3.utils.toWei("35999"), {from: owner})
                return cwe;
            })
            .then(cwe => cwe.getVotes(test2))
            .then(power => assert.equal(
                power.valueOf(),
                web3.utils.toWei("4"),
                "Balance 54000 not Tier4")
            );
    });
    it("voting power 54001; Tier5", async () => {
        await CWEToken.deployed()
            .then(async cwe => {
                await cwe.transfer(test2, web3.utils.toWei("1"), {from: owner})
                return cwe;
            })
            .then(cwe => cwe.getVotes(test2))
            .then(power => assert.equal(
                power.valueOf(),
                web3.utils.toWei("5"),
                "Balance 54001 not Tier5")
            );
    });
    it("voting power 162000; Tier5", async () => {
        await CWEToken.deployed()
            .then(async cwe => {
                await cwe.transfer(test2, web3.utils.toWei("107999"), {from: owner})
                return cwe;
            })
            .then(cwe => cwe.getVotes(test2))
            .then(power => assert.equal(
                power.valueOf(),
                web3.utils.toWei("5"),
                "Balance 162000 not Tier5")
            );
        blockTier5 = await web3.eth.getBlockNumber();
    });
    it("voting power 162001; Tier_Super", async () => {
        await CWEToken.deployed()
            .then(async cwe => {
                await cwe.transfer(test2, web3.utils.toWei("1"), {from: owner})
                return cwe;
            })
            .then(cwe => cwe.getVotes(test2))
            .then(power => assert.equal(
                power.valueOf(),
                web3.utils.toWei("6"),
                "Balance 162001 not Tier_Super")
            );
    });
    it("voting power 500000; Tier_Super", async () => {
        await CWEToken.deployed()
            .then(async cwe => {
                await cwe.transfer(test2, web3.utils.toWei("337999"), {from: owner})
                return cwe;
            })
            .then(cwe => cwe.getVotes(test2))
            .then(power => assert.equal(
                power.valueOf(),
                web3.utils.toWei("6"),
                "Balance 500000 not Tier_Super")
            );
    });
    it("Block Tier5 should contain Tier5", async () => {
        await CWEToken.deployed()
            .then(cwe => cwe.getPastVotes(test2, blockTier5))
            .then(pastPower => assert.equal(
                pastPower.valueOf(),
                web3.utils.toWei("5"),
                "Block Tier5 is not Tier5")
            );
    });
    it("Should revert trying to set the same TierProvider", async () => {
        const cwe = await CWEToken.deployed();

        try {
            await cwe.setTierProvider(tp.address);
            // noinspection ExceptionCaughtLocallyJS
            throw null;
        } catch (error) {
            assert(error, "Expected an error but did not get one");
            assert(error.reason === "Not changed", "`Not changed` should be the revert reason");
        }
    });
})
