import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import {deleteIconic} from 'react-icons-kit/iconic/deleteIconic'
import Avatar from 'react-avatar';
import Cookies from 'js-cookie';
import Notification from './notification'
import {iosTrash} from 'react-icons-kit/ionicons/iosTrash'

//import MailIcon from '@material-ui/icons/Mail';
//import Badge from '@material-ui/core/Badge';


import {transferDownload} from 'react-icons-kit/iconic/transferDownload'


import { Icon } from 'react-icons-kit'
import {ic_create} from 'react-icons-kit/md/ic_create'
import {alertCircled} from 'react-icons-kit/ionicons/alertCircled'


import CandidateEdit from './AddCandidate';
import RecruitmentInfo from './Recuirtment_details'
import swal from 'sweetalert';
//import SaveIcon from '@material-ui/icons/Save';
import BasicEdit from './Edit';



import Grid from '@material-ui/core/Grid';
import EmployeeIcon from '@material-ui/icons/SupervisorAccount';
import Typography from '@material-ui/core/Typography';
import ProjectIcon from '@material-ui/icons/BusinessCenter';
import CompletedIcon from '@material-ui/icons/VerifiedUser';
import OngoingIcon from '@material-ui/icons/TrendingUp'
import da from './adminaccesscontroller'
// import Notification from './notification'

import * as firebase from "firebase"
// const actionsStyles = theme => ({
//   root: {
//     flexShrink: 0,
//     color: theme.palette.text.secondary,
//     marginLeft: theme.spacing.unit * 1,
//   },
 
// });

class TablePaginationActions extends React.Component {

  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };


  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
   
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
     
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  roots: {
    width: '100%',
    marginTop: theme.spacing.unit * 5,
  },
  table: {
    minWidth: '95%',
    // padding :'0 0 0 0'
  },
  tableWrapper: {
   // overflowX: 'auto',
    height:'100%',
    width:'100%'
  },
  card: {
    minWidth: 20,
   // backgroundColor:'blue'
  },
  
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
 
  button: {
 // margin: theme.spacing.unit-5,
     height:10,
     width:50
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },


  row: {
    display: 'flex',
    justifyContent: 'center',
   
  },
  avatar: {
    margin: 10,
    
  },
  bigAvatar: {
    width: 30,
    height: 30,
    //borderRadius: 10/2
  },
  
 
});
//console.log(recruitmentdata.length);
class CustomPaginationActionsTable extends React.Component {
  
constructor(props) {
    super(props)

  //  console.log('sbbbbbbbb'+props.varibles)
    this.state = {
       
        showRec:false,
        scroll:'paper',
        employeedetail:[],
        rows:'',
        indexx:'',
        totalemployee:'',
        Selected:'',
        NotSelected:'',
        WaitingList:'',
        candidateEdit1: false,
        candidateEdit: false,
        email:'',
        HR_admin:da.HR_admin,
        Main_Admin:da.Main_Admin,
        HR:da.HR,
        zyudly_empolyee:da.Empolyee,
        editdata :[],
        notification:false,
        reasons:'',
        

        p: {
          candidatename: '',
          postapplied: '',
          key: ''
        },
        recId:'',
          page: 0,
          rowsPerPage: 10,
        };


        
        this.onRecClick = this.onRecClick.bind(this);
        this.onRecClose =this.onRecClose.bind(this);
        this.handleCandidateEdit = this.handleCandidateEdit.bind(this);
        this.handleCandidateEditcolse = this.handleCandidateEditcolse.bind(this);
        this.handleCandidateEdit1 = this.handleCandidateEdit1.bind(this);
        this.handleCandidateEditcolse1 = this.handleCandidateEditcolse1.bind(this);
        this.reason=this.reason.bind(this);
        this.close=this.close.bind(this);
        this.cooo = this.cooo.bind(this);
     // this.notification=this.notification.bind(this);
    
        }
    // notification(){

//   this.setState({ notification: true });

close(){
   alert('sss')

  this.setState({ notification: false});

}

// }
reason(e){


  this.setState({ reasons:e,
    notification: true
   });

  
}

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };







  handleCandidateEdit() {
    this.setState({
      candidateEdit: true,
  
    })
  }

