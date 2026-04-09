# Install firewalld
dnf install firewalld -y

# Start and enable
systemctl start firewalld
systemctl enable firewalld

# Verify
systemctl status firewalld
firewall-cmd --state
