import Modal from '@mui/material/Modal';
import React from 'react';
import './Loader.css';

const Loader = ({ loading, bg_papper }) => {
    return (
        <Modal open={loading} className={`${bg_papper === true ? '' : 'custom_modal_loader'}`}>
            <div style={{ color: '#5177ff' }} className={`la-line-scale-pulse-out-rapid la-3x position-fixed w-100 h-100 d-flex justify-content-center align-items-center`}>
                <div className="rounded"></div>
                <div className="rounded"></div>
                <div className="rounded"></div>
                <div className="rounded"></div>
                <div className="rounded"></div>
            </div>
        </Modal>
    )
}

export default Loader
