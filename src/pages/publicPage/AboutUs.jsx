import React from "react";
import Navbar from "../Shared/Navbar";
import { 
  FaGlobeAmericas, 
  FaUsers, 
  FaAward, 
  FaHeadset,
  FaHeart,
  FaShieldAlt,
  FaHandshake,
  FaLeaf,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin
} from "react-icons/fa";

const AboutUs = () => {

  // Team Members Data
  const teamMembers = [
    {
      id: 1,
      name: "Zisan UL Haque",
      role: "Founder & CEO",
      image: "https://i.ibb.co.com/HDtKF70V/411970404-1377305972871301-5165766417544768348-n.jpg",
      bio: "Travel enthusiast with 15+ years in tourism industry",
      social: { facebook: "#", twitter: "#", linkedin: "#" }
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Head of Operations",
      image: "https://i.ibb.co.com/nsbgdmDH/pexels-ferhat-kocakaya-218644751-35500783.jpg",
      bio: "Expert in creating seamless travel experiences",
      social: { facebook: "#", twitter: "#", linkedin: "#" }
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Travel Curator",
      image: "https://i.ibb.co.com/JRtbC03G/pexels-olly-774909.jpg",
      bio: "Passionate about discovering hidden gems worldwide",
      social: { facebook: "#", twitter: "#", linkedin: "#" }
    },
    {
      id: 4,
      name: "David Kim",
      role: "Customer Success",
      image: "https://i.ibb.co.com/JRG7TJJW/pexels-jesus-rivera-2156773390-35485747.jpg",
      bio: "Dedicated to making every trip unforgettable",
      social: { facebook: "#", twitter: "#", linkedin: "#" }
    }
  ];

  // Company Stats
  const stats = [
    { icon: <FaGlobeAmericas />, number: "50+", label: "Destinations" },
    { icon: <FaUsers />, number: "25K+", label: "Happy Travelers" },
    { icon: <FaAward />, number: "10+", label: "Years Experience" },
    { icon: <FaHeadset />, number: "24/7", label: "Support" }
  ];

  // Our Values
  const values = [
    {
      icon: <FaHeart className="text-3xl text-red-500" />,
      title: "Passion for Travel",
      description: "We live and breathe travel. Every destination we offer is personally explored and curated."
    },
    {
      icon: <FaShieldAlt className="text-3xl text-blue-500" />,
      title: "Safety First",
      description: "Your safety is our priority. We ensure all tours meet the highest safety standards."
    },
    {
      icon: <FaHandshake className="text-3xl text-green-500" />,
      title: "Trust & Transparency",
      description: "No hidden fees, no surprises. What you see is what you get."
    },
    {
      icon: <FaLeaf className="text-3xl text-emerald-500" />,
      title: "Sustainable Tourism",
      description: "We're committed to eco-friendly practices and supporting local communities."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[400px]">
        <img
          src="https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg"
          alt="About Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto px-4">
              Discover the story behind your favorite travel companion
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
                alt="Our Team"
                className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
              />
              {/* Floating Card */}
              <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-2xl shadow-xl hidden md:block">
                <p className="text-4xl font-bold">10+</p>
                <p className="text-sm">Years of Excellence</p>
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="text-primary font-medium">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-6">
                We Make Your Travel Dreams Come True
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in 2014, TravelWorld started with a simple mission: to make 
                extraordinary travel experiences accessible to everyone. What began as 
                a small team of passionate travelers has grown into a trusted name in 
                the tourism industry.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We believe that travel is not just about visiting new places – it's about 
                creating memories, connecting with different cultures, and discovering 
                the beauty of our world. Every tour we craft is designed to offer authentic, 
                immersive experiences that go beyond typical tourism.
              </p>

              {/* Mission & Vision */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-primary/5 rounded-xl border-l-4 border-primary">
                  <h3 className="font-bold text-gray-800 mb-2">Our Mission</h3>
                  <p className="text-gray-600 text-sm">
                    To create unforgettable journeys that inspire and transform travelers.
                  </p>
                </div>
                <div className="p-4 bg-primary/5 rounded-xl border-l-4 border-primary">
                  <h3 className="font-bold text-gray-800 mb-2">Our Vision</h3>
                  <p className="text-gray-600 text-sm">
                    To be the world's most trusted and loved travel company.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-4xl mb-3 flex justify-center">{stat.icon}</div>
                <p className="text-4xl md:text-5xl font-bold mb-1">{stat.number}</p>
                <p className="text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary font-medium">What We Stand For</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-2xl shadow-sm text-center"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <span className="text-primary font-medium">Why TravelWorld</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-6">
                Why Travelers Choose Us
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">01</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Handpicked Destinations</h3>
                    <p className="text-gray-600 text-sm">
                      Every destination is personally visited and verified by our travel experts.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">02</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Best Price Guarantee</h3>
                    <p className="text-gray-600 text-sm">
                      We offer competitive prices without compromising on quality or experience.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">03</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Expert Local Guides</h3>
                    <p className="text-gray-600 text-sm">
                      Our guides are locals who know the hidden gems and best-kept secrets.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">04</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">24/7 Customer Support</h3>
                    <p className="text-gray-600 text-sm">
                      We're always here to help, before, during, and after your trip.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg"
                alt="Travel"
                className="rounded-2xl h-48 w-full object-cover"
              />
              <img
                src="https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg"
                alt="Travel"
                className="rounded-2xl h-48 w-full object-cover mt-8"
              />
              <img
                src="https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg"
                alt="Travel"
                className="rounded-2xl h-48 w-full object-cover"
              />
              <img
                src="https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg"
                alt="Travel"
                className="rounded-2xl h-48 w-full object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary font-medium">Our Team</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
              Meet The Experts
            </h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">
              Our passionate team of travel experts is dedicated to creating 
              unforgettable experiences for you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div 
                key={member.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-5 text-center">
                  <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                  <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
                  <p className="text-gray-500 text-sm mb-4">{member.bio}</p>
                  
                  {/* Social Links */}
                  <div className="flex justify-center gap-3">
                    <a href={member.social.facebook} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                      <FaFacebook />
                    </a>
                    <a href={member.social.twitter} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                      <FaTwitter />
                    </a>
                    <a href={member.social.linkedin} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                      <FaLinkedin />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary font-medium">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
              What Our Travelers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 p-6 rounded-2xl">
              <div className="flex gap-1 text-yellow-500 mb-4">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "Best travel experience ever! The Rome tour was perfectly organized. 
                Every detail was taken care of. Will definitely book again!"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://randomuser.me/api/portraits/women/45.jpg"
                  alt="Customer"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-gray-800">Amanda Wilson</p>
                  <p className="text-gray-500 text-sm">Rome Tour - 2024</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 p-6 rounded-2xl">
              <div className="flex gap-1 text-yellow-500 mb-4">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "Amazing service from start to finish. The local guides were incredibly 
                knowledgeable and made the trip unforgettable. Highly recommend!"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://randomuser.me/api/portraits/men/46.jpg"
                  alt="Customer"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-gray-800">Robert James</p>
                  <p className="text-gray-500 text-sm">Tokyo Tour - 2024</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 p-6 rounded-2xl">
              <div className="flex gap-1 text-yellow-500 mb-4">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "TravelWorld made planning our honeymoon so easy. Paris was magical 
                and the romantic dinner by the Eiffel Tower was a perfect surprise!"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://randomuser.me/api/portraits/women/47.jpg"
                  alt="Customer"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-gray-800">Lisa & Mark</p>
                  <p className="text-gray-500 text-sm">Paris Tour - 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-primary">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Join thousands of happy travelers who have explored the world with us. 
            Your dream destination is just a click away!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/destination" 
              className="px-8 py-4 bg-white text-primary font-bold rounded-full"
            >
              Explore Destinations
            </a>
            <a 
              href="/contact" 
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-full"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-gray-500 mb-8">Trusted by leading travel partners</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
            <span className="text-2xl font-bold text-gray-400">TripAdvisor</span>
            <span className="text-2xl font-bold text-gray-400">Booking.com</span>
            <span className="text-2xl font-bold text-gray-400">Expedia</span>
            <span className="text-2xl font-bold text-gray-400">Airbnb</span>
            <span className="text-2xl font-bold text-gray-400">Skyscanner</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;