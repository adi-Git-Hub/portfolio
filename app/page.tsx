"use client";

import { useState } from "react";
import FrozenKeyboard from "@/components/FrozenKeyboard";
import SmoothScroll from "@/components/smooth-scroll";
import Reveal from "@/components/Reveal";
import SectionNav from "@/components/SectionNav";
import CopyEmail from "@/components/CopyEmail";
import SeasonPicker from "@/components/SeasonPicker";
import LanguagePicker from "@/components/LanguagePicker";
import ProjectModal, {
  type ProjectDetail,
} from "@/components/ProjectModal";
import ContactModal from "@/components/ContactModal";
import { useLanguage } from "@/components/LanguageProvider";
import { useIsMobile } from "@/lib/useIsMobile";
import { SKILLS_FLAT } from "@/lib/skills";
import type { Lang } from "@/lib/i18n";

const EMAIL = "aditya.dev.pande@gmail.com";
const GITHUB_URL = "https://github.com/adi-Git-Hub";
const LINKEDIN_URL = "https://www.linkedin.com/in/aditya-dev-pande/";

type Localised = { en: string; hi: string };

type Project = ProjectDetail & {
  align: "left" | "right";
  section: "project1" | "project2" | "project3" | "project4";
};

const projects: Project[] = [
  {
    num: "01",
    name: {
      en: "SolivaGuard — Production E-Commerce Platform & Admin Dashboard",
      hi: "SolivaGuard — Production E-Commerce Platform & Admin Dashboard",
    },
    stack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Razorpay",
      "Docker",
      "AWS",
      "Nginx",
      "GitHub Actions",
    ],
    desc: {
      en: "Live production e-commerce platform combining customer storefront with administrative operations dashboard, Razorpay payments, and containerized AWS cloud infrastructure.",
      hi: "Live commercial e-commerce platform jisme storefront, admin dashboard, Razorpay payment gateway aur containerized AWS cloud hosting integrated hai.",
    },
    details: {
      en: "Built and currently maintain a live e-commerce platform combining a customer storefront with an administrative dashboard for commerce and operational workflows. Built backend functionality for authentication, database-driven product/order workflows, and Razorpay payment integration to support the end-to-end shopping experience. Deployed the production stack using Docker, AWS, Linux, Nginx, SSL/TLS, and deployment workflows; continue to troubleshoot live issues and optimize releases and infrastructure.",
      hi: "Production e-commerce platform built aur maintain kiya jisme customer storefront aur operations admin dashboard shamil hain. Authentication, product/order workflows aur Razorpay payment integration ka complete backend develop kiya. Docker, AWS, Linux, Nginx aur SSL/TLS ke sath production stack deploy kiya aur live maintenance manage kiya.",
    },
    url: "https://solivaguard.com",
    media: [
      "/projects/solivaguard/banner.webp",
      "/projects/solivaguard/protection.webp",
      "/projects/solivaguard/commute.webp",
      "/projects/solivaguard/details.webp",
      "/projects/solivaguard/logo.webp",
      "/projects/solivaguard/nav.webp",
    ],
    highlights: ["react", "nodedotjs", "express", "mongodb", "docker", "nginx"],
    align: "left",
    section: "project1",
  },
  {
    num: "02",
    name: {
      en: "Multi-Tier Kubernetes Deployment — DevOps Project",
      hi: "Multi-Tier Kubernetes Deployment — DevOps Project",
    },
    stack: [
      "Kubernetes",
      "Docker",
      "AWS EKS",
      "Helm",
      "Jenkins",
      "GitHub Actions",
      "Microservices",
    ],
    desc: {
      en: "Containerized multi-tier Robot Shop microservices application deployed on Kubernetes with automated CI/CD pipelines, Helm manifests, and ingress routing.",
      hi: "Kubernetes par deployed multi-tier Robot Shop microservices architecture, automated CI/CD pipelines, Helm charts aur Ingress routing ke sath.",
    },
    details: {
      en: "Deployed a containerized multi-tier Robot Shop microservices application on Kubernetes, configuring Deployments, Services, Ingress, and supporting service components. Worked with Kubernetes manifests, Helm-based deployment configuration, and CI/CD workflows to make application rollout more repeatable across environments. Applied cloud-native operational patterns including service discovery, load balancing, health checks, and rolling deployment practices.",
      hi: "Kubernetes par containerized Robot Shop microservices application deploy kiya, jisme Deployments, Services, Ingress aur Helm charts configure kiye. CI/CD automation ke sath repeatable deployments ensure kiye aur service discovery, load balancing, health checks aur rolling updates implement kiye.",
    },
    github: "https://github.com/adi-Git-Hub",
    media: [
      "/projects/auth/dashboard.png",
      "/projects/auth/login.png",
    ],
    highlights: ["kubernetes", "docker", "helm", "jenkins", "githubactions"],
    align: "right",
    section: "project2",
  },
  {
    num: "03",
    name: {
      en: "Kinetic Care Gym — Client Landing Page",
      hi: "Kinetic Care Gym — Client Landing Page",
    },
    stack: [
      "Mobile-First Design",
      "Responsive Frontend",
      "Campaign Landing Page",
      "WhatsApp Enquiry Flow",
      "Vercel",
    ],
    desc: {
      en: "Mobile-first promotional landing page for a gym client, optimizing visitor onboarding directly into WhatsApp booking and membership enquiries.",
      hi: "Gym client ke liye mobile-first promotional landing page, jisme focused visitor journey direct WhatsApp enquiry conversion ke liye design kiya gaya hai.",
    },
    details: {
      en: "Designed a mobile-first promotional page for a gym client, organizing core offerings and visitor information into a focused, easy-to-scan landing experience. Structured the visitor journey from campaign landing page to WhatsApp enquiry, giving prospective members a direct route to contact the business. Deployed and monitored on Vercel.",
      hi: "Client ke liye mobile-first landing experience design kiya jo core fitness offerings ko clear visual structure deta hai aur visitors ko direct WhatsApp enquiry ke zariye membership book karne me madad karta hai. Vercel par fast deployment kiya.",
    },
    badge: { en: "Client Project", hi: "Client Project" },
    media: [
      "/projects/talent-track/dashboard.png",
      "/projects/talent-track/analysis.png",
    ],
    highlights: ["react", "nextdotjs", "tailwindcss"],
    align: "left",
    section: "project3",
  },
  {
    num: "04",
    name: {
      en: "Jainism Cake & Cafe — Client Website",
      hi: "Jainism Cake & Cafe — Client Website",
    },
    stack: [
      "Responsive Frontend",
      "Menu Presentation",
      "Product Showcase",
      "Customer Enquiry UX",
      "Vercel",
    ],
    desc: {
      en: "Customer-facing cafe & bakery website presenting menu highlights, specialty cake collections, booking prompts, and location discovery.",
      hi: "Bakery aur cafe client ke liye customer-facing website, menu highlights, cake collections aur direct booking calls-to-action ke sath.",
    },
    details: {
      en: "Developed a customer-facing café and bakery website presenting menu highlights, featured cakes, booking prompts, location, and contact information. Organized prominent calls to action for menu discovery, cake browsing, bookings, and customer contact, then published the frontend on Vercel.",
      hi: "Customer-facing café aur bakery website develop kiya jisme interactive menu presentation, featured cakes showcase, location jankari aur easy booking prompts shamil hain. Vercel par deploy karke seamless performance provide kiya.",
    },
    badge: { en: "Live Client Site", hi: "Live Client Site" },
    media: [
      "/projects/sahayak/chat.png",
      "/projects/sahayak/search.png",
    ],
    highlights: ["react", "javascript", "tailwindcss"],
    align: "right",
    section: "project4",
  },
];

