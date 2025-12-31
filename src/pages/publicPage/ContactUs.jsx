import React, { useState } from "react";
import Navbar from "../Shared/Navbar";
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaChevronDown,
  FaChevronUp,
  FaPaperPlane,
  FaHeadset
} from "react-icons/fa";

const ContactUs = () => {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  // FAQ State
  const [openFaq, setOpenFaq] = useState(null);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  // Contact Info Data
  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: "Our Office",
      details: ["123 Travel Street, Suite 456", "New York, NY 10001, USA"]
    },
    {
      icon: <FaPhone className="text-2xl" />,
      title: "Phone Number",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"]
    },
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: "Email Address",
      details: ["info@travelworld.com", "support@travelworld.com"]
    },
    {
      icon: <FaClock className="text-2xl" />,
      title: "Working Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat - Sun: 10:00 AM - 4:00 PM"]
    }
  ];

  // FAQ Data
  const faqs = [
    {
      id: 1,
      question: "How do I book a tour?",
      answer: "You can book a tour directly through our website by selecting your desired destination, choosing a date, and completing the booking form. You can also call us or visit our office for assistance."
    },
    {
      id: 2,
      question: "What is your cancellation policy?",
      answer: "We offer free cancellation up to 24 hours before the tour start date. Cancellations made within 24 hours may be subject to a cancellation fee. Please refer to specific tour terms for details."
    },
    {
      id: 3,
      question: "Do you offer group discounts?",
      answer: "Yes! We offer special discounts for groups of 10 or more travelers. Contact our team for a customized quote for your group."
    },
    {
      id: 4,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and various digital payment options."
    },
    {
      id: 5,
      question: "Can I customize a tour package?",
      answer: "Absolutely! We offer customizable tour packages to meet your specific needs. Contact us with your requirements and our travel experts will create a personalized itinerary."
    },
    {
      id: 6,
      question: "Is travel insurance included?",
      answer: "Travel insurance is not included in our tour packages but we highly recommend it. We can help you find suitable travel insurance options."
    }
  ];

  // Office Locations
  const offices = [
    {
      city: "New York",
      country: "USA",
      address: "123 Travel Street, NY 10001",
      phone: "+1 (555) 123-4567",
      image: "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg"
    },
    {
      city: "London",
      country: "UK",
      address: "456 Journey Lane, W1 2AB",
      phone: "+44 20 1234 5678",
      image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg"
    },
    {
      city: "Dubai",
      country: "UAE",
      address: "789 Adventure Blvd, Dubai",
      phone: "+971 4 123 4567",
      image: "https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[350px]">
        <img
          src="https://images.pexels.com/photos/821754/pexels-photo-821754.jpeg"
          alt="Contact Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto px-4">
              Have questions? We'd love to hear from you!
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <section className="py-12 px-6 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-2xl shadow-lg text-center"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  {info.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-gray-600 text-sm">{detail}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div>
              <span className="text-primary font-medium">Get In Touch</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-6">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                {/* Phone & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="">Select a subject</option>
                      <option value="booking">Booking Inquiry</option>
                      <option value="support">Customer Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                              focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold 
                            rounded-lg flex items-center justify-center gap-2"
                >
                  <FaPaperPlane />
                  Send Message
                </button>
              </form>
            </div>

            {/* Map & Quick Contact */}
            <div>
              <div className="bg-gray-100 rounded-2xl overflow-hidden h-[300px] mb-6">
                {/* You can replace this with actual Google Maps or Leaflet */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304605!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1650000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                ></iframe>
              </div>

              {/* Quick Contact Box */}
              <div className="bg-primary text-white p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <FaHeadset className="text-3xl" />
                  <div>
                    <h3 className="font-bold text-xl">Need Immediate Help?</h3>
                    <p className="text-white/80 text-sm">Our support team is available 24/7</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <a 
                    href="tel:+15551234567" 
                    className="flex items-center gap-3 bg-white/10 p-3 rounded-lg"
                  >
                    <FaPhone />
                    <span>+1 (555) 123-4567</span>
                  </a>
                  <a 
                    href="https://wa.me/15551234567" 
                    className="flex items-center gap-3 bg-white/10 p-3 rounded-lg"
                  >
                    <FaWhatsapp />
                    <span>WhatsApp Chat</span>
                  </a>
                  <a 
                    href="mailto:support@travelworld.com" 
                    className="flex items-center gap-3 bg-white/10 p-3 rounded-lg"
                  >
                    <FaEnvelope />
                    <span>support@travelworld.com</span>
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-6">
                <p className="text-gray-700 font-medium mb-3">Follow Us</p>
                <div className="flex gap-3">
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center"
                  >
                    <FaFacebook className="text-xl" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-sky-500 text-white rounded-full flex items-center justify-center"
                  >
                    <FaTwitter className="text-xl" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-full flex items-center justify-center"
                  >
                    <FaInstagram className="text-xl" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center"
                  >
                    <FaLinkedin className="text-xl" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center"
                  >
                    <FaWhatsapp className="text-xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary font-medium">Our Locations</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
              Visit Our Offices
            </h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">
              We have offices around the world to serve you better
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offices.map((office, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <img
                  src={office.image}
                  alt={office.city}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800">
                    {office.city}, {office.country}
                  </h3>
                  <div className="mt-3 space-y-2 text-gray-600 text-sm">
                    <p className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-primary" />
                      {office.address}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaPhone className="text-primary" />
                      {office.phone}
                    </p>
                  </div>
                  <a 
                    href="#" 
                    className="inline-block mt-4 text-primary font-medium"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary font-medium">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mt-3">
              Find quick answers to common questions
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div 
                key={faq.id} 
                className="bg-white border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full p-5 flex items-center justify-between text-left"
                >
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  {openFaq === faq.id ? (
                    <FaChevronUp className="text-primary" />
                  ) : (
                    <FaChevronDown className="text-gray-400" />
                  )}
                </button>
                
                {openFaq === faq.id && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-600 border-t pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Still Have Questions */}
          <div className="mt-10 text-center p-6 bg-gray-50 rounded-2xl">
            <h3 className="font-bold text-gray-800 mb-2">Still Have Questions?</h3>
            <p className="text-gray-600 mb-4">
              Can't find the answer you're looking for? Please contact our support team.
            </p>
            <a 
              href="mailto:support@travelworld.com" 
              className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-lg"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-6 bg-primary">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Get the latest travel deals, tips, and destination guides delivered to your inbox.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-5 py-4 rounded-full text-gray-800 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white text-primary font-bold rounded-full"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-white/60 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;