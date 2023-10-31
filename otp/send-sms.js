const https = require('follow-redirects').https;

function sendOTPviaSMS(phoneNumber, otp) {
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

  const message = `Your OTP is: ${otp}`;

  const postData = JSON.stringify({
    "messages": [
      {
        "destinations": [
          {
            "to": phoneNumber
          }
        ],
        "from": "InfoSMS",
        "text": message
      }
    ]
  });

  const req = https.request(options, function (res) {
    const chunks = [];

    res.on('data', function (chunk) {
      chunks.push(chunk);
    });

    res.on('end', function (chunk) {
      const body = Buffer.concat(chunks);
      console.log('SMS Response:', body.toString());
    });

    res.on('error', function (error) {
      console.error('SMS Error:', error);
    });
  });

  req.write(postData);
  req.end();
}

module.exports = { sendOTPviaSMS };
