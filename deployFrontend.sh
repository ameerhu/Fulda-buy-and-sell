#/bin/bash

cd client
ng build --prod
aws s3 cp ./dist/youBuy s3://fd04gdsd.com --recursive --acl public-read
