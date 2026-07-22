export const projects = [
  {
    id: 1,
    name: "Auction System",
    repo: "auction",
    tags: ["Go", "WebSockets", "Redis", "PostgreSQL", "JWT"],
    description: "Real-time auction backend in Go handling concurrent bidding with strict correctness guarantees — load-tested to 14.5K reads/sec and 9.2K writes/sec at sub-10ms p95 latency.",
    github: "https://github.com/oosleepy/auction",
    hasLiveDemo: false,
    liveDemoUrl: "",
    hasDevlog: false,
    devlogUrl: "https://devlog-app-beta.vercel.app/project/auction",
    highlights: [
      "Concurrency Safety — Per-auction mutex + meta-mutex design ensures exactly one winner under simultaneous bids; verified with go test -race and 1,000 concurrent bid trials.",
      "Load-Tested Performance — Benchmarked with hey: ~14,500 req/sec reads, ~9,200 req/sec writes, sub-10ms p95 latency.",
      "Real-time Updates — WebSocket-based live bid broadcasting to all connected clients (gorilla/websocket)."
    ]
  },
  {
    id: 2,
    name: "Gorest",
    repo: "gorest",
    tags: ["Go", "REST API"],
    description: "A robust and scalable RESTful API built with Go, demonstrating clean architecture and best practices.",
    github: "https://github.com/oosleepy/gorest",
    hasLiveDemo: false,
    liveDemoUrl: "",
    hasDevlog: false,
    devlogUrl: "https://devlog-app-beta.vercel.app/project/gorest",
    highlights: [
      "Clean Architecture: Structured for maintainability and scalability.",
      "RESTful Design: Adheres to standard REST principles for API design.",
      "High Performance: Leverages Go's concurrency and speed."
    ]
  },
  {
    id: 4,
    name: "JWT Redis Auth API",
    repo: "jwt-redis-auth-api",
    tags: ["Node.js", "Express", "JWT", "Redis", "REST API"],
    description: "Auth API built to understand session state tradeoffs. Implements short-lived access tokens and Redis-backed refresh token rotation to balance stateless speed with strict invalidation control.",
    github: "https://github.com/oosleepy/jwt-redis-auth-api",
    hasLiveDemo: false,
    liveDemoUrl: "",
    hasDevlog: false,
    devlogUrl: "https://devlog-app-beta.vercel.app/project/jwt-redis-auth-api",
    highlights: [
      "Token Rotation: 15-min access / 7-day refresh lifecycle. Old tokens are SET-blacklisted in Redis with remaining-TTL expiry to bound memory growth.",
      "O(1) Blacklist: Blacklist check runs before any PostgreSQL hit, ensuring revoked sessions are dropped in sub-millisecond time.",
      "Distributed Rate Limiting: IP-based sliding window rate limits stored in Redis to prevent brute-force and DDoS attempts across multiple API instances."
    ]
  },
  {
    id: 5,
    name: "Email Queue Service",
    repo: "emailqueue",
    tags: ["Node.js", "Express", "BullMQ", "Redis", "PostgreSQL", "Nodemailer"],
    description: "Asynchronous job processing system designed to decouple slow third-party API calls (email delivery) from the main request thread, ensuring predictable API latency.",
    github: "https://github.com/oosleepy/emailqueue",
    hasLiveDemo: false,
    liveDemoUrl: "",
    hasDevlog: false,
    devlogUrl: "https://devlog-app-beta.vercel.app/project/emailqueue",
    highlights: [
      "Resiliency: BullMQ worker implements exponential backoff with jitter to avoid thundering herd problems during SMTP outages.",
      "Auditability: Every job transition (active, failed, completed) is atomically logged to PostgreSQL for reliable dead-letter queue inspection.",
      "Concurrency Control: Tuned worker concurrency to prevent Redis connection pool exhaustion under heavy load spikes."
    ]
  },
  {
    id: 7,
    name: "wallswp",
    repo: "wallpaper-swipe",
    tags: ["Go", "REST API"],
    description: "A fast, resilient wallpaper swiper application that serves randomized images through a Go backend and a minimal frontend.",
    github: "https://github.com/oosleepy/wallpaper-swipe",
    hasLiveDemo: false,
    liveDemoUrl: "",
    hasDevlog: false,
    devlogUrl: "https://devlog-app-beta.vercel.app/project/wallpaper-swipe",
    highlights: [
      "Automated Resilience: The frontend seamlessly triggers automatic retries to load the next wallpaper upon image load errors.",
      "Minimal Interface: Clean, distraction-free UI allowing users to quickly swipe, like, dislike, or download images via REST endpoints.",
      "Go Backend: Lightweight service that handles randomized image selection and user interactions."
    ]
  },
  {
    id: 6,
    name: "Nudge CLI Tool",
    repo: "nudge",
    tags: ["Node.js", "Shell", "CLI", "Arch Linux"],
    description: "A low-overhead CLI daemon built to run persistently in Linux environments without draining resources or relying on heavy electron/browser runtimes.",
    github: "https://github.com/oosleepy/nudge",
    hasLiveDemo: false,
    liveDemoUrl: "",
    hasDevlog: false,
    devlogUrl: "https://devlog-app-beta.vercel.app/project/nudge",
    highlights: [
      "Zero-Dependency Daemon: Runs as a lightweight detached background process, communicating with the CLI via IPC.",
      "Deterministic Parsing: Rule-based natural language parser avoids ML overhead, instantly translating temporal phrases to strict cron schedules.",
      "System Integration: Hooks into Linux desktop environments using native bindings for non-blocking notifications."
    ]
  },
  {
    id: 3,
    name: "DNS Resolver",
    repo: "dns-resolver",
    tags: ["Node.js", "UDP", "Networking", "DNS"],
    description: "A custom DNS resolver implementation built from scratch using Node.js UDP sockets to understand packet parsing and low-level networking protocols.",
    github: "https://github.com/oosleepy/dns-resolver",
    hasLiveDemo: false,
    liveDemoUrl: "",
    hasDevlog: false,
    devlogUrl: "https://devlog-app-beta.vercel.app/project/dns-resolver",
    highlights: [
      "Binary Protocol Parsing: Manually constructed and parsed DNS query/response packets at the byte level using Node.js Buffers.",
      "UDP Sockets: Implemented connectionless communication using the datagram (dgram) module to interact directly with authoritative nameservers.",
      "RFC Compliance: Adheres to RFC 1035 specifications for standard DNS message formats and header flag manipulation."
    ]
  },
  {
    id: 8,
    name: "Dotfiles & Linux Tooling",
    repo: "dotfiles",
    tags: ["Shell", "Lua", "Python", "Neovim"],
    description: "My personal developer environment, optimized for terminal-centric workflows and minimal latency. Focuses on composability over monolithic tools.",
    github: "https://github.com/oosleepy/oosleepydotfiles",
    hasLiveDemo: false,
    liveDemoUrl: "",
    hasDevlog: false,
    devlogUrl: "https://devlog-app-beta.vercel.app/project/saltydotfiles",
    highlights: [
      "Neovim Architecture: Lazy-loaded plugin architecture utilizing lazy.nvim to maintain < 50ms startup times.",
      "Shell Optimization: Fish shell configured with asynchronous prompt rendering and command memoization.",
      "Tiling WM: Keyboard-driven tiling window management configured for zero-mouse navigation."
    ]
  }
];
