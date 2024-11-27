//import React from 'react'
import { useState } from 'react';
import { FiUserPlus } from "react-icons/fi";
import { FaWheelchair } from "react-icons/fa";
import { FaHandHoldingMedical } from "react-icons/fa6";
import { MdOutlineFamilyRestroom } from "react-icons/md";

import cancel from '../../assets/FlightMeal/cancel.png';

const OtherService = () => {
    const [activeService, setActiveService] = useState(null);

  const services = [
    {
      id: 'family',
      icon: <MdOutlineFamilyRestroom />,
      title: 'Family Service',
      description: 'Not used to flying long distance overseas?',
      modalContent: {
        title: 'Family Service',
        overview: 'QAirline offers comprehensive Family Service to ensure a comfortable and stress-free travel experience for families.',
        details: [
          'Dedicated support for families with children',
          'Special assistance from check-in to boarding',
          'Comfortable seating arrangements',
          'Child-friendly amenities and entertainment'
        ],
        benefits: [
          'Reduced travel stress for parents',
          'Safe and enjoyable journey for children',
          'Personalized travel support'
        ]
      }
    },
    {
      id: 'minors',
      icon: <FiUserPlus />,
      title: 'Unaccompanied Minors Service',
      description: 'Safe and fun trip for passengers traveling alone',
      modalContent: {
        title: 'Unaccompanied Minors Service',
        overview: 'Our specialized service ensures the safety and comfort of children traveling without parents.',
        details: [
          'Continuous monitoring throughout the journey',
          'Dedicated staff for personal assistance',
          'Special boarding and arrival procedures',
          'Regular communication with parents'
        ],
        benefits: [
          'Parents can travel with peace of mind',
          'Children receive professional care',
          'Strict safety protocols'
        ]
      }
    },
    {
      id: 'disability',
      icon: <FaWheelchair />,
      title: 'Disability Assistance',
      description: 'Stay comfortable and healthy during your trip',
      modalContent: {
        title: 'Disability Assistance Service',
        overview: 'QAirline is committed to providing comprehensive support for passengers with disabilities.',
        details: [
          'Wheelchair accessibility',
          'Special boarding assistance',
          'Customized travel arrangements',
          'Trained staff for personalized support'
        ],
        benefits: [
          'Inclusive travel experience',
          'Barrier-free journey',
          'Dignity and respect for all passengers'
        ]
      }
    },
    {
      id: 'medical',
      icon: <FaHandHoldingMedical />,
      title: 'Medical Services',
      description: 'Ensuring your health and comfort',
      modalContent: {
        title: 'Medical Support Services',
        overview: 'We provide comprehensive medical support to ensure your health and safety during travel.',
        details: [
          'On-board medical equipment',
          'Health consultation services',
          'Special medical assistance',
          'Emergency medical preparedness'
        ],
        benefits: [
          'Peace of mind for travelers',
          'Professional medical support',
          'Comprehensive health care'
        ]
      }
    }
  ];

  const openModal = (serviceId) => {
    setActiveService(serviceId);
  };

  const closeModal = () => {
    setActiveService(null);
  };

  const renderModal = (service) => {
    if (!service) return null;

    return (
      <div className="service-modal-overlay" onClick={closeModal}>
        <div 
          className="service-modal-content" 
          onClick={(e) => e.stopPropagation()}
        >
          <img 
            src={cancel} 
            alt="Close" 
            className="modal-close-btn" 
            onClick={closeModal} 
          />
          <div className="modal-header">
            <div className="modal-icon">{service.icon}</div>
            <h2>{service.modalContent.title}</h2>
          </div>
          <p className="modal-overview">{service.modalContent.overview}</p>
          
          <div className="modal-section">
            <h3>Service Details</h3>
            <ul>
              {service.modalContent.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
          
          <div className="modal-section">
            <h3>Benefits</h3>
            <ul>
              {service.modalContent.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="other-services-container">
      <div className="services-header">
        <h1>Other Services</h1>
        <p>Discover the additional support we offer to make your journey exceptional</p>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="service-card"
            onClick={() => openModal(service)}
          >
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>

      {activeService && renderModal(activeService)}
    </div>
  );
};

export default OtherService