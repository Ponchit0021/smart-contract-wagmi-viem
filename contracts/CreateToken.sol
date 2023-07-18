// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CreateToken is ERC1155, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  
  // Declaring an event that gets emitted when a new token is minted
  event Minted(address to, uint256 tokenId, string tokenURI);

  constructor() ERC1155("https://ipfs.io/ipfs/{id}") {}

  function mintNFT(string memory tokenURI) public onlyOwner returns (uint256) {
    // Incrementing the token IDs counter
    _tokenIds.increment();

    // Getting the current value of the token IDs counter
    uint256 newItemId = _tokenIds.current();

    // Minting a new token
    _mint(owner(), newItemId, 1, "");

    // Setting the URI for the token metadata
    _setURI(tokenURI);

    emit Minted(owner(), newItemId, tokenURI);

    return newItemId;
  }
}
