import React,{Component}from 'react';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
///import Button from '@material-ui/core/Button';
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Progress from '../progress'
import lottie from 'lottie-web'

import * as firebase from "firebase"





const styles = theme => ({
  card: {
    width: 400,

position: 'absolute',
top: '50%',
left: '50%',
transform:' translate(-50%, -50%)'

  //   backgroundColor:'red'bind(this));
  },
  cardhead:{
      
      backgroundColor:' #ef7254'
  },
  button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
 
});


class Signup extends Component {
    constructor(props){
      super(props);
      this.state={
        errormsg:'',
        error:'',
      email:'',
      password:'',
      uid:'',
      mobile:'',
      address:'',
      emp_name:'',
      employee_id:'',
      progress:true
      
      
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSignin = this.handleSignin.bind(this);
     }
    
     handleChange = name => event => {
     
        this.setState({
          [name]: event.target.value,
        });
      };
componentDidMount(){


  lottie.loadAnimation({
    container: this.ref, // the dom element that will contain the animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../material_wave_loading.json' // the path to the animation json
  })

   
setTimeout(() => {
  //alert(cc.address)
  this.setState({

progress:false
    
  })
}, 3000);

}



      componentWillMount(){



        // lottie.loadAnimation({
        //   container: this.ref, // the dom element that will contain the animation
        //   renderer: 'svg',
        //   loop: true,
        //   autoplay: true,
        //   path: '../material_wave_loading.json' // the path to the animation json
        // });
     
      
       
        setTimeout(() => {
          var _this=this
          var cc;

          const db = firebase.firestore();
          const settings = {/* your settings... */ timestampsInSnapshots: true};
           db.collection("zyudlyemployee").where("uid", "==", _this.props.match.params.id)
          .get()
          .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            console.log(doc.data())
            cc=doc.data()
          })})
        ,
       
setTimeout(() => {
  //alert(cc.address)
  _this.setState({
uid:cc.uid,
emp_name:cc.emp_name,
address:cc.address,
email:cc.email,
img:cc.img,
mobile:cc.mobile,

    
  })
}, 2000);
},500)
  




// address
// "204/188 k.v.b garden ra puram chennai-28"
// email
// "gopinathsiva49@gmail.com"
// emp_name
// "gopinath"
// employee_id
// "ss"
// img
// "https://firebasestorage.googleapis.com/v0/b/office-management-c1c61.appspot.com/o/o20rkwi3bzKsNbo85lOy%2Fimages%20(1).jpeg?alt=media&token=4d7af9b2-ad02-4a6f-bdfb-fc2060ab828f"
// mobile
// "9962141518"
// uid
// "o20rkwi3bzKsNbo85lOy"


      }
      
     handleSignin(){

      alert(this.state.password)
      alert(this.state.email)
   var  email=this.state.email
   alert(email)
      firebase.auth().createUserWithEmailAndPassword(email, this.state.password).then((ss) => {

        console.log("this my console"+ss.user.uid)


        const db = firebase.firestore();
        // const settings = {/* your settings... */ timestampsInSnapshots: true};
        //        db.settings(settings);
        var addDoc = db.collection('zyudlyemployee').doc(this.state.uid);
      
      
      var empnew=  addDoc.set({
        uid:this.state.uid,
        emp_name:this.state.emp_name,
        address:this.state.address,
        email:this.state.email,
        img:this.state.img,
        mobile:this.state.mobile,
        employee_id:ss.user.uid
       
        
       });
       return empnew.then(res => {
        alert(res)
         this.props.history.push("/acknoweldgement"); 
       })




      }).catch(function(error) {
        console.log(error)
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
       
      }
     
    render() {
console.log(this.state.email)
      //console.log(this.props.match.params.id)
      
        const { classes } = this.props;
        return (
          <div>


         {this.state.progress ? <div style={{align:'center',height:'100vh'}} ref={ref =>this.ref=ref}/> : null}



         <div style={{backgroundImage:"url('/Assets/240.jpg')" ,backgroundSize:'cover', width:'100%',height:'100vh',position:'relative'}}>
           <Card className={classes.card}
    >
      <div>
      <CardHeader className={classes.cardhead}
     title={"welcome "+this.state.emp_name} 
 
    />
        <CardContent>
        <Typography variant="h2" component="h5">
          {this.state.email}
          </Typography>
<br/>
<br/>
          <Typography variant="h2" component="h5">
          set password
          </Typography>

          <TextField
          id="standard-password-input"
          label="Password"
         // className={classes.textField}
         value={this.state.password}
         onChange={this.handleChange('password')}
          type="password"
          autoComplete="current-password"
          margin="normal"
        />
        <br/>
        <br/>
        <Button variant="contained" style={{color:'white',backgroundColor:'#0f0c2b'}} onClick={this.handleSignin} >
        Submit
      </Button>
  
   
   </CardContent>
</div>
</Card>
          </div>
          </div>


        );
      }
    }
    

    export default  withStyles(styles)(Signup);

