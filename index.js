const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'client/build')));

verifyExpression = (req, res, next) => {
    
    const decodedExpression = Buffer.from(req.query.query, 'base64').toString();  
    try {
        if (eval(decodedExpression)) {
            next()
        }
    } catch(e) {
        switch(true) {
            case /is not defined/i.test(e.message):
                res.redirect('/error/' + 'not-expression')
                break;
            case /Invalid or unexpected token/.test(e.message):
                res.redirect('/error/' + 'invalid-char')             
                break;
            default:
                res.redirect('/error/' + 'default');
                break;
        }
    }
}

app.get('/calculus', verifyExpression, (req, res) => {
        const decodedExpression = Buffer.from(req.query.query, 'base64').toString();
        console.log('Hei')
        res.send({
            error: false,
            result : eval(decodedExpression)})
        res.json({
            error: false,
            result : eval(decodedExpression)})
})

app.get('/error/:errorcode', (req, res) => {
    switch(req.params.errorcode) {
        case 'not-expression':
            res.send({error: true, message: 'Passed input is not an expression'})
            break;
        case 'invalid-char':
            res.send({error: true, message: 'Passed input contains invalid characters'})
            break;
        default:
            res.send({error: true, message: 'Expression is not valid'})
            break;
    }
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => console.log(`Running on port ${port}`));