handleCandidateEditcolse() {

    this.setState({
      candidateEdit : false,
    })
  }


  handleCandidateEdit1(data) {
   
    this.setState({
      editdata: data,
      candidateEdit1: true,
  
    })
  }


  handleCandidateEditcolse1() {
   
       this.setState({
        candidateEdit1 : false,
       })
   
     }
   



  onRecClick(Id) {
  
  console.log('ok it is enter');
    this.setState({
      showRec:!this.state.showRec,
      recId: Id,
      scroll:'paper'
    });
    console.log('ok it is enter'+this.state.showRec);
}

onRecClose(Id) {
  var _this=this;

  _this.setState({
      showRec:!_this.state.showRec,
     
    });
}


cooo(){
this.componentWillMount()
this.componentDidMount()
}

 componentWillMount(){



  //alert("cokki" + Cookies.get('email')) 
var _this=this;
var empList=[]
setTimeout(() => _this.setState({email:Cookies.get('email')}), 1000)
  

const db = firebase.firestore();
//const settings = {/* your settings... */ timestampsInSnapshots: true};

var docRef=db.collection("employeelist")
//var docRef = db.collection("cities").doc("SF");
docRef.get().then(function(querySnapshot) {
querySnapshot.forEach(function(doc) {

if(Cookies.get('email')===_this.state.HR){

   if(doc.data().status==="Interview Schedule" || doc.data().status==="HR-Review"||doc.data().status==="Engineer-Rejected"||doc.data().status==="Approved"||doc.data().status==="Selected")
 {
 empList.push(doc.data())
 }

 }else if(Cookies.get('email')===_this.state.HR_admin){

   if(doc.data().status==="Engineer-Rejected"||doc.data().status==="HR-Rejected"||doc.data().status==="Waiting for Verfication"||doc.data().status==="Rejected"){
  empList.push(doc.data())
}
}
else if(Cookies.get('email')===_this.state.Main_Admin){
  
  empList.push(doc.data())

}
 else{
  if (doc.data().status==="Engineer-Review"){
 
   empList.push(doc.data())
 }}
}
);
_this.setState({totalemployee :empList.length})
//console.log('wooooo'+empList.length);

_this.setState({rows:empList.length})
_this.setState({employeedetail:empList})
//console.log("new data",_this.state.employeedetail)
  });

  }




  componentDidMount(){
    var _this=this;
    var selectedarray=[]
    var notselecteddarray=[]
    var waitinglistarray=[]
    const db = firebase.firestore();
// const settings = {/* your settings... */ timestampsInSnapshots: true};
// db.settings(settings);

db.collection("employeelist").where("status", "==", 'Waiting for interview')
.get()
.then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      //console.log(doc)
        // doc.data() is never undefined for query doc snapshots
       
         waitinglistarray.push(doc.data())
         var waitinglistvalue=waitinglistarray.length;
      
        _this.setState({WaitingList:waitinglistvalue})
       // console.log("555555555555555"+_this.state.WaitingList);
    });
})
.catch(function(error) {
    console.log("Error getting documents: ", error);
});







    db.collection("employeelist").where("status", "==", 'Selected')
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
           
            selectedarray.push(doc.data())
            var selectedvalue=selectedarray.length;
          
           _this.setState({Selected:selectedvalue})
           //console.log("444444444444444444444"+_this.state.Selected);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });






    db.collection("employeelist").where("status", "==", 'Rejected')
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
           
            notselecteddarray.push(doc.data())
            var selectedvalue=notselecteddarray.length;
          
           _this.setState({NotSelected:selectedvalue})
          // console.log("33333333333333"+_this.state.NotSelected);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });




  


}

  delect(e){
    axios.post('http://localhost:3003/delect/'+e.resume_id)
   .then((result) => {
 
const db = firebase.firestore();
// const settings = {/* your settings... */ timestampsInSnapshots: true};
// db.settings(settings);
 db.collection('employeelist').doc(e.uid).delete()

// set res
var storage = firebase.app().storage("gs://office-management-c1c61.appspot.com");
var storageRef = storage.ref();
var desertRef = storageRef.child(e.uid+'/'+e.uploadedFileSrc);

//console.log('delect id..............'+e.uid);

// Delete the file
desertRef.delete().then(function() {
  // File deleted successfully
  swal("Success fully Deleted","","success");
}).catch(function(error) {
  alert('failure')
});
this.componentWillMount()
this.componentDidMount()
  
   });




  }

