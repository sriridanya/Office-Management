import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import MenuItem from '@material-ui/core/MenuItem';
import da from './adminaccesscontroller';
//import Listsp from './list';
import swal from 'sweetalert';
import ChipInput from 'material-ui-chip-input'
import Cookies from 'js-cookie';
import * as firebase from 'firebase';
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    //marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
   // width: 500,
  },
  smalltextField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  button: {
    margin: theme.spacing.unit,
  },

});



////////////////////////////////////////access for hr admin ///////states////////

if(Cookies.get('email')===da.HR_admin){
  var Status;
//alert(da.HR_admin);
//alert(Cookies.get('email'))
 Status = [
  // {
  //   value: 'Waiting for interview',
  //   label: 'Waiting for interview',
  // },
  {
    value: 'HR-Review',
    label: 'HR-Review',
  },
];


////////////////////////////////////////access for main admin ///////states////////

}else if(Cookies.get('email')===da.Main_Admin){

   Status = [
     {
       value: 'Waiting for interview',
       label: 'Waiting for interview',
     },
    {
      value: 'HR-Review',
      label: 'HR-Review',
    },
    {
      value: 'Engineer-Review',
      label: 'Engineer-Review',
    },
    {
      value: 'Interview Schedule',
      label: 'Approved',
    },
    {
      value: 'Selected',
      label: 'Selected',
    },
    {
      value: 'Rejected',
      label: 'Rejected',
    },
  ];


}


////////////////////////////////////////access for hr  ///////states////////

else if(Cookies.get('email')===da.HR){
if(Cookies.get('status')==='HR-Review'){
   Status = [
    
   
    {
      value: 'Engineer-Review',
      label: 'Engineer-Review',
    },
    // {
    //   value: 'Interview Schedule',
    //   label: 'Interview Schedule',
    // },
    //  {
    //   value: 'Selected',
    //   label: 'Selected',
    // },
    {
      value: 'HR-Rejected',
      label: 'Rejected',
    },
    
  ];

}else if(Cookies.get('status')==='Interview Schedule'){


   Status = [
    
   
    // {
    //   value: 'Engineer-Review',
    //   label: 'Engineer-Review',
    // },
    // {
    //   value: 'Interview Schedule',
    //   label: 'Interview Schedule',
    // },
     {
      value: 'Selected',
      label: 'Selected',
    },
    {
      value: 'Rejected',
      label: 'Rejected',
    },
    
  ];

}else{
  
   Status = [
    
   
    {
      value: 'Engineer-Review',
      label: 'Engineer-Review',
    },
    {
      value: 'Rejected',
      label: 'Rejected',
    },
    
  ];


}
   
}

////////////////////////////////////////access for engineer ///////states////////
else{
  
   Status = [
    
   
    {
      value: 'Interview Schedule',
      label: 'Approved',
    },
    {
      value: 'Engineer-Rejected',
      label: 'Rejected',
    },
    
  ];


}


const Experience = [
  {
    value: '0-1Year',
    label: '0-1Year',
  },
  {
    value: '1-2Years',
    label: '1-2Years',
  },
  {
    value: '2-3Years',
    label: '2-3Years',
  },
  {
    value: '3+Years',
    label: '3+Years',
  },

];


const Post_apply = [
  {
    value: 'Developer',
    label: 'Developer',
  },
  {
    value: 'Data Scientist',
    label: 'Data Scientist',
  },
  {
    value: 'Designer',
    label: 'Designer',
  },
  {
    value: 'Business Executive',
    label: 'Business Executive',
  },
];

class EmployeeAdd extends Component {
  constructor(props) {
    super(props)

    // console.log("skilllllll"+props.datas.skilset)
    this.state = {
       candidate_name:props.datas.candidate_name,
       post_apply: props.datas.post_apply,
       uid: props.datas.uid,
       email:props.datas.email,
       experience: props.datas.experience,
       status:props.datas.status,
       athu:Cookies.get('email'),
      // img:[],
     
       skilset:props.datas.skilset,
       mobile:props.datas.mobile,
       description: '',
       selectedFile: '',
       reason:'',
     
      // filesToBeSent:[],
      // uploadedFileSrc: '',
       resume_id:props.datas.resume_id,
       submitted: false,
      
      // imgurl:'',
     
    
    };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddChip=this.handleAddChip.bind(this);
    this.handleDeleteChip=this.handleDeleteChip.bind(this);
   
  }


