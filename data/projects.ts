export type Project = {
  number: string;
  title: string;
  category: string;
  summary: string;
  contributions: readonly { area: string; detail: string }[];
  stack: readonly string[];
  image?: { src: string; alt: string };
  href?: string;
};

export const projects: readonly Project[] = [
  {
    number: "01",
    title: "Empleo",
    category: "HR & payroll platform",
    summary: "From clock-in to payday. An HRMS that brings employee attendance, payroll, and company management together.",
    contributions: [
      { area: "Payroll & attendance", detail: "Built attendance collection for employee payroll." },
      { area: "Access & tenancy", detail: "Implemented role-based access control and multi-tenant support." },
      { area: "Payments", detail: "Integrated Maya Vault with queue-triggered billing after the one-month free trial." },
    ],
    stack: ["Vite", "React", "Laravel"],
    image: { src: "/assets/project-1.png", alt: "Empleo homepage showcasing its attendance and payroll dashboards on a laptop and phone." },
  },
  {
    number: "02",
    title: "Kidopass",
    category: "Kids’ activity booking",
    summary: "Less scheduling. More play. A platform where families discover activities and book their child’s next adventure.",
    contributions: [
      { area: "Bookings & tenancy", detail: "Built booking schedules and multi-tenant support." },
      { area: "Payments", detail: "Integrated one-time Maya payments." },
      { area: "PWA & CMS", detail: "Implemented PWA support and site-wide primary and secondary theme colors controlled through the CMS." },
    ],
    stack: ["Nuxt.js", "Supabase"],
    image: { src: "/assets/project-2.png", alt: "Kidopass homepage introducing children’s activities with colorful illustrations and portraits." },
  },
  {
    number: "03",
    title: "Clinicore",
    category: "Electronic medical records",
    summary: "One patient journey, across multiple clinics. An EMR connecting records, appointments, and everyday care.",
    contributions: [
      { area: "Integrations", detail: "Connected APIs and integrated OpenAI into the platform." },
      { area: "Experience & tenancy", detail: "Built mobile-responsive interfaces and contributed to multi-tenant support." },
      { area: "Backend", detail: "Fixed queries and bugs, and improved backend workflows across the EMR." },
    ],
    stack: ["Next.js", "Laravel"],
    image: { src: "/assets/project-3.png", alt: "Clinicore homepage presenting its electronic medical record platform for doctors and clinics." },
  },
  {
    number: "04",
    title: "Genesis Biz Consultancy",
    category: "Consultancy website",
    summary: "A clear first impression. A responsive consultancy website that introduces the business and makes getting in touch simple.",
    contributions: [
      { area: "Discovery", detail: "Implemented basic SEO for the landing page." },
      { area: "Contact", detail: "Connected the inquiry form to Resend." },
      { area: "Experience", detail: "Built responsive layouts for mobile and larger screens." },
    ],
    stack: ["Next.js", "Resend"],
    image: { src: "/assets/project-4.png", alt: "Genesis Biz Consultancy homepage introducing business registration, compliance, and market-entry services in the Philippines." },
  },
];
