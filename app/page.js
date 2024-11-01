"use client";
import Image from "next/image";
import { useState } from 'react';
import { Github, Mail, Linkedin, Phone, MapPin, Calendar, BookOpen, Award, Briefcase, Globe2Icon,MessageCircle } from 'lucide-react';

const Section = ({ title, children }) => {return(
  <div className="mb-8 bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
    transform hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] 
    transition-all">
    <h2 className="text-2xl font-black mb-6 flex items-center gap-2 text-black">
      {title}
    </h2>
    {children}
  </div>
)};

const ExperienceCard = ({ period, title, company, responsibilities, technologies }) => {
  return(
  <div className="mb-6 last:mb-0 border-4 border-black p-4 bg-yellow-100">
    <div className="font-bold text-sm bg-pink-400 border-2 border-black px-2 py-1 inline-block mb-2">{period}</div>
    <h3 className="text-xl font-black mb-1">{title}</h3>
    <p className="font-bold mb-2">Company: {company}</p>
    <div className="mb-2">
      <p className="font-bold">Responsibilities:</p>
      <p><ul className="list-disc list-inside">{responsibilities.split("$$n$$").map((x)=>{return <li>{x}</li>})}</ul></p>
    </div>
    <div>
      <p className="font-bold">Technologies:</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {technologies.split(',').map((tech, index) => (
          <span key={index} className="bg-blue-400 px-3 py-1 border-2 border-black font-bold text-sm">
            {tech.trim()}
          </span>
        ))}
      </div>
    </div>
  </div>
)};

const ProjectCard = ({ title, description, technologies, features }) => {return (
  <div className="mb-6 last:mb-0 border-4 border-black p-4 bg-green-100">
    <h3 className="text-xl font-black mb-2">{title}</h3>
    <p className="font-bold mb-2">{description}</p>
    <div className="flex flex-wrap gap-2 mb-2">
      {technologies.split(',').map((tech, index) => (
        <span key={index} className="bg-purple-400 px-3 py-1 border-2 border-black font-bold text-sm">
          {tech.trim()}
        </span>
      ))}
    </div>
    <ul className="list-disc list-inside">
      {features.map((feature, index) => (
        <li key={index} className="mb-1">{feature}</li>
      ))}
    </ul>
  </div>
);
}

