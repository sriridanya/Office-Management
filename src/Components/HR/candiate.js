//import React from 'react';
import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import Avatar from 'react-avatar';
import IconButton from '@material-ui/core/IconButton';
import { Icon } from 'react-icons-kit'
import {ic_create} from 'react-icons-kit/md/ic_create'
import {ic_close} from 'react-icons-kit/md/ic_close'
import swal from 'sweetalert';
import * as firebase from 'firebase';

const styles =theme=>( {
  card: {
    width: 345,
  },
  media: {
    // height: 140,
    width: 345
   
  },
  close:{
    width: 345,
    float:'right',

  },
  textField: {
    //marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
   // width: 500,
  },
  // button1: {
  //  float:'right'
  // },
  // button2: {
  //   float:'left'
  //  },
})

class MediaCard extends Component{ 
    constructor(props) {
        super(props);
      //  console.log(props.wo)
        this.state = {
          ok:false
           
            
                    }
                   this.handleClose=this.handleClose.bind(this)
                   this.clear=this.clear.bind(this)
                    this.accept=this.accept.bind(this)
                    this.reject=this.reject.bind(this)
                }

                handleClose(){
                  var close=this.state.ok
                  this.props.dispatch({
                    type:'EMPLOYEE_CLOSE',
                    close });
                  
                }
                componentWillMount(){
                  console.log(this.props)
                }


                clear(){
                 // alert(this.props.posts1.id)

                  const db = firebase.firestore();
// const settings = {/* your settings... */ timestampsInSnapshots: true};
// db.settings(settings);
 var remove=db.collection('hr').doc(this.props.posts1.id).delete()


 return remove.then(res => {
 //this.props.wo()
   setTimeout(()=>{
    var close=this.state.ok
    this.props.update()
    this.props.dispatch({
      type:'EMPLOYEE_CLOSE',
      close }),
      swal("removing record successfully", "", "success")
     
   },1000)
 

 })

                }


                accept(){
               
                //  alert(this.props.posts1)
              //  var ii=this.props.posts1.id
var description1=this.props.posts1.description
var employeeid1=this.props.posts1.employeeid
var start1=this.props.posts1.start
var end1=this.props.posts1.end
var id1=this.props.posts1.id
var title1=this.props.posts1.title
// var startmonthyear=this.props.posts1.startmonthyear;
// var endmonthyear=this.props.posts1.endmonthyear;
// var backgroundColor=this.props.posts1.backgroundColor

var month=end1.toString().substring(4, 7)
var year=end1.toString().substring(10, 15)



var month1=start1.toString().substring(4, 7)
var year1=start1.toString().substring(10, 15)

//alert(month+year)


                  const db = firebase.firestore();

                //  let id = this.afs.createId();

              
     // alert(id1)
      var basicRef = db.collection('hr').doc(id1);
 var updateMany = basicRef.update({
  allDay:true,
    description:description1,
    employeeid:employeeid1,
    end:end1,
    id:id1,
    start:start1,
    title:title1,
    status:'accept',
    startmonthyear:month1+year1,
    endmonthyear:month+year,
    style: {
      backgroundColor: 
           "#ad4ca4"
          },
          notification:''

})
return updateMany.then(res => {
  var close=this.state.ok
  var states={
    close:close,
    status:'accept'
  }

  this.props.update()


  this.props.dispatch({
    type:'EMPLOYEE_STATUS_CLOSE',
    states });

} )

                  //  const settings = {/* your settings... */ timestampsInSnapshots: true};
                  //  db.settings(settings);
                  //  var basicRef = db.collection('hr').doc('qX9RSeK0xovK3Kk9Pmhk');
                  //  var updateMany = basicRef.update({
                  //   allDay:true,
                  //   description:this.props.posts1.description,
                  //   employeeid:this.props.posts1.employeeid,
                  //   end:this.props.posts1.end,
                  //   id:this.props.posts1.id,
                  //   start:this.props.posts1.start,
                  //   title:this.props.posts1.title,
                  //   // status:'accept'
                  //  })
                  //  return updateMany.then(res => {})

                }



                reject(){
                  var description1=this.props.posts1.description
                  var employeeid1=this.props.posts1.employeeid
                  var start1=this.props.posts1.start
                  var end1=this.props.posts1.end
                  var id1=this.props.posts1.id
                  var title1=this.props.posts1.title
                  const db = firebase.firestore();
                  
                  //  let id = this.afs.createId();
             var rej=db.collection("hr").doc(id1).update({
                    allDay:true,
                    description:description1,
                    employeeid:employeeid1,
                    end:end1,
                    id:id1,
                    start:start1,
                    title:title1,
                    status:'reject',
                    notification:''
                   })
                   return rej.then(res => {
                    var close=this.state.ok
                    var states={
                      close:close,
                      status:'reject'
                    }
                    this.props.dispatch({
                      type:'EMPLOYEE_STATUS_CLOSE',
                      states });
                  
                  } )
                  

                }

                render(){

                  const { classes } =this.props;

               //  alert(this.props.posts1)

             
 if(this.props.posts1.status !=='accept' && this.props.posts1.status !=='reject' &&this.props.posts1.status !=='leave add by hr' )
 {
  var statusaccept  = <div><Button   className={classes.textField} variant="contained" style={{color:'white',backgroundColor:'#10a321'}}   onClick={this.accept}>
         accept
       </Button>
        <Button  className={classes.textField} variant="contained" style={{color:'white',backgroundColor:'#940007'}}  onClick={this.reject}>
         reject
       </Button>
       </div>
 }else{
   var statusaccept=null
 }
     




  return (
    <Card className={classes.card}>
    
      <CardActionArea>
        <div>
        <div className={classes.close}>
       <IconButton style={{float:"right"}} aria-label="Delete"  color="secondary"   onClick={this.handleClose}>
               
                   <Icon icon={ic_close}  size={24} />
                           
                   </IconButton> 
                   </div>
                  <br/>
                  {/* <br/>
                  <br/> */}
<div className={classes.media}>
 
           <Avatar size="180"   round={true} src={this.props.posts1.img} /> 
           </div>
        <br/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {this.props.posts1.title}
          </Typography>
          <Typography component="p">
          {this.props.posts1.email}
          </Typography>
          <Typography component="p">
          {this.props.posts1.mobile}
          </Typography>
          <Typography variant="h5" component="h2">

          leave reason:{this.props.posts1.description}
          </Typography>
          <Typography component="p">
          {this.props.posts1.status}
          </Typography>
        </CardContent>
        </div>
      </CardActionArea>
      <CardActions>
      {statusaccept}
      <Button className={classes.textField} variant="contained" style={{color:'white',backgroundColor:'#940007'}}  onClick={this.clear}>
          clear
        </Button>
       </CardActions>
    </Card>
  );
}
}
MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};



const mapStateToPropss = (state) => {
  // alert(state.employeeid)
   return {
   posts1: state
   }
   }

export default  connect(mapStateToPropss)(withStyles(styles)(MediaCard))