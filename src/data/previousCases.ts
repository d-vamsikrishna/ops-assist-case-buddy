
// Database of previous case resolutions
export interface PreviousCase {
  caseNumber: string;
  title: string;
  description: string;
  solvedBy: string;
  keywords: string[];
  date: string;
  os?: "windows" | "linux" | "mac";
}

export const previousCases: PreviousCase[] = [
  {
    caseNumber: "INC-2023-45678",
    title: "Domain controller authentication failure",
    description: "Users unable to login due to domain controller authentication issues.",
    solvedBy: "Alex Johnson",
    keywords: ["domain", "controller", "authentication", "login", "active directory"],
    date: "2023-10-15",
    os: "windows"
  },
  {
    caseNumber: "INC-2023-45679",
    title: "Database server high CPU usage",
    description: "SQL Server experiencing sustained high CPU utilization affecting query performance.",
    solvedBy: "Maria Garcia",
    keywords: ["database", "sql", "cpu", "performance", "server"],
    date: "2023-10-16",
    os: "windows"
  },
  {
    caseNumber: "INC-2023-45680",
    title: "Network switch port failure",
    description: "Core switch showing errors on multiple ports causing intermittent connectivity.",
    solvedBy: "Raj Patel",
    keywords: ["network", "switch", "port", "connectivity", "errors"],
    date: "2023-10-17"
  },
  {
    caseNumber: "INC-2023-45681",
    title: "Linux server kernel panic",
    description: "Production application server experiencing kernel panics under high load.",
    solvedBy: "Zhang Wei",
    keywords: ["linux", "kernel", "panic", "crash", "server"],
    date: "2023-10-18",
    os: "linux"
  },
  {
    caseNumber: "INC-2023-45682",
    title: "Storage array disk failure",
    description: "RAID array reporting failed disk requiring replacement.",
    solvedBy: "Sarah Wilson",
    keywords: ["storage", "disk", "raid", "failure", "array"],
    date: "2023-10-19"
  },
  {
    caseNumber: "INC-2023-45683",
    title: "Backup job failure",
    description: "Nightly backup job failing with media write errors.",
    solvedBy: "James Brown",
    keywords: ["backup", "failure", "job", "media", "error"],
    date: "2023-10-20"
  },
  {
    caseNumber: "INC-2023-45684",
    title: "Email server queue buildup",
    description: "Exchange server experiencing message queue buildup due to connectivity issues with external domains.",
    solvedBy: "Emma Davis",
    keywords: ["email", "exchange", "queue", "message", "server"],
    date: "2023-10-21",
    os: "windows"
  },
  {
    caseNumber: "INC-2023-45685",
    title: "VPN connection failures",
    description: "Remote users unable to establish VPN connections due to certificate expiration.",
    solvedBy: "Carlos Rodriguez",
    keywords: ["vpn", "connection", "remote", "certificate", "access"],
    date: "2023-10-22"
  },
  {
    caseNumber: "INC-2023-45686",
    title: "Web server 503 errors",
    description: "Customer-facing web application returning 503 errors during peak usage times.",
    solvedBy: "Aisha Mohammed",
    keywords: ["web", "server", "503", "error", "application"],
    date: "2023-10-23",
    os: "linux"
  },
  {
    caseNumber: "INC-2023-45687",
    title: "Print server spooler crash",
    description: "Print server spooler service repeatedly crashing when processing large print jobs.",
    solvedBy: "David Kim",
    keywords: ["print", "server", "spooler", "crash", "service"],
    date: "2023-10-24",
    os: "windows"
  },
  {
    caseNumber: "INC-2023-45688",
    title: "DNS resolution failures",
    description: "Internal DNS servers failing to resolve certain domains after recent update.",
    solvedBy: "Olivia Taylor",
    keywords: ["dns", "resolution", "server", "domain", "update"],
    date: "2023-10-25"
  },
  {
    caseNumber: "INC-2023-45689",
    title: "SAN connectivity issues",
    description: "Storage area network experiencing intermittent connectivity issues with attached servers.",
    solvedBy: "Miguel Sanchez",
    keywords: ["san", "storage", "connectivity", "fibre", "network"],
    date: "2023-10-26"
  },
  {
    caseNumber: "INC-2023-45690",
    title: "Application gateway timeout",
    description: "API gateway timing out when processing certain request types.",
    solvedBy: "Priya Singh",
    keywords: ["application", "gateway", "api", "timeout", "request"],
    date: "2023-10-27",
    os: "linux"
  },
  {
    caseNumber: "INC-2023-45691",
    title: "Firewall rule misconfiguration",
    description: "Incorrect firewall rule blocking legitimate traffic to application servers.",
    solvedBy: "Thomas Anderson",
    keywords: ["firewall", "rule", "block", "traffic", "security"],
    date: "2023-10-28"
  },
  {
    caseNumber: "INC-2023-45692",
    title: "Virtual machine snapshot failure",
    description: "Unable to create VM snapshots due to storage constraints.",
    solvedBy: "Hannah Nelson",
    keywords: ["virtual", "machine", "vm", "snapshot", "storage"],
    date: "2023-10-29"
  }
];
