# find ./home/* -maxdepth 1  | grep -v "\(.git\)" 
find ./home/* -maxdepth 1  | grep -v "\(.git\)" | xargs rm -rf "{}"
cp -af ./dist/* ./home/
cd home
git add .
git commit -a -m "deploy"
git push