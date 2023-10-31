function otpRegen (pre, lenth){
    let chars = '1234567890';
    var otp =pre;
    for(let i=0; i<lenth; i++) {
        otp = chars[Math.floor(Math.random()*chars.lenth)]
    }
    return otp;

}

var otp =otpRegen('otp', 5);
console.log(otp);