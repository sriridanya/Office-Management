const port = process.env.PORT || 3003;
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

var nodemailer = require('nodemailer');
var {google} = require("googleapis");

var drive = google.drive("v3");
//office-management-223212-783d56e9a7bb.json
//var key = require("./plucky-agent-219805-56773e60444b.json");
var key = require("./office-management-223212-783d56e9a7bb.json");
var fs = require("fs");
var emailExistence  =require('email-existence')

  
  
var jwToken = new google.auth.JWT(
   key.client_email,
   null,
   key.private_key, ["https://www.googleapis.com/auth/drive"],
   null
 );

jwToken.authorize((authErr) => {
if (authErr) 
return console.log("error : " + authErr); 
else 
return console.log("Authorization accorded");
});
  

  

    // configure storage
const storage = multer.diskStorage({
destination: (req, file, cb) => {
/*
  Files will be saved in the 'uploads' directory. Make
 sure this directory already exists!
*/
console.log(req.path)
cb(null, './uploads');
  },
  filename: function (req, file, callback) {
    
  callback(null, file.originalname);
  }
  });
    
    // create the multer instance that will be used to upload/save the file
    const upload = multer({ storage });

    const app = express();

    app.use('/downloads', function (req, res) {
    res.sendFile('FILE_NAME.extension', { root: path.join(__dirname, 'download') });
     });


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ 
    extended: true,
    limit:50000000
    }));
    app.use(morgan('dev'))
    app.use(cors())

    // const Nexmo = require('nexmo')
    // const nexmo = new Nexmo({
    //   apiKey: 'e015cc83',
    //   apiSecret: 'O0Ju33OnsBuggxsa'
    // })
    
    // const from = '9840833874'
    // const to = '919840833874'
    // const text = 'hi'
    
    // //nexmo.message.sendSms(from, to, text)


    // nexmo.message.sendSms(
    //   from, to, text, {type: 'unicode'},
    //   (err, responseData) => {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       console.dir(responseData);
    //       // Optional: add socket.io -- will explain later
    //     }
    //   }
    // );

   app.post('/', upload.single('selectedFile'), (req, res) => {

      var data= req.file.filename
      console.log(data)
     
     // var folderId = "1wZTOsIVkAq3UIdgMXc1kvjkrdIpftXla";
      var folderId = "1_xiQGTfbRz3_RdA6Cq4udQE-LBB10TI9";
     
      var fileMetadata = {
      'name': data,
      parents: [folderId]
      };

      var media = {
      body: fs.createReadStream(path.join(__dirname, './uploads/'+data))
      };

      drive.files.create({
      auth: jwToken,
      resource: fileMetadata,
      media: media,
      fields: 'id'
      }, function(err, file) {
      if (err) 
      return console.error(err);
      else
      console.log('File Id: ', file.data);
      return res.json(file.data);
      }
      );
    

    function hello(){
    fs.unlink('./uploads/'+data, (err) => {
    if (err) throw err;
    console.log(data+'was deleted');
    });
    }
    setTimeout(hello,2000)
      });


app.post('/view', (req, res) => {
  var parents = "1_xiQGTfbRz3_RdA6Cq4udQE-LBB10TI9";
     
    //  var parents = "1wZTOsIVkAq3UIdgMXc1kvjkrdIpftXla"
      drive.files.list({  
      auth: jwToken,
      pageSize: 20,
      q: "'" + parents + "' in parents and trashed=false",
      fields: 'files(id, name)',
      }, (err, {
      data
      }) => {
      if (err) return console.log('The API returned an error: ' + err);
      const files = data.files;
      if (files.length) {
      console.log(files);
      return res.json(files);
      }
      else
      console.log('No files found.');
      return res.json('No files found.')
      });
      })




app.post('/delect/:id', (req, res) => {

      console.log(req.params.id);
      drive.files.delete({
      fileId:req.params.id,
      auth: jwToken,
      },function(err, data){
      if(data)
      {
      console.log('success');
      res.json('Success fully Deleted')
      } 
      else
      {
      console.log('err')
      res.json('err')
      }    
      })
      })


app.post('/export/:id', (req, res) => {

console.log(req.params.id);

      const drive = google.drive({version: 'v3', auth:jwToken});
      var fileId =  req.params.id
      var dest = fs.createWriteStream('download/FILE_NAME.extension');
      drive.files.get({fileId: fileId, alt: 'media'}, {responseType: 'stream'},
      function(err, data){
           // console.log('file location identification'+data.data);
            data.data
            .on('end', () => {
            console.log('Done');
            res.json(' Downloaded Success fully')
            })
            .on('error', err => {
            console.log('Error', err);
            res.json('err')
            })
            .pipe(dest);
            } 
            )
            })



// app.post('/update/:id', upload.single('selectedFile'), (req, res) => {

//   var data= req.file.filename
//   console.log(data)

//   var folderId = "1_xiQGTfbRz3_RdA6Cq4udQE-LBB10TI9"+'/'+req.param.id;
     
  
//  // var folderId = "1wZTOsIVkAq3UIdgMXc1kvjkrdIpftXla"+'/'+req.param.id;
//   // var fileMetadata = {
//   // 'name': data,
//   // parents: [folderId]+'/'+req.param.id
//   // };

