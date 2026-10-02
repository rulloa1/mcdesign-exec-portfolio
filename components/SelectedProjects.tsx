'use client';

import React, { useState } from 'react';

export interface ProjectItem {
  title: string;
  sector: string;
  role: string;
  scope: string;
  contribution: string;
  outcome: string;
  image: string;
  link?: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    title: 'S. Florida High Rise Luxe',
    sector: 'S. Florida',
    role: 'Design (Co-Design of Structure / Int. Design by Others), Project Management, Owner Representative, Craftsmen-Contractor / Contract Coordination, Property Management',
    scope: '4,200 sqft • 5 months • 4 bed · 4 bath',
    contribution: 'Professional execution and project oversight.',
    outcome: 'Completed to high executive standards.',
    image:
      'https://mcdesign.bio/__l5e/assets-v1/d001ed49-0dab-46d2-aa4b-41a1506b0e16/miami-beach-sunset-pool.png',
    link: 'https://mcdesign.bio/projects/miami-beach',
  },
  {
    title: 'High Alpine Mtn. Ranch',
    sector: 'Montana',
    role: 'Owner Representation, Design Oversight, Contractor Procurement, Contract Negotiation, Project Management, Property Management',
    scope: '2,300 sqft • 24 months • 2 bed · 2 bath',
    contribution: 'Professional execution and project oversight.',
    outcome: 'Completed to high executive standards.',
    image:
      'https://mcdesign.bio/__l5e/assets-v1/30cbe81c-83c3-42ed-a206-bf06cd99c179/alpine-ranch-cover-pro.png',
    link: 'https://mcdesign.bio/projects/alpine-ranch',
  },
  {
    title: 'Syracuse House',
    sector: 'N. Utah',
    role: 'Owner Representation, Project Management, Property Management',
    scope: '6,200 sqft • 18 months',
    contribution: 'Professional execution and project oversight.',
    outcome: 'Completed to high executive standards.',
    image: './assets/syracuse-cover.webp',
    link: 'https://mcdesign.bio/projects/syracuse',
  },
  {
    title: 'Mtn. Mid-Rise Luxe Condo',
    sector: 'Montana',
    role: 'Owner Representation, Project Management, Property Management',
    scope: '2,800 sqft • 8 months • New Build',
    contribution: 'Professional execution and project oversight.',
    outcome: 'Completed to high executive standards.',
    image: './assets/montana-condo-cover.webp',
    link: 'https://mcdesign.bio/projects/montana-condo',
  },
  {
    title: 'Ultra Luxe Private Club',
    sector: 'SE Texas',
    role: 'Owner Representation, Daily Project Management, Co-Design of Many Elements, Property Management',
    scope: '189,000 Gallon • 18 months',
    contribution: 'Professional execution and project oversight.',
    outcome: 'Completed to high executive standards.',
    image: './assets/hospitality-pool-cover.webp',
    link: 'https://mcdesign.bio/projects/hospitality-pool',
  },
  {
    title: 'South Coast Renovation',
    sector: 'Big Sur, CA',
    role: 'Owner Representative, Designer, Int. Designer, Builder, Project Manager, Property Manager, Owner Designee — During Photo Ad Campaign and Cinema Movie Shoots',
    scope: '3,800 sqft • 16 months',
    contribution: 'Professional execution and project oversight.',
    outcome: 'Completed to high executive standards.',
    image:
      'https://mcdesign.bio/__l5e/assets-v1/17e606d1-cd0e-431a-a775-25a40c4e13b8/southcoast-cover-pro.png',
    link: 'https://mcdesign.bio/projects/southcoast',
  },
  {
    title: 'Carmel Valley New',
    sector: 'Carmel Valley, CA',
    role: 'Designer (Structure), Builder, Project Manager, Civil Engineering Contractor',
    scope: '4,800 sqft • 20 months',
    contribution: 'Professional execution and project oversight.',
    outcome: 'Completed to high executive standards.',
    image: './assets/carmel-valley-new-cover.webp',
    link: 'https://mcdesign.bio/projects/carmel-valley-new',
  },
  {
    title: 'North Florida Renovation Addition',
    sector: 'N. Florida',
    role: 'Designer (Manage/Oversight of Architect / Int. Design by Others), Project Management, Owner Representative, Craftsmen-Contractor / Contract Coordination, Property Management',
    scope: '3,600 + 1,200 sqft • 10 months',
    contribution: 'Professional execution and project oversight.',
    outcome: 'Completed to high executive standards.',
    image:
      'https://mcdesign.bio/__l5e/assets-v1/4352792a-8630-4b16-a842-e7dbd6d0fe23/north-florida-vero-cover.png',
    link: 'https://mcdesign.bio/projects/north-florida',
  },
  {
    title: 'Coastal Mountain Residential',
    sector: 'Big Sur, CA',
    role: 'Owner Representative, Designer, Builder, Project Manager, Permit Procurement',
    scope: '11 months • 3,000 cu yds earth moved • 320 ln ft retaining walls',
    contribution: 'Professional execution and project oversight.',
    outcome: 'Completed to high executive standards.',
    image: './assets/bigsur-civil-cover.webp',
    link: 'https://mcdesign.bio/projects/bigsur-civil',
  },
  {
    title: 'Carmel Knolls',
    sector: 'Carmel, CA',
    role: 'Designer, Int. Designer, Builder, Project Manager, Permit Procurement',
    scope: '2,200 sqft • 1,400 sqft decking • 12 months',
    contribution: 'Professional execution and project oversight.',
    outcome: 'Completed to high executive standards.',
    image: './assets/carmel-knolls-cover.webp',
    link: 'https://mcdesign.bio/projects/carmel-knolls',
  },
  {
    title: 'Coastal Restoration',
    sector: 'Monterey Peninsula, CA',
    role: 'Civil Engineering Contractor, Builder, Permit Procurement (Emergency Construction Permit to save residence)',
    scope: '9 months • 2,500 cu yds earth moved • 180 ln ft retaining walls',
    contribution: 'Professional execution and project oversight.',
    outcome: 'Completed to high executive standards.',
    image:
      'https://mcdesign.bio/__l5e/assets-v1/f7c1f307-4319-4079-ae75-dc6cc46936c5/coastal-restoration-deck-cover.png',
    link: 'https://mcdesign.bio/projects/coastal-restoration',
  },
  {
    title: 'Abaco Luxe Boat House',
    sector: 'Abaco, Bahamas',
    role: 'Project Manager in a Foreign Country for US Owners',
    scope: '1,800 sqft • 6 months',
    contribution: 'Professional execution and project oversight.',
    outcome: 'Completed to high executive standards.',
    image: './assets/abaco-luxe-boathouse-cover.webp',
    link: 'https://mcdesign.bio/projects/abaco-boathouse',
  },
  {
    title: 'Civil Engineering',
    sector: 'CA · TX · NM · CO · MT',
    role: 'Civil Engineering Contractor/Builder, Project Management, Permit Procurement',
    scope: '2015–2024 • 50,000 cu yds earth moved • 2,500 ln ft retaining walls',
    contribution: 'Professional execution and project oversight.',
    outcome: 'Completed to high executive standards.',
    image: 'https://mcdesign.bio/projects/assets/development-site.webp',
    link: 'https://mcdesign.bio/projects/civil-infrastructure',
  },
  {
    title: 'Beachfront Estate Residence',
    sector: 'Abaco, Bahamas',
    role: 'Project Manager in Foreign Country for US Owners',
    scope: '6,800 sqft • 2.5 Acres • 180 ft beach frontage',
    contribution: 'Professional execution and project oversight.',
    outcome: 'Completed to high executive standards.',
    image: './assets/beachfront-cover.webp',
    link: 'https://mcdesign.bio/projects/beachfront-estate',
  },
  {
    title: 'Development Civil',
    sector: 'SE Texas',
    role: 'Project Management, Development / Civil Engineering Contractor/Builder',
    scope: '103 Acres • 36 months',
    contribution: 'Professional execution and project oversight.',
    outcome: 'Completed to high executive standards.',
    image: './assets/development-civil-cover.jpg',
    link: 'https://mcdesign.bio/projects/development-civil',
  },
  {
    title: 'New Residential in Historic Neighborhood',
    sector: 'Central Coast, CA',
    role: 'Designer (Structure & Int. Design), Project Management, Owner Representative',
    scope: '2,600 sqft • 14 months',
    contribution: 'Professional execution and project oversight.',
    outcome: 'Completed to high executive standards.',
    image: './assets/pacific-grove-cover.webp',
    link: 'https://mcdesign.bio/projects/pacific-grove',
  },
  {
    title: 'Carmel Forest to Ocean View',
    sector: 'Carmel By the Sea, CA',
    role: 'Designer, Builder, Project Manager',
    scope: 'Custom Addition • Forest to Ocean Views',
    contribution: 'Professional execution and project oversight.',
    outcome: 'Completed to high executive standards.',
    image: './assets/carmel-forest-cover.webp',
    link: 'https://mcdesign.bio/projects/carmel-forest',
  },
  {
    title: 'Hillside Restoration & Environmental Cleanup',
    sector: 'Carmel, CA',
    role: 'Civil Engineering Contractor/Builder, Permit Procurement',
    scope: '4 months • 1.5 Acres • 80 Tons debris removed',
    contribution: 'Professional execution and project oversight.',
    outcome: 'Completed to high executive standards.',
    image: './assets/hillside-restoration-cover.webp',
    link: 'https://mcdesign.bio/projects/hillside-restoration',
  },
  {
    title: 'Laguna Grande',
    sector: 'Seaside, CA',
    role: 'Design (Structure), Builder, Project Manager, Owner\'s Representative, Civil Engineering Construction',
    scope: '12,000 sqft • 14 months',
    contribution: 'Professional execution and project oversight.',
    outcome: 'Completed to high executive standards.',
    image: './assets/laguna-grande-cover.webp',
    link: 'https://mcdesign.bio/projects/laguna-grande',
  },
];

