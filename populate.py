import os
import re

out_file = r"C:\Users\roryulloa\.gemini\antigravity-ide\scratch\mcdesign-portfolio\index.html"
with open(out_file, "r", encoding="utf-8") as f:
    html = f.read()

# 1. Update Bio
bio_html = """        <div class="space-y-5 text-white/55 text-base leading-[1.85]">
          <p>
            With over 37 years of executive construction leadership, Michael Chandler has managed and delivered more than $500 million in ultra-luxury residential, hospitality, and civil projects across six global regions — from California's coastline to the Caribbean.
          </p>
          <p>
            As Owner of MC Design Build, Michael brings a rare combination of architectural sensitivity and rigorous project management to every engagement. His portfolio spans Discovery Land Company developments, private island estates, alpine retreats, and complex coastal restorations.
          </p>
          <p>
            Known for his old-world craftsmanship standards and modern execution methodology, Michael personally curates every trade partner, material selection, and milestone — ensuring on-time, on-budget delivery without compromising design intent.
          </p>
        </div>"""
html = re.sub(r'<div class="space-y-5 text-white/55 text-base leading-\[1.85\]">.*?</div>', bio_html, html, flags=re.DOTALL)

# 2. Update Experience
experience_html = """      <!-- ── ROLE 1 ──────────────────────────────────────────────── -->
      <div class="timeline-entry pb-16 reveal">
        <div class="timeline-dot"></div>
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-5">
          <div>
            <h3 class="font-display text-xl font-semibold text-white">
              CEO &amp; Head of Operations (Contract)
            </h3>
            <p class="text-white/60 text-sm mt-1">
              The Mangrove Group (Private Consulting)
            </p>
          </div>
          <div class="text-right flex-shrink-0">
            <p class="eyebrow text-[.58rem] text-white/35">
              May 2026 – Aug 2026
            </p>
            <p class="text-white/30 text-xs mt-1">San Antonio, FL</p>
          </div>
        </div>
        <ul class="space-y-3 text-white/50 text-sm leading-relaxed">
          <li class="flex gap-3"><span class="text-gold/50 flex-shrink-0 mt-1">—</span>
            <span>Led company operations on a contract basis, reporting directly to ownership and setting priorities across the active construction portfolio.</span></li>
          <li class="flex gap-3"><span class="text-gold/50 flex-shrink-0 mt-1">—</span>
            <span>Held project teams accountable for budget, schedule, and quality through consistent cost reporting and executive-level project reviews.</span></li>
          <li class="flex gap-3"><span class="text-gold/50 flex-shrink-0 mt-1">—</span>
            <span>Standardized procurement, scheduling, and project reporting workflows to give ownership clearer cost visibility and faster decisions.</span></li>
        </ul>
      </div>

      <!-- ── ROLE 2 ──────────────────────────────────────────────── -->
      <div class="timeline-entry pb-16 reveal" data-delay="80">
        <div class="timeline-dot"></div>
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-5">
          <div>
            <h3 class="font-display text-xl font-semibold text-white">
              Sr. Project Manager / Owner's Representative
            </h3>
            <p class="text-white/60 text-sm mt-1">NewQuest Properties <span class="italic text-white/40 block mt-1">The Clubs at Houston Oaks &amp; The Links at Houston Oaks</span></p>
          </div>
          <div class="text-right flex-shrink-0">
            <p class="eyebrow text-[.58rem] text-white/35">2022 – 2025</p>
            <p class="text-white/30 text-xs mt-1">Houston, TX</p>
          </div>
        </div>
        <ul class="space-y-3 text-white/50 text-sm leading-relaxed">
          <li class="flex gap-3"><span class="text-gold/50 flex-shrink-0 mt-1">—</span>
            <span>Directed construction phases of a $67MM private club portfolio, holding to multi-year budget and schedule requirements through value engineering and proactive risk mitigation.</span></li>
          <li class="flex gap-3"><span class="text-gold/50 flex-shrink-0 mt-1">—</span>
            <span>Oversaw design and construction of club renovations and new facilities, applying architectural expertise to protect design intent, finish quality, and member experience.</span></li>
          <li class="flex gap-3"><span class="text-gold/50 flex-shrink-0 mt-1">—</span>
            <span>Served as primary executive liaison between the design team, the field, high-net-worth developers, and institutional stakeholders.</span></li>
        </ul>
      </div>

      <!-- ── ROLE 3 ──────────────────────────────────────────────── -->
      <div class="timeline-entry pb-16 reveal" data-delay="160">
        <div class="timeline-dot"></div>
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-5">
          <div>
            <h3 class="font-display text-xl font-semibold text-white">
              Project Manager / Owner's Representative
            </h3>
            <p class="text-white/60 text-sm mt-1">The Mangrove Group</p>
          </div>
          <div class="text-right flex-shrink-0">
            <p class="eyebrow text-[.58rem] text-white/35">2020 – 2022</p>
            <p class="text-white/30 text-xs mt-1">International / Remote</p>
          </div>
        </div>
        <ul class="space-y-3 text-white/50 text-sm leading-relaxed">
          <li class="flex gap-3"><span class="text-gold/50 flex-shrink-0 mt-1">—</span>
            <span>Directed a $75M pipeline of five large private residential estates in the U.S. and abroad (Bahamas, Mexico), delivering every project within ±2% of budget.</span></li>
          <li class="flex gap-3"><span class="text-gold/50 flex-shrink-0 mt-1">—</span>
            <span>Standardized permitting and entitlement workflows across international jurisdictions, pulling project starts forward by an average of 4 weeks.</span></li>
        </ul>
      </div>

      <!-- ── ROLE 4 ──────────────────────────────────────────────── -->
      <div class="timeline-entry pb-16 reveal" data-delay="240">
        <div class="timeline-dot"></div>
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-5">
          <div>
            <h3 class="font-display text-xl font-semibold text-white">
              Project Manager
            </h3>
            <p class="text-white/60 text-sm mt-1">Yellowstone Club</p>
          </div>
          <div class="text-right flex-shrink-0">
            <p class="eyebrow text-[.58rem] text-white/35">2018 – 2020</p>
            <p class="text-white/30 text-xs mt-1">Big Sky, MT</p>
          </div>
        </div>
        <ul class="space-y-3 text-white/50 text-sm leading-relaxed">
          <li class="flex gap-3"><span class="text-gold/50 flex-shrink-0 mt-1">—</span>
            <span>Led construction oversight for multimillion-dollar luxury condominium towers, spa facilities, and restaurants in North America's premier private ski and golf community.</span></li>
          <li class="flex gap-3"><span class="text-gold/50 flex-shrink-0 mt-1">—</span>
            <span>Managed stakeholder communication to align project goals with the exacting expectations of an ultra-exclusive membership.</span></li>
        </ul>
      </div>

      <!-- ── ROLE 5 ──────────────────────────────────────────────── -->
      <div class="timeline-entry pb-16 reveal" data-delay="320">
        <div class="timeline-dot"></div>
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-5">
          <div>
            <h3 class="font-display text-xl font-semibold text-white">
              Project Manager — Bakers Bay Resort
            </h3>
            <p class="text-white/60 text-sm mt-1">Discovery Land Company / Starfish Company</p>
          </div>
          <div class="text-right flex-shrink-0">
            <p class="eyebrow text-[.58rem] text-white/35">2015 – 2018</p>
            <p class="text-white/30 text-xs mt-1">Great Guana Cay, Bahamas</p>
          </div>
        </div>
        <ul class="space-y-3 text-white/50 text-sm leading-relaxed">
          <li class="flex gap-3"><span class="text-gold/50 flex-shrink-0 mt-1">—</span>
            <span>Directed construction of Owner, Resort, and Private products, including the Beach Club Restaurant, Beach Club Spa, Market by the Pier, and multiple ultra-luxury single-family residences.</span></li>
          <li class="flex gap-3"><span class="text-gold/50 flex-shrink-0 mt-1">—</span>
            <span>Ran procurement and logistics for remote-island construction with limited local infrastructure, keeping materials and crews moving on schedule.</span></li>
        </ul>
      </div>
"""
# Replace everything from ROLE 1 down to the closing div of the timeline entries.
html = re.sub(r'<!-- ── ROLE 1 — EDIT ──────────────────────────────────────────────── -->.*?<!-- Add more roles by duplicating a block above -->', experience_html, html, flags=re.DOTALL)


