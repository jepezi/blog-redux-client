import 'isomorphic-fetch';
import path from 'path';
import fs from 'fs';
import express from 'express';

/**
 * Check if there is user in session
 */
function authFilter(req, res, next) {
  if (!req.session.user) {
    // need return here
    return res.redirect('/admin/login');
  }

  next();
}

/**
 * Redirect if already authed
 */
function guestFilter(req, res, next) {
  if (req.session.user) {
    // need return here
    return res.redirect('/admin');
  }

  next();
}



// admin mini-app
const admin = express();




// Login - GET
admin.get('/login', guestFilter, (req, res) => {
  const htmlPath = path.join(__dirname, '..', 'public', 'login.html');
  res.sendFile(htmlPath);
});




// Login - POST
admin.post('/login', (req, res) => {
  fetch('http://localhost:9001/api/v1/login', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: req.body.email,
      password: req.body.password,
    })
  })
  .then(formatResponse)
  .then(checkResponseStatus)
  .then(response => {
    req.session.user = response.json.user;
    res.redirect('/admin');
  })
  .catch(handleError)
});




// Logout - GET
admin.get('/logout', authFilter, (req, res) => {
  res.clearCookie('connect.sid');
  req.session.destroy(function(err) {
    if (err) {
      console.warn(err);
    }

    res.redirect('/admin/login');
  });
});




// Dashboard - GET
admin.get('*', authFilter, (req, res) => {
  const htmlPath = path.join(__dirname, '..', 'public', 'admin.html');
  // Read html file
  let html = fs.readFileSync(htmlPath, "utf-8");
  // Replace __DATA__ placeholder with user data
  html = html
    .replace('__DATA__', JSON.stringify(req.session.user));

  res.contentType = 'text/html; charset=utf8';
  res.end(html);
});




// --------- fetch utils
async function formatResponse(response) {
    var json = await response.json();
    response.json = json;
    return response;
}

function checkResponseStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        var error = new Error(response.json.message);
        error.response = response;
        throw error;
    }
}
function handleError(error) {
    if (error && error.response) {
        console.log('error message', error.message);
        console.log('error response code', error.response.status)
    } else {
        console.log('Unhandled error!');
    }
}

module.exports = admin;
