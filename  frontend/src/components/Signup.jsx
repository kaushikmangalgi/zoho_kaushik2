import React, { useState, useEffect } from "react";
import Service  from "../service/Service";

function Signup({props}) {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
  const [secret, setSecret] = useState("");
  const [u, setU] = useState("");

    useEffect(() => {
      // Update the document title using the browser API
    
      setU(JSON.parse(localStorage.getItem("user")));
    
    },[]);

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    const onChangeSecret = (e) => {
        const secret = e.target.value;
        setSecret(secret);
    }
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    }

    const handleLogin = (e) => {
        
        e.preventDefault();
        // form.current.validateAll();
     
       // if(checkBtn.current.context._errors.length >=  0) {
            Service.signup(email,password,secret).then(
            () => {
                console.log(email);
        
                window.location.reload();
            },
            (error) => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
            });
        // } else {
        //     setLoading(false);
        // }
    };
    return (
      

      <div className='container-sm justify-content-lg-center'>

        {/* <div className="container"> */}
        {u && u ? (
          <div className="container-sm d-flex justify-content-lg-center ">
            Logged in as  {u.email} ...

          
          </div>
          ) : (
        <form onSubmit={handleLogin}>
        <div className="mb-3">  
                  <label for="exampleInputEmail1" className="form-label">Email address</label>
                  <input 
                        name="email"
                      value={email}
                       type='email'
                      onChange={onChangeEmail}
                    // validations={[required]} 
                        placeholder="Email" className="form-control" 
                  />
        </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">Password</label>
                  <input 
                        name="password"
                      value={password}
                       type='password'
                        onChange={onChangePassword}
                    // validations={[required]} 
                        placeholder="Password" className="form-control" 
                  />
                </div>
                
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">Secret</label>
                  <input 
                        name="secret"
                      value={secret}
                       
                        onChange={onChangeSecret}
                    // validations={[required]} 
                        placeholder="Secret" className="form-control" 
                  />
                </div>
                

        <button type="submit" value="Login" className="btn btn-primary">Submit</button>
        </form>
     )}
     </div>
  )
}

export default Signup