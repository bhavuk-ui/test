import React from 'react'
import './MainContent.css'
export default function MyProject() {
  return (
    <div>
      <div className='my-project-main-container'>
      <div className=' '>
      <div className='myproject-content d-flex justify-content-between'>
      <div className='myproject-heading'>
         
         <h2>My Project</h2></div>
       <div> <button className='new_project'>Create New Project</button></div>
            </div>
       
      </div>
      <div className='overflows'>
      <table className="table table-bordered table-hover">
    <thead className="table_color">
        <tr className='table_row table_row_selected'>
        
            <th className='full_name full_name_selected'>Project Name</th>
            <th className='modality  modality_selected'>Owner</th>
            <th className='Data_provider Data_provider_Selected'>Created</th>
   
            <th className='terms terms__Selected'>Updated</th>
            <th className='Homepage Homepage_Selected'>Action</th>
        </tr>
    </thead>
    <tbody>
       
            <tr className={`table_data_row table_data_row_selected `}>
              
                <td>name</td>
                <td>modality</td>
                <td>provider</td>
                {/* <td>{data.dataAvailability}</td>
                <td>{data.personalData}</td> */}
                <td>data.terms</td>
                <td>
                      <a href='#' className='edit_link'>Edit</a>
                    </td>
            </tr>
      
    </tbody>
</table>
      </div>
 
      </div>
      
    </div>
 
  )
}
