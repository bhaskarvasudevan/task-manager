# Update system
sudo dnf update -y

# Install required packages
sudo dnf install -y dnf-plugins-core

# Add Docker repository
sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# Install Docker
sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Start and enable Docker
sudo systemctl enable --now docker

# Add current user to docker group
sudo usermod -aG docker $(whoami)

# Add specific user (if needed)
# sudo usermod -aG docker custom-user

# Apply group changes (logout/login or use newgrp)
newgrp docker

# Check docker version
docker --version
docker compose version
