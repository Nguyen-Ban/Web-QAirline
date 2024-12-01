import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
//import { useNavigate } from 'react-router-dom';

const propTypesShape = {
    formData: PropTypes.shape({
        termsAccepted: PropTypes.bool.isRequired,
        username: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string,
        confirmPassword: PropTypes.string
    }).isRequired,
    setFormData: PropTypes.func.isRequired,
    errors: PropTypes.shape({
        terms: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string,
        confirmPassword: PropTypes.string,
        submit: PropTypes.string
    }),
    onNext: PropTypes.func,
    onPrev: PropTypes.func,
    onSubmit: PropTypes.func
};

function TermsStep({ formData, setFormData, onNext }) {
    const handleTermsAccept = (e) => {
        const isChecked = e.target.checked;
        setFormData(prev => ({ ...prev, termsAccepted: isChecked }));

        const requiredCheckboxes = document.querySelectorAll('.term-item input[type="checkbox"]:not(.master-checkbox)');
        requiredCheckboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
        });
    };

    const validateRequiredTerms = () => {
        const requiredCheckboxes = document.querySelectorAll('.term-item:not(.optional) input[type="checkbox"]');
        return Array.from(requiredCheckboxes).every(checkbox => checkbox.checked);
    };

    const handleNextStep = () => {
        if (validateRequiredTerms()) {
            onNext();
        } else {
            setFormData(prev => ({
                ...prev,
                termsError: "You must accept all required terms and conditions"
            }));
        }
    };

    return (
        <div className="terms-step">
            <h2>Consent to Terms and Conditions</h2>
            <div className="terms-content">
                <h3>Please read and agree to the following terms and conditions:</h3>

                <div className="terms-list">
                    <div className="term-item">
                        <input
                            type="checkbox"
                            id="terms-use"
                            name="terms-use"
                            required
                        />
                        <label htmlFor="terms-use">[Required] Terms of Use</label>
                        <a href="#">View</a>
                    </div>

                    <div className="term-item">
                        <input
                            type="checkbox"
                            id="mileage-terms"
                            name="mileage-terms"
                            required
                        />
                        <label htmlFor="mileage-terms">[Required] Mileage Transaction Terms</label>
                        <a href="#">View</a>
                    </div>

                    <div className="term-item">
                        <input
                            type="checkbox"
                            id="privacy-policy"
                            name="privacy-policy"
                            required
                        />
                        <label htmlFor="privacy-policy">[Required] Privacy Policy</label>
                        <a href="#">View</a>
                    </div>

                    <div className="term-item optional">
                        <input
                            type="checkbox"
                            id="vendor-policy"
                            name="vendor-policy"
                        />
                        <label htmlFor="vendor-policy">[Optional] Third Party Vendor Policy</label>
                        <a href="#">View</a>
                    </div>

                    <div className="term-item optional">
                        <input
                            type="checkbox"
                            id="marketing-consent"
                            name="marketing-consent"
                        />
                        <label htmlFor="marketing-consent">[Optional] Consent to Marketing</label>

                        <div className="marketing-channels">
                            <label className="email-marketing">
                                <input type="checkbox" name="email-marketing" />
                                Email
                            </label>
                            <label>
                                <input type="checkbox" name="sms-marketing" />
                                SMS
                            </label>
                        </div>
                    </div>
                </div>

                <div className="final-consent">
                    <label>
                        <input
                            type="checkbox"
                            className="master-checkbox"
                            checked={formData.termsAccepted}
                            onChange={handleTermsAccept}
                        />
                        <p>I agree to all required and optional items</p>
                    </label>
                    {formData.termsError && <p className="error">{formData.termsError}</p>}
                </div>

                <div className="step-navigation">
                    <button onClick={handleNextStep}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

TermsStep.propTypes = {
    formData: propTypesShape.formData,
    setFormData: propTypesShape.setFormData,
    errors: PropTypes.shape({
        terms: PropTypes.string
    }),
    onNext: propTypesShape.onNext
};

function MemberInfoStep({ formData, setFormData, errors, onSubmit }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="member-info-step">
            <h2>Enter Member Information</h2>

            <form onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                    {errors.username && <p className="error">{errors.username}</p>}
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                </div>

                <div className="step-navigation">
                    <button type="submit">Complete Registration</button>
                </div>
            </form>
        </div>
    );
}

MemberInfoStep.propTypes = {
    formData: propTypesShape.formData,
    setFormData: propTypesShape.setFormData,
    errors: propTypesShape.errors,
    onNext: propTypesShape.onNext,
    onSubmit: propTypesShape.onSubmit
};

function SignUpCompleteStep() {
    return (
        <div className="signup-complete-step">
            <h2>Registration Successful!</h2>
            <p>Your account has been created. You can now log in and start booking flights.</p>
            <button onClick={() => window.location.href = '/login'}>
                Go to Login
            </button>
        </div>
    );
}

const Register = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [formData, setFormData] = useState({
        termsAccepted: false,
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const steps = [
        {
            title: "Consent to Terms and Conditions",
            component: TermsStep
        },
        {
            title: "Enter Member Information",
            component: MemberInfoStep
        },
        {
            title: "Sign Up Complete",
            component: SignUpCompleteStep
        }
    ];

    const handleNextStep = () => {
        if (validateCurrentStep()) {
            setActiveStep(prev => prev + 1);
        }
    };

    const handlePrevStep = () => {
        setActiveStep(prev => Math.max(1, prev - 1));
    };

    const validateCurrentStep = () => {
        const newErrors = {};

        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        switch (activeStep) {
            case 1:
                if (!formData.termsAccepted) {
                    newErrors.terms = "You must accept the terms and conditions";
                }
                break;
            case 2:
                if (!formData.username) newErrors.username = "Username is required";
                if (!formData.email) newErrors.email = "Email is required";
                if (!formData.password) newErrors.password = "Password is required";
                if (formData.password !== formData.confirmPassword) {
                    newErrors.confirmPassword = "Passwords do not match";
                }
                // Additional email validation
                if (formData.email && !emailRegex.test(formData.email)) {
                    newErrors.email = "Invalid email format";
                }
                // Password strength validation
                if (formData.password && formData.password.length < 8) {
                    newErrors.password = "Password must be at least 8 characters long";
                }
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        const newErrors = {};

        if (!formData.username) newErrors.username = "Username is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        // If there are any validation errors, set them and prevent submission
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            // Prepare the registration payload matching backend expectations
            const registrationPayload = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: 'customer'
            };

            const response = await axios.post('http://localhost:4000/api/auth/register', registrationPayload);

            // If registration is successful
            if (response.status === 201) {
                // Store the token if returned by the backend
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                }
                // Move to the final step
                setActiveStep(3);
            }
        } catch (error) {
            // Handle registration errors
            if (error.response) {
                // Backend returned an error response
                setErrors({
                    submit: error.response.data.error || "Registration failed"
                });
            } else if (error.request) {
                // No response received
                setErrors({
                    submit: "No response from server. Please check your connection."
                });
            } else {
                // Error setting up the request
                setErrors({
                    submit: "An error occurred during registration"
                });
            }
        }
    };

    const CurrentStepComponent = steps[activeStep - 1].component;

    return (
        <div className="registration-container">
            <div className="registration-steps">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`step ${activeStep === index + 1 ? 'active' : ''}`}
                    >
                        Step {index + 1}: {step.title}
                    </div>
                ))}
            </div>

            <div className="step-content">
                <CurrentStepComponent
                    formData={formData}
                    setFormData={setFormData}
                    errors={errors}
                    onNext={handleNextStep}
                    onPrev={handlePrevStep}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );


};

export default Register;