  handleDeleteChip(e,index) {
   
    var skilset1= this.state.skilset
 
    skilset1.splice(index, 1);
 
   
 this.setState({skilset:skilset1})
 
    }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });

    // console.log('name karo'+this.state.status)
  };

 componentDidMount(){
setTimeout(()=>{ Cookies.set('status',this.state.status);
},3000) }



  handleAddChip(event) {
    // console.log(event);
    this.setState({
      skilset: event,
    });
   
    // console.log('array checking'+this.state.skilset)


    //console.log('name karo'+this.state.candidate_name)
  };



  onChange = (e) => {
    switch (e.target.name) {
      case 'selectedFile':
        this.setState({ selectedFile: e.target.files[0] });
        break;
      default:
        this.setState({ [e.target.name]: e.target.value });
    }
  }








  handleSubmit(e) {
    


     //e.preventDefault();
    //  console.log('function is calling'+this.state.uid);
    
     const db = firebase.firestore();
    //  const settings = {/* your settings... */ timestampsInSnapshots: true};
    //  db.settings(settings);
     var basicRef = db.collection('employeelist').doc(this.state.uid);
     var updateMany = basicRef.update({
       candidate_name: this.state.candidate_name,
       email: this.state.email,
       mobile: this.state.mobile,
       post_apply:this.state.post_apply,
       experience: this.state.experience,
       status:this.state.status,
       skilset:this.state.skilset,
       reason:this.state.reason
     });
     // [END update_document_many]
   

     return updateMany.then(res => {
      //swal("update successfully", "", "success");
      //console.log('Update: ', res);
      
      this.setState({ submitted: true }, () => {
        setTimeout(() =>{ this.setState({ submitted: false })
        swal("update successfully", "", "success");
       
    // this.props.updating1():
    this.props.updating()
    
      }, 4000);
      });
    })



//  })




  }
  onDrop(acceptedFiles, rejectedFiles) {
    // console.log('Accepted files: ', acceptedFiles[0]);
    var img=acceptedFiles[0];
  this.setState({img:img})
  // console.log('state file:',this.state.img);
    this.setState({img,uploadedFileSrc:acceptedFiles[0].name}); 
}

  render() {
    const { fullScreen } = this.props;
    const { classes } = this.props;
    const { submitted } = this.state; 
 //   alert(this.state.status);
    

    var candidate_name=  <TextValidator
    label="Candidate Name"
    onChange={this.handleChange('candidate_name')}
    name="candidate-name"
    className={classes.smalltextField}
    value={this.state.candidate_name}
    validators={['required']}
    errorMessages={['this field is required']}
          />

    var post_apply=<TextValidator
    select
      label="Post Applying"
      onChange={this.handleChange('post_apply')}
      name="post_apply"
      value={this.state.post_apply}
      validators={['required']}
      errorMessages={['this field is required']}
      className={classes.smalltextField}>
      {Post_apply.map(option => (
  <MenuItem key={option.value} value={option.value}>
   {option.label}
  </MenuItem>
))}
      </TextValidator>


        var email= <TextValidator
        label="Email"
        onChange={this.handleChange('email')}
        name="email"
        value={this.state.email}
        validators={['required', 'isEmail']}
        errorMessages={['this field is required', 'email is not valid']}
        className={classes.smalltextField}
      />


      var mobile= <TextValidator
      name="mobile"
      label="Mobile"
      onChange={this.handleChange('mobile')}
      value={this.state.mobile}
      validators={['required','matchRegexp:^[0-9]{10}$']}
      errorMessages={['this feild is required','Enter valid no']}
      className={classes.smalltextField}
        />
      
    var experience = <TextValidator
    select
    label="Experience"
    onChange={this.handleChange('experience')}
    name="experience"
    value={this.state.experience}
    validators={['required']}
    errorMessages={['this field is required']}
    className={classes.smalltextField}
     >
      {Experience.map(option => (
    <MenuItem key={option.value} value={option.value}>
     {option.label}
    </MenuItem>
  ))}</TextValidator>


  var status=  
  <TextValidator
  select
  label="Status"
  onChange={this.handleChange('status')}
  name="status"
  value={this.state.status}
  validators={['required']}
  errorMessages={['this field is required']}
  className={classes.smalltextField}

   >
   {Status.map(option => (
  <MenuItem key={option.value} value={option.value}>
   {option.label}
  </MenuItem>
))}

  </TextValidator>

  var skilset=  <ChipInput
  label="Skillset"
  className={classes.smalltextField}
  value={this.state.skilset}
  onChange={(chip) =>this.handleAddChip(chip)}
  onDelete={(chip, index) =>this.handleDeleteChip(chip, index)}
  />

  var reason= <TextValidator
  label="Reason"
  onChange={this.handleChange('reason')}
  name="Reason"
  value={this.state.reason}
  //validators={['required', 'isEmail']}
  errorMessages={['this field is required']}
  className={classes.smalltextField}
/>
  
  




    return (
      <div> 
         <Dialog
          fullScreen={fullScreen}
          open={this.props.open}
          // onClose={()=>{
          //   console.log(this.state.open)
          //   this.setState({open:false})
          // }}
          onClose={this.props.handleClose}
          key={this.props.Id}
          aria-labelledby="responsive-dialog-title"

        >
        
    {this.state.athu===da.HR_admin ||( this.state.athu===da.Main_Admin && <DialogTitle id="responsive-dialog-title">Add Employee Details</DialogTitle>) }
          <DialogContent>
            <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmit}
            >
            {(this.state.athu===da.HR_admin && candidate_name) || (this.state.athu===da.Main_Admin && candidate_name)}
            {(this.state.athu===da.HR_admin && post_apply) || (this.state.athu===da.Main_Admin && post_apply)}
            <br />  
            {(this.state.athu===da.HR_admin && email)|| (this.state.athu===da.Main_Admin && email)}
            {(this.state.athu===da.HR_admin && mobile) || (this.state.athu===da.Main_Admin && mobile)}
            <br/> 
            {(this.state.athu===da.HR_admin && experience) || (this.state.athu===da.Main_Admin && experience)}
            {( this.state.athu===da.HR && this.state.status==='HR-Rejected'&& <br/>)||(this.state.athu===da.Empolyee && this.state.status==='Engineer-Rejected'&& <br/>)}
            { (this.state.athu===da.HR && this.state.status==='HR-Rejected'&& reason)||(this.state.athu===da.Empolyee && this.state.status==='Engineer-Rejected'&& reason)}
            { (this.state.athu===da.HR && this.state.status==='HR-Rejected'&& <br/>)||(this.state.athu===da.Empolyee && this.state.status==='Engineer-Rejected'&& <br/>)}
            {status}            
            <br/>
            {(this.state.athu===da.HR_admin && skilset) || (this.state.athu===da.Main_Admin && skilset)}
            <br/>
            <br/>

              <Button  className={classes.textField} style={{color:'white',backgroundColor:'#0f0c2b'}} type="submit"
                disabled={submitted}
              >  {
                  (submitted && 'Employee Added')
                  || (!submitted && 'Submit')
                }
              </Button>
              <Button className={classes.textField} onClick={this.props.handleClose} style={{color:'white',backgroundColor:'#0f0c2b'}} autoFocus>
                Cancel
                </Button>
    
            </ValidatorForm>
          </DialogContent>

        </Dialog>       
      </div>
    );
  }

}
EmployeeAdd.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  withMobileDialog(),
)(EmployeeAdd)