# 3. Update Projects
projects_html = """
      <!-- ── PROJECT CARD 1 ─────────────────────────────────────────────── -->
      <article class="pcard reveal" data-delay="0">
        <a href="#unavailable" data-project="S. Florida High Rise Luxe Condo"
           onclick="handleProjectLink(event,this)" class="block group">
          <div class="relative overflow-hidden aspect-[16/9]">
            <div class="pcard-img-inner w-full h-full flex items-center justify-center">
                <img src="/__l5e/assets-v1/d001ed49-0dab-46d2-aa4b-41a1506b0e16/miami-beach-sunset-pool.png" alt="S. Florida High Rise Luxe Condo" class="w-full h-full object-cover">
            </div>
            <div class="pcard-hover absolute inset-0 flex items-center justify-center bg-gold/[.06]">
              <span class="text-gold text-[.62rem] tracking-[.22em] uppercase font-medium">View Detail &rarr;</span>
            </div>
          </div>
          <div class="p-6 space-y-3">
            <div class="flex items-center justify-between">
              <p class="eyebrow text-[.58rem]">Residential / Owners Rep</p>
              <p class="text-white/25 text-[.58rem] tracking-wide">Design, PM, Owner Rep</p>
            </div>
            <h3 class="font-display text-lg font-medium group-hover:text-gold transition-colors duration-300">
              S. Florida High Rise Luxe Condo
            </h3>
            <p class="text-white/38 text-xs leading-relaxed">
              4,200 sqft • 5 months • S. Florida
            </p>
          </div>
        </a>
      </article>

      <!-- ── PROJECT CARD 2 ─────────────────────────────────────────────── -->
      <article class="pcard reveal" data-delay="120">
        <a href="#unavailable" data-project="High Alpine Mtn. Ranch"
           onclick="handleProjectLink(event,this)" class="block group">
          <div class="relative overflow-hidden aspect-[16/9]">
            <div class="pcard-img-inner w-full h-full flex items-center justify-center">
                <img src="/__l5e/assets-v1/30cbe81c-83c3-42ed-a206-bf06cd99c179/alpine-ranch-cover-pro.png" alt="High Alpine Mtn. Ranch" class="w-full h-full object-cover">
            </div>
            <div class="pcard-hover absolute inset-0 flex items-center justify-center bg-gold/[.06]">
              <span class="text-gold text-[.62rem] tracking-[.22em] uppercase font-medium">View Detail &rarr;</span>
            </div>
          </div>
          <div class="p-6 space-y-3">
            <div class="flex items-center justify-between">
              <p class="eyebrow text-[.58rem]">Residential / Owners Rep</p>
              <p class="text-white/25 text-[.58rem] tracking-wide">Owner Rep, Design Oversight, PM</p>
            </div>
            <h3 class="font-display text-lg font-medium group-hover:text-gold transition-colors duration-300">
              High Alpine Mtn. Ranch
            </h3>
            <p class="text-white/38 text-xs leading-relaxed">
              2,300 sqft • 24 months • Montana
            </p>
          </div>
        </a>
      </article>

      <!-- ── PROJECT CARD 3 ─────────────────────────────────────────────── -->
      <article class="pcard reveal" data-delay="240">
        <a href="#unavailable" data-project="South Coast Renovation"
           onclick="handleProjectLink(event,this)" class="block group">
          <div class="relative overflow-hidden aspect-[16/9]">
            <div class="pcard-img-inner w-full h-full flex items-center justify-center">
                <img src="/__l5e/assets-v1/17e606d1-cd0e-431a-a775-25a40c4e13b8/southcoast-cover-pro.png" alt="South Coast Renovation" class="w-full h-full object-cover">
            </div>
            <div class="pcard-hover absolute inset-0 flex items-center justify-center bg-gold/[.06]">
              <span class="text-gold text-[.62rem] tracking-[.22em] uppercase font-medium">View Detail &rarr;</span>
            </div>
          </div>
          <div class="p-6 space-y-3">
            <div class="flex items-center justify-between">
              <p class="eyebrow text-[.58rem]">Design-Build</p>
              <p class="text-white/25 text-[.58rem] tracking-wide">Owner Rep, Designer, Builder, PM</p>
            </div>
            <h3 class="font-display text-lg font-medium group-hover:text-gold transition-colors duration-300">
              South Coast Renovation
            </h3>
            <p class="text-white/38 text-xs leading-relaxed">
              3,800 sqft • 16 months • Big Sur, CA
            </p>
          </div>
        </a>
      </article>
      
      <!-- ── PROJECT CARD 4 ─────────────────────────────────────────────── -->
      <article class="pcard reveal" data-delay="0">
        <a href="#unavailable" data-project="North Florida Renovation Addition"
           onclick="handleProjectLink(event,this)" class="block group">
          <div class="relative overflow-hidden aspect-[16/9]">
            <div class="pcard-img-inner w-full h-full flex items-center justify-center">
                <img src="/__l5e/assets-v1/4352792a-8630-4b16-a842-e7dbd6d0fe23/north-florida-vero-cover.png" alt="North Florida Renovation Addition" class="w-full h-full object-cover">
            </div>
            <div class="pcard-hover absolute inset-0 flex items-center justify-center bg-gold/[.06]">
              <span class="text-gold text-[.62rem] tracking-[.22em] uppercase font-medium">View Detail &rarr;</span>
            </div>
          </div>
          <div class="p-6 space-y-3">
            <div class="flex items-center justify-between">
              <p class="eyebrow text-[.58rem]">Owners Rep / Estate Mgmt</p>
              <p class="text-white/25 text-[.58rem] tracking-wide">Designer, PM, Owner Rep</p>
            </div>
            <h3 class="font-display text-lg font-medium group-hover:text-gold transition-colors duration-300">
              North Florida Renovation Addition
            </h3>
            <p class="text-white/38 text-xs leading-relaxed">
              3,600 + 1,200 sqft • 10 months • N. Florida
            </p>
          </div>
        </a>
      </article>

      <!-- ── PROJECT CARD 5 ─────────────────────────────────────────────── -->
      <article class="pcard reveal" data-delay="120">
        <a href="#unavailable" data-project="Coastal Restoration"
           onclick="handleProjectLink(event,this)" class="block group">
          <div class="relative overflow-hidden aspect-[16/9]">
            <div class="pcard-img-inner w-full h-full flex items-center justify-center">
                <img src="/__l5e/assets-v1/f7c1f307-4319-4079-ae75-dc6cc46936c5/coastal-restoration-deck-cover.png" alt="Coastal Restoration" class="w-full h-full object-cover">
            </div>
            <div class="pcard-hover absolute inset-0 flex items-center justify-center bg-gold/[.06]">
              <span class="text-gold text-[.62rem] tracking-[.22em] uppercase font-medium">View Detail &rarr;</span>
            </div>
          </div>
          <div class="p-6 space-y-3">
            <div class="flex items-center justify-between">
              <p class="eyebrow text-[.58rem]">Civil</p>
              <p class="text-white/25 text-[.58rem] tracking-wide">Civil Eng Contractor, Builder</p>
            </div>
            <h3 class="font-display text-lg font-medium group-hover:text-gold transition-colors duration-300">
              Coastal Restoration
            </h3>
            <p class="text-white/38 text-xs leading-relaxed">
              9 months • 2,500 cu yds earth moved • Monterey Peninsula, CA
            </p>
          </div>
        </a>
      </article>
"""
html = re.sub(r'<!-- ── PROJECT CARD 1 ─────────────────────────────────────────────── -->.*?</div>\s*</div>\s*</section>', projects_html + "\n    </div>\n  </div>\n</section>", html, flags=re.DOTALL)

