import React, { useEffect, useState } from 'react';
import './MainContent.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../Component/dataSources/Api/catelogApi'
import Loader from './shared/loader';
export default function MyProject() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/list_projects_details`, {
          params: {
            user_email: 'nick@example.com',  
            limit: 10,
            offset: 0,
          },
        });
        setProjects(response.data.entries);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);
  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div className='Selected_tables container-fluid'>
          <div className='my-project-main-container'>
            <div className='myproject-content d-flex justify-content-between'>
              <div className='myproject-heading'>
                <h2>My Project</h2>
              </div>
              <div>
                <NavLink to='/'>
                  <button className='new_project'>Create New Project</button>
                </NavLink>
              </div>
            </div>
            <div className='overflows'>
              <table className="table table-bordered table-hover">
                <thead className="table_color">
                  <tr className='table_row table_row_selected'>
                    <th className='full_name full_name_selected'>Project Name</th>
                    <th className='modality modality_selected'>Owner</th>
                    <th className='Data_provider Data_provider_Selected'>Created</th>
                    <th className='terms terms__Selected'>Updated</th>
                    <th className='Homepage Homepage_Selected'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.uuid} className="table_data_row table_data_row_selected">
                      <td>{project.name}</td>
                      <td>{project.owner}</td>
                      <td>{new Date(project.created_at).toLocaleDateString()}</td>
                      <td>{new Date(project.updated_at).toLocaleDateString()}</td>
                      <td>
                        <a href='#' className='edit_link'>Edit</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}