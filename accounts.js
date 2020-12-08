//server side code
const { v4: uuidv4 } = require("uuid");

const friends = {};

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
  accounts.push(newUser);
  // console.log(accounts);
};
const verifyAccountCreds = (username) => {
  return accounts.find((account) => account.email === username);
};

const getAccount = (userId) => {
  return accounts.find((account) => account.id === userId);
};

const searchAccounts = (query) => {
  console.log(accounts);
  return accounts.filter((account) => account.email.includes(query));
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
  console.log(currUserId, userId);
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
  verifyAccountCreds,
  addFriend,
  removeFriend,
  searchMyFriends,
};
