mv home/.git dist/.git
rm -r home
mv dist home
# find ./home/* -maxdepth 1  | grep -v "\(.git\)" 
# find ./home/* -maxdepth 1  | grep -v "\(.git\)" | xargs rm -rf "{}"
# cp -af ./dist/* ./home/

git -C home commit -a -m "deploy'
git -C home push