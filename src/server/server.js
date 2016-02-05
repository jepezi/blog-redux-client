import path from 'path';
import fs from 'fs';
import express from 'express';
const port = 3000;
// Login
import bodyParser from 'body-parser';
import session from 'express-session';

const app = express();




// Login
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'shuuuuu',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000*60 }
}));



app.use((req, res, next) => {
  if(req.path.match(/\.map$/i)) {
    res.send('');
  } else next();
});

// static
app.use(express.static('public'));
app.use((req, res, next) => {
    if (req.url === '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        res.end(/* icon content here */);
    } else {
        next();
    }
})



// Admin Router
app.use('/admin', require('./routeAdmin'));





app.use(require('./routeClient'));




app.listen(port, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Server listening on port %s', port);
  }
});
