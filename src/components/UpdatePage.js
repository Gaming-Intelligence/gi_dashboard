import React, { useState } from 'react';
import axios from 'axios';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CRow,
} from '@coreui/react'

const UpdatePage = () => {
    const [youtubeLink, setYoutubeLink] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    // YouTube URL validation function
    const isValidYoutubeLink = (link) => {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
        return youtubeRegex.test(link);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage('');

        // Validate YouTube link
        if (!isValidYoutubeLink(youtubeLink)) {
            setError('Please enter a valid YouTube link.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('https://game-backend-api.onrender.com/api/user/updateLinkAndCode', {
                link: youtubeLink,
                code,
            });
            setMessage('Update successful');
        } catch (err) {
            setError(
                err.response?.data?.message || 'Failed to update. Please try again.'
            );
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <CCol xs={12}>
            <CCard className="mb-4">
                <CCardHeader>
                    <strong>Update YouTube Link and Code</strong>
                </CCardHeader>
                <CCardBody>
                    {message && <p className="text-success">{message}</p>}
                    {error && <p className="text-danger">{error}</p>}
                    <CForm onSubmit={handleSubmit}>
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="youtubeLink" className="col-sm-2 col-form-label">
                                YouTube Link
                            </CFormLabel>
                            <CCol sm={10}>
                                <CFormInput
                                    type="url"
                                    id="youtubeLink"
                                    placeholder="Enter YouTube link"
                                    value={youtubeLink}
                                    onChange={(e) => setYoutubeLink(e.target.value)}
                                    required
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="alphaCode" className="col-sm-2 col-form-label">
                                Code
                            </CFormLabel>
                            <CCol sm={10}>
                                <CFormInput
                                    type="text"
                                    id="alphaCode"
                                    placeholder="Enter alphanumeric code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    required
                                />
                            </CCol>
                        </CRow>
                        <CButton color="primary" type="submit" disabled={loading}>
                            {loading ? 'Updating...' : 'Update'}
                        </CButton>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>
    );
};

export default UpdatePage;