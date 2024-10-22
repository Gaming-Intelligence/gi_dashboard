import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';

const LeaderBoard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://game-backend-api.onrender.com/api/user/getLeaderBoard');
        console.log(response.data);
        setUsers(response.data.users);
      } catch (err) {
        setError('Failed to fetch users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Function to cycle through colors based on index
  const getRowColor = (index) => {
    const colorCycle = ['success', 'warning', 'danger', 'info'];
    return colorCycle[index % colorCycle.length]; // Cycle through the color array
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-center">Loading...</p>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-center text-red-500">{error}</p>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Leader Board</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Rank</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Username</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Points</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Referrals</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {users && users.length > 0 ? (
                  users.map((user, index) => (
                    <CTableRow color={getRowColor(index)} key={user.id}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{user.username}</CTableDataCell>
                      <CTableDataCell>{user.coins}</CTableDataCell>
                      <CTableDataCell>{user.referredUsers}</CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan="4" className="text-center">
                      No data available
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </div>
  );
};

export default LeaderBoard;