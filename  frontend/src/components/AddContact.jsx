import React, { useState, useRef } from "react";
import Service  from "../service/Service";

function AddContact({props}) {
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");


    const onChangePhone = (e) => {
        const phone = e.target.value;
        setPhone(phone);
    }

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    }

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    }

    const handleLogin = (e) => {
        
        e.preventDefault();
        // form.current.validateAll();
     
       // if(checkBtn.current.context._errors.length >=  0) {
            Service.addContact(name,email,phone).then(
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
      

      <div className='container-sm d-flex justify-content-lg-center'>
            <form onSubmit={handleLogin}>
                
             <div className="mb-3">  
                  <label for="exampleInputEmail1" className="form-label">Name</label>
                  <input 
                        name="name"
                      value={name}
                       type='name'
                      onChange={onChangeName}
                    // validations={[required]} 
                        placeholder="Name" className="form-control" 
                  />
                </div>
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
                  <label for="exampleInputPassword1" className="form-label">Phone</label>
                  <input 
                        name="password"
                       value={phone}
                     
                        onChange={onChangePhone}
                    // validations={[required]} 
                        placeholder="Phone" className="form-control" 
                  />
        </div>
        <button type="submit" value="Login" className="btn btn-primary">Add Contact</button>
        </form>
    </div>
  )
}
export default AddContact