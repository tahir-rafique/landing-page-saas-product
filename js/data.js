/* ===========================================
   DATA — all dynamic content for the page.
   Keeping content in JS lets us re-render
   sections via reusable component functions
   and swap content without touching markup.
   =========================================== */

window.SITE_DATA = {
  services: [
    { title: ["Search engine", "optimization"], titleAccent: ["primary", "primary"], theme: "light",   illustration: "seo" },
    { title: ["Pay-per-click", "advertising"],  titleAccent: ["white", "white"],     theme: "primary", illustration: "ppc" },
    { title: ["Social Media", "Marketing"],     titleAccent: ["primary", "primary"], theme: "light",   illustration: "social" },
    { title: ["Email", "Marketing"],            titleAccent: ["primary", "primary"], theme: "light",   illustration: "email" },
    { title: ["Content", "Creation"],           titleAccent: ["white", "white"],     theme: "primary", illustration: "content" },
    { title: ["Analytics and", "Tracking"],     titleAccent: ["primary", "primary"], theme: "dark",    illustration: "analytics" }
  ],

  caseStudies: [
    { text: "For a local restaurant, we implemented a targeted PPC campaign that resulted in a 50% increase in website traffic and a 25% increase in sales." },
    { text: "For a B2B software company, we developed an SEO strategy that resulted in a first page ranking for key keywords and a 200% increase in organic traffic." },
    { text: "For a national retail chain, we created a social media marketing campaign that increased followers by 25% and generated a 20% increase in online sales." }
  ],

  process: [
    { num: "01", title: "Consultation",                       body: "During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements." },
    { num: "02", title: "Research and Strategy Development",  body: "We conduct comprehensive market research and analyze your competitors to develop a tailored strategy that aligns with your goals, audience, and brand voice." },
    { num: "03", title: "Implementation",                     body: "Our team executes the strategy across selected channels with attention to detail, ensuring every campaign is launched on time and on brand." },
    { num: "04", title: "Monitoring and Optimization",        body: "We continuously monitor campaign performance, A/B test creative and targeting, and optimize toward the metrics that move your business." },
    { num: "05", title: "Reporting and Communication",        body: "Receive transparent monthly reports with insights and clear next steps. We stay in close touch so there are no surprises." },
    { num: "06", title: "Continual Improvement",              body: "Markets shift, so do we. We refine your strategy continually using performance data and emerging best practices." }
  ],

  team: [
    { name: "John Smith",     role: "CEO and Founder",         bio: "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy",                                                  profilImage: "images/john.svg" },
    { name: "Jane Doe",       role: "Director of Operations",  bio: "7+ years of experience in project management and team leadership. Strong organizational and communication skills",                          profilImage: "images/jane.svg" },
    { name: "Michael Brown",  role: "Senior SEO Specialist",   bio: "5+ years of experience in SEO and content creation. Proficient in keyword research and on-page optimization",                                profilImage: "images/michael.svg" },
    { name: "Emily Johnson",  role: "PPC Manager",             bio: "3+ years of experience in paid search advertising. Skilled in campaign management and performance analysis",                                 profilImage: "images/emily.svg" },
    { name: "Brian Williams", role: "Social Media Specialist", bio: "4+ years of experience in social media marketing. Proficient in creating and scheduling content, analyzing metrics, and building engagement", profilImage: "images/brian.svg" },
    { name: "Sarah Kim",      role: "Content Creator",         bio: "2+ years of experience in writing and editing. Skilled in creating compelling, SEO-optimized content for various industries",                profilImage: "images/sarah.svg" }
  ],

  testimonials: [
    { quote: "We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence.", name: "John Smith",    role: "Marketing Director at XYZ Corp" },
    { quote: "The Positivus team transformed our PPC strategy and we saw a measurable lift in qualified leads within the first quarter. Their reporting is clear and actionable.",                                                                                                                                                                  name: "Amelia Reyes",  role: "Growth Lead at Northwind" },
    { quote: "Their content team understands SaaS positioning. Posts now drive consistent inbound traffic and have shortened our sales cycle.",                                                                                                                                                                                                     name: "Daniel Park",   role: "Head of Marketing at Lumen" },
    { quote: "From SEO audits to ongoing optimization, Positivus has been a real extension of our team. Communication is fast and thoughtful.",                                                                                                                                                                                                     name: "Priya Shah",    role: "Founder, Verdant Apps" },
    { quote: "We doubled our organic conversions in six months. What stood out most was their willingness to challenge assumptions and test new approaches.",                                                                                                                                                                                       name: "Marcus Lee",    role: "VP Marketing at Stellar" }
  ]
};
