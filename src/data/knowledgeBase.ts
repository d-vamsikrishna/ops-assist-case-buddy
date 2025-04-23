
// Knowledge base for common case resolutions
export interface KnowledgeBaseEntry {
  id: string;
  keywords: string[];
  title: string;
  generalApproach: string[];
  osSpecific: boolean;
  resolutions: {
    default?: string[];
    windows?: string[];
    linux?: string[];
    mac?: string[];
  };
  followUpQuestions?: {
    questions: string[];
    answers: {
      [key: string]: string[];
    };
  };
}

export const knowledgeBase: KnowledgeBaseEntry[] = [
  {
    id: "kb-001",
    keywords: ["cpu", "processor", "high cpu", "cpu usage", "cpu utilization"],
    title: "High CPU Usage",
    generalApproach: [
      "Before diving into OS-specific steps, here's a general approach:",
      "1. Identify which process is consuming high CPU",
      "2. Check if this is a regular pattern or a sudden spike",
      "3. Verify if any recent changes were made to the system",
      "4. Document the time and impact of high CPU usage"
    ],
    osSpecific: true,
    resolutions: {
      windows: [
        "1. Open Task Manager (Ctrl + Shift + Esc)",
        "2. Go to 'Performance' tab to check overall CPU usage",
        "3. Switch to 'Processes' tab and sort by CPU usage",
        "4. Right-click on high CPU process and select 'Analyze wait chain'",
        "5. If malicious, end task and scan system",
        "6. Check Windows Event Viewer for related errors"
      ],
      linux: [
        "1. Run 'top' or 'htop' command to view processes",
        "2. Use 'ps aux | sort -nrk 3,3 | head -n 5' to see top CPU consumers",
        "3. Check system load with 'uptime'",
        "4. Analyze process details with 'strace -p <PID>'",
        "5. Review system logs in /var/log/syslog",
        "6. Consider using 'nice' command to adjust process priority"
      ],
      mac: [
        "1. Open Activity Monitor",
        "2. Select CPU tab to view processor usage",
        "3. Sort by %CPU to identify high-usage processes",
        "4. Use 'Sample Process' for detailed analysis",
        "5. Check Console app for related system logs",
        "6. Force quit problematic applications if necessary"
      ]
    },
    followUpQuestions: {
      questions: [
        "Is CPU continuously high?",
        "Is this case logging continuously?"
      ],
      answers: {
        "Is CPU continuously high?": [
          "For continuously high CPU usage:",
          "1. Check for memory leaks in applications",
          "2. Review scheduled tasks and background processes",
          "3. Update system and application patches",
          "4. Consider resource allocation changes",
          "5. Monitor thermal conditions of the server",
          "6. Open a ticket with vendor support if persistent"
        ],
        "Is this case logging continuously?": [
          "For continuous case logging:",
          "1. Check log rotation settings",
          "2. Review application logging levels",
          "3. Analyze log patterns for recurring issues",
          "4. Implement log aggregation solution",
          "5. Consider adjusting log verbosity",
          "6. Set up log monitoring alerts"
        ]
      }
    }
  },
  {
    id: "kb-002",
    keywords: ["memory", "ram", "memory usage", "high memory", "memory utilization"],
    title: "High Memory Usage",
    generalApproach: [
      "Before checking OS-specific steps, here's a general approach:",
      "1. Identify the memory consumption pattern",
      "2. Check for memory leaks in applications",
      "3. Verify available physical and virtual memory",
      "4. Document any recent changes that might affect memory usage"
    ],
    osSpecific: true,
    resolutions: {
      windows: [
        "1. Open Task Manager (Ctrl + Shift + Esc)",
        "2. Go to 'Performance' tab to check memory stats",
        "3. View 'Processes' tab and sort by memory usage",
        "4. Check for memory dumps in Event Viewer",
        "5. Run Windows Memory Diagnostic tool",
        "6. Adjust virtual memory if needed"
      ],
      linux: [
        "1. Use 'free -m' to check memory usage",
        "2. Run 'vmstat' for virtual memory statistics",
        "3. Check 'top' or 'htop' for process memory usage",
        "4. Analyze swap usage with 'swapon -s'",
        "5. Review '/proc/meminfo' for detailed memory info",
        "6. Consider OOM killer logs in syslog"
      ],
      mac: [
        "1. Open Activity Monitor",
        "2. Select Memory tab",
        "3. Check Memory Pressure graph",
        "4. Review 'Real Mem' usage per process",
        "5. Analyze swap usage",
        "6. Use 'purge' command if needed to clear inactive memory"
      ]
    }
  }
];
