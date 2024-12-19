//import React from 'react'
import { useState } from "react";

const Faq = () => {
    // 사용자가 직접 작성할 질문과 답변
    const [faqData] = useState([
        { id: 1, question: "What is your cancellation policy?", answer: "You can cancel your booking up to 24 hours before departure for a full refund. If you cancel within 24 hours of departure, a cancellation fee may apply. Refunds will be processed within 7-10 business days. Please note that some promotional fares may be non-refundable." },
        { id: 2, question: "Can I change my flight dates?", answer: "Yes, you can change your flight dates, but change fees may apply depending on the fare type. Changes must be made at least 24 hours before the scheduled departure. If the new fare is higher, you will need to pay the fare difference. Please contact our customer service for assistance with changes." },
        { id: 3, question: "What is the baggage allowance?", answer: "The baggage allowance varies depending on the class of travel and destination. Economy class passengers are allowed one checked bag up to 23 kg and one carry-on bag up to 7 kg. Business class passengers are allowed two checked bags up to 32 kg each and one carry-on bag up to 10 kg. Please check our website for specific details." },
        { id: 4, question: "How can I check in for my flight?", answer: "You can check in online through our website or mobile app starting 24 hours before departure. Alternatively, you can check in at the airport using our self-service kiosks or at the check-in counters. Please have your booking reference and identification ready." },
        { id: 5, question: "What documents do I need for international travel?", answer: "For international travel, you will need a valid passport and any required visas. Some destinations may also require additional documents such as a negative COVID-19 test result or proof of vaccination. Please check the entry requirements for your destination before traveling." },
        { id: 6, question: "Can I select my seat in advance?", answer: "Yes, you can select your seat in advance during the booking process or through the manage booking section on our website. Seat selection is complimentary for business class passengers. Economy class passengers may need to pay a fee for preferred seats." },
        { id: 7, question: "What is the policy for traveling with pets?", answer: "Pets are allowed in the cabin or as checked baggage, depending on their size and weight. Small pets (up to 8 kg including the carrier) can travel in the cabin. Larger pets must be transported as checked baggage. Please contact our customer service for specific requirements and fees." },
        { id: 8, question: "How can I earn frequent flyer miles?", answer: "You can earn frequent flyer miles by flying with us or our partner airlines. Miles can also be earned through our co-branded credit cards and by using services from our non-airline partners. Please enroll in our frequent flyer program to start earning miles." },
        { id: 9, question: "What are the benefits of the frequent flyer program?", answer: "Members of our frequent flyer program enjoy benefits such as priority check-in, extra baggage allowance, lounge access, and the ability to earn and redeem miles for flights and upgrades. Higher-tier members receive additional perks such as priority boarding and complimentary upgrades." },
        { id: 10, question: "Can I request a special meal?", answer: "Yes, we offer a variety of special meals to cater to different dietary requirements. Special meals can be requested during the booking process or through the manage booking section on our website. Please make your request at least 24 hours before departure." },
        { id: 11, question: "What is the policy for unaccompanied minors?", answer: "We offer a special service for unaccompanied minors aged 5-12 years. Our staff will assist the child throughout the journey, from check-in to arrival. A service fee applies, and the parent or guardian must complete a consent form. Please contact our customer service for more details." },
        { id: 12, question: "Can I bring sports equipment?", answer: "Yes, sports equipment such as golf clubs, skis, and bicycles can be transported as checked baggage. Standard baggage fees apply, and some items may require special handling. Please contact our customer service to make arrangements for transporting sports equipment." },
        { id: 13, question: "What is the policy for traveling with infants?", answer: "Infants under 2 years old can travel on an adult's lap for a reduced fare. A separate seat can be purchased if preferred. We provide bassinets on long-haul flights, subject to availability. Please request a bassinet at the time of booking." },
        { id: 14, question: "How can I upgrade my seat?", answer: "You can upgrade your seat using frequent flyer miles or by paying an upgrade fee. Upgrades are subject to availability and can be requested during the booking process or through the manage booking section on our website. Please contact our customer service for assistance." },
        { id: 15, question: "What is the policy for lost or damaged baggage?", answer: "If your baggage is lost or damaged, please report it to our baggage service desk at the airport immediately. We will make every effort to locate and return your baggage as quickly as possible. Compensation may be provided for lost or damaged items, subject to our terms and conditions." },
        { id: 16, question: "Can I travel with medical equipment?", answer: "Yes, you can travel with medical equipment such as oxygen concentrators and CPAP machines. Please notify us at least 48 hours before departure to make the necessary arrangements. Some equipment may require medical clearance. Please contact our customer service for more information." },
        { id: 17, question: "What is the policy for traveling with a service animal?", answer: "Service animals are allowed to travel in the cabin free of charge. Please provide documentation of the animal's training and certification. Notify us at least 48 hours before departure to make the necessary arrangements. Please contact our customer service for more details." },
        { id: 18, question: "Can I request a refund for my ticket?", answer: "Refunds are available for eligible tickets, subject to our fare rules and conditions. Refund requests can be made through the manage booking section on our website or by contacting our customer service. Refunds will be processed within 7-10 business days." },
        { id: 19, question: "What is the policy for group bookings?", answer: "We offer special rates and services for group bookings of 10 or more passengers. Group bookings can be made through our website or by contacting our group sales department. Please provide details of your travel requirements, and we will assist you with the booking process." },
        { id: 20, question: "Can I travel with musical instruments?", answer: "Yes, musical instruments can be transported as checked baggage or in the cabin, depending on their size and weight. Standard baggage fees apply, and some items may require special handling. Please contact our customer service to make arrangements for transporting musical instruments." },
        { id: 21, question: "What is the policy for traveling with firearms?", answer: "Firearms and ammunition can be transported as checked baggage, subject to our security and safety regulations. Please notify us at least 48 hours before departure to make the necessary arrangements. Firearms must be unloaded and securely packed. Please contact our customer service for more details." },
        { id: 22, question: "Can I purchase travel insurance?", answer: "Yes, we offer travel insurance to cover unexpected events such as trip cancellations, medical emergencies, and lost baggage. Travel insurance can be purchased during the booking process or through the manage booking section on our website. Please review the policy details before purchasing." },
        { id: 23, question: "What is the policy for traveling with children?", answer: "Children aged 2-11 years must have their own seat and will be charged the applicable child fare. We offer special meals and entertainment options for children on long-haul flights. Please request these services at the time of booking." },
        { id: 24, question: "Can I bring duty-free items on board?", answer: "Yes, duty-free items purchased at the airport can be brought on board as part of your carry-on allowance. Please ensure that liquids and gels are within the allowed limits and securely packed. Duty-free items must be declared at customs upon arrival." },
        { id: 25, question: "What is the policy for traveling with liquids?", answer: "Liquids, gels, and aerosols in carry-on baggage must be in containers of 100 ml or less and placed in a clear, resealable plastic bag. Each passenger is allowed one plastic bag. Larger containers must be packed in checked baggage. Please check our website for specific details." },
        { id: 26, question: "Can I request a wheelchair?", answer: "Yes, we provide wheelchair assistance for passengers with reduced mobility. Please request this service during the booking process or through the manage booking section on our website. Notify us at least 48 hours before departure to make the necessary arrangements." },
        { id: 27, question: "What is the policy for traveling with a stroller?", answer: "Strollers can be checked in at the airport or used up to the boarding gate, where they will be collected and returned upon arrival. Strollers are transported free of charge and do not count towards your baggage allowance. Please contact our customer service for more details." },
        { id: 28, question: "Can I bring food on board?", answer: "Yes, you can bring your own food on board, but please be mindful of other passengers and avoid strong-smelling foods. Liquids and gels must comply with the carry-on baggage regulations. Please check our website for specific details on allowed items." },
        { id: 29, question: "What is the policy for in-flight entertainment?", answer: "We offer a wide selection of movies, TV shows, music, and games on our in-flight entertainment system. Passengers can access the entertainment system through personal screens or their own devices. Please check our website for the latest entertainment options." },
        { id: 30, question: "Can I use electronic devices on board?", answer: "Yes, you can use electronic devices such as smartphones, tablets, and laptops on board. Devices must be in airplane mode during the flight. Larger devices must be stowed during takeoff and landing. Please follow the crew's instructions regarding the use of electronic devices." },
        { id: 31, question: "What is the policy for in-flight Wi-Fi?", answer: "We offer in-flight Wi-Fi on select flights for a fee. Passengers can purchase Wi-Fi access during the flight and stay connected throughout the journey. Please check our website for details on availability and pricing." },
        { id: 32, question: "Can I request a receipt for my booking?", answer: "Yes, you can request a receipt for your booking through the manage booking section on our website or by contacting our customer service. Receipts" },
    ]);

    // 상태 관리
    const [currentPage, setCurrentPage] = useState(1);
    const [openFaq, setOpenFaq] = useState(null);

    const faqsPerPage = 10;
    const totalPages = Math.ceil(faqData.length / faqsPerPage);

    // 현재 페이지에 표시할 FAQ 목록 계산
    const currentFaqs = faqData.slice(
        (currentPage - 1) * faqsPerPage,
        currentPage * faqsPerPage
    );

    // 페이지 변경 핸들러
    const handlePageChange = (page) => {
        setCurrentPage(page);
        setOpenFaq(null); // 드롭다운 초기화
    };

    // 드롭다운 토글 핸들러
    const handleToggleFaq = (id) => {
        setOpenFaq(openFaq === id ? null : id);
    };

    return (
        <div className="faqPage">
            <h1 className="faqTitle">Frequently Asked Questions</h1>
            <br/>
            <p className="faqCount">Total: {faqData.length}</p>

            {/* FAQ 목록 */}
            <div className="faqList">
                {currentFaqs.map((faq) => (
                    <div
                        key={faq.id}
                        className={`faqItem ${openFaq === faq.id ? "open" : ""}`}
                        onClick={() => handleToggleFaq(faq.id)}
                    >
                        <div className="faqQuestion">{faq.question}</div>
                        {openFaq === faq.id && (
                            <div className="faqAnswer">{faq.answer}</div>
                        )}
                    </div>
                ))}
            </div>

            {/* 페이지네이션 */}
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={currentPage === index + 1 ? "active" : ""}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default Faq