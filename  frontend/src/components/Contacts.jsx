import React, { useState, useEffect } from "react";
import Service  from "../service/Service";

function Contacts() {


    const [contact, setContact] = useState([]);

    const getContact = () => {
        Service.getContacts()
        .then(response => {
            setContact(response.data.contacts);
        })
        .catch(e => {
            console.log(e);
        });
  
    };
    useEffect(() => {
        // Update the document title using the browser API
        getContact();
        console.log(contact)
    },[]);
    
    
    
    

    return (
      
        <div className='container'>
          <table class="table">
            <thead>
                <tr>
                <th scope="col">S.No</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                </tr>
            </thead>
              <tbody>
                    {contact &&
                    contact.map((cont, index) => (
                        <tr>
                        <td>{index+1}</td>
                            <td>{cont.name}</td>
                            <td>{cont.email}</td>
                            <td>{cont.phone}</td>
                        </tr>
                    ))}
            </tbody>
            </table>
    </div>
  )
}

export default Contacts