// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.18;

contract Token {
    function transferEther(address payable reciever) external payable {
        require(msg.sender != address(0), "Currently not connected to any account.");
        require(reciever != address(0), "Receiver doesn't exist.");
        require(msg.value > 0, "Transfer amount should be grater than 0.");
        require(msg.value <= msg.sender.balance, "Sender doesn't have enough balance.");
        (bool sent, ) = reciever.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }

    function accountBalance() public view returns(uint256) {
        require(msg.sender != address(0), "Currently not connected to any account.");
        return msg.sender.balance;
    }
}