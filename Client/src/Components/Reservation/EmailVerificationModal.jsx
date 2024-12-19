import PropTypes from 'prop-types';

const EmailVerificationModal = ({
    isOpen,
    onClose,
    onVerify,
    verificationCode,
    onChangeCode
}) => {
    if (!isOpen) return null;

    return (
        <div className="email-verification-modal-overlay">
            <div className="email-verification-modal">
                <button className="modal-close" onClick={onClose}>✕</button>
                <h2>Verify Your Email</h2>

                <p>We&apos;ve sent a 6-digit verification code to your email.
                    Please check your inbox and enter the code below.</p>


                <div className="verification-input-group">
                    <label htmlFor="verificationCode">Verification Code</label>
                    <input
                        id="verificationCode"
                        type="text"
                        placeholder="Enter 6-digit code"
                        value={verificationCode}
                        onChange={onChangeCode}
                        maxLength="6"
                        className="verification-input"
                    />
                </div>

                <div className="modal-actions">
                    <button
                        className="verify-btn"
                        onClick={onVerify}
                    >
                        Verify
                    </button>
                    <button
                        className="resend-btn"
                        onClick={onClose}
                    >
                        Resend Code
                    </button>
                </div>
            </div>
        </div>
    );
};

EmailVerificationModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onVerify: PropTypes.func.isRequired,
    verificationCode: PropTypes.string.isRequired,
    onChangeCode: PropTypes.func.isRequired
};

export default EmailVerificationModal;