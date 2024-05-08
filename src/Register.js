import React, { useState } from 'react';
//import { useNavigate, Link } from 'react-router-dom';

const Register = (props) => {
  const [data, setdata] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
  });
  const [values, setvalues] = useState([]);
  const [regsuccess, setregsuccess] = useState(false);
  const { loggedIn, email } = props;
  //const navigate = useNavigate();
  const handlechange = (e) => {
    const { name, value } = e.target;
    setdata((prevdata) => ({ ...prevdata, [name]: value }));
  };
  const handleclick = (e) => {
    e.preventDefault();
    const checkEmptyInput = !Object.values(data).every((res) => res === '');
    if (checkEmptyInput) {
      const newData = (dataval) => [...dataval, data];
      setvalues(newData);
      setregsuccess(true);
      const emptyInput = { id: '', name: '', email: '', password: '' };
      setdata(emptyInput);
      if (loggedIn) {
        localStorage.removeItem('user');
        props.setLoggedIn(false);
      } else {
        //navigate('/login');
      }
    }
  };
  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Registration</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type="text"
          name="name"
          value={data.name}
          placeholder="UserName"
          required={true}
          onChange={handlechange}
          className={'inputBox'}
        />
        {/* <label className="errorLabel">{nameError}</label> */}
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type="text"
          name="email"
          value={data.email}
          placeholder="Email"
          required="true"
          onChange={handlechange}
          className={'inputBox'}
        />
        {/* <label className="errorLabel">{emailError}</label> */}
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type="password"
          name="password"
          value={data.password}
          placeholder="Password"
          required="true"
          onChange={handlechange}
          className={'inputBox'}
        />
        {/* <label className="errorLabel">{passwordError}</label> */}
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={handleclick}
          value={'Register'}
        />
      </div>
      <div classname="container py-2">
        {regsuccess ? (
          <p className="deletetext">Registered Successfully.</p>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
export default Register;
