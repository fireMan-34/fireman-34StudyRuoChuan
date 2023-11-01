# git clone https://github.com/lxchuan12/koa-compose-analysis.git

Set-Location ..\

# git subtree add --prefix=koa.modal/compsose https://github.com/ruochuan12/koa-compose-analysis.git main

$Project_Path = Get-Location

# 和前面位置对应

Set-Location -Path "$Project_Path\koa.modal\compsose\compose"

npm i