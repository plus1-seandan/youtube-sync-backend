//server side code
const { getAccount } = require("./accounts.js");

const rooms = [];
const roomMembers = [];

const createRoom = (newRoom) => {
  rooms.push(newRoom);
};

const searchRoom = (data) => {
  return rooms.find((room) => room.name === data);
};
const searchRoomById = (data) => {
  return rooms.find((room) => room.id === data);
};
const searchMyRooms = (userId) => {
  const myRooms = [];
  const myRoomIds = roomMembers.filter(
    (roomMember) => roomMember.userId === userId
  );
  for (i = 0; i < myRoomIds.length; i++) {
    const room = searchRoomById(myRoomIds[i].roomId);
    myRooms.push(room);
  }
  // console.log(myRooms);
  return myRooms;
};

const searchRoomMembers = (roomId) => {
  //   members = [];
  //   memberlist = roomMembers[roomId];
  //   for (i = 0; i < memberlist.length; i++) {
  //     const acct = getAccount(memberlist[i]);
  //     members.push(acct);
  //   }
  //   return members;
  return roomMembers.filter((roomMember) => roomMember.roomId === roomId);
};

const setOnline = (userId, roomId) => {};

const addMember = (userId, roomId) => {
  const roomMember = {
    roomId: roomId,
    userId: userId,
    online: false,
  };

  roomMembers.push(roomMember);
};
module.exports = {
  createRoom,
  addMember,
  searchRoom,
  searchRoomMembers,
  searchMyRooms,
  searchRoomById,
};
