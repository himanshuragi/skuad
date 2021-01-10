import React, { useEffect, useState } from 'react'
import axios from 'axios'

function PopUp({ShowPOPUP,setShowPOPUP}) {
 
    const [Fname,setFname] = useState('')
    const [Lname,setLname] = useState('')
    const [Email,setEmail] = useState('')
    const [Mobile,setMobile] = useState('')
    const [Location_type,setLocation_type] = useState('select')
    const [Location_string,setLocation_string] = useState('')
    const [Allvalid, setAllvalid] = useState(false)
    const postURL = `${process.env.REACT_APP_API_URL}/api/leads/`
    var lead_data = {};
    
    lead_data = {
        id : 1,
        "first_name": Fname,
        "last_name": Lname,
        "mobile": Mobile,
        "email": Email,
        "location_type": Location_type,
        "location_string": Location_string
    }
    const ops = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: JSON.stringify(lead_data) ,
        url: postURL
    }


   // Add leads form validation
    useEffect(()=>{
        if(!(Fname==='') && !(Lname==='') && (RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(Email)) && (RegExp(/^\d{10}$/).test(Mobile)) && !(Location_type===(''||'select') ) && !(Location_string==='')){
            setAllvalid(true)
         }
         else{
             setAllvalid(false)
         }
    },[Fname,Lname,Email,Mobile,Location_type,Location_string])

    // submitting lead data via POST method
    // Api is reponsing with error 500, a server side error! can't proceed further. Submitting assignment here itself
    const formHandler = (e) => {
        e.preventDefault()
        if(Allvalid){
            axios( ops).then((res) => {
                console.log("post response: " + res);
                }).catch(function (error) {
                console.log("post error: " + error);
                });
        }
    }
    return (
        <form onSubmit={formHandler} className={`add_lead_form ${ShowPOPUP && `show_pop_up`}`}>
            <h1>Add Lead</h1>
            <div className='form_inputs'>
                <label htmlFor="first_name">First name
                    <span className='required'>*</span>
                </label>
                <label htmlFor="last_name">Last name
                    <span className='required'>*</span>
                </label>
                <input type="text" onChange={e => setFname(e.target.value)} id="first_name" name="first_name" value={Fname}/>
                <input type="text" onChange={e => setLname(e.target.value)} id="last_name" name="last_name" value={Lname}/>
                <label htmlFor="email">Email Address
                    <span className='required'>*</span>
                </label>
                <label htmlFor="mobile">Mobile (10-digit)
                    <span className='required'>*</span>
                </label>
                <input type="text" onChange={e => setEmail(e.target.value)} id="email" name="email" value={Email}/>
                <input type="text" onChange={e => setMobile(e.target.value)} id="mobile" name="mobile" value={Mobile}/>
                <label htmlFor="location_type">Location Type<span className='required'>*</span></label>
                <label htmlFor="location_string">Location String<span className='required'>*</span></label>
                <select id='location_type' onChange={e => setLocation_type(e.target.value)} name='location_type' value={Location_type}>
                    <option value='select'>--Select--</option>
                    <option value='city'>City</option>
                    <option value='country'>Country</option>
                </select>
                <input type="text" id="location_string" onChange={e => setLocation_string(e.target.value)} name="location_string" value={Location_string}/>
            </div>
            <div className='form_btns'>  
                <button type='button' className='close_btn' onClick={()=>
                    {setShowPOPUP(false);
                    setFname(''); 
                    setLname(''); 
                    setEmail(''); 
                    setMobile(''); 
                    setLocation_string('')}}>
                 Close</button>  
                <button type='submit' className={`add_lead_btn ${Allvalid && 'show_lead_btn' }`}>Save</button>
            </div>        
        </form>
    )
}

export default PopUp
