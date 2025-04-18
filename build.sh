#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

nvm use 20.12.0

# 直接使用 nvm 管理的 node 可执行文件的完整路径来运行 next build
/Users/guorun/.nvm/versions/node/v20.12.0/bin/node ./node_modules/.bin/next build