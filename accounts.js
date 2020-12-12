//server side code
const { v4: uuidv4 } = require("uuid");

const friends = { 1: ["3"], 3: ["1"] };

const accounts = [
  {
    id: "1",
    email: "seanysdan@gmail.com",
    password: "1",
    firstName: "Sean",
    lastName: "Dan",
  },
  {
    id: "2",
    email: "iris@gmail.com",
    password: "1",
    firstName: "Iris",
    lastName: "Dan",
  },
  {
    id: "3",
    email: "joel@gmail.com",
    password: "1",
    firstName: "Joel",
    lastName: "Guo",
  },
  {
    id: "4",
    email: "nathan@gmail.com",
    password: "1",
    firstName: "Nathan",
    lastName: "Domedome",
  },
];

const createAccount = (newUser) => {
  console.log(newUser);
  //perform validation
  if (accounts.find((account) => account.email === newUser.email)) {
    return;
  }
  accounts.push(newUser);
  return newUser;
};

const getAccountByUsername = (username) => {
  return accounts.find((account) => account.email === username);
};

const getAccount = (userId) => {
  return accounts.find((account) => account.id === userId);
};

const searchAccounts = (query, acctId) => {
  //get the acctId and the id's friends;
  const matchedAccts = accounts
    .filter((account) => account.email.includes(query))
    .filter((account) => account.id !== acctId);

  const searchList = [];
  const friendsIds = friends[acctId];
  for (accts of matchedAccts) {
    if (friendsIds.includes(accts.id)) {
      accts.isFriend = true;
    } else {
      accts.isFriend = false;
    }
    searchList.push(accts);
  }

  return searchList;
};

const searchMyFriends = (userId) => {
  const myFriends = [];
  if (!(userId in friends)) {
    return [];
  }
  const myFriendsIdList = friends[userId];
  for (i = 0; i < myFriendsIdList.length; i++) {
    const friend = getAccount(myFriendsIdList[i]);
    myFriends.push(friend);
  }
  return myFriends;
};

const addFriend = (currUserId, userId) => {
  if (!(currUserId in friends)) {
    friends[currUserId] = [];
  }
  friends[currUserId].push(userId);
  if (!(userId in friends)) {
    friends[userId] = [];
  }
  friends[userId].push(currUserId);
};

const removeFriend = (query) => {};

module.exports = {
  createAccount,
  getAccount,
  searchAccounts,
  getAccountByUsername,
  addFriend,
  removeFriend,
  searchMyFriends,
};
