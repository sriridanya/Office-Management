import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import { withStyles } from '@material-ui/core/styles';
import { Container, InputFile } from 'mdbreact';

import EditIcon from '@material-ui/icons/Create';
import TextField from '@material-ui/core/TextField';
//import Icon from '@material-ui/core/Icon';
import ButtonBase from '@material-ui/core/ButtonBase';
import swal from 'sweetalert';
import Avatar from 'react-avatar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import { Icon } from 'react-icons-kit'
import IconButton from '@material-ui/core/IconButton';
import {attachment} from 'react-icons-kit/icomoon/attachment'



import dA from './adminaccesscontroller'
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import BasicEdit from './Edit'
import axios from 'axios';
import Cookies from 'js-cookie';
import Statusinfo from './Recruitmentstatus';



const styles = {
  textField:{
    width:'100%',
    height:'90%',
   

  },

  inputss: {
    display: 'none',
  },
  ss:{
    marginTop: '-46px'
    
  },
  sss:{
    color:'red',
    
  },
  emailbutton:{
    float: 'right',
    marginTop: '-9px'
  },
 
  card: {
    width: 550,
    overflow:'overlay',
    //resize: 'both'
  },
  dialog: {
  
    height:800,
   
  },
  cardnav:{
    marginTop:'-12px'
  },
  imageset: {
    width: 600,
  },
  media: {
    height: 400,
  },
  card1: {
    height:140,
    width: '30%',
    float:'left',
    marginTop: '-30px',
    position: 'realative'
    
  },                            
  card2: {
    width: '56%',
    marginTop: '-14px',
    float:'right',
    marginRight:'70px',
    position:'relative',
    whiteSpace:'nowrap',
    textAlign: 'justify'
  },
  card3: {
  
    float:'right'
  },
  card4:{
    marginTop: '-50px',
  },
  upload_button :{
    display: 'none',
    
    border: '0px',
    background: 'linear-gradient(180deg, #f44, #811)',
    borderRadius: '5px',
    
    color: '#fff',
    
    padding: '5px'
}
  

};




class ResponsiveDialog extends React.Component {
 constructor(props) {
    super(props)
  //  console.log('ssssssssssssss'+props.data.resume_id)
    this.state={
      empolyeedetails:props.data,
      candidate_name:props.data.candidate_name,
      post_apply:props.data.post_apply,
      email:props.data.email,
      experience: props.data.experience,
      status:props.data.status,
      skilset:props.data.skilset,
      mobile:props.data.mobile,
      imageurl:props.data.img,
      resume_id:props.data.resume_id,
      open: true,
      basicEdit:false,
      notification:false,
      admin_email:'',
      admin_password:'',
      acknowledgement1:'',
      description:'',
      selectedFile:'',
      submitted: false,
    }
    this.handleBasicEdit = this.handleBasicEdit.bind(this);
    this.handleBasicEditcolse = this.handleBasicEditcolse.bind(this);
    this.updatingcomponent =this.updatingcomponent.bind(this);
    this.exporting=this.exporting.bind(this);
    this.emailing=this.emailing.bind(this);
    this.acknowledgement=this.acknowledgement.bind(this);

    
    console.log('sssssssssssssssssssssssssssssssssssssss'+props.data.email)
    console.log('sssssssssssssssssssssssssssssssssssssss'+this.state.mobile)
   
 
 
  }
  acknowledgement(e){

    
    this.setState({
      acknowledgement1:e.target.value
    })

  }



  onChange = (e) => {
    switch (e.target.name) {
      case 'selectedFile':
        this.setState({ selectedFile: e.target.files[0] });
        break;
      default:
        this.setState({ [e.target.name]: e.target.value });
    }


    


  }

emailing(){

  const { description, selectedFile } = this.state;
    let formData = new FormData();

    this.setState({ submitted: true })

// var datats={
//   'admin_email':dA.super_admin,
//   'password':'zyudly1234',
//   'candiateemail':this.state.email,
//   'name':this.state.candidate_name,
//   'status':this.state.status,
//   'msg':this.state.acknowledgement
// }

    formData.append('admin_email', dA.HR_admin);
    formData.append('password', 'zyudly1234');
    formData.append('candiateemail', this.state.email);
    formData.append('msg', this.state.acknowledgement1);
    formData.append('name', this.state.candidate_name);
    formData.append('status', this.state.status);
    formData.append('selectedFile', selectedFile);


    // alert(formData)


// var eemail={
// "SS":datats,
//  'll': formData
// }


  axios.post('http://localhost:3003/mail/',formData)
  .then((result) => {
  
    
   if(result.data==='send successfully')
   {
     var _this=this
    swal(result.data,"","success")
    _this.setState({ submitted: false })
    _this.setState({ acknowledgement1:'' })
    // setTimeout(()=>{
    //   console.log(this.state.acknowledgement1)
     
   
    // },4000)
    }else{
    //  var resuls=result.data
    swal(result.data,{icon: "warning"})
   }
  
  }).catch(function(error) {
        console.log("Error getting documents: ", error);
    })

}





componentDidMount(){
  
  setTimeout(() => this.setState({admin_email:Cookies.get('email')}), 1000)
  setTimeout(() => this.setState({admin_password:Cookies.get('password')}), 1000)
}







exporting(e){
 
  
  axios.post('http://localhost:3003/export/'+this.state.resume_id)
  .then((result) => {
  //console.log('finnnnnna'+result.data)  
  this.setState({ notification: true });
  
  swal(result.data,"click save icon to save data","success");
  
   
     //alert(result.data);
      });
    }
  
updatingcomponent(){ 

  this.props.updating()
}

