import { useEffect, useState } from "react" 
import './hi.css';

export default function AppUseEffect() {
  const [userslist, setuserslist] = useState([]);
  const [id,setid]=useState('');
  const [email,setemail]=useState('');
  const [name,setname]=useState('');
  const [password,setpassword]=useState('');



  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(res => res.json())
      .then(json => setuserslist(json.users))
  }, []);
  console.log("userslist", userslist)
  const OnRemove = function (id) {
    setuserslist(users => users.filter(i => i.id !== id))
  }
  const clear =() =>{
    setuserslist([]);
  }
  const adddetails =function (e) {
    setuserslist(users => users.concat([{id:id,email:email,name:name,password:password}]));  

  }
  return <div className="form-container">
    <div className="form-header">Count: {userslist.length}</div>
    <div className="form-body">
       <div>
        <label>enter id</label>
        <input type="text" onChange={e =>setid(e.target.value)}></input>
        </div>
        <div>
        <label>enter email</label>
        <input type="text"onChange={e =>setemail(e.target.value)}></input>
        </div>
        <div>
        <label>enter Name</label>
        <input type="text"onChange={e =>setname(e.target.value)}></input>
        </div>
        <div>
        <label>enter password</label>
        <input type="password"onChange={e =>setpassword(e.target.value)}></input>
        </div>
        <button onClick={adddetails}> add</button>
        </div>
        <div>
          <button type="button" onClick={clear}>clear</button>
        </div>
      <table id="list">
        <thead>
          <tr>
            <th>Id</th>
            <th>Email Id</th>
            <th>Name</th>
            <th>password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            userslist.length > 0 ?
              userslist.map(users => {
                return <tr className="users-rocord" key={users.id}>
                  <td>{users.id}</td>
                  <td>{users.email}</td>
                  <td>{users.firstName + ' ' + users.lastName}</td>
                  <td>{users.password}</td>
                  <td><button type="button" onClick={() => { OnRemove(users.id) }}>Delete</button></td>
                </tr>
              }) :
              <tr className="no-users-record">
                <td colSpan={5}>No records found</td>
              </tr>
          }
        <
          /tbody>
      </table>
    
  </div>
}