const experiences: Array<{
  role: Localised;
  company: string;
  period: Localised;
  location: Localised;
  summary: Localised;
  bullets: Localised[];
  stack: string[];
}> = [
  {
    role: {
      en: "Software Engineer",
      hi: "Software Engineer",
    },
    company: "Production Web Application",
    period: { en: "Jan 2025 — Present", hi: "Jan 2025 — Present" },
    location: { en: "Production", hi: "Production" },
    summary: {
      en: "Owned delivery of a production web application from requirements and scope through backend implementation, deployment, and ongoing maintenance.",
      hi: "Requirements aur scope se lekar backend implementation, deployment aur ongoing maintenance tak production web application deliver kiya.",
    },
    bullets: [
      {
        en: "Implemented backend modules for authentication, payment integration (Razorpay), order and administrative workflows, and database operations.",
        hi: "Authentication, Razorpay payment integration, order aur admin workflows ke robust backend modules implement kiye.",
      },
      {
        en: "Managed production hosting and releases across AWS, Docker, Linux, Nginx, SSL/TLS, and DNS; diagnosed issues and delivered incremental improvements.",
        hi: "AWS, Docker, Linux, Nginx, SSL/TLS aur DNS par production hosting aur releases manage kiye aur performance diagnose kiya.",
      },
      {
        en: "Coordinated requirements, project scope, estimates, and progress updates with stakeholders to support reliable delivery.",
        hi: "Stakeholders ke sath requirements, scope aur progress coordinate karke reliable software delivery ensure kiya.",
      },
    ],
    stack: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "AWS",
      "Docker",
      "Linux",
      "Nginx",
      "SSL/TLS",
      "Razorpay",
    ],
  },
  {
    role: {
      en: "Backend & DevOps Intern",
      hi: "Backend & DevOps Intern",
    },
    company: "SyncSaS Technologies",
    period: { en: "Dec 2024 — Jun 2025", hi: "Dec 2024 — Jun 2025" },
    location: { en: "Remote", hi: "Remote" },
    summary: {
      en: "Developed backend services and REST APIs using Node.js, Express.js, and MongoDB with modular, maintainable application code.",
      hi: "Node.js, Express.js aur MongoDB ke sath modular backend REST APIs aur scalable services develop kiye.",
    },
    bullets: [
      {
        en: "Used Docker, AWS, Linux, and Nginx to deploy, configure, and maintain cloud-hosted application environments.",
        hi: "Cloud environments ko deploy, configure aur maintain karne ke liye Docker, AWS, Linux aur Nginx ka use kiya.",
      },
      {
        en: "Implemented CI/CD workflows with GitHub Actions and Jenkins to automate application builds and deployments.",
        hi: "GitHub Actions aur Jenkins ke sath automated build aur deployment CI/CD workflows implement kiye.",
      },
      {
        en: "Supported production debugging, infrastructure optimization, and deployment lifecycle management in collaboration with engineering teams.",
        hi: "Production debugging, infrastructure optimization aur deployment lifecycle management me active contribution diya.",
      },
    ],
    stack: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Docker",
      "AWS",
      "Linux",
      "Nginx",
      "GitHub Actions",
      "Jenkins",
    ],
  },
];

