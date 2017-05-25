const
    express = require('express'),
    app = express()

app.use(express.static('public'))  
app.set('view engine', 'pug')
app.get('/*', (req,res) => res.render('index'))
app.listen(3000, () => console.log('Example app listening on port 3000!'))
