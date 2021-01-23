const { QueryTypes } = require("sequelize");
const db = require("../config/db");

const models = require("../models");

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

module.exports = { getMyRooms, createRoom, getRoomMembers };