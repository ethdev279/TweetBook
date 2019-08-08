 function log(message) {
    $('#log').append($('<p>').text(message));
    $('#log').scrollTop($('#log').prop('scrollHeight'));
  }
  function error(message) {
    $('#log').append($('<p>').addClass('dark-red').text(message));
    $('#log').scrollTop($('#log').prop('scrollHeight'));
  }
  function waitForReceipt(hash, cb) {
    web3.eth.getTransactionReceipt(hash, function (err, receipt) {
      if (err) {
        error(err);
      }
      if (receipt !== null) {
        // Transaction went through
        if (cb) {
          cb(receipt);
        }
      } else {
        // Try again in 1 second
        window.setTimeout(function () {
          waitForReceipt(hash, cb);
        }, 1000);
      }
    });
  }
function initTweets() {
    tweetBook.getTweetsLength((err, maxTweets) => {
        let sectionContent = ''
        maxTweets = maxTweets.toNumber()
        for(let i=0; i<maxTweets; i++) {
            tweetBook.allTweets(i, (err, message) => {
                sectionContent += `<div class="tweets-box">
                    <div>${message[1]} says:</div>
                    <div>${message[0]}</div>
                    <div>On: ${message[2]}</div>
                </div>`

                if(i === maxTweets - 1) document.querySelector('#allTweets').innerHTML = sectionContent
            })
        }
    })
}
function initMyProfile() {
    // The userInfo is a public variable, which allows us to execute it as a function with the right parameters to get its value
    tweetBook.myAccount((err, myProfile) => {
        if(err) return alert(err)

        let profileContent = ''
        let myName = myProfile[0]
        let myAddress = myProfile[1]
        let myBio = myProfile[2]
        let myLocation = myProfile[3]

        profileContent += `
            <b>Name</b>: </br>
            <span id="my-name">${myName}</span> <br/>
           <b> Address</b>: <span id="my-occupation">${myAddress}</span> <br/>
            <b>Bio</b>: </br>
            <span id="my-bio">${myBio}</span> <br/>
           <b> Locaion</b>:</br> 
            <span id="my-bio">${myLocation}</span> <br/>`
        document.querySelector('#profileContent').innerHTML = profileContent
    })
}
function initMessages() {
    tweetBook.getMessagesLength((err, maxMessages) => {
        let sectionContent = ''
        maxMessages = maxMessages.toNumber()
        for(let i = 0; i < maxMessages; i++) {
            tweetBook.getMessages(i, (err, message) => {
                sectionContent += `<div class="message-box">
                    <div>${message[1]} says:</div>
                    <div>${message[0]}</div>
                    <div>On:${message[2]}</div>
                </div>`

                if(i === maxMessages - 1) document.querySelector('#allMessages').innerHTML = sectionContent
            })
        }
    })
}
function initUserProfile() {
    // The userInfo is a public variable, which allows us to execute it as a function with the right parameters to get its value
    tweetBook.userAccounts(document.getElementById("userAddress").value, (err, myProfile) => {
        if(err) return alert(err)
 let profileContent = ''
        let myName = myProfile[0]
        let myAddress = myProfile[1]
        let myBio = myProfile[2]
        let myLocation = myProfile[3]

        profileContent += `
           <b> Name</b>: </br>
            <span id="my-name">${myName}</span> <br/>
            <b>Address</b>: <span id="my-occupation">${myAddress}</span> <br/>
            <b>Bio</b>: </br>
            <span id="my-bio">${myBio}</span> <br/>
            <b>Locaion</b>:</br> 
            <span id="my-bio">${myLocation}</span> <br/>`
        document.querySelector('#profileContent').innerHTML = profileContent
    })
}
function searchTweets() {
    // The userInfo is a public variable, which allows us to execute it as a function with the right parameters to get its value
    tweetBook.searchTweets(document.getElementById("searchTitle").value, (err, tweet) => {
        if(err) return alert(err)
 let profileContent = ''
        let writtenBy = tweet[0]
        let content = tweet[1]
        let timestamp = tweet[2]

        profileContent += `
           <b>Author</b>: </br>
           <span id="my-occupation">${writtenBy}</span> <br/>
            <b>Content</b>: </br>
            <span id="my-bio">${content}</span> <br/>
            <b>On</b>:</br> 
            <span id="my-bio">${timestamp}</span> <br/>`
        document.querySelector('#searchTweets').innerHTML = profileContent
    })
}
  const address = "0xdf0876c2140128deed612964033a48cabf2efd84";
  const abi = [{"constant":true,"inputs":[],"name":"getMessagesLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTweetsLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"userAccounts","outputs":[{"name":"name","type":"string"},{"name":"addr","type":"address"},{"name":"bio","type":"string"},{"name":"location","type":"string"},{"name":"isCreated","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_title","type":"string"}],"name":"deleteTweet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_title","type":"string"},{"name":"_content","type":"string"}],"name":"addTweet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_title","type":"string"}],"name":"searchTweets","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getMessages","outputs":[{"name":"","type":"string"},{"name":"","type":"address"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_location","type":"string"},{"name":"_bio","type":"string"}],"name":"updateCredentials","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"myAccount","outputs":[{"name":"","type":"string"},{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_location","type":"string"},{"name":"_bio","type":"string"}],"name":"createAccount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"_content","type":"string"}],"name":"writeMessage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"allTweets","outputs":[{"name":"content","type":"string"},{"name":"writtenBy","type":"address"},{"name":"timestamp","type":"uint256"},{"name":"isTweeted","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}];
   tweetBook = web3.eth.contract(abi).at(address);
  $(function () {
    var tweetBook;
     $('#messages').click(function (e) {
      e.preventDefault();
            tweetBook.getMessagesLength.call(function (err, result15) {
        if (err) {
          return error(err);
        } 
        // The return value is a BigNumber object
        document.getElementById("badge").innerHTML = result15;
      });
     });
    $('#createAccount').click(function (e) {
      e.preventDefault();
      if(web3.eth.defaultAccount === undefined) {
        return error("No accounts found. If you're using MetaMask, " +
                     "please unlock it first and reload the page.");
      }
      log("Transaction On its Way...");
      tweetBook.createAccount.sendTransaction(document.getElementById("name").value, document.getElementById("address").value, document.getElementById("about").value, function (err, hash) {
        if (err) {
          return error(err);
        }
        waitForReceipt(hash, function () {
          log("Account Created. Start Having Fun..");
        });
      });
    });
    $('#updateCredentials').click(function (e) {
      e.preventDefault();
      if(web3.eth.defaultAccount === undefined) {
        return error("No accounts found. If you're using MetaMask, " +
                     "please unlock it first and reload the page.");
      }
      log("Transaction On its Way...");
      tweetBook.updateCredentials.sendTransaction(document.getElementById("name").value, document.getElementById("address").value, document.getElementById("about").value, function (err, hash) {
        if (err) {
          return error(err);
        }
        waitForReceipt(hash, function () {
          log("Credentials Updated.");
        });
      });
    });
    $('#addTweet').click(function (e) {
      e.preventDefault();
      if(web3.eth.defaultAccount === undefined) {
        return error("No accounts found. If you're using MetaMask, " +
                     "please unlock it first and reload the page.");
      }
      log("Transaction On its Way...");
      tweetBook.addTweet.sendTransaction(document.getElementById("tweetTitle").value, document.getElementById("content").value, function (err, hash) {
        if (err) {
          return error(err);
        }
        waitForReceipt(hash, function () {
          log("Tweet Added.");
        });
      });
    });
     $('#sendMessage').click(function (e) {
      e.preventDefault();
      if(web3.eth.defaultAccount === undefined) {
        return error("No accounts found. If you're using MetaMask, " +
                     "please unlock it first and reload the page.");
      }
      log("Transaction On its Way...");
      tweetBook.writeMessage.sendTransaction(document.getElementById("addressTo").value, document.getElementById("messageContent").value, function (err, hash) {
        if (err) {
          return error(err);
        }
        waitForReceipt(hash, function () {
          log("Message Sent..");
        });
      });
    });
    if (typeof(web3) === "undefined") {
      error("Unable to find web3. " +
            "Please run MetaMask (or something else that injects web3).");
    } else {
      log("Found injected web3.");
      web3 = new Web3(web3.currentProvider);
      ethereum.enable();
      if (web3.version.network != 3) {
        error("Wrong network detected. Please switch to the Ropsten test network.");
      } else {
        log("Connected to the Ropsten test network.");
        tweetBook = web3.eth.contract(abi).at(address);
        $('#myAccount').click();
        $('#initTweets').click();

        }
    }
  });
