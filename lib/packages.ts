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
    version: "1.0.5",
    description: "A secure, cloud-synced environment variable manager for your development workflow.",
    longDescription:
      "storemyapi lets you store, retrieve, and manage API keys and environment variables from the terminal with cloud sync. No more losing keys, copying from Notion, or storing secrets in plain text files. Set them once, access them everywhere across your machines.",
    install: "npm install -g storemyapi",
    command: "storemyapi",
    category: "Developer Tools",
    keywords: ["env", "api-keys", "secrets", "environment", "cli", "cloud", "sync"],
    npmUrl: "https://www.npmjs.com/package/storemyapi",
    liveRunnable: true,
    safeArgs: ["--help", "-h", "list"],
    usageExamples: [
      {
        label: "Set a key",
        command: "storemyapi set OPENAI_KEY sk-xxxx",
        description: "Store an API key securely.",
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
        label: "Delete a key",
        command: "storemyapi delete OPENAI_KEY",
        description: "Remove a key from storage.",
      },
    ],
    flags: [
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
        flag: "delete <KEY>",
        default: "—",
        description: "Remove a stored variable.",
      },
    ],
    versionHistory: [
      {
        version: "1.0.5",
        publishedAt: "2026-03-05T10:09:26.383Z",
        description: "A secure, cloud-synced environment variable manager for your development workflow.",
        dependencies: ["axios", "commander", "inquirer", "jwt-decode", "open", "storemyapi"],
        changes: [
          "Replaced prompts library with inquirer for better interactive input",
          "Removed storemyapi self-reference cleanup",
          "Stability improvements across auth flow",
        ],
      },
      {
        version: "1.0.4",
        publishedAt: "2026-03-05T07:37:14.636Z",
        description: "A secure, cloud-synced environment variable manager for your development workflow.",
        dependencies: ["open", "axios", "commander", "jwt-decode", "storemyapi"],
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
        dependencies: ["open", "axios", "commander", "storemyapi"],
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
        dependencies: ["open", "axios", "commander", "storemyapi"],
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
