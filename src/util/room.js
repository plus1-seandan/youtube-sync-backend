const { QueryTypes } = require("sequelize");
const db = require("../config/db");

const models = require("../models");
const { getAccountById } = require("./account");

const getMyRooms = async (acctId) => {
  const myRooms = await db.query(
    `select * from rooms where 
      id in (select distinct room_id 
      from account_rooms where account_id = '${acctId}')
    `,
    {
      type: models.Room,
    }
  );
  return myRooms;
};

const getRoom = async (roomId) => {
  return await models.Room.findOne({ where: { id: roomId } });
};

const createRoom = async (acctId, room) => {
  try {
    //create new room
    const newRoom = await models.Room.create(room);
    //add creator to the room as member
    await models.AccountRoom.create({
      account_id: acctId,
      room_id: newRoom.id,
    });
    return newRoom;
  } catch (e) {
    console.log(e);
  }
};
const getPublicRooms = async () => {
  const rooms = await models.Room.findAll({ where: { private: false } });
  return rooms;
};

const getRoomMembers = async (roomId) => {
  try {
    const members = await db.query(
      `select * from accounts where
        id in (select distinct account_id 
	      from account_rooms 
	      where room_id = '${roomId}')`,
      {
        type: models.Account,
      }
    );
    return members;
  } catch (e) {
    console.log(e);
  }
};

const addMemberToRoom = async (acctId, roomId) => {
  try {
    await models.AccountRoom.create({
      room_id: roomId,
      account_id: acctId,
    });
    return await getAccountById(acctId);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getMyRooms,
  createRoom,
  getRoomMembers,
  addMemberToRoom,
  getRoom,
  getPublicRooms,
};
