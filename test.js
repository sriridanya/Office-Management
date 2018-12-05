// var nodemailer = require('nodemailer');

// var fs = require("fs");

// const path = require('path');



// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'zyudlyadm@gmail.com',
//       pass: 'zyudly1234'
//     },
//     tls: { rejectUnauthorized: false }
//   });
//  // fs.readFile("path/logfile.txt", function (err, data) {
    
// //     if(data){
// //         console.log(data)
// //     }else{
// //         console.log('error')
// //     }
// // }
    
    
// //     )
//  fs.readFile(__dirname+'/path/cristiano_ronaldo.pdf', function (err, data) {
//        console.log(data)
//  if(data){
//   var mailOptions = {
//     from:  'zyudlyadm@gmail.com',
//     to: 'gopinathsiva49@gmail.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!',
//     html:"<div  style='float: left; width: 50%; border: 1px solid #8c8888; background-color: #ececec; box-shadow: 2px 2px 3px #616161';><img   alt=Smiley face width=200 height=100 src='https://firebasestorage.googleapis.com/v0/b/firstproject-1d257.appspot.com/o/ZyudlyLabs.png?alt=media&token=55f37845-748c-40fe-a27b-02cb9aa35425'/><h1>"+"req.body.msg"+ "</h1></div>",
//     attachments: [{ filename: 'cristiano_ronaldo.pdf', content: data}]
//   };
  
//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info);
//       return res.json('send successfully');
      
//     }
//   });
  
// }else{
//     console.log('error')
// }
// }

 

// )


// var x=[
// {a:'gopi',b:123,c:'abc'},{a:'arun',b:123,c:'abc'},{a:'kamal',b:123,c:'abc'}

// ]

// x.filter(({a})=>{
//   console.log(a==='gopi')
// })



var c=[{
  Employee:"dddd"},{
  Employee:"qq"},{
  Employee:"ss"},{
  Employee:"dd"},{
  Employee:"xx"},{
  Employee:"cc"}]

c.map((a)=>{
if(a.Employee==='ss'){
console.log(a.Employee)
}
})