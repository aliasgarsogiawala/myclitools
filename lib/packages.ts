export type VersionEntry = {
  version: string;
  publishedAt: string;
  description: string;
  dependencies: string[];
  changes: string[];
};

export type Package = {
  slug: string;
  name: string;
  version: string;
  description: string;
  longDescription: string;
  install: string;
  command: string;
  keywords: string[];
  npmUrl: string;
  githubUrl?: string;
  category: string;
  usageExamples: { label: string; command: string; description: string }[];
  flags: { flag: string; short?: string; default: string; description: string }[];
  versionHistory: VersionEntry[];
  liveRunnable: boolean;
  safeArgs: string[];
};

export const packages: Package[] = [
  {
    slug: "automove",
    name: "automove",
    version: "1.0.0",
    description: "Keeps your screen awake by nudging the cursor every few seconds.",
    longDescription:
      "A lightweight CLI tool that prevents your screen from going to sleep by moving your cursor a few pixels at regular intervals. No configuration needed — just run it and stop it when done. Perfect for long downloads, watching dashboards, or any time you need your screen to stay on.",
    install: "npm install -g automove",
    command: "automove",
    category: "Productivity",
    keywords: ["automove", "keepawake", "screen", "sleep", "cursor", "mouse", "idle"],
    npmUrl: "https://www.npmjs.com/package/automove",
    liveRunnable: true,
    safeArgs: ["--help", "-h"],
    usageExamples: [
      {
        label: "Default run",
        command: "automove",
        description: "Nudges cursor every 5 seconds with a 5px radius.",
      },
      {
        label: "Custom interval",
        command: "automove --interval 10",
        description: "Nudge every 10 seconds instead of 5.",
      },
      {
        label: "Smaller movement",
        command: "automove --radius 2",
        description: "Move only 2px at a time for a more subtle nudge.",
      },
      {
        label: "Both flags",
        command: "automove -i 10 -r 2",
        description: "Custom interval and radius combined.",
      },
    ],
    flags: [
      {
        flag: "--interval",
        short: "-i",
        default: "5",
        description: "Seconds between each cursor nudge.",
      },
      {
        flag: "--radius",
        short: "-r",
        default: "5",
        description: "Pixels to move in each nudge.",
      },
      {
        flag: "--help",
        short: "-h",
        default: "—",
        description: "Show all available options.",
      },
    ],
    versionHistory: [
      {
        version: "1.0.0",
        publishedAt: "2026-03-09T18:52:11.538Z",
        description: "Keeps your screen awake by nudging the cursor every few seconds.",
        dependencies: ["commander", "robotjs"],
        changes: [
          "Initial release",
          "Added --interval flag to control nudge frequency",
          "Added --radius flag to control movement distance",
          "Circular 4-step nudge pattern to keep cursor near original position",
        ],
      },
    ],
  },
  {
    slug: "storemyapi",
    name: "storemyapi",
    version: "1.1.7",
    description: "A command-line tool to sync your .env keys to the cloud and share them across machines and teammates.",
    longDescription:
      "storemyapi is an open-source CLI tool for syncing your .env keys to the cloud and sharing them across machines and teammates. Store, retrieve, push, pull, and audit environment variables from your terminal with SHA-256 encrypted cloud sync. No more losing API keys, copying from Notion, or storing secrets in plain text. Set them once, access them everywhere — and collaborate securely with your team.",
    install: "npm install -g storemyapi",
    command: "storemyapi",
    category: "Developer Tools",
    keywords: ["env", "api-keys", "secrets", "environment", "cli", "cloud", "sync", "encryption", "open-source", "dotenv", "api-management"],
    npmUrl: "https://www.npmjs.com/package/storemyapi",
    githubUrl: "https://github.com/aliasgarsogiawala/storemyapi-cli",
    liveRunnable: true,
    safeArgs: ["--help", "-h", "list"],
    usageExamples: [
      {
        label: "Login",
        command: "storemyapi login",
        description: "Authenticate via browser-based OAuth flow.",
      },
      {
        label: "Push .env",
        command: "storemyapi push",
        description: "Push your local .env file to the cloud.",
      },
      {
        label: "Pull .env",
        command: "storemyapi pull",
        description: "Pull your cloud-stored keys into a local .env file.",
      },
      {
        label: "Set a key",
        command: "storemyapi set OPENAI_KEY sk-xxxx",
        description: "Store an individual API key securely.",
      },
      {
        label: "Get a key",
        command: "storemyapi get OPENAI_KEY",
        description: "Retrieve a stored key by name.",
      },
      {
        label: "List all keys",
        command: "storemyapi list",
        description: "See all stored variable names.",
      },
      {
        label: "Audit keys",
        command: "storemyapi audit",
        description: "Check for missing or mismatched keys between local and cloud.",
      },
      {
        label: "Delete a key",
        command: "storemyapi delete OPENAI_KEY",
        description: "Remove a key from cloud storage.",
      },
      {
        label: "Deploy to Vercel",
        command: "storemyapi deploy vercel",
        description: "Push stored keys as Vercel environment variables (beta).",
      },
      {
        label: "Who am I",
        command: "storemyapi whoami",
        description: "Display the currently logged-in account email.",
      },
    ],
    flags: [
      {
        flag: "login",
        default: "—",
        description: "Authenticate via browser-based OAuth.",
      },
      {
        flag: "push",
        default: "—",
        description: "Push local .env keys to the cloud.",
      },
      {
        flag: "pull",
        default: "—",
        description: "Pull cloud keys into a local .env file.",
      },
      {
        flag: "set <KEY> <VALUE>",
        default: "—",
        description: "Store a new environment variable.",
      },
      {
        flag: "get <KEY>",
        default: "—",
        description: "Retrieve the value of a stored variable.",
      },
      {
        flag: "list",
        default: "—",
        description: "List all stored variable names.",
      },
      {
        flag: "audit",
        default: "—",
        description: "Audit keys for differences between local and cloud.",
      },
      {
        flag: "delete <KEY>",
        default: "—",
        description: "Remove a stored variable.",
      },
      {
        flag: "whoami",
        default: "—",
        description: "Show the logged-in account email.",
      },
      {
        flag: "deploy vercel",
        default: "—",
        description: "Push stored keys to Vercel as environment variables (beta).",
      },
      {
        flag: "-f <file>",
        default: ".env",
        description: "Specify a custom .env file path for push, pull, or audit.",
      },
    ],
    versionHistory: [
      {
        version: "1.1.7",
        publishedAt: "2026-03-22T13:32:15.977Z",
        description: "A command-line tool to sync your .env keys to the cloud and share them across machines and teammates.",
        dependencies: ["axios", "chalk", "commander", "inquirer", "jwt-decode", "open"],
        changes: [
          "Added deploy command with Vercel support (beta)",
          "Added CONTRIBUTING.md for open-source contributions",
          "Updated README with full usage documentation",
        ],
      },
      {
        version: "1.1.6",
        publishedAt: "2026-03-21T08:46:58.206Z",
        description: "A command-line tool to sync your .env keys to the cloud and share them across machines and teammates.",
        dependencies: ["axios", "chalk", "commander", "inquirer", "jwt-decode", "open"],
        changes: [
          "Fixed: send deviceCode to /cli/token endpoint",
          "Fixed: receive token and userId back from auth flow",
        ],
      },
      {
        version: "1.1.5",
        publishedAt: "2026-03-20T22:23:30.066Z",
        description: "A command-line tool to sync your .env keys to the cloud and share them across machines and teammates.",
        dependencies: ["axios", "chalk", "commander", "inquirer", "jwt-decode", "open"],
        changes: [
          "Fixed CLI key API paths",
          "Added STOREMYAPI_API_URL environment variable support for custom backends",
        ],
      },
      {
        version: "1.1.4",
        publishedAt: "2026-03-20T16:31:22.276Z",
        description: "A command-line tool to sync your .env keys to the cloud and share them across machines and teammates.",
        dependencies: ["axios", "chalk", "commander", "inquirer", "jwt-decode", "open"],
        changes: [
          "Fixed version command to always read from package.json",
          "Fixed audit and env commands using stale API paths",
        ],
      },
      {
        version: "1.1.3",
        publishedAt: "2026-03-20T15:53:50.656Z",
        description: "A command-line tool to sync your .env keys to the cloud and share them across machines and teammates.",
        dependencies: ["axios", "chalk", "commander", "inquirer", "jwt-decode", "open"],
        changes: [
          "Hotfix for API path regressions introduced in 1.1.2",
        ],
      },
      {
        version: "1.1.2",
        publishedAt: "2026-03-20T15:45:15.656Z",
        description: "A command-line tool to sync your .env keys to the cloud and share them across machines and teammates.",
        dependencies: ["axios", "chalk", "commander", "inquirer", "jwt-decode", "open"],
        changes: [
          "Auto-detect .env.local in addition to .env",
          "Added -f flag to push, pull, and audit commands for custom file paths",
        ],
      },
      {
        version: "1.1.1",
        publishedAt: "2026-03-18T12:07:02.383Z",
        description: "A command-line tool to sync your .env keys to the cloud and share them across machines and teammates.",
        dependencies: ["axios", "chalk", "commander", "inquirer", "jwt-decode", "open"],
        changes: [
          "Patch release following 1.1.0 — stability improvements",
          "Minor output formatting fixes with chalk",
        ],
      },
      {
        version: "1.1.0",
        publishedAt: "2026-03-18T08:54:55.151Z",
        description: "A command-line tool to sync your .env keys to the cloud and share them across machines and teammates.",
        dependencies: ["axios", "chalk", "commander", "inquirer", "jwt-decode", "open"],
        changes: [
          "Major feature release: added push and pull commands for full .env file sync",
          "Added audit command to diff local vs cloud keys",
          "Added chalk for colorized terminal output",
        ],
      },
      {
        version: "1.0.9",
        publishedAt: "2026-03-18T08:02:46.869Z",
        description: "A command-line tool to sync your .env keys to the cloud and share them across machines and teammates.",
        dependencies: ["axios", "chalk", "commander", "inquirer", "jwt-decode", "open"],
        changes: [
          "Removed accidental self-reference from dependencies",
          "Pre-release cleanup ahead of 1.1.0",
        ],
      },
      {
        version: "1.0.8",
        publishedAt: "2026-03-18T07:39:26.869Z",
        description: "A command-line tool to sync your .env keys to the cloud and share them across machines and teammates.",
        dependencies: ["axios", "chalk", "commander", "inquirer", "jwt-decode", "open"],
        changes: [
          "Added chalk for colorized CLI output",
          "Updated description to reflect cloud sharing capabilities",
        ],
      },
      {
        version: "1.0.7",
        publishedAt: "2026-03-18T07:16:41.589Z",
        description: "A command-line tool to sync your .env keys to the cloud and share them across machines and teammates.",
        dependencies: ["axios", "chalk", "commander", "inquirer", "jwt-decode", "open"],
        changes: [
          "Updated whoami command to display user email instead of user ID",
          "Login and whoami commands for CLI authentication",
        ],
      },
      {
        version: "1.0.6",
        publishedAt: "2026-03-05T10:24:53.386Z",
        description: "A secure, cloud-synced environment variable manager for your development workflow.",
        dependencies: ["axios", "commander", "inquirer", "jwt-decode", "open"],
        changes: [
          "Hotfix: removed storemyapi self-reference from dependencies",
          "Minor auth flow stability improvements",
        ],
      },
      {
        version: "1.0.5",
        publishedAt: "2026-03-05T10:09:26.383Z",
        description: "A secure, cloud-synced environment variable manager for your development workflow.",
        dependencies: ["axios", "commander", "inquirer", "jwt-decode", "open"],
        changes: [
          "Replaced prompts library with inquirer for better interactive input",
          "Stability improvements across auth flow",
        ],
      },
      {
        version: "1.0.4",
        publishedAt: "2026-03-05T07:37:14.636Z",
        description: "A secure, cloud-synced environment variable manager for your development workflow.",
        dependencies: ["open", "axios", "commander", "jwt-decode"],
        changes: [
          "Added jwt-decode for local token parsing",
          "Improved authentication token handling",
          "Added session persistence between runs",
        ],
      },
      {
        version: "1.0.3",
        publishedAt: "2026-03-03T19:48:00.662Z",
        description: "A secure, cloud-synced environment variable manager for your development workflow.",
        dependencies: ["open", "axios", "commander"],
        changes: [
          "Updated package description",
          "Refined cloud sync reliability",
          "Minor CLI output formatting fixes",
        ],
      },
      {
        version: "1.0.2",
        publishedAt: "2026-03-02T06:27:41.645Z",
        description: "The official command-line tool for StoreMyAPI.",
        dependencies: ["open", "axios", "commander"],
        changes: [
          "Added open for browser-based OAuth flow",
          "Added axios for API communication",
          "First working cloud sync implementation",
        ],
      },
      {
        version: "1.0.0",
        publishedAt: "2026-02-23T07:27:39.653Z",
        description: "Initial release.",
        dependencies: [],
        changes: ["Initial release", "Basic set/get/list/delete commands", "Local storage only"],
      },
    ],
  },
];

export function getPackage(slug: string): Package | undefined {
  return packages.find((p) => p.slug === slug);
}
