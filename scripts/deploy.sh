# find ./home/* -maxdepth 1  | grep -v "\(.git\)" | xargs rm -rf "{}"
find ./home/* -maxdepth 1  | grep -v "\(.git\)" | xargs rm -rf "{}"
cp -arf ./dist/* ./home/* 

