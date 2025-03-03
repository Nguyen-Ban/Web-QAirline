//import React from 'react';
import PropTypes from 'prop-types';

const CancellationModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="cancellation-modal-overlay">
            <div className="cancellation-modal-container">
                <div className="cancellation-modal-header">
                    <h2>Cancellation & Refund Policy</h2>
                    <button 
                        className="close-button" 
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                <div className="cancellation-modal-content">
                    <div className="cancellation-timeline">
                        <h3>Cancellation Timeline</h3>
                        <ul>
                            <li>
                                <strong>More than 7 days before departure:</strong> 
                                <span className="full-refund"> Full Refund & Free Cancellation</span>
                            </li>
                            <li>
                                <strong>5-7 days before departure:</strong> 
                                <span className="change-only"> Free Changes Only</span>
                            </li>
                            <li>
                                <strong>3-5 days before departure:</strong> 
                                <span className="partial-refund-50"> 50% Refund</span>
                            </li>
                            <li>
                                <strong>2-3 days before departure:</strong> 
                                <span className="partial-refund-25"> 25% Refund</span>
                            </li>
                            <li>
                                <strong>Less than 24 hours before departure:</strong> 
                                <span className="no-refund"> No Refund or Changes</span>
                            </li>
                        </ul>
                    </div>

                    <div className="cancellation-notes">
                        <h3>Important Notes</h3>
                        <p>
                            Refund calculations are based on the total ticket price. 
                            Administrative fees may apply. Cancellations and changes 
                            must be made through our official customer service channels.
                        </p>
                    </div>
                </div>

                <div className="cancellation-modal-actions">
                    <button 
                        className="understood-button"
                        onClick={onClose}
                    >
                        Understood
                    </button>
                </div>
            </div>
        </div>
    );
};

CancellationModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default CancellationModal;