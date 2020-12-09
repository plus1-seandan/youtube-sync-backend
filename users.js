//server side code
// const users = [];
const activeSessions = [];

const addSession = (socketId, userId, roomId) => {
  const session = { socketId: socketId, userId: userId, roomId: roomId };
  activeSessions.push(session);
  console.log(session);
  return session;
};

// const addUser = ({ id, name, room }) => {
//   name = name.trim().toLowerCase();
//   room = room.trim().toLowerCase();
//   const existingUser = users.find(
//     (user) => user.room === room && user.name === name
//   );
//   if (existingUser) {
//     return { error: "Username is taken" };
//   }
//   const user = { id, name, room };
//   users.push(user);
//   return user;
// };

// const removeUser = (id) => {
//   const index = users.findIndex((user) => user.id === id);
//   if (index !== -1) {
//     return users.splice(index, 1)[0];
//   }
// };

const endSession = (socketId) => {
  const index = activeSessions.findIndex(
    (session) => session.socketId === socketId
  );
  if (index !== -1) {
    return activeSessions.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const getActiveSessionsForRoom = (roomId) =>
  activeSessions.filter((session) => session.roomId === roomId);

// const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addSession, endSession, getUser, getActiveSessionsForRoom };
