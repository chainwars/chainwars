const CWEToken = artifacts.require("CWEToken");

module.exports = function (deployer) {
    deployer.deploy(CWEToken);
};
