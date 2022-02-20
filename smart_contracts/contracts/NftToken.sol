//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NftToken is ERC721, ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIdCounter;
  mapping(string=>uint256) _exitsURI;

  constructor() ERC721("NftToken", "TKN"){}

  function _baseURI() internal pure override returns(string memory){
    return "ipfs://";
  }

  function safeMint(address to, string memory _tokenURI)public onlyOwner {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _safeMint(to, tokenId);
    _setTokenURI(tokenId, _tokenURI);
    _exitsURI[_tokenURI] = 1;
  }

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
  }

  function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns(string memory){
    return super.tokenURI(tokenId);
  }

  function isCountedOwn(string memory _tokenURI)public view returns(bool) {
    return _exitsURI[_tokenURI] == 1;
  }

  function payTomint(address to, string memory _tokenURI) public payable returns(uint256){
    require(_exitsURI[_tokenURI] != 1, "nft is already minted");
    require(msg.value >= 0.001 ether, "need to pay more than 0.001 ether");
    uint256 newItemId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _mint(to, newItemId);
    _setTokenURI(newItemId, _tokenURI);
    _exitsURI[_tokenURI] = 1;

    return newItemId;
  }

  function count() public view returns(uint256){
    return _tokenIdCounter.current();
  }
}


//  uint256 public tokenCounter = 0;
//   mapping(uint256 => address) public _owners;
//   mapping(uint256 => Nft) public nfts;
//   mapping(address => uint256) public _balances;

//   struct Nft {
//     uint256 id;
//     address owner;
//     bytes32 ipfsHash;
//   }

//   event Mint(address indexed _from,address indexed _to, uint256 indexed _tokenId, bytes32 _ipsHash);

//   function ownerOf(uint256 tokenId)public view returns(address){
//     address owner = _owners[tokenId];
//     require(owner != address(0), "query for zero address");
//     return owner;
//   }

//   function balanceOf(address owner)public view returns(uint256){
//     require(owner != address(0), "token does not exists");
//     return _balances[owner];
//   }
  
//   function mint(address _to, bytes32 _ipsHash) public {
//     require(_to != address(0), "zero address");
//     tokenCounter++;
//     uint256 tokenId = tokenCounter;
//     _owners[tokenId] = _to;
//     _balances[_to] = tokenCounter;
//     nfts[tokenId] = Nft(tokenId, _to, _ipsHash);
//     emit Mint(address(0),_to, tokenId, _ipsHash);
//   }