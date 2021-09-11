const express = require("express");
const router = new express.Router();

// otp service testing
var fast2sms = require('fast2sms');
var options = { API_KEY: process.env.otpKey };
fast2sms.init(options)


router.get('/testing/:mobile', async function (req, res) {
    try{

        await fast2sms.send({ message: 'The SMS content e.g. "This is a message from Fast2SMS"', to: req.params.mobile }).then(res => {
            res.status(200).json({ message: "Testing success.!" })

        }).catch( err => {
            console.log(err)
            res.status(400).json({ message: err.message })

        })

    }catch(e){
        res.status(500).json({ error: e.message })
    }
})



module.exports = router;