const educationItems = [
  {
    degree: {
      en: "M.Tech in Computer Science and Engineering",
      hi: "M.Tech in Computer Science and Engineering",
    },
    status: {
      en: "Pursuing",
      hi: "Currently Pursuing",
    },
    institution: "G. H. Raisoni College of Engineering and Management",
    university: "Computer Science and Engineering",
    metrics: {
      label: { en: "Status", hi: "Status" },
      val: "Active",
    },
    highlights: [
      {
        en: "Specializing in distributed systems, backend architectures, and cloud infrastructure.",
        hi: "Distributed systems, backend architectures aur cloud infrastructure me specialization.",
      },
      {
        en: "Focus on automated DevOps pipelines, containerized deployments, and microservices reliability.",
        hi: "Automated DevOps pipelines, containerized deployments aur microservices engineering pe focus.",
      },
    ],
  },
  {
    degree: {
      en: "Bachelor of Technology (Artificial Intelligence)",
      hi: "Bachelor of Technology (Artificial Intelligence)",
    },
    status: {
      en: "2022 — 2026",
      hi: "2022 — 2026",
    },
    institution: "G. H. Raisoni College of Engineering and Management",
    university: "Artificial Intelligence Department",
    metrics: {
      label: { en: "Graduation", hi: "Graduation" },
      val: "2026",
    },
    highlights: [
      {
        en: "Core foundation in algorithms, system programming, AI architectures, and database design.",
        hi: "Algorithms, system programming, AI architectures aur database design ki strong foundation.",
      },
      {
        en: "Hands-on experience delivering end-to-end commercial web applications and cloud deployments.",
        hi: "Full-stack web applications aur cloud deployments deliver karne ka practical hands-on experience.",
      },
    ],
  },
];

