#!/bin/sh
set -e

# Save bash history inside
echo "export HISTFILE=$(pwd)/.devcontainer/config/zsh_history" >> ~/.zshrc
echo "export STARSHIP_CONFIG=$(pwd)/.devcontainer/config/starship.toml" >> ~/.zshrc

# Install npm packages in development mode
if [ ! -d "node_modules" ]; then
  echo "Installing packages... 📦"
  pnpm install
  echo -e "Done!\n"
fi

exec "$@"