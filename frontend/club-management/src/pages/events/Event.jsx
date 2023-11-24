import EventCard from "../../components/EventCard"
const eventData = [
    {
      "title": "CSEC CPD contest 2",
      "description": "We are excited to announce that the second round contest of our division will be held on Monday. This contest will test participants' skills in various cybersecurity domains, including network security, cryptography, and ethical hacking. Join us for a challenging competition and a chance to showcase your expertise in the field. Don't miss this opportunity to learn, compete, and connect with fellow cybersecurity enthusiasts.",
      "date": "Sep 2, 2003",
      "time": "3:00pm LT",
      "division": "CSEC DEV",
      "subscribed": false
    },
    {
      "title": "Introduction to Cryptography Workshop",
      "description": "Join us for an informative workshop on the fundamentals of cryptography and its applications. In this workshop, we will explore various encryption algorithms, cryptographic protocols, and real-world use cases. Whether you're a beginner or have some knowledge in cryptography, this workshop will provide valuable insights and practical knowledge to enhance your understanding. Don't miss this opportunity to delve into the fascinating world of cryptography and its role in ensuring data security.",
      "date": "Oct 15, 2003",
      "time": "2:30pm LT",
      "division": "CSEC DEV",
      "subscribed": true
    },
    {
      "title": "Cybersecurity Career Fair",
      "description": "Explore exciting career opportunities in the field of cybersecurity at our annual career fair. This event brings together leading companies, organizations, and professionals from the cybersecurity industry. Whether you're a student looking for internships or a seasoned professional seeking new job prospects, this career fair offers a platform to network, showcase your skills, and discover potential career paths. Join us to connect with industry experts, attend informative sessions, and take the next step in your cybersecurity career.",
      "date": "Nov 5, 2003",
      "time": "10:00am LT",
      "division": "CSEC DEV",
      "subscribed": false
    },
    {
      "title": "Secure Coding Workshop",
      "description": "Learn the best practices and techniques for writing secure code in our hands-on workshop. In this workshop, we will cover topics such as input validation, secure authentication, protection against common vulnerabilities, and secure coding standards. By the end of the workshop, you will have a solid understanding of how to develop robust and secure applications. Whether you're a software developer, engineer, or aspiring cybersecurity professional, this workshop will equip you with essential skills to ensure the integrity and security of your code.",
      "date": "Dec 8, 2003",
      "time": "1:00pm LT",
      "division": "CSEC DEV",
      "subscribed": false
    },
    {
      "title": "Ethical Hacking Seminar",
      "description": "Join us for an insightful seminar on ethical hacking and its role in cybersecurity. In this seminar, we will explore the principles, methodologies, and tools used by ethical hackers to identify and address vulnerabilities in computer systems. You will gain a deeper understanding of penetration testing, vulnerability assessment, and the importance of ethical hacking in enhancing overall security. Whether you're a cybersecurity professional, IT manager, or simply curious about ethical hacking, this seminar will provide valuable knowledge and insights.",
      "date": "Jan 20, 2004",
      "time": "4:30pm LT",
      "division": "CSEC DEV",
      "subscribed": true
    },
    // Add more data entries here...
  ];

  function Event() {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {eventData.map((evt) => (
          <EventCard key={evt.title} eventData={evt} />
        ))}
      </div>
    );
  }

export default Event;