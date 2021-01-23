const db = require("../config/db");

const models = require("../models");
const { getAccountById } = require("./account");

const getFriendsAcctIds = async (acctId) => {
  const friendsIds = await db.query(
    `
    select f1.* 
    from friends f1
    inner join friends f2 on f1.account_id = f2.friend_id and f1.friend_id = f2.account_id
    where f1.account_id = '${acctId}'
    order by status
    `,
    {
      type: models.Account,
    }
  );
  return friendsIds;
};

const getMyFriends = async (acctId) => {
  try {
    const friends = await getFriendsAcctIds(acctId);
    console.log({ friends });
    const promises = friends.map(async (friend) => {
      console.log({ friend });
      return await getAccountById(friend.friend_id);
    });
    return await Promise.all(promises);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getMyFriends };