const CertificateCard = ({ title, skills, link }) => (
  <div className="mb-4 last:mb-0 border-4 border-black p-4 bg-orange-100">
    <h3 className="text-lg font-black mb-2">{title}</h3>
    <p className="font-bold mb-2">Skills: {skills}</p>
    <a href={link} className="text-blue-600 underline font-bold">Verify Certificate</a>
  </div>
);
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ type: '', message: '' });

    if (!validateForm()) {
      return;
    }

    try {
      // Make sure to replace YOUR_EMAIL_ENDPOINT with your actual email sending endpoint
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'vishw.m.patel@gmail.com',
          subject: `Portfolio Contact from ${formData.name}`,
          text: `
            Name: ${formData.name}
            Email: ${formData.email}
            Message: ${formData.message}
          `
        }),
      });

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your message! I will get back to you soon.'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="border-4 border-black bg-pink-100 p-6">
        <h3 className="text-xl font-black mb-4">Get in Touch</h3>
        <p className="mb-4 font-bold">Feel free to reach out for opportunities or just to say hello!</p>
        <div className="space-y-3">
          <p className="flex items-center gap-2">
            <Mail className="w-5 h-5" /> vishw.m.patel@gmail.com
          </p>
          <p className="flex items-center gap-2">
            <Phone className="w-5 h-5" /> +91 8160599934
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="w-5 h-5" /> Ahmedabad, India
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="border-4 border-black bg-blue-100 p-6">
        {submitStatus.message && (
          <div className={`mb-4 p-3 border-2 border-black font-bold ${
            submitStatus.type === 'success' ? 'bg-green-200' : 'bg-red-200'
          }`}>
            {submitStatus.message}
          </div>
        )}
        
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border-2 border-black font-bold ${
              errors.name ? 'border-red-500' : ''
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1 font-bold">{errors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border-2 border-black font-bold ${
              errors.email ? 'border-red-500' : ''
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 font-bold">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className={`w-full p-2 border-2 border-black font-bold ${
              errors.message ? 'border-red-500' : ''
            }`}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1 font-bold">{errors.message}</p>
          )}
        </div>

        <button 
          type="submit"
          className="bg-black text-white px-6 py-2 font-bold hover:bg-gray-800 transition-colors border-2 border-black"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-[#f0f0f0] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <Section title="Profile">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Photo Section */}
            <div className="border-4 border-black bg-blue-200 p-4 flex items-center justify-center">
              <Image 
                src="/Profile.jpeg" 
                alt="Profile" 
                width={300} height={300}
                className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>
            
            {/* Contact Details */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-black mb-4">Vishw Patel(Vizzv)</h1>
              <div className="space-y-2">
                <p className="flex items-center gap-2 font-bold">
                  <Mail className="w-5 h-5" /> vishw.m.patel@gmail.com
                </p>
                <p className="flex items-center gap-2 font-bold">
                  <Phone className="w-5 h-5" /> +91 8160599934
                </p>
                <p className="flex items-center gap-2 font-bold">
                  <MapPin className="w-5 h-5" /> Ahmedabad, India
                </p>
                <div className="flex gap-4 mt-4">
                  <a href="https://www.vizzv.com" className="flex items-center gap-2 font-bold">
                    <Globe2Icon className="w-5 h-5" /> www.vizzv.com
                  </a>
                </div>
                <div className="flex gap-4 mt-4">
                  <a href="https://github.com/vizzv" className="bg-black text-white px-4 py-2 font-bold hover:bg-gray-800 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/patelvishw" className="bg-black text-white px-4 py-2 font-bold hover:bg-gray-800 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Work Experience */}
        <Section title={<><Briefcase className="w-6 h-6" /> Work Experience</>}>
          <ExperienceCard
            period="Aug 2024 - Present"
            title="Trainee Software Engineer"
            company="Tatvasoft"
            responsibilities="Developing and Testing new functionalities into product as client's requirement $$n$$ Reduced more than 80% development time by Automation of workflow"
            technologies="Dotnet WebForms, WebApi, HTML, CSS, JS, MSSQL"
          />
          <ExperienceCard
            period="Jan 2024 - Aug 2024"
            title="Software Engineer Intern"
            company="Tatvasoft"
            responsibilities="Learn and apply new technologies into real world project"
            technologies="Dotnet Core 7, MVC, Bootstrap, Jquery,Podtgre sql"
          />
          <ExperienceCard
            period="Jan 2023 - July 2023"
            title="Website Designer"
            company="Local Businesses(5+)"
            responsibilities="Create professional and responsive web apps for local businesses"
            technologies="React JS, Tailwind CSS, MongoDB, Node JS, Express JS"
          />
        </Section>

        {/* Projects */}
        <Section title={<><BookOpen className="w-6 h-6" /> Projects</>}>
        <ProjectCard
            title="Namaste Doc"
            description="House call service for patient and doctor"
            technologies="Dotnet MVC,Postgre SQL,Bootstrap,Chart js,Maps,Full calendar,SignalR"
            features={[
              'Role based Authentication',
              'Jwt Authorisation',
              'Differenet Dashboards for patient,doctor and admin',
              'Maps integration using leaflet',
              "Eamil integration using mailkit",
              "SMS integration using twilio",
              "Pdf and Excel report download",
              "Realtime chatting using SignalR"
            ]}
          />
          <ProjectCard
            title="TickIt"
            description="Project Management Platform"
            technologies="Dotnet Core, MVC, SignalR, Chart.js, OpenXml, MailKit"
            features={[
              'Role-based Authentication',
              'Dashboard with charts and graphics',
              'Calendar support using FullCalendar',
              'Real-time collaboration using SignalR'
            ]}
          />
          <ProjectCard
            title="BoringBoard"
            description="Collaborative Whiteboard Application"
            technologies="React, Socket.io, TLDraw, Joi"
            features={[
              'Simple and collaborative whiteboard',
              'Real-time collaboration',
              'Data validation'
            ]}
          />
        </Section>

        {/* Education */}
        <Section title={<><Award className="w-6 h-6" /> Education</>}>
          <div className="border-4 border-black p-4 bg-purple-100">
            <h3 className="text-xl font-black mb-2">Computer Engineering</h3>
            <p className="font-bold">Gujarat Technological University</p>
            <p>CGPA: 8.62</p>
          </div>
        </Section>

        {/* Certificates */}
        <Section title={<><Calendar className="w-6 h-6" /> Certificates</>}>
          <CertificateCard
            title="Bootstrap Framework"
            skills="Bootstrap 5 framework"
            link="https://www.testdome.com/certificates/48e84bf0da90467fb0b56dea566502a6"
          />
          <CertificateCard
            title="Frontend Developer (React)"
            skills="HTML, CSS, JS, Node, React, Postgresql"
            link="https://www.hackerrank.com/certificates/12ebc7850fa1"
          />
          <CertificateCard
            title="Web Development Bootcamp"
            skills="React.js Developer Level"
            link="https://www.udemy.com/certificate/UC-20b85848-83ba-412c-9cb8-991836058c33/"
          />
        </Section>
        {/*contact */}
        <Section title={<><MessageCircle className="w-6 h-6" /> Contact Me</>}>
          <ContactForm />
        </Section>
      </div>
    </div>
  );
};

export default Portfolio;
