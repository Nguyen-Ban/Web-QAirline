//import React from 'react'
import { useState } from 'react';
import '../../main.scss';

const TermsOfUse = () => {
    const [activeTab, setActiveTab] = useState('online');

    const renderOnlineService = () => (
        <div>
            <h2 className="h2tag">Chapter1. General Provisions</h2>
            <h3 className="h3tag">Article 1 (Purpose)</h3>
            <p className="ptag">These provisions aim to prescribe QAirline&#39;s and its users&#39; rights, obligations, and responsibilities in using online services (hereafter &quot;service&quot;) offered at QAirline&#39;s Internet online platform.</p>

            <h3 className="h3tag">Article 2 (Definition)</h3>
            <ol>
                <li><p className="ptag"><strong>&quot;QAirline&#39;s online platform&quot;</strong> means the virtual business site (PC/mobile websites and mobile application) that QAirline established for offering information and/or services to users and enabling them to transact goods or services by the use of information communication facilities such as computers and information communication networks.</p></li>
                <li><p className="ptag"><strong>&quot;User&quot;</strong> means members and/or non-members who receive offers from QAirline&#39;s service, pursuant to these provisions, and by connecting to QAirline&#39;s online platform.</p></li>
                <li><p className="ptag"><strong>&quot;SKYPASS&quot;</strong> means the group of members who have consented to the terms and conditions of SKYPASS, and earn bonus mileage for using QAirline and/or its affiliated businesses, and use the earned mileage.</p></li>
                <li><p className="ptag"><strong>&quot;Member&quot;</strong> means the SKYPASS member who has registered as members of QAirline online platform by offering their personal information and who receive the information provided by QAirline and are able to continually use services offered to them.</p></li>
                <li><p className="ptag"><strong>&quot;Non-member&quot;</strong> means those who use information and services offered by QAirline without being registered as members.</p></li>
                <li><p className="ptag"><strong>&quot;Partner&quot;</strong> means the partners of QAirline selling goods and services at qairline.com or the partners operating linked websites.</p></li>
                <li><p className="ptag"><strong>&quot;Personal Information&quot;</strong> means the information through which one can identify a specific individual, and includes his/her name, e-mail, or other items included in the relevant information. It also includes any information that is non-identifying when used alone, but identifying when used in connection with other information.</p></li>
            </ol>

            <h3 className="h3tag">Article 3 (Clarification and Revision of Provisions)</h3>
            <ol>
                <li><p className="ptag">&quot;QAirline&quot; provides notification of the contents of these provisions, business name, contacts (e-mail address, telephone, and fax number), and declaration number for e-commerce sales on the front service page so that users may be aware of them.</p></li>
                <li><p className="ptag">QAirline may revise these provisions within the scope of committing no violation of laws on regulations of provisions, basic laws on e-commerce, electronic signature laws, laws on the promotion of information network use and information protection, general consumer laws, and laws on consumer protection of e-commerce.</p></li>
                <li><p className="ptag">In the event of revising provisions, QAirline shall provide notification of the causes of revision and date of application, along with current provisions, on the initial page beginning seven (7) days prior to the date of application through one day before the date of application.</p></li>
                <li><p className="ptag">Revised provisions shall be applicable to users registered as members before the revision as far as the revised provisions do not violate related laws. However, with regard to users who clearly notified refusal of the application of the revised provisions during its notification period, QAirline shall apply provisions before revision to those users.</p></li>
                <li><p className="ptag">With regard to items which are not described in these provisions and interpretation of these provisions, they will follow laws on consumer protection of e-commerce, laws on regulation of provisions, consumer protection directives in e-commerce, related laws, and/or customary practices.</p></li>
            </ol>

            <h2 className="h2tag">Chapter2. Use of Services</h2>
            <h3 className="h3tag">Article 4 (Offer of Service)</h3>
            <p className="ptag">QAirline offers the following services through its online platform:</p>
            <ul>
                <li><p className="ptag">Information and services related to airline ticketing and purchase.</p></li>
                <li><p className="ptag">SKYPASS related services.</p></li>
                <li><p className="ptag">Information and services related to travelling including travel package, hotel and rental car.</p></li>
                <li><p className="ptag">Other work designated by QAirline.</p></li>
            </ul>

            <h3 className="h3tag">Article 5 (Interruption of Service)</h3>
            <ol>
                <li><p className="ptag">QAirline may temporarily suspend the offering of service on the online platform in the event of the maintenance, repair, exchange, breakdown, or interruption of information communication facilities such as computers.</p></li>
                <li><p className="ptag">With regard to the interruption of service on the online platform of Clause 1, QAirline shall notify users in a way stipulated in Article 8.</p></li>
                <li><p className="ptag">QAirline shall not compensate for damages to users or a third party in the event that service is temporarily interrupted due to causes stipulated in Clause 1 unless such damages are caused by either intentional or major fault of QAirline.</p></li>
                <li><p className="ptag">QAirline may suspend any use of service if the following violation occurs or is deemed to occur:</p>
                    <ul>
                        <li><p className="ptag">Behaviors that go against public order or traditional customs</p></li>
                        <li><p className="ptag">Any behaviors that are presumed to be associated with a crime</p></li>
                        <li><p className="ptag">Using services or planning to use services with the intention of hindering public interests</p></li>
                        <li><p className="ptag">Behaviors that hinder wholesome service usage, such as disrupting service provision</p></li>
                    </ul>
                </li>
                <li><p className="ptag">In the event of the suspension pursuant to Article 4, QAirline shall not indemnify users or any third party against damage.</p></li>
            </ol>

        </div>
    );

    const renderMileageTransactionServices = () => (
        <div>
            <h3 className="h3tag">Article 1 (Purpose)</h3>
            <p className="ptag">
                The purpose of these Terms and Conditions is to establish and regulate the
                legal relationship between QAirline Co., Ltd. (hereinafter the &quot;Company&quot;)
                and a Member (as defined below) regarding the Member&rsquo;s use of QAirline
                SKYPASS Mileage issuance and management services (hereinafter &quot;Mileage Transaction Services&quot;)
                provided by the Company.
            </p>

            <h3 className="h3tag">Article 2 (Definitions)</h3>
            <p className="ptag">
                The defined terms used in these Terms and Conditions have the following meanings:
            </p>
            <p className="ptag">
                &quot;Mileage Transaction&quot; refers to a transaction wherein the Company renders services such as issuance,
                accrual, and use of QAirline SKYPASS Mileage through an Electronic Device, and a Member utilizes such services
                in an automated manner without direct communication or in-person contact with the Company&rsquo;s personnel.
            </p>
            <p className="ptag">
                &quot;Electronic Payment Means&quot; refers to QAirline SKYPASS Mileage.
            </p>
            <p className="ptag">
                &quot;Electronic Device&quot; refers to any device used to transmit or process QAirline SKYPASS Mileage information
                electronically, which includes a computer, telephone, or other device that transmits or processes information electronically.
            </p>
            <p className="ptag">
                &quot;Access Medium&quot; refers to, in respect of a Mileage Transaction, means or information used to issue a Transaction
                Request or to secure the authenticity and accuracy of user information and transaction details, such as User IDs and Passwords
                registered with the Company for the use of Mileage Transactions, and other means designated by the Company.
            </p>
            <p className="ptag">
                &quot;User ID&quot; refers to a combination of numbers and letters created by a Member and approved by the Company for
                identification of the Member and for the Member&rsquo;s use of the Company&rsquo;s services.
            </p>
            <p className="ptag">
                &quot;Password&quot; refers to a combination of numbers and letters created by a Member and approved by the Company to
                verify the identity of the Member and to protect the Member&rsquo;s personal information.
            </p>
            <p className="ptag">
                &quot;Member&quot; refers to any person who consents to these Terms and Conditions and uses Mileage Transaction Services
                provided by the Company pursuant to these Terms and Conditions.
            </p>
            <p className="ptag">
                &quot;Transaction Request&quot; refers to any request whereby a Member instructs the Company to process a Mileage Transaction
                pursuant to these Terms and Conditions.
            </p>
            <p className="ptag">
                &quot;Error&quot; refers to any event where a Mileage Transaction of a Member is not executed pursuant to these Terms and
                Conditions, or in accordance with the Member&rsquo;s Transaction Request without any intentional or negligent conduct on the
                part of the Member.
            </p>
            <p className="ptag">
                &quot;Service Page&quot; refers to https://www.qairline.com.
            </p>

            <h3 className="h3tag">Article 3 (Notification and Amendment of Terms and Conditions)</h3>
            <p className="ptag">
                The Company shall publish these Terms and Conditions and allow a Member to review the key provisions of these Terms and
                Conditions prior to using the Mileage Transaction Services.
            </p>
            <p className="ptag">
                Upon a request made by a Member, the Company shall deliver a copy of these Terms and Conditions to the Member through
                transmission of an electronic document (including via email).
            </p>
            <p className="ptag">
                If the Company amends these Terms and Conditions, it shall notify the Members of the amendment by publishing the amended
                Terms and Conditions on the Company&rsquo;s Service Page one (1) month prior to the effective date of the amendment;
                provided that in the event where these Terms and Conditions are amended urgently due to any change in the relevant laws
                and regulations, the Company shall publish on the Company&rsquo;s Service Page and shall subsequently notify the Members thereof.
            </p>
            <p className="ptag">
                Any Member who does not consent to the amended Terms and Conditions may rescind their agreement on the Mileage Transaction
                at any time between such time the amended Terms and Conditions are published or notice of the amendment is given in accordance
                with Article 3(3) and the business day immediately preceding the effective date of the amendment. If a Member does not raise
                any objection to the amended Terms and Conditions within the foregoing period, the Member shall be deemed to have consented to
                the amended Terms and Conditions.
            </p>

            <h3 className="h3tag">Article 4 (Confirmation of Transaction Details)</h3>
            <p className="ptag">
                The Company shall ensure that a Member can confirm the transaction details (including &quot;matters regarding Error correction
                requests and results&quot; of the Member) on the search page of the Service Page, and shall, upon the request of a Member,
                deliver relevant transaction details in writing stating the details of the Member&rsquo;s transaction by fax, mail, or courier
                within two (2) weeks after receipt of such request.
            </p>
            <p className="ptag">
                In the event that the Company is unable to provide transaction details due to operational failure or malfunction of Electronic
                Devices or other reasons following the request from a Member to deliver such transaction details in writing, it shall immediately
                notify the Member of such reason through transmission of an electronic document (including via email). The period during which
                transaction details cannot be provided due to operational failure or malfunction of Electronic Devices or for other reasons shall
                not count toward the period for delivery of transaction details in writing referred to in Article 4(1).
            </p>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'online':
                return renderOnlineService();
            case 'mileage':
                return renderMileageTransactionServices();
            default:
                return null;
        }
    };

    return (
        <div className="termsOfUse-container">
            <h1 className="title">Terms Of Use</h1>
            <div className="tab-navigation">
                <button
                    className={activeTab === 'online' ? 'active' : ''}
                    onClick={() => setActiveTab('online')}
                >
                    OnlineService
                </button>

                <span className="divider">|</span>
                <button
                    className={activeTab === 'mileage' ? 'active' : ''}
                    onClick={() => setActiveTab('mileage')}
                >
                    Mileage Transaction Services
                </button>
            </div>

            <div className="content-section">
                {renderContent()}
            </div>
        </div>
    );
}

export default TermsOfUse