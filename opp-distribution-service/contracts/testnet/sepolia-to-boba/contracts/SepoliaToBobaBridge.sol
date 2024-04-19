// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IBobaStandardBridge {
    function depositERC20To(address _token, address _to, uint256 _amount, uint256 _l2Gas, bytes calldata _data) external;
}

interface IWETH {
    function deposit() external payable;
    function approve(address spender, uint256 amount) external returns (bool);
    function transfer(address to, uint256 value) external returns (bool);
}

contract SepoliaToBobaBridge {
    IBobaStandardBridge public bobaStandardBridge;
    IWETH public WETH;

    address public bobaBridgeAddress;
    address public wethAddress;

    // Constructor to set the Boba Standard Bridge address
    constructor() {
        bobaBridgeAddress = 0x244d7b81EE3949788Da5F1178D911e83bA24E157;
        wethAddress = 0xb16F35c0Ae2912430DAc15764477E179D9B9EbEa;

        bobaStandardBridge = IBobaStandardBridge(bobaBridgeAddress);
        WETH = IWETH(wethAddress);
    }

    function wrapAndApprove(uint256 amount) public payable {
        require(msg.value >= amount, "Insufficient ETH sent");
        WETH.deposit{ value: amount }(); // wrap the ETH
        WETH.approve(bobaBridgeAddress, amount); // approve this weth for bridging to boba
    }

    // Function to send SepoliaETH to Boba Network to a specific address
     function bridgeSepoliaWETHTo(address target, uint256 amount, uint256 l2Gas, bytes calldata data) public {
        WETH.transfer(bobaBridgeAddress, amount); // Transfer WETH from this contract to the bridge contract
        bobaStandardBridge.depositERC20To(address(WETH), target, amount, l2Gas, data);
    }
    // Function to verify contract is working and deployed successfully
    function testResponse() public pure returns (string memory) {
        return "The contract is live! v1.2.0";
    }

    // Function to receive ETH directly to the contract
    receive() external payable {}

    // Fallback function in case any other function is called
    fallback() external payable {}
}