export const SelectedProjects: React.FC = () => {
  const [filter, setFilter] = useState<string>('ALL');

  const sectors = ['ALL', 'Residential', 'Civil / Land', 'Commercial & Club'];

  const filteredProjects = PROJECTS_DATA.filter((proj) => {
    if (filter === 'ALL') return true;
    if (filter === 'Residential')
      return (
        proj.title.includes('Luxe') ||
        proj.title.includes('House') ||
        proj.title.includes('Condo') ||
        proj.title.includes('Estate') ||
        proj.title.includes('Residential')
      );
    if (filter === 'Civil / Land')
      return (
        proj.title.includes('Civil') ||
        proj.title.includes('Restoration') ||
        proj.sector.includes('Big Sur')
      );
    if (filter === 'Commercial & Club')
      return proj.title.includes('Club') || proj.title.includes('Boat House');
    return true;
  });

  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[#D4AF37] text-xs font-mono tracking-[0.2em] uppercase mb-3 block">
          VERIFIED EXECUTIVE PORTFOLIO
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal mb-4">
          Selected Projects
        </h2>
        <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
          Operational highlights and project delivery records across ultra-luxury residential, private club hospitality, and complex civil engineering.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
          {sectors.map((sec) => (
            <button
              key={sec}
              onClick={() => setFilter(sec)}
              className={`px-4 py-2 text-xs font-mono tracking-wider uppercase border transition-all duration-300 ${
                filter === sec
                  ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#D4AF37]'
                  : 'border-white/10 bg-black/40 text-gray-400 hover:border-white/20 hover:text-white'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((proj, idx) => (
          <div
            key={idx}
            className="flex flex-col bg-[#141414] border border-white/10 rounded-sm overflow-hidden group hover:border-[#D4AF37]/40 transition-all duration-500 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          >
            {/* Image Container */}
            <div className="h-56 md:h-64 overflow-hidden relative bg-[#0a0a0a]">
              <div className="absolute inset-0 bg-[#050505]/30 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img
                src={proj.image}
                alt={`Project rendering for ${proj.title}`}
                className="w-full h-full object-cover grayscale opacity-85 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                loading="lazy"
                onError={(e) => {
                  // Fallback image if local path fails
                  (e.target as HTMLImageElement).src =
                    'https://mcdesign.bio/__l5e/assets-v1/d001ed49-0dab-46d2-aa4b-41a1506b0e16/miami-beach-sunset-pool.png';
                }}
              />
              <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/75 backdrop-blur-md border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-mono tracking-widest uppercase">
                {proj.sector}
              </span>
            </div>

            {/* Content Container */}
            <div className="p-6 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-white font-serif text-xl font-medium mb-4 group-hover:text-[#D4AF37] transition-colors">
                  {proj.title}
                </h3>
                <div className="space-y-3 text-xs md:text-sm text-gray-300 font-light mb-6 leading-relaxed">
                  <p>
                    <strong className="text-white font-medium">Role:</strong>{' '}
                    {proj.role}
                  </p>
                  <p>
                    <strong className="text-white font-medium">Scope:</strong>{' '}
                    {proj.scope}
                  </p>
                  <p>
                    <strong className="text-white font-medium">Contribution:</strong>{' '}
                    {proj.contribution}
                  </p>
                  <p>
                    <strong className="text-white font-medium">Outcome:</strong>{' '}
                    {proj.outcome}
                  </p>
                </div>
              </div>

              {proj.link ? (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#D4AF37] text-xs font-mono uppercase tracking-widest hover:text-white transition-colors border-b border-transparent hover:border-white self-start pb-1 pt-2"
                >
                  <span>View Project Details</span>
                  <span className="text-xs">→</span>
                </a>
              ) : (
                <span className="text-gray-500 text-xs font-mono uppercase tracking-widest self-start pb-1 pt-2">
                  Details Unavailable
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SelectedProjects;
