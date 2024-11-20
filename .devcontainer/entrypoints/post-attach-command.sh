#!/bin/sh
set -e

function style() {
  printf "\e[$1m$2\e[0m"
}
function bold() {
  printf "$(style 1 "$1")"
}
function green() {
  printf "$(style 32 "$1")"
}
function cyan() {
  printf "$(style 36 "$1")"
}
function code() {
  printf "$(style "40;31" "$1")"
}

echo -e "$(cat << EOF
  $(bold $(cyan "devcontainer")) carregado com sucesso $(green "✔")

$(bold "Observação:") Adicione os comandos que precisar em $(green "post-attach-command.sh").
As ações são executadas assim que o contêiner é anexado, então você
também pode usar o script para executar comandos como $(code "pnpm install") ou
para executar mais scripts na raiz do projeto.\n
EOF
)"
