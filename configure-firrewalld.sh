# Start and enable firewalld
systemctl start firewalld
systemctl enable firewalld

# Allow SSH (usually already allowed)
firewall-cmd --permanent --add-service=ssh

# Allow HTTP
firewall-cmd --permanent --add-service=http

# Allow HTTPS
firewall-cmd --permanent --add-service=https

# Or use specific ports
firewall-cmd --permanent --add-port=22/tcp
firewall-cmd --permanent --add-port=80/tcp
firewall-cmd --permanent --add-port=443/tcp

# Reload firewall to apply changes
firewall-cmd --reload

# Verify rules
firewall-cmd --list-all
