const initialState = {
  employeeid:'',
  id:'',
  title:'',
  start:'',
  end:'',
  ok:'',
  img:'',
  mobile:'',
  email:'',
  status:'',
  description:'',
  zyudlyemployee:[]
   
  }



const postReducer = (state = initialState, action) => {
    switch(action.type) {
   
       case 'EMPLOYEE_ID':
     
    return  { 
        ...state,
        id:action.candiate.id,
        title:action.candiate.title,
       start:action.candiate.start,
       end:action.candiate.end,
       ok:action.candiate.ok ,
       mobile:action.candiate.mobile,
       img:action.candiate.img,
       email:action.candiate.email,
       status:action.candiate.status,
       employeeid:action.candiate.employeeid,
       description:action.candiate.description

       }
    
      case 'ZYUDLY_EMPLOYEE':
      return {
        ...state,
       zyudlyemployee:action.empList
      }

      case 'EMPLOYEE_CLOSE':
      return {
        ...state,
       ok:action.close
      }
      default:
        return state;
    }
  }
  export default postReducer;