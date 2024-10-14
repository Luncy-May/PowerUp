import React, { useState, useRef, useEffect } from 'react'
import Drag from './Drag'
import ReactMarkdown from 'react-markdown';

// The JSON data for categories and subcategories
const expenseCategories = {
    "Housing": ["Mortgage or rent", "Property taxes", "Household repairs", "HOA fees"],
    "Transportation": ["Car payment", "Car warranty", "Gas", "Tires", "Maintenance and oil changes", "Parking fees", "Repairs", "Registration and DMV Fees"],
    "Food": ["Groceries", "Restaurants", "Pet food"],
    "Utilities": ["Electricity", "Water", "Garbage", "Phones", "Cable", "Internet"],
    "Clothing": ["Adults’ clothing", "Adults’ shoes", "Children’s clothing", "Children’s shoes"],
    "Medical/Healthcare": ["Primary care", "Dental care", "Specialty care", "Urgent care", "Medications", "Medical devices"],
    "Insurance": ["Health insurance", "Homeowner’s or renter’s insurance", "Home warranty or protection plan", "Auto insurance", "Life insurance", "Disability insurance"],
    "Household Items/Supplies": ["Toiletries", "Laundry detergent", "Dishwasher detergent", "Cleaning supplies", "Tools"],
    "Personal": ["Gym memberships", "Haircuts", "Salon services", "Cosmetics", "Babysitter", "Subscriptions"],
    "Debt": ["Personal loans", "Student loans", "Credit cards"],
    "Retirement": ["Financial planning", "Investing"],
    "Education": ["Children’s college", "Your college", "School supplies", "Books"],
    "Savings": ["Emergency fund", "Big purchases like a new mattress or laptop", "Other savings"],
    "Gifts/Donations": ["Birthday", "Anniversary", "Wedding", "Christmas", "Special occasion", "Charities"],
    "Entertainment": ["Alcohol and/or bars", "Games", "Movies", "Concerts", "Vacations", "Subscriptions (Netflix, Amazon, Hulu, etc.)"]
};

