// Minimal i18n layer: bilingual English & Hinglish dictionary
export type Lang = "en" | "hi";

export const LANGUAGES: Lang[] = ["en", "hi"];
export const DEFAULT_LANG: Lang = "en";

type Leaf = Record<Lang, string>;
type Node = Leaf | { [key: string]: Node };

function isLeaf(node: Node): node is Leaf {
  return typeof (node as Leaf).en === "string";
}

export const DICT = {
  picker: {
    season: { en: "Season", hi: "Mausam" },
    language: { en: "Language", hi: "Bhasha" },
  },
  seasons: {
    spring: { en: "Spring", hi: "Basant" },
    summer: { en: "Summer", hi: "Garmi" },
    autumn: { en: "Autumn", hi: "Patjhad" },
    winter: { en: "Winter", hi: "Sardi" },
  },
  nav: {
    aria: { en: "Sections", hi: "Sections" },
    home: { en: "Home", hi: "Home" },
    stack: { en: "Tech Stack", hi: "Tech Stack" },
    experience: { en: "Experience", hi: "Experience" },
    education: { en: "Education & Certs", hi: "Education & Certs" },
    project: { en: "Projects", hi: "Projects" },
    contact: { en: "Contact", hi: "Connect Karein" },
  },
  header: {
    availability: {
      en: "Open to SDE / DevOps roles",
      hi: "Open for SDE / DevOps roles",
    },
  },
  hero: {
    greeting: { en: "HELLO, I'M", hi: "HELLO, MAIN HOON" },
    roleLine: {
      en: "Backend Developer | DevOps Engineer",
      hi: "Backend Developer | DevOps Engineer",
    },
    tagline: {
      en: "Building reliable backend services, scalable architectures, and automated cloud deployments.",
      hi: "Reliable backend services, scalable architectures aur automated cloud deployments build karta hoon.",
    },
    cv: { en: "Download Resume", hi: "Resume Download Karein" },
    hire: { en: "Get In Touch", hi: "Connect Karein" },
    scroll: { en: "Scroll to explore", hi: "Neeche scroll karein" },
    keysHint: {
      en: "· hover or tap the 3D keyboard",
      hi: "· 3D keyboard keys pe hover ya tap karein",
    },
  },
  stack: {
    title: { en: "Tech Stack", hi: "Tech Stack" },
    hint: {
      en: "(hover over the 3D keys to inspect technologies)",
      hi: "(kisi bhi 3D key pe hover karke tech inspect karein)",
    },
    hintMobile: {
      en: "Core backend, cloud, and DevOps technologies I work with daily.",
      hi: "Core backend, cloud aur DevOps tools jinke sath main daily systems scale karta hoon.",
    },
  },
  experience: {
    title: { en: "Professional Experience", hi: "Professional Experience" },
    subtitle: {
      en: "Production engineering, live cloud releases, and backend infrastructure.",
      hi: "Production engineering, live cloud hosting aur backend APIs ka real-world work.",
    },
  },
  education: {
    title: { en: "Education & Certifications", hi: "Education & Certifications" },
    subtitle: {
      en: "M.Tech & B.Tech degrees with verified AWS & DevOps credentials.",
      hi: "M.Tech & B.Tech degrees aur verified AWS DevOps credentials.",
    },
    pursuing: { en: "In Progress", hi: "Currently Pursuing" },
    verified: { en: "Verified", hi: "Verified" },
    sgpaLabel: { en: "Academic Status", hi: "Academic Status" },
  },
  projects: {
    kicker: { en: "project", hi: "project" },
    viewMore: { en: "View details", hi: "Details dekhein" },
    openSite: { en: "Visit live site", hi: "Live site dekhein" },
    viewCode: { en: "View source", hi: "Code dekhein" },
    close: { en: "Close", hi: "Band karein" },
    stackLabel: { en: "Stack", hi: "Tech Stack" },
    overview: { en: "Overview", hi: "Overview" },
  },
  contact: {
    kicker: { en: "contact", hi: "get in touch" },
    title: { en: "Let's connect.", hi: "Chalo baat karte hain." },
    body: {
      en: "Open to discussing backend engineering, DevOps workflows, cloud architecture, and high-impact engineering roles.",
      hi: "Backend development, DevOps roles, cloud architecture aur exciting opportunities par discuss karne ke liye inbox hamesha open hai.",
    },
    copyEmail: { en: "Copy Email", hi: "Email Copy Karein" },
    openMail: { en: "Send Email", hi: "Mail Bhejein" },
    github: { en: "GitHub", hi: "GitHub" },
    linkedin: { en: "LinkedIn", hi: "LinkedIn" },
    emailToast: { en: "Email copied to clipboard", hi: "Email clipboard pe copy ho gaya!" },
    footer: {
      en: "© 2026 Aditya Pande. All rights reserved.",
      hi: "© 2026 Aditya Pande. All rights reserved.",
    },
  },
  keyboard: {
    taglines: {
      nodedotjs: {
        en: "High-throughput asynchronous runtime powering backend REST APIs and microservices.",
        hi: "Fast backend services aur APIs power karne wala asynchronous runtime.",
      },
      express: {
        en: "Fast, unopinionated framework for architecting robust RESTful backend services.",
        hi: "Scalable REST APIs design karne ke liye lightweight backend framework.",
      },
      mongodb: {
        en: "Flexible NoSQL document database for scalable, high-volume application storage.",
        hi: "Flexible schemas aur high-scale storage ke liye NoSQL document DB.",
      },
      react: {
        en: "Component-driven architecture for interactive, modern client-facing applications.",
        hi: "Dynamic aur performant UI ke liye reactive component architecture.",
      },
      nextdotjs: {
        en: "Production-grade React framework with SSR, API routing, and edge execution.",
        hi: "Production-grade React framework SSR aur edge performance ke sath.",
      },
      docker: {
        en: "Containerization guaranteeing reproducible environments across development and production.",
        hi: "Local machine se cloud production tak identical environment containers.",
      },
      kubernetes: {
        en: "Container orchestration automating deployments, service discovery, and rolling upgrades.",
        hi: "Microservices deployments, self-healing aur scaling automate karne wala engine.",
      },
      linux: {
        en: "Core OS powering cloud servers, shell scripting, performance tuning, and security.",
        hi: "Production cloud servers, automation scripting aur server operations ka standard.",
      },
      nginx: {
        en: "High-performance reverse proxy, load balancer, SSL/TLS termination, and HTTP caching.",
        hi: "High-speed reverse proxy, SSL/TLS management aur load balancing server.",
      },
      terraform: {
        en: "Infrastructure as Code (IaC) tool for provisioning predictable cloud environments.",
        hi: "Declarative configuration se cloud infrastructure automate karne ka standard.",
      },
      jenkins: {
        en: "Automation server driving continuous integration pipelines and automated release testing.",
        hi: "Automated builds, automated test execution aur CI pipelines ka automation server.",
      },
      helm: {
        en: "Kubernetes package manager standardizing manifest management and application releases.",
        hi: "Kubernetes applications ke manifests aur releases manage karne ka package manager.",
      },
      githubactions: {
        en: "Cloud CI/CD workflows automating build, test, container packaging, and production push.",
        hi: "GitHub repository ke sath integrated modern CI/CD automation workflows.",
      },
      git: {
        en: "Distributed version control for clean Git branching workflows, auditing, and collaboration.",
        hi: "Team workflows aur safe code deployment ke liye industry standard version control.",
      },
      typescript: {
        en: "Type-safe scalability preventing runtime regressions across backend and frontend code.",
        hi: "Type-safety ke sath scalable frontend aur backend engineering.",
      },
    },
  },
} as const;

export function translate(path: string, lang: Lang = DEFAULT_LANG): string {
  const parts = path.split(".");
  let cur: unknown = DICT;
  for (const p of parts) {
    if (!cur || typeof cur !== "object") return path;
    cur = (cur as Record<string, unknown>)[p];
  }
  if (!cur) return path;
  if (typeof cur === "string") return cur;
  if (typeof cur === "object") {
    const leaf = cur as Record<string, string>;
    return leaf[lang] ?? leaf.en ?? path;
  }
  return path;
}

export function resolveDict(dict: typeof DICT, lang: Lang): Record<string, string> {
  const result: Record<string, string> = {};

  function traverse(node: Node, prefix: string) {
    for (const [key, value] of Object.entries(node)) {
      const nextKey = prefix ? `${prefix}.${key}` : key;
      if (isLeaf(value as Node)) {
        result[nextKey] = (value as Leaf)[lang] ?? (value as Leaf).en;
      } else {
        traverse(value as Node, nextKey);
      }
    }
  }

  traverse(dict as unknown as Node, "");
  return result;
}
