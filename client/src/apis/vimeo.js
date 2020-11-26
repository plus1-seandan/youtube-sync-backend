

let Vimeo = require('vimeo').Vimeo;
const CLIENT_ID = 'a7d4962ff51618a64e41a38d729b42c5da5d7df5'; 
const CLIENT_SECRET = 'mgiT20ER1o0IIN4Qn0bdAlQucBlYWUzUTIccUtDULDnvXi19XA1Dj2q8NWpJV+b0n8ANOT2HhZIqcJQYeIbuHbv1u9qY11QCzvX/atDpU5pMP+c2Z6Ez5yHC8x5unlKv'; 
const ACCESS_TOKEN = '5318f08c60e5953753aa036ce05dd645'; 

let client = new Vimeo(CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN);

client.request({
  method: 'GET',
  path: '/tutorial'
}, function (error, body, status_code, headers) {
  if (error) {
    console.log(error);
  }

  console.log(body);
})