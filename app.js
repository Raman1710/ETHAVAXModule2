var web3;
var address= "0x942c69B6AD73c9e8d36faC89F46920b137E2a1C0";

async function Connect(){
  await window.web3.currentProvider.enable();
  web3 = new Web3(window.web3.currentProvider);
}

if(typeof web3!=="undefine"){
  web3 = new Web3(window.web3.currentProvider);
}else{
  web3 = new Web3(new Web3.Provider.HttpProvider("HTTP://127.0.0.1:7545"));
}

var abi=[
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "amt",
				"type": "int256"
			}
		],
		"name": "deposite_money",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "amt",
				"type": "int256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

var contract = new web3.eth.Contract(abi,address);

function deposite(){
  var inputval = document.getElementById("amount").value;

  web3.eth.getAccounts().then(function(account){
    return contract.methods.deposite_money(inputval).send({from: account[0]});
  }).then(function(tmp){
    $("#amount").val("");
    show_balance();
  }).catch(function(tmp){
    alert(tmp);
  })
}

  function withdraw(){
    var inputval = document.getElementById("amount").value;
  
    web3.eth.getAccounts().then(function(account){
      return contract.methods.withdraw(inputval).send({from: account[0]});
    }).then(function(tmp){
      $("#amount").val("");
      show_balance();
    }).catch(function(tmp){
      alert(tmp);
    })
}

function show_balance(){
  contract.methods.getBalance().call().then(function(balance){
    $("#balance").html(balance);
  })
}
