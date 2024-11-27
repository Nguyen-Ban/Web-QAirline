import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

import flightMeal from '../../assets/FlightMeal/flightMeal.png'
import cancel from '../../assets/FlightMeal/cancel.png'
import childMeal from '../../assets/FlightMeal/childMeal.png'
import vegetarianMeal from '../../assets/FlightMeal/vegetarianMeal.png'
import dietMeal from '../../assets/FlightMeal/dietMeal.png'
import specialMeal from '../../assets/FlightMeal/specialMeal.png'
import religiousMeal from '../../assets/FlightMeal/religiousMeal.png'

import Aos from 'aos'
import 'aos/dist/aos.css'


const InFlightMealsSection = () => {
    useEffect(() => {
        Aos.init({duration: 2000})
      }, [])


    const [activeStep, setActiveStep] = useState(1);
    const [selectedModal, setSelectedModal] = useState(null);

    const steps = [
        {
            title: "Log In to Your Account",
            content: "To begin the process of selecting your in-flight meal, you need to log in to your account on the airline's website. This ensures that your meal preferences are linked to your booking. If you don't have an account, you can easily create one by clicking on the 'Sign Up' button and following the instructions. Once logged in, navigate to the 'Manage Booking' section. Here, you will find an option to select or modify your in-flight meal preferences. This step is crucial as it verifies your identity and ensures that your meal selection is correctly associated with your flight details. Additionally, logging in allows you to access other personalized services and updates related to your flight, such as seat selection, baggage allowance, and special requests. It also helps the airline keep track of your preferences for future flights, making your travel experience more convenient and tailored to your needs."
        },
        {
            title: "Select Your Flight",
            content: "After logging in, the next step is to select the flight for which you want to choose a meal. Go to the 'My Trips' or 'Upcoming Flights' section where you will see a list of your booked flights. Click on the flight for which you want to select a meal. This will take you to a detailed page of your flight itinerary. On this page, look for the 'Meal Preferences' or 'In-Flight Services' option. Selecting the correct flight ensures that your meal choice is accurately recorded for the specific journey you are taking. This step also allows you to review other details of your flight, such as departure and arrival times, layovers, and any special services you may have requested. By confirming the flight details, you can avoid any confusion or errors in your meal selection, ensuring a smooth and enjoyable travel experience."
        },
        {
            title: "Choose Your Meal",
            content: "Once you have selected your flight, you will be directed to the meal selection page. Here, you will find a variety of meal options to choose from, including vegetarian, vegan, gluten-free, and other special dietary meals. Each meal option will have a description and sometimes a photo to help you make your choice. Select the meal that best suits your preferences and dietary needs. If you have any allergies or special requests, make sure to note them in the provided section. This step is important to ensure that your meal is prepared according to your preferences and requirements. Additionally, some airlines offer premium meal options for an extra fee, which you can choose if you want to enhance your in-flight dining experience. By carefully selecting your meal, you can look forward to a satisfying and enjoyable dining experience during your flight."
        },
        {
            title: "Confirm and Save Your Selection",
            content: "The final step is to review your meal selection and confirm it. Double-check that you have selected the correct meal for the correct flight. Once you are satisfied with your choice, click on the 'Confirm' or 'Save' button. You may receive a confirmation email or notification on the website confirming your meal selection. It's a good idea to print or save this confirmation for your records. This step ensures that your meal choice is finalized and will be available during your flight. Additionally, some airlines allow you to make changes to your meal selection up to a certain time before your flight, so it's worth checking the policy in case you need to make any adjustments. By confirming and saving your selection, you can rest assured that your meal preferences are recorded and will be catered to during your journey."
        }
    ];

    const mealTypes = [
        {
            title: "Baby/child meals",
            description: "To make it easy for parents and guardians to help their children eat, we'll serve children their customized meals first.",
            modalContent: `<img src=${childMeal} alt="Baby/Child Meals Image" style="width:100%;height:auto;"> <p>QAirline serves special meals for infants and children. Children's meals are served first so their caregivers can help them eat.</p> <h3>Baby Meals</h3> <p>For infants under 24 months, we provide baby food and juice.</p> <h3>Child Meals</h3> <p>For children ages 24 months to 12 years.</p> <p>For departures from Vietnam, you can choose from cheese spaghetti, BBQ chicken, and croquettes, and for departures from overseas, you can choose from spaghetti, pizza, and hot dogs.</p> <h3>Notice</h3> <p>Due to differences in ingredients and raw materials, certain formulas may not be suitable for your infant, so please prepare your own formula to ensure your baby’s health and safe travel.</p> <p>Some flights departing from Japan, China and Southeast Asia offer the same child meals as those on flights departing from Vietnam.</p>` 
        },
        {
            title: "Vegetarian meals",
            description: "We offer a variety of customized vegetarian meals for our vegetarian passengers.",
            modalContent: `<img src=${vegetarianMeal} alt="Vegetarian Meal Image style="width:100%;height:auto;"><p>We offer a variety of customized vegetarian meals for our vegetarian passengers.</p> <h3>Vegan Meal</h3> <p>We offer a traditional Vietnamese vegetarian meal that excludes all meat including fish and poultry, animal fats, gelatin, as well as eggs and dairy products.</p> <h3>Vegetarian Lacto-Ovo Meal</h3> <p>We offer a Western-style vegetarian meal that excludes all meat including fish and poultry, animal fats, and gelatin but includes eggs and dairy products.</p> <h3>Vegetarian Vegan Meal</h3> <p>We offer a Western-style vegetarian meal that strictly excludes all meat including fish and poultry, animal fats, gelatin, as well as eggs and dairy products.</p> <h3>Vegetarian Hindu Meal</h3> <p>We offer an Indian vegetarian meal that excludes all meat including fish and poultry, as well as eggs but includes dairy products.</p> <h3>Vegetarian Jain Meal</h3> <p>We offer an Indian vegetarian meal that strictly excludes all animal products, including fish, poultry, eggs, and dairy, as well as root foods such as onions, garlic, and ginger.</p> <h3>Vegetarian Oriental Meal</h3> <p>We offer an oriental-style vegetarian meal that excludes all meat, including fish and poultry, eggs, and dairy products, but includes root foods like onions, garlic, and ginger.</p> <h3>Raw Vegetarian Meal</h3> <p>We offer a vegetarian meal that includes pure, raw vegetables and fruits, with no caffeinated beverages, preservatives/additives, or processed foods.</p>`
        },
        {
            title: "Meals for special dietary needs",
            description: "We offer special meals for passengers with special dietary needs.",
            modalContent: `<img src=${dietMeal} alt="Vegetarian Meal Image style="width:100%;height:auto;"><p>We offer meals built on medical and nutritional expertise for passengers who need a customized meal for their special dietary needs.</p> <h3>Low-Fat Meal</h3> <p>We offer a meal that includes low-fat meat or low-fat fish without using high-fat meat, concentrated broth, egg yolk, or shellfish that are high in cholesterol.</p> <h3>Diabetic Meal</h3> <p>We offer a meal that is carefully designed to divide the food amount and limit saturated fatty acid intake to control calories, protein, fat, and sugar allowance.</p> <h3>Low-Calorie Meal</h3> <p>We offer a calorie-restricted meal for weight management purposes.</p> <h3>Bland Meal</h3> <p>This meal is for passengers with weak digestive functions. Strong spices, vegetables that can cause gas, and fatty foods have been taken out, and instead, lean meats and white fish are included.</p> <h3>Gluten-Intolerant Meal</h3> <p>We offer a meal that strictly limits the amount of gluten in the ingredients.</p> <h3>Low-Salt Meal</h3> <p>This meal is for passengers who are on a sodium-restricted diet.</p> <h3>Low-Lactose Meal</h3> <p>We offer a meal that strictly limits all forms of dairy products (milk, cream, and powdered milk) that contain lactose.</p>` 
        },
        {
            title: "Other special meals",
            description: "For in-flight meals, QAirline is happy to cater to your dietary preferences.",
            modalContent: `<img src=${specialMeal} alt="Vegetarian Meal Image style="width:100%;height:auto;"><p>We offer special in-flight meals that cater to the different preferences of our passengers.</p> <h3>Seafood Meal</h3> <p>Fish and seafood are the main ingredients and are served with grains, vegetables, and fruits.</p> <h3>Fruit Platter Meal</h3> <p>Instead of the regular meal, this meal consists entirely of fresh fruit.</p> <h3>Allergen-Free Meal</h3> <p>For passengers who are allergic to certain ingredients, we offer allergen-free meals that exclude those ingredients.</p> </body>` 
        },
        {
            title: "Religious observances",
            description: "QAirline prepares and serves special in-flight meals for passengers who observe religious diets.",
            modalContent: `<img src=${religiousMeal} alt="Vegetarian Meal Image style="width:100%;height:auto;"><p>We offer special in-flight meals that cater to the different preferences of our passengers.</p> <h3>Seafood Meal</h3> <p>Fish and seafood are the main ingredients and are served with grains, vegetables, and fruits.</p> <h3>Fruit Platter Meal</h3> <p>Instead of the regular meal, this meal consists entirely of fresh fruit.</p> <h3>Allergen-Free Meal</h3> <p>For passengers who are allergic to certain ingredients, we offer allergen-free meals that exclude those ingredients.</p>`
        }
    ];

    return (
        <div className="flightMeal-container">
            <h2 className="main-title">In-Flight Meals</h2>

            <div data-aos='fade-left' data-aos-duration='1500' className="main-card">
                <div className="image-container">
                    <img src={flightMeal} alt="Flight Meal" />
                </div>
                <div className="card-content">
                    <h3 className="card-title">Do you need a special meal during your flight?</h3>
                    <p className="card-text">
                        We have in-flight special meals for infants, children, and vegetarians
                        that you can pre-order. First and Prestige passengers can also pre-order their meals.
                    </p>
                </div>
            </div>

            <div className="steps-section">
                <h2 className="main-title">How to pre-order in-flight meals</h2>
                <div data-aos='fade-right' data-aos-duration='1500' className="steps-header">
                    {steps.map((step, index) => (
                        <button
                            key={index}
                            className={`step-button ${activeStep === index + 1 ? 'active' : ''}`}
                            onClick={() => setActiveStep(index + 1)}
                        >
                            <span>STEP {index + 1} / 4</span>
                            {index < 3 && <ChevronRight className="step-icon" />}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeStep}
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="step-content"
                    >
                        <h3 data-aos='fade-up' data-aos-duration='1500' className="card-title">{steps[activeStep - 1].title}</h3>
                        <p data-aos='fade-up' data-aos-duration='1500' className="card-text">{steps[activeStep - 1].content}</p>
                    </motion.div>
                </AnimatePresence>
            </div>

            <h2 className="main-title">Details of each type</h2>
            <div data-aos='fade-down' data-aos-duration='1500' className="meal-types-grid">
                {mealTypes.map((meal, index) => (
                    <div
                        key={index}
                        className="meal-card"
                        onClick={() => setSelectedModal(index)}
                    >
                        <h3 className="card-title">{meal.title}</h3>
                        <p className="card-text">{meal.description}</p>
                    </div>
                ))}
            </div>

            {selectedModal !== null && (
                <div className="modal-overlay" onClick={() => setSelectedModal(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button
                            className="close-button"
                            onClick={() => setSelectedModal(null)}
                        >
                            <img src={cancel} alt="Close" />
                        </button>
                        <h2 className="modal-title">{mealTypes[selectedModal].title}</h2>
                        <div className="modal-text">
                            <div dangerouslySetInnerHTML={{
                                __html: mealTypes[selectedModal].modalContent.replace(/\n/g, '<br />')
                            }} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InFlightMealsSection;