const certificationItems = [
  {
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services (AWS)",
    verified: true,
    desc: {
      en: "Comprehensive knowledge of AWS core services, cloud security, architecture, pricing, and infrastructure operations.",
      hi: "AWS core services, cloud security, cloud architecture aur pricing models ki comprehensive practical knowledge.",
    },
    badge: "AWS Cloud",
  },
  {
    title: "AWS Certified DevOps Engineer – Professional (Exam Prep)",
    issuer: "Amazon Web Services (AWS)",
    verified: true,
    desc: {
      en: "Advanced preparation covering continuous delivery, automation, security controls, monitoring, and high-availability systems.",
      hi: "Continuous delivery, infrastructure automation, security controls aur high-availability systems design.",
    },
    badge: "AWS DevOps Pro",
  },
  {
    title: "AWS Certified DevOps Engineer – Professional (Domain Reviews)",
    issuer: "Amazon Web Services (AWS)",
    verified: true,
    desc: {
      en: "Deep-dive mastery across SDLC automation, configuration management, infrastructure as code, and incident response.",
      hi: "SDLC automation, configuration management, IaC aur incident response me deep-dive mastery.",
    },
    badge: "DevOps Domains",
  },
];

function pick<T>(loc: { en: T; hi: T }, lang: Lang): T {
  return loc[lang] ?? loc.en;
}