// determine if a subcategory should be prioritized based on values
const getDragLabel = (value) => { 
    if (value < 20) {
        return "low";
    } else if (value >= 20 && value < 40) {
        return "relatively low";
    } else if (value >= 40 && value < 60) {
        return "average";
    } else if (value >= 60 && value < 80) {
        return "relatively high";
    } else if (value >= 80 && value <= 100) {
        return "high";
    }
};
const ExpensePlan = () => {
    const [activeCategory, setActiveCategory] = useState('Housing'); // default active category "Housing"
    const navbarRef = useRef(null);
    const [assistantMessages, setAssistantMessages] = useState([]) // display the AI's message
    const [isLoading, setIsLoading] = useState(false)
    // Initialize state for each subcategory dynamically
    const initialState = {};
    // JSON to keep track of expenses
    Object.keys(expenseCategories).forEach(category => {
        expenseCategories[category].forEach(subcategory => {
            initialState[subcategory] = 0; // Set initial value to 0 for each subcategory
        });
    });
    const [values, setValues] = useState(initialState);
    const initialBudgetState = Object.keys(expenseCategories).reduce((acc, category) => {
        acc[category] = 0;
        return acc;
    }, {});
    const [activeBudget, setActiveBudget] = useState(initialBudgetState); // current budget

    const onEstimatedCategoryBudget = (category, value) => {
        setActiveBudget(prevBudgets => ({
            ...prevBudgets,
            [category]: parseFloat(value) || 0  // Ensure the value is a number
        }));
        console.log('Updated Budget for', category, ':', activeBudget[category]);
    };

    console.log(activeBudget)
    // Function to handle slider value changes
    const handleSlide = (subcategory, newValue) => { // triggered when the user "drags" the slider
        setValues(prevValues => ({ ...prevValues, [subcategory]: newValue }));
    };

    // Function to smoothly scroll the navbar to the active category
    const handleCategoryClick = (category, index) => {
        setActiveCategory(category);
        const navbarWidth = navbarRef.current.offsetWidth;
        const itemWidth = navbarRef.current.scrollWidth / Object.keys(expenseCategories).length;
        const scrollPosition = index * itemWidth - navbarWidth / 2 + itemWidth / 2;
        navbarRef.current.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    };

    // Function to construct the URL with query parameters from the slider values
    const submitValues = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        let importanceDetails = expenseCategories[activeCategory].map((subcategory) => {
            return `${subcategory}: ${values[subcategory]} (${getDragLabel(values[subcategory])})`;
        }).join(', ');
        // constructing the user's prompt to be sent to backend
        const budgetSummary = `My budget estimate is $${activeBudget[activeCategory]} for ${activeCategory}.`;
        const user_query = `What eco-friendly activities can I do based on my budget? ${budgetSummary} The relative importance for each subcategory is as follows: ${importanceDetails}. Please create a plan that accounts for these priorities.`;
        const payload = {
            user_query: user_query, 
            userID: "exampleID"
        };
        console.log(user_query)

        try {
            // Send POST request to backend
            const response = await fetch('http://localhost:5002/api/getSuggestedEcoPlans', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload) 
            });

            const data = await response.json(); // Parse response from backend
            console.log('Response from server:', data);

            if (response.ok) {
                const messages = data.map(item => item.payload.message); // Extract all messages
                setAssistantMessages(messages); // Store all the messages in the state
            } else {
                console.error('Failed to fetch data from server');
            }
        } catch (error) {
            console.error('An error occurred while fetching data:', error);
        } finally {
            setIsLoading(false)
        }
    };
    useEffect(() => { // triggered when mounted
        const sayHi = async () => {
            const url = `http://localhost:5002/api/sayHi`;
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userID: "exampleID",
                    }),
                });
                const data = await response.json();
                console.log('Response from server:', data);
                if (response.ok) {
                    const messages = data.map(item => item.payload.message); // Extract all messages
                    setAssistantMessages(messages); // Store all the messages in the state
                } else {
                    console.error('Failed to fetch data from server');
                }
            } catch (error) {
                console.error('An error occurred while fetching data:', error);
            }
        };
        sayHi();
    }, []);
    useEffect(() => {
        // Only load the widget script once
        const existingScript = document.querySelector('script[src="https://cdn.voiceflow.com/widget/bundle.mjs"]');

        if (!existingScript) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
            script.onload = () => {
                // Load the widget after the script is loaded
                if (window.voiceflow && window.voiceflow.chat) {
                    window.voiceflow.chat.load({
                        verify: { projectID: '6706d91755fb458672287276' }, 
                        url: 'https://general-runtime.voiceflow.com',
                        versionID: 'production'
                    });
                }
            };
            document.body.appendChild(script);
        } else if (window.voiceflow && window.voiceflow.chat) {
            // Reinitialize or trigger load if the script is already loaded
            window.voiceflow.chat.load({
                verify: { projectID: '6706d91755fb458672287276' }, 
                url: 'https://general-runtime.voiceflow.com',
                versionID: 'production'
            });
        }
    }, []); // Run only once on mount

    return (
        <div className="p-5 space-y-5 font-bold items-center justify-center text-xl">
            <div>
                <div className='flex items-center justify-center'>
                    <p className='text-center text-4xl pr-5'>Expense Plan</p>
                    <div className="flex justify-center items-center space-x-4">
                        <form onSubmit={submitValues}>
                            <button type="submit" disabled={isLoading} className={`px-4 py-2 rounded-lg text-white ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 cursor-pointer'}`}>
                                Get Recommendations
                            </button>
                        </form>
                        {isLoading ? (<div className='animate-pulse duration-300'>Loading Response...</div>):(<div></div>)}
                    </div>
                </div>
                <p className='text-center text-md pt-5'>Estimated Budget(EB)</p>
            </div>
            <div className='flex'>
                <div className='w-[60vw] pr-5'>
                    {/* Horizontal Scrollable Navbar */}
                    <div>
                        <div className="overflow-x-auto whitespace-nowrap bg-gray-100 p-3" ref={navbarRef}>
                            {Object.keys(expenseCategories).map((category, index) => (
                                <button
                                    disabled={isLoading}
                                    key={category}
                                    onClick={() => handleCategoryClick(category, index)}
                                    className={`inline-block px-4 py-2 m-2 rounded ${activeCategory === category ? 'bg-blue-500 text-white' : 'bg-white text-black'
                                        } max-w-[200px]`}
                                    style={{ width: '200px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}  
                                >
                                    {category} <br />
                                    <span className='block'>
                                        EB: {activeBudget[category]}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Dynamically render the subcategories and sliders for the active category */}
                        <div
                            className='border border-white shadow-md hover:shadow-2xl p-5'
                            style={{
                                minHeight: '300px',
                                transition: 'height 0.3s ease',
                                overflow: 'hidden',
                            }}
                        >
                            <p>{activeCategory}</p>
                            <div className='pb-5'>
                                <span>Enter your EB ($): </span>
                                <input
                                    disabled={isLoading}
                                    name={activeCategory}
                                    className="border border-gray-300 hover:border-gray-400"
                                    onChange={(e) => onEstimatedCategoryBudget(activeCategory, e.target.value)} 
                                    value={activeBudget[activeCategory] || ''} // Display the current value or an empty string
                                />
                            </div>
                            {expenseCategories[activeCategory].map((subcategory) => (
                                <div key={subcategory}>
                                    <span>{subcategory}: {values[subcategory]}
                                        <p className='text-gray-600'>{getDragLabel(values[subcategory])} priority</p>
                                    </span>
                                    <Drag value={values[subcategory]} handleSlide={(newValue) => handleSlide(subcategory, newValue)} />

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Where the user would see a list of recommendated activities from the virtual assistant */}
                <div>
                    <div className='flex items-center justify-center'>
                        <p className='text-center text-2xl pr-5'>Eco-Friendly Lifestyle Recommendations</p>

                    </div>
                    <p className='text-center text-md text-blue-300 text-2xl pt-2 pb-2'>Selected: {activeCategory}</p>
                    {/* User's chat channel with the virtual assistant */}
                    <div className='border border-gray-300 shadow-md h-[420px] w-[650px] p-5 overflow-y-auto'>
                        {assistantMessages.map((message, key) => (
                            <div key={key} className='pt-2 pb-2'>
                                <ReactMarkdown>
                                    {message}
                                </ReactMarkdown>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExpensePlan;