# 4. Update the Config block
config_replacement = """var SITE_CONFIG = {

  // ── Media: three construction videos in sequence ──────────────────────────
  videos: [
    { src:'https://mcdesign.bio/__l5e/assets-v1/0e1799b0-b219-4f08-84cc-673a88baab5a/miami-beach.mp4',   poster:'/__l5e/assets-v1/d001ed49-0dab-46d2-aa4b-41a1506b0e16/miami-beach-sunset-pool.png', desc:'Conference room overlooking construction project at dawn', posterOnly:false },
    { src:'https://mcdesign.bio/__l5e/assets-v1/6e4fa5fb-88c3-4ae6-9db0-8146fa35a4c8/alpine-ranch.mp4', poster:'/__l5e/assets-v1/30cbe81c-83c3-42ed-a206-bf06cd99c179/alpine-ranch-cover-pro.png', desc:'Architectural plans, materials, and executive coordination',  posterOnly:false },
    { src:'https://mcdesign.bio/__l5e/assets-v1/9e1ad89c-be2b-46fe-a496-1a5481906c75/southcoast.mp4',    poster:'/__l5e/assets-v1/17e606d1-cd0e-431a-a775-25a40c4e13b8/southcoast-cover-pro.png', desc:'Operations office overlooking active commercial jobsite',     posterOnly:false },
  ],

  // ── Image sequence fallback ──────────────────────────────────────────────
  imageSequence: {
    enabled:     false,
    frameCount:  200,
    concurrency: 10,
    pattern:     './frames/frame_{n}.jpg',
  },

  // ── Contact ──────────────────────────────────────────────────────────────
  contactEmail: 'mike.rcccon@yahoo.com',
  linkedin:     'https://www.linkedin.com/in/michael-chandler-3858a63a',

  // ── Resume ───────────────────────────────────────────────────────────────
  resumePath:   '#',
};"""

html = re.sub(r'var SITE_CONFIG = \{.*?^\};', config_replacement, html, flags=re.DOTALL | re.MULTILINE)

with open(out_file, "w", encoding="utf-8") as f:
    f.write(html)
