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



// var c=[{
//   Employee:"dddd"},{
//   Employee:"qq"},{
//   Employee:"ss"},{
//   Employee:"dd"},{
//   Employee:"xx"},{
//   Employee:"cc"}]

// c.map((a)=>{
// if(a.Employee==='ss'){
// console.log(a.Employee)
// }
// // })
// var x=1

// if ( x >= 0    &&    x < 0.33 )
// {
//   console.log(x)
// // }
// var febDate  = new Date(2018, 3,2);
// console.log(febDate) //Month is 0-11 in JavaScript
// febDate.setDate(-1);
// console.log(febDate); //displays Tue Mar 2 2010
//The same roll over behavior occurs in all the other setters and even accounts for leap years:

// var y2k  = new Date(2000, 0, 1);
// y2k.setMonth(14);

// console.log('14 months after the new millenium is: ' + y2k.toDateString()); //displays Thu Mar 31 2001

// var y2k  = new Date(2000, 0, 1);
// y2k.setHours(-22);
// console.log('22 hours before the new millenium is: ' + y2k); //displays Fri Dec 31 1999 02:00:00 GMT-0500 (Eastern Standard Time)

// var date1 = new Date("12/13/2010");
// var date2 = new Date("12/15/2010");
// var timeDiff = Math.abs(date2.getTime() - date1.getTime());
// var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
// console.log(diffDays);



// function getDaysInMonth(month, year) {
//      // Since no month has fewer than 28 days
//      var date = new Date(year, month, 1 );
//      var days = [];
//      console.log('month', month, 'date.getMonth()', date.getMonth())
//      while (date.getMonth() === month) {
//         days.push(new Date(date));
//         date.setDate(date.getDate() + 1);
//      }
//      return days;
// }
    
// console.log(getDaysInMonth(11, 2018))
    

// var obj = {
//     key1: 'value1',
//     key2: 'value2'
// }

// // obj.key3 = "value3";
// //console.log(obj)
// var array=[]
// array.push(obj)
// array.Address = "123 Some St.";

// console.log(array)


// function daysInMonth (month, year) {
//     return new Date(year, month, 0).getDate();
// }

// // July
// console.log(daysInMonth(02,2018)) // 31
// 
var array=['sss','ssss','sss','ss']
array.map((doc)=>{
console.log(doc)
})