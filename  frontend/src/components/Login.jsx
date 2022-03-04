import React, { useState, useEffect } from "react";
import Service  from "../service/Service";
function Login({props}) {
    
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [u,setU] = useState("")


    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }
    useEffect(() => {
      // Update the document title using the browser API
    
      setU(JSON.parse(localStorage.getItem("user")));
    },[]);
  
   


    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    }
  
    const Logout = (e) => {
      localStorage.clear();
      window.location.reload();
    }
  
    const handleLogin = (e) => {
        
      e.preventDefault();
      
      if (u) {
        console.log(u);
      }
        // form.current.validateAll();
     
       // if(checkBtn.current.context._errors.length >=  0) {
            Service.login(email,password).then(
            () => {
                console.log("logged in as " + email);   
                window.location.reload(); 
                
            },
            (error) => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
              
              console.log(resMessage);
              setMessage(resMessage);
              
            });
        // } else {
        //     setLoading(false);
        // }
    };
    return (
      
      
           
      <div className='container-sm justify-content-lg-center'>
        {/* <div className="container"> */}
          {u && u ? (
          <div className="container-sm justify-content-lg-center">
           <h4> Logged in as  {u.email} ... </h4>
            
            <button onClick={Logout} value="Login" className="btn btn-danger">Logout</button>
            
          
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

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        <button type="submit" value="Login" className="btn btn-primary">Submit</button>
            </form>
        )}
            </div>
      
  )
}

export default Login