export default function Home() {
  const { t, lang } = useLanguage();
  const isMobile = useIsMobile();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <SmoothScroll>
      <div className="relative">
        {/* Desktop: persistent 3D scene fullscreen behind content. */}
        {!isMobile && (
          <div className="fixed inset-0 z-0">
            <FrozenKeyboard />
          </div>
        )}

        {/* Header */}
        <header className="fixed top-0 inset-x-0 z-50 px-6 sm:px-10 md:px-14 py-5 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto">
            <span
              data-cursor="hover"
              className="text-sm font-semibold tracking-tight text-ice-100 whitespace-nowrap"
            >
              &lt;Aditya /&gt;
            </span>
            <span className="hidden md:inline-flex">
              <span className="status-pill">{t("header.availability")}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 pointer-events-auto">
            <SeasonPicker />
            <span className="hidden md:inline-flex">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="frost-btn !py-1.5 !px-3 !text-xs"
              >
                <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden>
                  <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                <span>GitHub</span>
              </a>
            </span>
            <LanguagePicker />
          </div>
        </header>

        <SectionNav />

        <main className="relative z-10 pointer-events-none">
          {/* Hero */}
          <section
            data-kb-section="hero"
            className="min-h-screen flex flex-col justify-center p-6 sm:p-10 md:p-14"
          >
            {isMobile && (
              <div className="w-full h-[34vh] mt-12 -mb-4 pointer-events-auto">
                <FrozenKeyboard mobile />
              </div>
            )}
            <div className="mt-2 md:mt-16">
              <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
                {/* Background-Removed Cutout Portrait Card */}
                <div
                  className="relative shrink-0 pointer-events-auto fade-in-up"
                  style={{ ["--d" as string]: "100ms" }}
                >
                  {/* Atmospheric Glow */}
                  <div
                    aria-hidden="true"
                    className="absolute -inset-3 sm:-inset-5 rounded-3xl bg-gradient-to-tr from-ice-500/30 via-ice-300/15 to-transparent blur-2xl pointer-events-none opacity-80"
                  />

                  {/* Glassmorphic Frame */}
                  <div className="relative group rounded-3xl border border-ice-700/60 bg-gradient-to-b from-ink-1/90 via-ink-2/65 to-ink-1/90 backdrop-blur-xl p-3 sm:p-3.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.85)] transition-all duration-300 hover:border-ice-500/70">
                    <div className="relative w-48 sm:w-56 md:w-60 lg:w-64 aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-b from-ink-2/40 to-ink-0/70 flex items-end justify-center">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(122,166,208,0.22),transparent_70%)] pointer-events-none" />

                      <picture>
                        <source srcSet="/aditya_photo_45.jpg" type="image/jpeg" />
                        <img
                          src="/PHOTO-2026-10-14-15-43-32.jpg"
                          alt="Aditya Pande"
                          className="w-full h-full object-cover object-[48%_40%] drop-shadow-[0_12px_28px_rgba(0,0,0,0.75)] transition-transform duration-500 group-hover:scale-[1.03]"
                          loading="eager"
                        />
                      </picture>

                      {/* Glass Floating Status Badge */}
                      <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between px-2.5 py-1 rounded-xl border border-ice-700/80 bg-ink-1/85 backdrop-blur-md text-[11px] font-mono text-ice-100 shadow-lg">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          Aditya Pande
                        </span>
                        <span className="text-ice-400 text-[10px]">Active</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hero Details Column */}
                <div className="max-w-xl">
                  {/* Eyebrow */}
                  <p
                    className="text-[12px] uppercase tracking-[0.35em] text-ice-300 mb-2 font-mono fade-in-up"
                    style={{ ["--d" as string]: "0ms" }}
                  >
                    HELLO, I&apos;M
                  </p>

                  {/* Dominant Bold Name */}
                  <h1
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] text-ice-50 leading-[0.98] mb-4 fade-in-up"
                    style={{ ["--d" as string]: "150ms" }}
                  >
                    Aditya <span className="text-ice-400 font-black">Pande</span>
                  </h1>

                  {/* Role Title */}
                  <h2
                    className="text-xl sm:text-2xl md:text-3xl font-semibold text-ice-100 tracking-tight mb-3 fade-in-up"
                    style={{ ["--d" as string]: "280ms" }}
                  >
                    Backend Developer | DevOps Engineer
                  </h2>

                  {/* Description */}
                  <p
                    className="text-base sm:text-lg text-ice-200/90 leading-relaxed max-w-lg mb-6 fade-in-up"
                    style={{ ["--d" as string]: "380ms" }}
                  >
                    Building reliable backend services, scalable architectures, and automated cloud deployments.
                  </p>

                  {/* Verified Quick Badges from Resume */}
                  <div
                    className="mt-6 flex flex-wrap gap-2.5 pointer-events-auto fade-in-up"
                    style={{ ["--d" as string]: "500ms" }}
                  >
                    <span className="font-mono text-xs px-3 py-1 rounded-full border border-ice-700/60 bg-ink-2/70 text-ice-200">
                      ⚡ M.Tech CSE · B.Tech AI
                    </span>
                    <span className="font-mono text-xs px-3 py-1 rounded-full border border-ice-700/60 bg-ink-2/70 text-ice-200">
                      🚀 SolivaGuard Production Stack
                    </span>
                    <span className="font-mono text-xs px-3 py-1 rounded-full border border-ice-700/60 bg-ink-2/70 text-ice-200">
                      ☁️ AWS, Kubernetes &amp; DevOps
                    </span>
                  </div>

                  {/* CTAs */}
                  <div
                    className="mt-8 flex flex-wrap items-center gap-3 pointer-events-auto fade-in-up"
                    style={{ ["--d" as string]: "650ms" }}
                  >
                    <a
                      href="/cv.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      data-magnetic
                      className="frost-btn frost-btn--primary"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                        <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
                        <path d="M14 3v5h5" />
                      </svg>
                      {t("hero.cv")}
                    </a>
                    <button
                      type="button"
                      data-cursor="hover"
                      data-magnetic
                      className="frost-btn"
                      onClick={() =>
                        document
                          .querySelector<HTMLElement>(
                            '[data-kb-section="contact"]'
                          )
                          ?.scrollIntoView({ behavior: "smooth", block: "start" })
                      }
                    >
                      {t("hero.hire")}
                    </button>
                    <div className="basis-full h-0 md:hidden" aria-hidden />
                    <a
                      href={LINKEDIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      data-magnetic
                      className="frost-icon"
                      aria-label="LinkedIn"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
                        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.4 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 6.99V22h-4.56v-6.59c0-1.57-.03-3.6-2.19-3.6-2.19 0-2.53 1.71-2.53 3.48V22H7.62V8z" />
                      </svg>
                    </a>
                    <a
                      href={GITHUB_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      data-magnetic
                      className="frost-icon"
                      aria-label="GitHub"
                    >
                      <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden>
                        <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated scroll indicator at bottom */}
            <div
              className="mt-10 md:mt-auto flex items-center gap-3 fade-in-up"
              style={{ ["--d" as string]: "900ms" }}
            >
              <span className="scroll-indicator">
                <span>{t("hero.scroll")}</span>
                <span className="scroll-indicator__rail" />
              </span>
              <span className="text-[11px] uppercase tracking-[0.25em] text-ice-400 hidden sm:inline">
                {t("hero.keysHint")}
              </span>
            </div>
          </section>

          {/* Stack */}
          <section
            data-kb-section="stack"
            className="relative md:min-h-[200vh] p-6 sm:p-10 md:p-14"
          >
            <div className="relative md:h-[150vh]">
              <div className="md:sticky md:top-28 text-center">
                <Reveal>
                  <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.03em] text-ice-50 leading-[0.95]">
                    {t("stack.title")}
                  </h2>
                </Reveal>
                <Reveal delay={120}>
                  <p className="mt-3 text-sm sm:text-base text-ice-400">
                    <span className="hidden md:inline">{t("stack.hint")}</span>
                    <span className="md:hidden">{t("stack.hintMobile")}</span>
                  </p>
                </Reveal>
              </div>

              {/* Mobile skills grid */}
              {isMobile && (
                <div className="md:hidden mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 pointer-events-auto">
                  {SKILLS_FLAT.map((s) => (
                    <div
                      key={s.slug}
                      className="flex items-start gap-3 rounded-xl bg-ink-1/70 backdrop-blur-sm border border-ink-3 p-4"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="22"
                        height="22"
                        fill={`#${s.hex}`}
                        className="flex-none mt-0.5"
                        aria-hidden
                      >
                        <path d={s.path} />
                      </svg>
                      <div>
                        <p className="text-ice-50 font-medium text-sm">
                          {s.title}
                        </p>
                        <p className="text-ice-400 text-xs mt-0.5 leading-snug">
                          {t(`keyboard.taglines.${s.slug}`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Experience */}
          <section
            data-kb-section="experience"
            className="relative p-6 sm:p-10 md:p-14 pb-24"
          >
            <div className="sticky top-24 sm:top-28 text-center mb-12 sm:mb-16 z-0">
              <Reveal>
                <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.03em] text-ice-50 leading-[0.95]">
                  {t("experience.title")}
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-3 text-sm sm:text-base text-ice-300">
                  {t("experience.subtitle")}
                </p>
              </Reveal>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              {experiences.map((exp, idx) => (
                <Reveal
                  key={`${exp.company}-${idx}`}
                  delay={idx * 120}
                  as="article"
                  className="relative rounded-2xl bg-ink-1/75 backdrop-blur-md border border-ink-3 p-6 sm:p-8 md:p-10 pointer-events-auto shadow-[0_8px_40px_-20px_rgba(0,0,0,0.6)]"
                >
                  <header className="flex flex-wrap items-start justify-between gap-3 mb-5">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-ice-50 tracking-tight">
                        {pick(exp.role, lang)}
                      </h3>
                      <p className="text-ice-400 font-medium mt-1">
                        {exp.company}
                        <span className="text-ice-500/80 font-normal">
                          {" · "}
                          {pick(exp.location, lang)}
                        </span>
                      </p>
                    </div>
                    <span className="font-mono text-xs text-ice-100 px-3 py-1 rounded-full border border-ice-700/70 bg-ink-2/60 whitespace-nowrap">
                      {pick(exp.period, lang)}
                    </span>
                  </header>

                  <p className="text-ice-200 leading-relaxed mb-5">
                    {pick(exp.summary, lang)}
                  </p>

                  <ul className="space-y-2.5 mb-6">
                    {exp.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-ice-100 leading-relaxed"
                      >
                        <span className="mt-[0.65em] flex-none w-1.5 h-1.5 rounded-full bg-ice-400" />
                        <span>{pick(b, lang)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.stack.map((s) => (
                      <span
                        key={s}
                        data-cursor="hover"
                        className="frost-chip"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Projects */}
          {projects.map((p) => (
            <section
              key={p.num}
              data-kb-section={p.section}
              data-kb-highlights={(p.highlights ?? []).join(",")}
              className="relative py-20 md:min-h-screen flex items-center p-6 sm:p-10 md:p-14 overflow-hidden"
            >
              <span
                aria-hidden
                className={`watermark hidden md:block top-1/2 -translate-y-1/2 ${
                  p.align === "left" ? "right-[-2vw]" : "left-[-2vw]"
                }`}
              >
                {p.num}
              </span>

              <div
                className={
                  p.align === "left"
                    ? "max-w-xl relative"
                    : "max-w-xl relative md:ml-auto md:text-right md:mr-16 lg:mr-24"
                }
              >
                <Reveal>
                  <p className="font-mono text-sm text-ice-400 mb-3">
                    {p.num} · {t("projects.kicker")}
                  </p>
                </Reveal>
                <Reveal delay={80}>
                  <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-ice-50 leading-[1.05] mb-4">
                    {pick(p.name, lang)}
                  </h2>
                </Reveal>
                {p.badge ? (
                  <Reveal delay={140}>
                    <span className="inline-block text-[10px] uppercase tracking-widest text-ice-300 border border-ice-700 rounded-full px-2 py-0.5 mb-4">
                      {pick(p.badge, lang)}
                    </span>
                  </Reveal>
                ) : null}
                <Reveal delay={180}>
                  <p className="text-base sm:text-lg text-ice-200 leading-relaxed mb-6">
                    {pick(p.desc, lang)}
                  </p>
                </Reveal>
                <Reveal delay={260}>
                  <div
                    className={
                      p.align === "right"
                        ? "flex flex-wrap gap-1.5 md:justify-end pointer-events-auto mb-5"
                        : "flex flex-wrap gap-1.5 pointer-events-auto mb-5"
                    }
                  >
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        data-cursor="hover"
                        className="frost-chip"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </Reveal>
                <Reveal delay={320}>
                  <div
                    className={
                      p.align === "right"
                        ? "flex md:justify-end pointer-events-auto"
                        : "flex pointer-events-auto"
                    }
                  >
                    <button
                      type="button"
                      onClick={() => setActiveProject(p)}
                      data-cursor="hover"
                      data-magnetic
                      className="frost-btn"
                    >
                      {t("projects.viewMore")}
                      <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        aria-hidden
                      >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </Reveal>
              </div>
            </section>
          ))}

          {/* Education & Certifications */}
          <section
            data-kb-section="education"
            className="relative p-6 sm:p-10 md:p-14 pb-24"
          >
            <div className="text-center mb-12 sm:mb-16">
              <Reveal>
                <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.03em] text-ice-50 leading-[0.95]">
                  {t("education.title")}
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-3 text-sm sm:text-base text-ice-300">
                  {t("education.subtitle")}
                </p>
              </Reveal>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Degrees Column */}
              <div className="space-y-6">
                {educationItems.map((edu, idx) => (
                  <Reveal
                    key={idx}
                    delay={idx * 100}
                    as="article"
                    className="rounded-2xl bg-ink-1/75 backdrop-blur-md border border-ink-3 p-6 sm:p-8 pointer-events-auto flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-ice-400">
                          {pick(edu.status, lang)}
                        </span>
                        <span className="font-mono text-xs text-ice-100 px-2.5 py-0.5 rounded-full border border-ice-700/60 bg-ink-2/60">
                          {edu.metrics.val}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-ice-50 tracking-tight mb-2">
                        {pick(edu.degree, lang)}
                      </h3>
                      <p className="text-ice-300 font-medium text-sm mb-1">
                        {edu.institution}
                      </p>
                      <p className="text-ice-400 text-xs mb-5">
                        {edu.university}
                      </p>
                      <ul className="space-y-2 mb-4">
                        {edu.highlights.map((h, i) => (
                          <li key={i} className="flex gap-2.5 text-xs text-ice-200 leading-relaxed">
                            <span className="mt-[0.55em] flex-none w-1.5 h-1.5 rounded-full bg-ice-400" />
                            <span>{pick(h, lang)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-3 border-t border-ink-3/60 flex items-center justify-between">
                      <span className="text-xs text-ice-400 font-mono">Academic Status</span>
                      <span className="text-xs text-emerald-400 font-medium">Verified Active</span>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Certifications Column */}
              <div className="space-y-4">
                {certificationItems.map((c, i) => (
                  <Reveal
                    key={i}
                    delay={160 + i * 100}
                    as="div"
                    className="rounded-2xl bg-ink-1/75 backdrop-blur-md border border-ink-3 p-6 pointer-events-auto"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs text-ice-300 font-medium">
                        {c.issuer}
                      </span>
                      <span className="font-mono text-[10px] text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/40 bg-emerald-950/30">
                        ✓ {t("education.verified")}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-ice-50 mb-1.5">
                      {c.title}
                    </h4>
                    <p className="text-xs text-ice-300 leading-relaxed mb-3">
                      {pick(c.desc, lang)}
                    </p>
                    <span className="font-mono text-[11px] text-ice-400 bg-ink-2/80 px-2.5 py-1 rounded-md border border-ink-3">
                      {c.badge}
                    </span>
                  </Reveal>
                ))}

                {/* Core Skills Summary Card */}
                <Reveal
                  delay={360}
                  as="div"
                  className="rounded-2xl bg-ink-1/75 backdrop-blur-md border border-ink-3 p-6 pointer-events-auto"
                >
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-ice-300 mb-3">
                    Core Technical Domains
                  </h4>
                  <p className="text-xs text-ice-200 leading-relaxed">
                    Backend Development • DevOps • AWS • Docker • Kubernetes • CI/CD • Linux • Infrastructure Automation • Cloud Computing
                  </p>
                </Reveal>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section
            data-kb-section="contact"
            className="relative py-24 md:min-h-screen flex flex-col justify-center p-6 sm:p-10 md:p-14 overflow-hidden"
          >
            <div className="max-w-xl relative">
              <Reveal>
                <p className="font-mono text-sm text-ice-400 mb-3">
                  {t("contact.kicker")}
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="text-4xl sm:text-6xl font-semibold tracking-tight text-ice-50 mb-6">
                  {t("contact.title")}
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-ice-200 mb-10">{t("contact.body")}</p>
              </Reveal>
              <Reveal delay={240}>
                <div className="flex flex-wrap gap-3 pointer-events-auto">
                  <CopyEmail
                    email={EMAIL}
                    className="frost-btn frost-btn--primary"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                    {t("contact.copyEmail")}
                  </CopyEmail>

                  {/* Send Email button opens interactive modal */}
                  <button
                    type="button"
                    onClick={() => setIsContactModalOpen(true)}
                    data-cursor="hover"
                    className="frost-btn flex items-center gap-2"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                    <span>{t("contact.openMail")}</span>
                  </button>

                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="frost-btn"
                  >
                    {t("contact.github")}
                  </a>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="frost-btn"
                  >
                    {t("contact.linkedin")}
                  </a>
                </div>
              </Reveal>
            </div>
            <Reveal delay={320}>
              <p className="mt-14 text-[11px] uppercase tracking-[0.25em] text-ice-400">
                {t("contact.footer")}
              </p>
            </Reveal>
          </section>
        </main>

        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />

        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          emailDestination={EMAIL}
        />
      </div>
    </SmoothScroll>
  );
}