exporting(e){



axios.post('http://localhost:3003/export/'+e.resume_id)
.then((result) => {
//console.log('finnnnnna'+result.data)  
//this.setState({ notification: true });
setTimeout(() =>{
  swal(result.data,"","success");

  window.location.href= 'http://localhost:3003/downloads/FILE_NAME.extension'
 }, 2500);


 
   //alert(result.data);
    });
  }




  render() {
  

  
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;

    var addCandidate=<Button  variant="extendedFab" aria-label="Add" style={{ backgroundColor:"#fefefe"}} onClick={this.handleCandidateEdit} >
    <AddIcon className={classes.extendedIcon} />
   Add New Candidate
  </Button>
    //const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows - page * rowsPerPage);



    return (
      <div>



        
   <Grid container spacing={16}>
          <Grid item xs={6} sm={3}>
    
    <div style={{float:"left",backgroundColor:"#ff7b58",  height:80,width:"30%",paddingTop:'10%',paddingBottom:'10%',paddingLeft:"5%",paddingRight:"5%"}}>
          <EmployeeIcon style={{color:"#f3f6f9"}} fontSize="large"/>
          </div>
       
          <div style={{float:"left",height:80,width:"70%",padding:'10%',backgroundColor:"#fefefe"}}>
          <Typography gutterBottom variant="body1" style={{fontWeight:"bold",color:"#ff7b58"}}>
            Total Employees
          </Typography>
          <Typography gutterBottom variant="subheading" >
           {this.state.totalemployee}
          </Typography>
          
        </div>
    
    </Grid>
    <Grid item xs={6} sm={3}>
    
    <div style={{float:"left",backgroundColor:"#CF000A",  height:80,width:"30%",paddingTop:'10%',paddingBottom:'10%',paddingLeft:"5%",paddingRight:"5%"}}>
    <ProjectIcon  style={{color:"#f3f6f9"}}fontSize="large"/>
          </div>
       
          <div style={{float:"left",height:80,width:"70%",padding:'10%',backgroundColor:"#fefefe"}}>
          <Typography gutterBottom variant="body1" style={{fontWeight:"bold",color:"#CF000A"}}>
          Rejected
          </Typography>
          <Typography gutterBottom variant="subheading" >
          {this.state.NotSelected}
          </Typography>
          
        </div>
    
    </Grid>
    <Grid item xs={6} sm={3}>
    
    <div style={{float:"left",backgroundColor:"#CFCF00",  height:80,width:"30%",paddingTop:'10%',paddingBottom:'10%',paddingLeft:"5%",paddingRight:"5%"}}>
    <OngoingIcon style={{color:"#f3f6f9"}} fontSize="large"/>
          </div>
       
          <div style={{float:"left",height:80,width:"70%",padding:'10%',backgroundColor:"#fefefe"}}>
          <Typography gutterBottom variant="body1"style={{fontWeight:"bold",color:"#CFCF00"}}>
          Waiting for interview 
          </Typography>
          <Typography gutterBottom variant="subheading" >
           {this.state.WaitingList}
          </Typography>
          
        </div>
    
    </Grid>
    <Grid item xs={6} sm={3}>
    
    <div style={{float:"left",backgroundColor:"#39bf58",  height:80,width:"30%",paddingTop:'10%',paddingBottom:'10%',paddingLeft:"5%",paddingRight:"5%"}}>
    <CompletedIcon style={{color:"#f3f6f9"}} fontSize="large"/>
          </div>
       
          <div style={{float:"left",height:80,width:"70%",padding:'10%',backgroundColor:"#fefefe"}}>
          <Typography gutterBottom variant="body1" style={{fontWeight:"bold",color:"#39bf58"}}> 
          Selected Candidate 
          </Typography>
          <Typography gutterBottom variant="subheading" >
         
           {this.state.Selected}
          </Typography>
          
        </div>
    
    </Grid>
    </Grid>









<div className={classes.roots} >
  {(this.state.email===this.state.HR_admin &&
        addCandidate)||(this.state.email===this.state.Main_Admin && addCandidate)}

 

        {this.state.candidateEdit ?
                <CandidateEdit open={this.state.candidateEdit} handleClose={this.handleCandidateEditcolse} updating={this.cooo} /> :
                null
              } 













      <Paper className={classes.root}>

        <div className={classes.tableWrapper} >
          <Table className={classes.table}  >
          <TableHead>
          <TableRow>
          <TableCell style={{textAlign:'inherit',padding:"0px 0px 0px 0px"}}>profile</TableCell>
            <TableCell style={{textAlign: 'inherit',padding:"0px 0px 0px 0px"}}>Candidate Name</TableCell>
            <TableCell style={{textAlign: 'inherit',padding:"0px 0px 0px 0px"}} >Applied Post</TableCell>
            <TableCell style={{textAlign: 'inherit',padding:"0px 0px 0px 0px"}}>Email Id</TableCell>
            <TableCell style={{textAlign: 'inherit',padding:"0px 0px 0px 0px"}}>Experience</TableCell>
            <TableCell style={{textAlign: 'inherit',padding:"0px 0px 0px 0px"}}>skilset</TableCell>
            {/* <TableCell >mobile number</TableCell> */}
          
            <TableCell style={{textAlign: 'inherit',padding:"0px 0px 0px 0px"}}>Status</TableCell>
            
           {(this.state.HR_admin===this.state.email &&
            <TableCell style={{textAlign: 'inherit',padding:"0px 0px 0px 0px"}}>Delete</TableCell> 
           )||(this.state.Main_Admin===this.state.email &&
            <TableCell style={{textAlign: 'inherit',padding:"0px 0px 0px 0px"}}>Delete</TableCell> 
           )}


             {(this.state.HR_admin===this.state.email &&
             <TableCell style={{textAlign: 'inherit',padding:"0px 0px 0px 0px"}}>Edit</TableCell>) ||
             (this.state.Main_Admin===this.state.email &&
              <TableCell style={{textAlign: 'inherit',padding:"0px 0px 0px 0px"}}>Edit</TableCell>) || 
           <TableCell style={{textAlign: 'inherit',padding:"0px 0px 0px 0px"}}>Status update</TableCell>
             }
           
            <TableCell style={{textAlign: 'inherit',padding:"0px 0px 0px 0px"}}>Export</TableCell> 
           
            

        
            
          </TableRow>
        </TableHead>
            <TableBody>
              {this.state.employeedetail.map((rec,index) => {


                //alert(this.state.em)
                // console.log('reason'+rec.reason)
    
                return (
                  <TableRow key={index}   >
                   <TableCell style={{textAlign:'inherit',padding:"0px 0px 0px 0px"}} onClick={() => { this.onRecClick(rec) }} >
                  <Avatar size="50"   round={true} src={rec.img} /> 
                  </TableCell>
                  <TableCell style={{textAlign:'inherit',padding:"0px 0px 0px 0px"}} >{rec.candidate_name}</TableCell>
                  <TableCell style={{ textAlign: 'inherit',padding:"0px 0px 0px 0px"}}>{rec.post_apply}</TableCell>
                  <TableCell style={{textAlign: 'inherit',padding:"0px 0px 0px 0px"}}>{rec.email}</TableCell>
                  <TableCell style={{textAlign: 'inherit',padding:"0px 0px 0px 0px"}}>{rec.experience}</TableCell>
                  <TableCell style={{textAlign: 'inherit',padding:"0px 0px 0px 0px"}}>{rec.skilset+','}</TableCell>


                  {(rec.status ==='HR-Rejected'&& <TableCell style={{textAlign: 'inherit',padding:"0px 0px 0px 0px"}}>{rec.status}
                  <IconButton  aria-label="Delete"  color="secondary"   onClick={()=>{this.reason(rec.reason)}} handleClose={this.close}>
                  <div style={{ color: '#de072b' }}>
                  <Icon icon={alertCircled}  size={18} />
                  </div>              
                  </IconButton> 
                  </TableCell> )
                  ||
                  (rec.status ==='Engineer-Rejected'&& <TableCell style={{textAlign: 'inherit',padding:"0px 0px 0px 0px"}}>{rec.status}
                  <IconButton  aria-label="Delete"  color="secondary"    onClick={()=>{this.reason(rec.reason)}} handleClose={this.close}>
                  <div style={{ color: '#de072b' }}>
                  <Icon icon={alertCircled}  size={18} />
                  </div>              
                  </IconButton> 
                  </TableCell> )
                  ||                  
                  <TableCell style={{textAlign: 'inherit',padding:"0px 0px 0px 0px"}}>{rec.status} </TableCell>          }
                 
                  {(this.state.email===this.state.HR_admin &&
                    <TableCell style={{textAlign: 'inherit',padding:"0px 0px 0px 0px"}}><IconButton  aria-label="Delete"  color="secondary"  onClick={()=>{this.delect(rec)}}>
                    <div style={{ color: '#CF000A' }}>
                     <Icon icon={iosTrash}  size={20} />
                     </div>
                     </IconButton>
                     </TableCell>)||
                     (this.state.email===this.state.Main_Admin &&
                      <TableCell style={{textAlign: 'inherit',padding:"0px 0px 0px 0px"}}><IconButton  aria-label="Delete"  color="secondary"  onClick={()=>{this.delect(rec)}}>
                      <div style={{ color: '#CF000A' }}>
                       <Icon icon={iosTrash}  size={20} />
                       </div>
                       </IconButton>
                       </TableCell>)
                  }
                   <TableCell style={{textAlign: 'inherit',padding:"0px 0px 0px 0px"}} >
                   <IconButton  aria-label="Delete"  color="secondary"   onClick={()=>{this.handleCandidateEdit1(rec)}}>
                  <div style={{ color: '#0f0808' }}>
                  <Icon icon={ic_create}  size={18} />
                  </div>              
                  </IconButton> 
                  </TableCell>
                  <TableCell style={{textAlign: 'inherit',padding:"0px 0px 0px 0px"}}>
                  <IconButton   color="default"   onClick={()=>{this.exporting(rec)}}>
                  <div style={{ color: '#39bf58' }}>
                  <Icon icon={transferDownload}  size={18} />
                   </div>
                   </IconButton>
                   {/* { index === this.state.indexx &&           
                 <IconButton  color="default"   href="http://localhost:3003/downloads/FILE_NAME.extension"> 
                 <SaveIcon  fontSize="medium" className={classes.rightIcon} />
                 </IconButton>
                 } */}
                 </TableCell>
                 


                      
                  </TableRow>
                );
              })}
            
            </TableBody>
            <TableFooter>
              <TableRow>
                {/* <TablePagination
                  colSpan={2}
                  count={1}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped} 
                />*/}
              </TableRow>
            </TableFooter>
          </Table>
          {/* <Badge className={classes.margin} onClick={this.notification} badgeContent={10} color="primary">
          <MailIcon />
        </Badge> */}
        </div>



{/* Id={this.state.employeedetail} open={this.state.basicEdit} handleClose={this.handleBasicEditcolse} */}

 {/* {this.state.notification ? <Notification/> : null} */}
         
        {this.state.showRec ? <RecruitmentInfo  open={this.onRecClick}  handleClose={this.onRecClose} key={this.state.uid} data={this.state.recId}
        updating={this.cooo}  scroll={this.state.scroll} closing={this.onRecClose}  />:null} 
      </Paper>
    
    
    </div>



        {this.state.candidateEdit1 ? 
              <BasicEdit open={this.state.candidateEdit1} handleClose={this.handleCandidateEditcolse1}  datas={this.state.editdata} updating={this.cooo}  /> :
              null
            }

            {this.state.notification ? <Notification handleClose={this.close} reasons={this.state.reasons} /> : null}
    </div>
    )
  }

}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomPaginationActionsTable);




// https://cssauthor.com/reactjs-admin-themes/