//   var media = {
//     body: fs.createReadStream(path.join(__dirname, './uploads/'+data))
//     };

//   const drive = google.drive({version: 'v3', auth:jwToken});
//   var request = drive.files.update({
//     auth: jwToken,
//       // resource: fileMetadata,
//       media: media,
//       path:folderId,
//      'fileId': 'id',
//     // 'name' : 'Updated File Name',
//     // 'uploadType': 'media',
//     // 'mimeType' : 'application/vnd.google-apps.document'
//   }, function(err, file) {
//     if (err) 
//     return console.error(err);
//     else
//     console.log('File Id: ', file.data);
//     return res.json(file.data);
//     }
//     )
// })



app.post('/mail',upload.single('selectedFile'),(req, res) =>{

//console.log(req.body)
//console.log(req.file)

//setTimeout(()=>{


    if(req.file!==undefined){

    emailExistence.check(req.body.candiateemail, function(error, response){
    // console.log('res: '+response);
    if(response===true){


    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: req.body.admin_email,
    pass: req.body.password
    },
    tls: { rejectUnauthorized: false }
    });


    fs.readFile(__dirname+'/uploads/'+req.file.originalname, function (err, data) {
    if(data){
    console.log(data)
    var mailOptions = {
    from: req.body.admin_email,
    to: req.body.candiateemail,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
    html:"<div  style='float: left; width: 50%; border: 1px solid #8c8888; background-color: #ececec; box-shadow: 2px 2px 3px #616161';><img   alt=Smiley face width=200 height=100 src='https://firebasestorage.googleapis.com/v0/b/firstproject-1d257.appspot.com/o/ZyudlyLabs.png?alt=media&token=55f37845-748c-40fe-a27b-02cb9aa35425'/><h1>"+req.body.msg+ "</h1></div>",
    attachments: [{ filename: req.file.originalname, content: data}]
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
    console.log(error);
    } else {
    console.log('Email sent: ' + info);
    return res.json('send successfully');

    setTimeout(()=>{
    fs.unlink('./uploads/'+req.file.originalname, (err) => {
    if (err) throw err;
    console.log(data+'was deleted');
    });

    },4000)
    }
    });

    }else{
    console.log(error)
    }
    })

    }else{
    return res.json('invalid email address')
    }


    });



  }else{

    emailExistence.check(req.body.candiateemail, function(error, response){
      // console.log('res: '+response);
      if(response===true){
  
  
      var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
      user: req.body.admin_email,
      pass: req.body.password
      },
      tls: { rejectUnauthorized: false }
      });
  
  
     
     
      var mailOptions = {
      from: req.body.admin_email,
      to: req.body.candiateemail,

      subject: 'Sending Email using Node.js',
      text: 'That was easy!',
      html:"<div  style='float: left; width: 50%; border: 1px solid #8c8888; background-color: #ececec; box-shadow: 2px 2px 3px #616161';><img   alt=Smiley face width=200 height=100 src='https://firebasestorage.googleapis.com/v0/b/firstproject-1d257.appspot.com/o/ZyudlyLabs.png?alt=media&token=55f37845-748c-40fe-a27b-02cb9aa35425'/><h1>"+req.body.msg+ "</h1></div>",
    
      };
  
      transporter.sendMail(mailOptions, function(error, info){
      if (error) {
      console.log(error);
      } else {
      console.log('Email sent: ' + info);
      return res.json('send successfully');
      }
      }); 
      }
      else{
      return res.json('invalid email address')
      }
  
  
      });


  }

    })





    app.post('/mailverfication',(req, res) =>{

console.log(req.body)

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: req.body.admin_email,
        pass: req.body.password
        },
        tls: { rejectUnauthorized: false }
        });
    
    
       
       
        var mailOptions = {
        from: req.body.admin_email,
        to: req.body.to,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        html:"<div  style='float: left; width: 50%; border: 1px solid #8c8888; background-color: #ececec; box-shadow: 2px 2px 3px #616161';><img   alt=Smiley face width=200 height=100 src='https://firebasestorage.googleapis.com/v0/b/firstproject-1d257.appspot.com/o/ZyudlyLabs.png?alt=media&token=55f37845-748c-40fe-a27b-02cb9aa35425'/><h3>"+'http://localhost:3000/signup/'+req.body.id+"</h3></div>",
      
        };
    
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info);
        return res.json('send successfully');
        }
        });

    })


  //  const fs = require('fs');
const readline = require('readline');
//const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Calendar API.
  authorize(JSON.parse(content), listEvents);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}



/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
  app.post('/calenderevents',(req, res) =>{
var results;

  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 500,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, success) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = success.data.items;
    if (events.length) {
     // console.log('Upcoming 10 events:');
    //   events.map((event, i) => {
    //     const start = event.start.dateTime || event.start.date;
    //  res.json(`${start} - ${event.summary}`);
      // var results=`${start} - ${event.summary}`
      //});
      res.json(events)
    } else {
      console.log('No upcoming events found.');
    }
  });
 // res.json(results)
})
}


    app.listen(port, () => console.log(`Server listening on port ${port}`));
  


