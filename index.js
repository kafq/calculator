const express = require('express');
const path = require('path');
const math = require('mathjs')

const app = express();
const port = process.env.PORT || 5000;

app.use('/', express.static(`${__dirname}/client/build`));


_verifyExpression = (req, res, next) => {
    try {
        /* When a word passed, Math JS returns null, so throw an error */
        const decodedExpression = Buffer.from(req.query.query, 'base64').toString();
        const cleanedUpExpression = decodedExpression.replace(/[^0-9+\-*/().]/g, '');
        math.eval(cleanedUpExpression) ? next() : res.send({error: true, message: 'Expression is not valid'});
        
    } catch(e) {
        switch(true) {
            case /The first argument must be one of type string/.test(e.message):
                res.send('Hi, try to add some expressions in a form of BASE-64 encoding to /calculus?query=[expression]')
                break;
            case /Undefined symbol/.test(e.message):
                res.send({error: true, message: 'Passed input is not an expression'})
                break;
            case /Invalid or unexpected token/.test(e.message):
                res.send({error: true, message: 'Passed input contains invalid characters'})             
                break;
            default:
                res.send({error: true, message: 'Expression is not valid'});
                break;
        }
    }
}

app.get('/calculus', _verifyExpression, (req, res) => {
    const decodedExpression = Buffer.from(req.query.query, 'base64').toString();
    const cleanedUpExpression = decodedExpression.replace(/[^0-9+\-*/().]/g, ''); 
    res.send({
        error: false,
        result : math.eval(cleanedUpExpression)})
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => console.log(`Running on port ${port}`));