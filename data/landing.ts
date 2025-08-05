import type { JourneyStep, Testimonial } from '@/types/landing';

export const journeySteps: JourneyStep[] = [
    {
      logo: '/images/phase1.svg',
      phase: 'Phase 1: Foundations',
      description: 'Master data structures, algorithms, and problem-solving techniques in an intensive 3-month bootcamp.',
    },
    {
      logo: '/images/phase2.svg',
      phase: 'Phase 2: Real-world Projects',
      description: 'Apply your skills to build complex projects, collaborate in teams, and prepare for technical interviews.',
    },
    {
      logo: '/images/phase3.svg',
      phase: 'Phase 3: Internship Placement',
      description: 'We help you secure internships at top global tech companies to gain invaluable experience.',
    },
    {
      logo: '/images/phase4.svg',
      phase: 'Phase 4: Full-Time Conversion',
      description: 'Excel in your internship and convert it into a full-time offer, launching your global career.',
    },
  ];
  
export const testimonials: Testimonial[] = [
    {
      photo: '/images/alumni1.png',
      name: 'Abel Tadesse',
      role: 'Software Engineer, Google',
      description: `"A2SV completely changed the trajectory
  of my career. The training is intense, but
  the community and the opportunities are
  unparalleled. I'm now at my dream
  company, and I owe it all to A2SV."`,
    },
    {
      photo: '/images/alumni2.png',
      name: 'Bethlehem Tadesse',
      role: 'Software Engineer, Amazon',
      description: `“The problem-solving skills I learned at
  A2SV are invaluable. The mentors push
  you to be your best, and you're
  surrounded by people who are just as
  passionate as you are.”`,
    },
    {
      photo: '/images/alumni3.png',
      name: 'Caleb Mulugeta',
      role: 'Software Engineer, Palantir',
      description: `“A2SV is more than a bootcamp. It's a
  family that supports you long after you've
  graduated. The network you build here is
  for life.”`,
    },
  ];
  