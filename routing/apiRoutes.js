const friendData = require('../app/data/friends');

module.exports = (app) => {
    app.get('/api/friends', (req, res) => {
        res.json(friendData)
    })
    app.post('/api/friends', (req, res) => {
        let userInput = req.body;
        let userRes = userInput.scores;
        let matchName = '';
        let matchIMG = '';
        const totalDiff = 10000;

        for (let i = 0; i < friendData.length; i++) {

            let difference = 0;
            for (let j = 0; j < userRes.length; j++) {
                difference += Math.abs(friendData[i].scores[j] - userRes[j]);
            }
            if (difference < totalDiff) {
                totalDiff = difference;
                matchName = friendData[i].name;
                matchIMG = friendData[i].photo;
            }
        }
        friendData.push(userInput);
        res.json({ status: 'OK', matchName: matchName, matchIMG: matchIMG });
    })
}