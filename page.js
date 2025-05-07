"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ["latin"] });

// Simulated email sending function (replace with your actual server-side logic)
async function sendEmail(data) {
    // Simulate an API endpoint (replace with your actual endpoint)
    const apiEndpoint = '/api/send-email'; // Replace with your API route
    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (response.status === 200) {
            console.log('Email sent successfully:', responseData);
            return { success: true, message: 'Email sent successfully!' };
        } else {
            console.error('Failed to send email:', responseData);
            return { success: false, message: 'Failed to send email.' };
        }
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: 'Error sending email.' };
    }
}


export default function Home() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', features: ['', '', ''], image: '/default-product.jpg' });
  const [imagePreview, setImagePreview] = useState(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', service: '', message: '' });
  const [expandedServices, setExpandedServices] = useState([]);

  // Admin authentication states
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Registration states
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false); // State to control registration form visibility

  const services = [
    { 
      id: 1, 
      title: "Computer and accessories", 
      description: "Computers and accessories All storage devices include HDD and SSD and other devices like RAM, our accessories are solid and you are allowed to test", 
      icon: "🛠️", 
      solutions: ["1T HDD", "500GB USB HDD", "500GB SSD", "DDR3 and DDR4 8GB RAM", "Battery replacement"], 
      pricing: "Depends on specific device",
      bgImage: "/images/services/computer-Installation.jpg" // Add this
    },
    { 
      id: 2, 
      title: "CCTV camera installation", 
      description: "Both analog and IP CCTV system and all devices available", 
      icon: "💿", 
      solutions: ["2MP and 4MP HIK camera", "Cables and connectors", "DVR NVR and XVR", "Installation and maintenance", "WiFi router"], 
      pricing: "From TZS 300,000/ full installation",
      bgImage: "/images/services/CCTV-Installation.jpg" // Add this
    },
    // ... other services
  ];

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
  {services.map((s) => (
    <div 
      key={s.id} 
      className="bg-blue-50 rounded-xl shadow-md border border-blue-100 overflow-hidden transition-all duration-300 relative"
    >
      {/* Background image div */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
        style={{ backgroundImage: `url(${s.bgImage})` }}
      ></div>
      
      <div className="relative z-10"> {/* This ensures content stays above the bg */}
        <button onClick={() => toggleService(s.id)} className="w-full p-6 text-left flex flex-col items-start hover:bg-blue-100 transition-colors duration-200">
          <div className="text-4xl mb-4">{s.icon}</div>
          <h3 className="text-xl font-bold text-blue-700 mb-2">{s.title}</h3>
          <p className="text-gray-600">{s.description}</p>
          <div className="mt-4 w-full flex justify-between items-center">
            <span className="text-sm font-medium text-blue-700">{s.pricing}</span>
            <svg className={`h-5 w-5 text-blue-600 transform transition-transform duration-200 ${expandedServices.includes(s.id) ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {expandedServices.includes(s.id) && (
          <div className="px-6 pb-6 animate-fadeIn">
            <div className="mb-4">
              <h4 className="font-medium text-blue-600 mb-2">Includes:</h4>
              <ul className="space-y-1">
                {s.solutions.map((sol, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">{sol}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={() => window.location.href = '#contact'} className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition">Request Service</button>
          </div>
        )}
      </div>
    </div>
  ))}
</div>
  
  /*const services = [
    { id: 1, title: "Computer and accesories ", description: "all storage devices include HDD  and SSD and other devices like RAM , accessories zetu ni imara na unaruhsiwa kutest", icon: "🛠️", solutions: ["1T HDD", "500GB USB HDD", "500GB SSD", "DDR3 and DDR4 8GB RAM", "Batery replacement"], pricing: "depends on spcific device" },
    { id: 2, title: "CCTV camera installation ", description: "both analogy and IP CCTV system and all devices it's available", icon: "💿", solutions: ["2MP and 4MP HIK camera", "Cables and connectors", "DVR NVR and XVR", "installation and maintanance", "WiFi router"], pricing: "From TZS 300,000/ full installation" },
    { id: 3, title: "CCTV camera installation ", description: "both analogy and IP CCTV system and all devices it's available", icon: "💿", solutions: ["2MP and 4MP HIK camera", "Cables and connectors", "DVR NVR and XVR", "installation and maintanance", "WiFi router"], pricing: "From TZS 300,000/ full installation" },
    { id: 4, title: "CCTV camera installation ", description: "both analogy and IP CCTV system and all devices it's available", icon: "💿", solutions: ["2MP and 4MP HIK camera", "Cables and connectors", "DVR NVR and XVR", "installation and maintanance", "WiFi router"], pricing: "From TZS 300,000/ full installation" },
  ];*/

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (i, v) => {
    const updatedFeatures = [...newProduct.features];
    updatedFeatures[i] = v;
    setNewProduct(prev => ({ ...prev, features: updatedFeatures }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewProduct(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addProduct = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price) {
      setProducts(prev => [...prev, { ...newProduct, id: Date.now(), features: newProduct.features.filter(f => f.trim() !== '') }]);
      setNewProduct({ name: '', description: '', price: '', features: ['', '', ''], image: '/default-product.jpg' });
      setImagePreview(null);
    }
  };

  const removeProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    // Send the contact form data to the server
    const result = await sendEmail({
        ...contactForm,
        to: 'yusuphlameck220@gmail.com' // Add recipient email here
    });

    if (result.success) {
        alert('Thank you for your message! We will contact you soon.');
        setContactForm({ name: '', email: '', service: '', message: '' });
    } else {
        alert('Failed to send message. Please try again.');
    }
  };

  const toggleService = (id) => {
    setExpandedServices(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

    // Admin login handler
    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'lameck' && password === 'lameck@2025') { // Replace with secure authentication
            setIsAdmin(true);
            setLoginError('');
        } else {
            setLoginError('Invalid credentials');
        }
    };

    const handleLogout = () => {
        setIsAdmin(false);
        setUsername('');
        setPassword('');
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setRegisterError('');

        // Basic client-side validation
        if (!registerUsername || !registerEmail || !registerPassword) {
            setRegisterError('All fields are required.');
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: registerUsername,
                    email: registerEmail,
                    password: registerPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsRegistered(true);
                setShowRegistration(false); // Hide the form after successful registration
                // Clear the form
                setRegisterUsername('');
                setRegisterEmail('');
                setRegisterPassword('');
            } else {
                setRegisterError(data.message || 'Registration failed.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setRegisterError('An unexpected error occurred.');
        }
    };

    const openRegistration = () => {
        setShowRegistration(true);
    };

    const closeRegistration = () => {
        setShowRegistration(false);
        setRegisterError(''); // Clear any previous errors
    };

    // Replace with your actual M-Pesa and Airtel Money numbers
    const mpesaNumber = '255744065662';
    const airtelMoneyNumber = '255786493702';

    const handleBuyNow = (productName) => {
      // Display a message with your payment numbers
      alert(
        `To purchase ${productName}, please send payment to:\n\n` +
        `M-Pesa: ${mpesaNumber}\n` +
        `Airtel Money: ${airtelMoneyNumber}\n\n` +
        `Once you have sent the payment, please contact us with the transaction details.`
      );
    };

  return (
    <div className={`${inter.className} min-h-screen bg-gradient-to-b from-blue-50 to-white`}>
      <nav className="fixed w-full bg-white shadow-sm z-10 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-500"> 6L ICT SECURITY SOLUTION</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#products" className="text-gray-700 hover:text-blue-600 transition">Products</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition">Services</a>
              {isAdmin && (<a href="#add-product" className="text-gray-700 hover:text-blue-600 transition">Add Product</a>)}
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition">Contact</a>
              {isAdmin ? (
                  <button onClick={handleLogout} className="text-gray-700 hover:text-blue-600 transition">Logout</button>
              ) : null}
              {!isAdmin && !isRegistered && (
                  <button onClick={openRegistration} className="text-gray-700 hover:text-blue-600 transition">Register</button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-red-700 text-white">
        
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">6L <span className="text-blue-00">ICT and security Services</span></h1>
          <p className="text-xl text-red-300 mb-8 max-w-3xl mx-auto">Expert security system, and reliable technical support</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#products" className="bg-white text-green-700 hover:bg-blue-50 font-medium py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">Browse Products</a>
            <a href="#contact" className="border-2 border-white text-white hover:bg-white hover:text-blue-700 font-medium py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">Get Support</a>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-red-500 max-w-2xl mx-auto">Click to view details</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div key={s.id} className="bg-blue-50 rounded-xl shadow-md border border-blue-100 overflow-hidden transition-all duration-300">
                <button onClick={() => toggleService(s.id)} className="w-full p-6 text-left flex flex-col items-start hover:bg-blue-100 transition-colors duration-200">
                  <div className="text-4xl mb-4">{s.icon}</div>
                  <h3 className="text-xl font-bold text-blue-700 mb-2">{s.title}</h3>
                  <p className="text-gray-600">{s.description}</p>
                  <div className="mt-4 w-full flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-700">{s.pricing}</span>
                    <svg className={`h-5 w-5 text-blue-600 transform transition-transform duration-200 ${expandedServices.includes(s.id) ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {expandedServices.includes(s.id) && (
                  <div className="px-6 pb-6 animate-fadeIn">
                    <div className="mb-4">
                      <h4 className="font-medium text-blue-600 mb-2">Includes:</h4>
                      <ul className="space-y-1">
                        {s.solutions.map((sol, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm">{sol}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button onClick={() => window.location.href = '#contact'} className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition">Request Service</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Electronics</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Quality devices at competitive prices with warranty</p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-blue-100">
              <p className="text-gray-500">No products added yet. Add your first product below.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(p => (
                <div key={p.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-blue-100 hover:shadow-lg transition duration-300">
                  <div className="relative h-48 bg-gray-50">
                    <Image src={p.image} alt={p.name} fill className="object-contain p-4" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{p.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{p.description}</p>
                    <p className="text-xl font-bold text-blue-600 mb-3">{p.price}</p>

                    <ul className="mb-4">
                      {p.features.map((f, i) => f && (
                        <li key={i} className="flex items-start text-sm text-gray-700 mb-1">
                          <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleBuyNow(p.name)}
                        className="flex-1 bg-green-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-md transition"
                      >
                        Buy Now
                      </button>
                      {isAdmin && (
                        <button
                          onClick={() => removeProduct(p.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium py-2 px-3 border border-red-200 rounded-md hover:bg-red-50 transition"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

        {/* Admin Login Form */}
        {!isAdmin && (
            <section id="admin-login" className="py-16 bg-gray-100">
                <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Login</h2>
                        {loginError && <p className="text-red-500 mb-4">{loginError}</p>}
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md shadow-md transition duration-300"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        )}

        {/* Registration Form (Modal) */}
        {showRegistration && (
            <div className="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                Create an Account
                            </h3>
                            {registerError && <p className="text-red-500 mt-2">{registerError}</p>}
                            <form onSubmit={handleRegister} className="mt-3">
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700">Username</label>
                                    <input type="text" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <input type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button type="submit" className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeRegistration}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {isRegistered && (
            <div className="text-center py-8 bg-green-100 text-blue-800">
                Registration successful! You can now log in.
            </div>
        )}

      {/* Conditionally render the add product section based on admin status */}
      {isAdmin && (
          <section id="add-product" className="py-16 bg-white">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="bg-green-50 p-8 rounded-xl shadow-md border border-blue-100">
                      <h2 className="text-2xl font-bold text-blue-500 mb-6">Add New Product</h2>

                      <form onSubmit={addProduct}>
                          <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                  <div className="mb-4">
                                      <label className="block text-sm font-medium text-red-500 mb-1">Product Name*</label>
                                      <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-red-500 text-blue-500" required />
                                  </div>

                                  <div className="mb-4">
                                      <label className="block text-sm font-medium text-red-500 mb-1">Description</label>
                                      <textarea name="description" value={newProduct.description} onChange={handleInputChange} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-red-500 text-blue-500"></textarea>
                                  </div>

                                  <div className="mb-4">
                                      <label className="block text-sm font-medium text-red-500 mb-1">Price (TZS)*</label>
                                      <input type="text" name="price" value={newProduct.price} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-red-500 text-blue-500" placeholder="TZS 1,000,000" required />
                                  </div>

                                  <div className="mb-4">
                                      <label className="block text-sm font-medium text-red-500 mb-1">Key Features</label>
                                      {newProduct.features.map((f, i) => (
                                          <input key={i} type="text" value={f} onChange={(e) => handleFeatureChange(i, e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-red-500 mb-2 text-blue-500" placeholder={`Feature ${i + 1}`} />
                                      ))}
                                      <button type="button" onClick={() => setNewProduct(prev => ({ ...prev, features: [...prev.features, ''] }))} className="mt-2 text-sm text-blue-600 hover:text-red-500">+ Add another feature</button>
                                  </div>
                              </div>

                              <div>
                                  <label className="block text-sm font-medium text-red-500 mb-1">Product Image</label>
                                  <div className="mb-4 border-2 border-dashed border-blue-200 rounded-md p-4 text-center bg-white">
                                      {imagePreview ? (
                                          <div className="relative h-48 w-full">
                                              <Image src={imagePreview} alt="Preview" fill className="object-contain" />
                                          </div>
                                      ) : (
                                          <div className="relative h-48 w-full">
                                              <Image src="/default-product.jpg" alt="Default Product" fill className="object-contain opacity-50" />
                                          </div>
                                      )}
                                      <label className="mt-4 cursor-pointer inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-green-200 transition">
                                          <span>Upload Image</span>
                                          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                      </label>
                                      <p className="mt-1 text-xs text-red-500">PNG, JPG up to 2MB</p>
                                  </div>
                              </div>
                          </div>

                          <div className="mt-6">
                              <button type="submit" className="w-full bg-blue-600 hover:bg-green-500 text-white font-medium py-3 px-6 rounded-md shadow-md transition duration-300">Add Product</button>
                          </div>
                      </form>
                  </div>
              </div>
          </section>
      )}

      <section id="contact" className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Our Team</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-700 p-3 rounded-lg">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">Call For Support</h3>
                    <div className="space-y-2 mt-2">
                      <a href="tel:+255744065662" className="block text-blue-100 hover:text-white">+255 744 065 662</a>
                      <a href="tel:+255786493702" className="block text-blue-100 hover:text-white">+255 786 493 702</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-700 p-3 rounded-lg">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 000-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">Email Us</h3>
                    <a href="mailto:yusuphlameck220@gmail.com" className="block text-blue-100 hover:text-white mt-2">yusuphlameck220@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-700 p-3 rounded-lg">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">Visit Our Store</h3>
                    <p className="text-blue-100 mt-2"> Iyunga, 6L store<br />Mbeya, Tanzania</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleContactSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-blue-500 mb-6">Send Us a Message</h3>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name*</label>
                  <input type="text" name="name" value={contactForm.name} onChange={handleContactChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-800" required />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Email*</label>
                  <input type="email" name="email" value={contactForm.email} onChange={handleContactChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-800" required />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Needed*</label>
                  <select name="service" value={contactForm.service || ''} onChange={handleContactChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-800" required>
                    <option value="" disabled className="text-gray-400">Select Service</option>
                    <option value="Product Inquiry" className="text-gray-800">Product Inquiry</option>
                    <option value="Computer Maintenance" className="text-gray-800">Computer Maintenance</option>
                    <option value="Software Installation" className="text-gray-800">Software Installation</option>
                    <option value="Technical Support" className="text-gray-800">Technical Support</option>
                    <option value="Enterprise Solution" className="text-gray-800">Enterprise Solution</option>
                    <option value="Other Inquiry" className="text-gray-800">Other Inquiry</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Message*</label>
                  <textarea rows="4" name="message" value={contactForm.message} onChange={handleContactChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-800" required></textarea>
                </div>

                <button type="submit" className="w-full bg-blue-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition duration-300">Send</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-red-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold text-white-800">6L ICT AND SECURITY SERVICES</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.011 3.808.058 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.023.058 1.351.058 3.807v.468c0 2.505-.011 2.84-.058 3.808-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.058-3.808.058h-.468c-2.505 0-2.84-.011-3.808-.058-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.058-1.379-.058-3.808v-.468c0-2.505.011-2.84.058-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.468zm-.081 1.802h-.468c-2.456 0-2.784.011-3.808.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.808.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.468c2.456 0 2.784-.011 3.808-.058.975-.045 1.504-.207 1.857-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.468c0-2.456-.011-2.784-.058-3.808-.045-.975-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-100 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} 6l ict and security services. All rights are preserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}