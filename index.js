const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./src/db/db");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Api is running");
});
app.use("/", require("./src/routes/user-route"));
app.use("/", require("./src/routes/transaction-routes"));
app.use("/", require("./src/routes/report-routes"));
app.use("/", require("./src/routes/admin-routes"));

const https = require('follow-redirects').https;

const options = {
  method: 'POST',
  hostname: 'xlkpml.api.infobip.com',
  path: '/sms/2/text/advanced',
  headers: {
    'Authorization': 'Basic ' + Buffer.from('drcode' + ':' + 'Dcwrld21..').toString('base64'),
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  maxRedirects: 20,
};

const req = https.request(options, function (res) {
  const chunks = [];

  res.on('data', function (chunk) {
    chunks.push(chunk);
  });

  res.on('end', function (chunk) {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on('error', function (error) {
    console.error(error);
  });
});

const destinations = [
  { "to": "+260779788231" },
  { "to": "+260972907173" },
];

const postData = JSON.stringify({
  "messages": destinations.map(destination => ({
    "destinations": [destination],
    "from": "code",
    "text": "ba king muliche from nodejs"
  }))
});

req.write(postData);

req.end();

// async function otpRegen (pre, lenth){
//   try {
//     let chars = '1234567890';
//   var otp =pre;
//   for(let i=0; i<lenth; i++) {
//       otp = chars[Math.floor(Math.random()*chars.lenth)]
//   }
//   return otp;
//   } catch (error) {
    
//   }

// }

// var otp =otpRegen('otp', 5);
// console.log(otp);

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log("server is running on port 9k");
});
