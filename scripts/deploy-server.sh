git stash
git checkout ${1}
git pull
cd server
npm i
npx pm2 kill
npm run start:redis
npm run "start:${2}"