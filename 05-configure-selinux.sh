# Check SELinux status
getenforce

# If you want to keep SELinux enabled (recommended), configure it for Docker
setsebool -P container_manage_cgroup on

# Allow Docker to bind to ports
semanage port -a -t http_port_t -p tcp 8080
semanage port -a -t http_port_t -p tcp 8081

# If semanage is not found, install it
dnf install -y policycoreutils-python-utils

# Alternatively, if you face issues, you can set SELinux to permissive (not recommended for production)
# setenforce 0
# sed -i 's/^SELINUX=enforcing/SELINUX=permissive/' /etc/selinux/config
