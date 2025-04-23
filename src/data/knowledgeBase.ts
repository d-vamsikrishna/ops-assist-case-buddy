
// Knowledge base for common case resolutions
export interface KnowledgeBaseEntry {
  id: string;
  keywords: string[];
  title: string;
  osSpecific: boolean;
  resolutions: {
    default?: string[];
    windows?: string[];
    linux?: string[];
    mac?: string[];
  };
}

export const knowledgeBase: KnowledgeBaseEntry[] = [
  {
    id: "kb-001",
    keywords: ["password", "reset", "forgot", "change", "login", "credential"],
    title: "Password Reset",
    osSpecific: false,
    resolutions: {
      default: [
        "1. Navigate to the user management console",
        "2. Search for the affected user",
        "3. Select 'Reset Password' option",
        "4. Generate a temporary password",
        "5. Communicate the new password to the user through secure channel",
        "6. Ask user to change the temporary password on first login"
      ]
    }
  },
  {
    id: "kb-002",
    keywords: ["network", "connection", "internet", "connectivity", "offline", "down"],
    title: "Network Connectivity Issues",
    osSpecific: true,
    resolutions: {
      windows: [
        "1. Run command 'ipconfig /release'",
        "2. Run command 'ipconfig /renew'",
        "3. Run command 'ipconfig /flushdns'",
        "4. Restart the network adapter",
        "5. Check firewall settings",
        "6. Verify proxy configuration"
      ],
      linux: [
        "1. Run command 'sudo ifdown eth0 && sudo ifup eth0'",
        "2. Run command 'sudo systemctl restart NetworkManager'",
        "3. Check /etc/resolv.conf for proper DNS configuration",
        "4. Verify iptables rules using 'sudo iptables -L'",
        "5. Check network interface configuration in /etc/network/interfaces"
      ],
      mac: [
        "1. Open Network Preferences",
        "2. Select the active network interface and click Advanced",
        "3. Go to TCP/IP tab and click 'Renew DHCP Lease'",
        "4. Flush DNS with 'sudo killall -HUP mDNSResponder'",
        "5. Reset network settings if problem persists"
      ]
    }
  },
  {
    id: "kb-003",
    keywords: ["disk", "storage", "space", "full", "capacity"],
    title: "Disk Space Issues",
    osSpecific: true,
    resolutions: {
      windows: [
        "1. Run Disk Cleanup utility",
        "2. Delete temporary files using '%temp%' in Run dialog",
        "3. Check large files using WinDirStat tool",
        "4. Clear system restore points if necessary",
        "5. Remove unused applications"
      ],
      linux: [
        "1. Check disk usage with 'df -h'",
        "2. Find large files using 'sudo find / -type f -size +100M'",
        "3. Clear apt cache with 'sudo apt-get clean'",
        "4. Remove old log files in /var/log",
        "5. Use 'ncdu' tool for interactive disk usage analysis"
      ],
      mac: [
        "1. Empty Trash",
        "2. Clear caches from ~/Library/Caches",
        "3. Use OmniDiskSweeper to identify large files",
        "4. Remove unused applications",
        "5. Delete old iOS device backups in iTunes"
      ]
    }
  },
  {
    id: "kb-004",
    keywords: ["server", "reboot", "restart", "crash", "hang", "frozen"],
    title: "Server Reboot Procedure",
    osSpecific: false,
    resolutions: {
      default: [
        "1. Attempt soft reboot first using system commands",
        "2. If unresponsive, check server through iLO/DRAC/BMC interface",
        "3. Perform hardware health check before reboot",
        "4. Schedule maintenance window if during business hours",
        "5. Document current issue before reboot",
        "6. Perform controlled shutdown if possible",
        "7. Monitor server during startup for any errors"
      ]
    }
  },
  {
    id: "kb-005",
    keywords: ["backup", "restore", "recovery", "data", "lost"],
    title: "Data Backup and Restore",
    osSpecific: false,
    resolutions: {
      default: [
        "1. Identify which backup contains the required data",
        "2. Mount the backup storage or access the backup service",
        "3. Locate the specific backup point needed",
        "4. Restore to a temporary location to prevent overwriting existing data",
        "5. Verify data integrity after restore",
        "6. Transfer confirmed data to the required location",
        "7. Update documentation with restore details"
      ]
    }
  }
];