  handleBasicEditcolse(){

    this.setState({
      basicEdit: false,
    })

  }

  handleBasicEdit(){

    this.setState({
      basicEdit: true,
    })
    // setTimeout(() =>{ this.props.closing()},4000)
   


  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const point=<Typography style={{lineHeight:'0em'}}align='center'>:</Typography>
    const { classes } =this.props;





    var emailmessage=<Grid item xs={6}>


    <Card className={classes.card}>
    <CardHeader
    className={classes.cardnav}
    title="Email"
    />
        <CardContent>
        <Grid item>
             
        <div className={classes.sss}>

  <div className={classes.ss}>
      <TextField
     
      label="Message"
      placeholder="Placeholder"
     value={this.state.acknowledgement1}
      multiline
      rowsMax='30'
      rows="4"
      onChange={this.acknowledgement}
      className={classes.textField}
      margin="normal"
      variant="outlined"
    />
    </div>
    {/* <input type="file" id="edit-submitted-resume-upload" name="files[submitted_resume]" size="22" class="form-file"></input>
     */}
    


    <div className={classes.emailbutton}>
   
    
     <input className={classes.inputss} id="icon-button-file"  type="file"  onChange={this.onChange} />
      <label htmlFor="icon-button-file">
  
        <IconButton color="primary" className={classes.button} component="span">
        <Icon icon={attachment}  size={18} />
        </IconButton>
      </label>  
      
    <Button  disabled={this.state.submitted} style={{color:'white',backgroundColor:'#0f0c2b'}} variant="contained" color="secondary"  onClick={() => this.emailing()} className={classes.button}>
    Send</Button>

    
  </div> 
   </div>
    </Grid>

    
         </CardContent>
        </Card>
    </Grid>

    return (

      <div>
      
      <Dialog
       className={classes.dialog}
        open={this.state.open}
        onClose={this.props.handleClose}
        scroll={this.props.scroll}
        aria-labelledby="responsive-dialog-title"
      
      >
       
        <DialogContent>
          



        
        <div className={classes.root}>
      <Grid container spacing={24}>
       
        <Grid item xs={12}>
       
        <Card className={classes.card}>
        <div className={classes.card3}>
        <EditIcon  onClick={() => this.handleBasicEdit()} /> 
        </div>
        <CardHeader
        className={classes.cardnav}
        title="Basic information"
        variant="title"
 />
   
   
          <CardContent>
            <div className={classes.card1}>
            
          <Avatar size="123"   round={true} src={this.state.imageurl} />
          </div>
          <div className={classes.card2}>

          <Typography align='left'style={{lineHeight:'0em'}} variant="subheading">
         Candidate Name          
         </Typography>
           {point}  
          <Typography style={{marginLeft:'148px',lineHeight:'0em',whiteSpace: 'nowrap'}}variant="subheading">
           {this.state.candidate_name}
           </Typography>
           <br/>

          <Typography align='left'style={{lineHeight:'0em'}} variant="subheading">
          Email      
         </Typography>
           {point}  
          <Typography  style={{ marginLeft:'148px',lineHeight:'0em'}}variant="subheading">
           {this.state.email}
           </Typography>
           <br/>

            <Typography align='left'style={{lineHeight:'0em'}} variant="subheading">
            Post Apply        
         </Typography>
           {point}  
          <Typography  style={{ marginLeft:'148px',lineHeight:'0em'}}variant="subheading">
           {this.state.post_apply}
           </Typography>
           <br/>

            <Typography align='left'style={{lineHeight:'0em'}} variant="subheading">
            Experience        
         </Typography>
           {point}  
          <Typography  style={{marginLeft:'148px', lineHeight:'0em'}}variant="subheading">
           {this.state.experience}
           </Typography>
           <br/>

            <Typography align='left'style={{lineHeight:'0em'}} variant="subheading">
            Mobile       
         </Typography>
           {point}  
          <Typography  style={{ marginLeft:'148px',lineHeight:'0em'}}variant="subheading">
           {this.state.mobile}
           </Typography>
           <br/>
           
           
           </div>
           
                </CardContent>
               
            </Card>
        </Grid>

          

        {this.state.basicEdit ?
              <BasicEdit datas={this.state.empolyeedetails} open={this.state.basicEdit} handleClose={this.handleBasicEditcolse}  updating1={this.updatingcomponent} /> :
              null
            }

       
       
       
        <Grid item xs={12}>
        <Card className={classes.card}>
        <CardHeader
        className={classes.cardnav}
        title="Status"
 />
              <div className={classes.card4}>
            <CardContent>
            <Statusinfo status={this.state.status}/>

                </CardContent>
                </div>
            </Card>
        </Grid>

        {(this.state.admin_email===dA.HR && this.state.status==='Interview Schedule'&& emailmessage)||(this.state.admin_email===dA.HR && this.state.status==='Selected'&&
        emailmessage)||(this.state.admin_email===dA.Main_Admin && emailmessage)
        }
      </Grid>
    </div>
     
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose}style={{color:'white',backgroundColor:'#0f0c2b'}} color="primary">
            Close
          </Button>
       
        </DialogActions>
      </Dialog>
    </div>






    );
  }
}

ResponsiveDialog.propTypes = {
 // fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(ResponsiveDialog)

