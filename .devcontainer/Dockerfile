FROM mcr.microsoft.com/devcontainers/javascript-node:18

# Install MongoDB client and other development tools
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get install -y mongodb-clients vim

# [Optional] Install VS Code extensions
# Copy the contents of the project to the working directory
COPY . /app
WORKDIR /app

RUN npm install

# Auto-detect the default Dev Container Features to install on the container.
# For more information, see https://aka.ms/devcontainer/container-features.
# {
# 	"features": {
# 		"ghcr.io/devcontainers/features/docker-in-docker:1": {
# 			"version": "latest",
# 			"moby": true
# 		}
# 	}
# }

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list>

# [Optional] Uncomment if you want to run as a non-root user inside the container
# and add your user to the "docker" group so they can use the Docker CLI. The
# USERNAME variable should match what's set in docker-compose.yml.
# ARG USERNAME
# ARG USER_UID
# ARG USER_GID
# RUN groupadd --gid $USER_GID $USERNAME \
#     && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME
# USER $USERNAME

# [Optional] Uncomment this line to run update-alternatives to update npm
# RUN update-alternatives --install /usr/bin/node node /usr/local/n/node/16.13.2/bin/node 10