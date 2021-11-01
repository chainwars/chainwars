// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "./abstracts/ERC20Votes.sol";
import "./interfaces/ICWTierProvider.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

// @dev CWE Is the essential token of the ChainWars
// It has a built-in governance which relies to the tier-provider contract
contract CWEToken is ERC20Votes, Ownable {
    // @dev CWTierProvider is the contract which could tell us the current
    // tier of the given address and their holding balance / votes
    ICWTierProvider tierProvider;

    event TierProviderSet(address indexed _oldTierProvider, address _newTierProvider);

    constructor() ERC20("Chain Wars Essence", "CWE") ERC20Permit("CWE") {
        // @dev One-time mint only. 250 mil of CWE tokens
        _mint(msg.sender, 250e6 ether);
    }

    // @dev internal function to put the logic in one place
    function _votesOrTier(uint256 votes) internal view returns (uint256){
        if (address(tierProvider) == address(0)) {
            return votes;
        }
        return uint256(getTier(votes) * 1 ether);
    }

    // @dev Gets the current votes balance for `account`
    // Calls to tier-provider to find the current Tier.
    // returns votes if tier-provider not set
    function getVotes(address account) override public view returns (uint256) {
        uint256 votes = super.getVotes(account);
        return _votesOrTier(votes);
    }

    // @dev Retrieve the number of votes for `account` at the end of `blockNumber`.
    // Calls to tier-provider to find the current Tier.
    // returns votes if tier-provider not set
    function getPastVotes(address account, uint256 blockNumber) override public view returns (uint256) {
        uint256 votes = super.getPastVotes(account, blockNumber);
        return _votesOrTier(votes);
    }

    // @dev Set the tier-provider
    // Only Owner could call
    // Emits and event on change
    function setTierProvider(ICWTierProvider _newProvider) external onlyOwner {
        address _oldProvider = address(tierProvider);
        require(address(_newProvider) != _oldProvider, "Not changed");

        tierProvider = _newProvider;
        emit TierProviderSet(_oldProvider, _newProvider);
    }
}
