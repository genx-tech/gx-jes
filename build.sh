cp -f ./src/index.js ./index.js
cp -f ./index-cjs.js ./src/index.js

pnpm build:prod

mv -f ./index.js ./src/index.js