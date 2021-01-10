import React, { useState } from 'react'
import axios from 'axios'

function Table({setShowPOPUP}) {
    const [Data,setData] = useState('')
    axios.get(`${process.env.REACT_APP_API_URL}/api/leads/?location_string=India`).then(resp=> setData(...resp.data))
    return (
        <div>
            <button className='add_lead_modal_btn' onClick={()=>setShowPOPUP(true)}>Add Lead</button>
            <table className='leads_table'>
                <thead className='leads_table_head'>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile Num</th>
                        <th>Location Type</th>
                        <th>Location String</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {[Data]
                    .map((data,i) => 
                    <tr key={i} className='leads_table_row'>
                        <td>{data.first_name} {data.last_name}</td>
                        <td>{data.email}</td>
                        <td>{data.mobile}</td>
                        <td>{data.location_type}</td>
                        <td>{data.location_string}</td>
                        <td>
                            <button className='update_lead_modal_btn'>Mark Update</button>
                            <button className='delete_lead_modal_btn'>Delete</button>
                        </td>
                    </tr>)}
                </tbody>
</table>
        </div>
    )
}

export default Table
