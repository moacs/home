# encoding=utf-8
import requests
# from lxml import etree
import datetime
import time
import random
from concurrent.futures import ThreadPoolExecutor
import os
import json
import re

user_agent = [
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/22.0.1207.1 Safari/537.1",
]
# POST http://n.huasen.cc/api/journal/findJournalInformationById 
# {"_id":"641881fa39ede6001dacb8b9"}
# data.series.sites

class core:
    # 设置保存路径
    image_path = '/Users/chris/codes/huasen-portal/public/huasen/'

    def __init__(self, ):
        index = 'https://diskgirl.com/imageslist?page=48'
        # index_url = "http://pic.netbian.com/4kmeinv/index.html"
        sections = index.split("/")
        self.domain = sections[2]
        self.index_url = index
        self.path = f'{self.image_path}/{self.domain}/'
        self.headers = {
            "User-Agent": random.choice(user_agent),
            "Referer": index
        }

    def parseDetails(self, detail):
        url = detail['url']
        title = detail['title']
        detail['images'] = []
        images = detail["images"]
        # {'url': url, 'title': title, "images": []}
        try:
            response = requests.get(url, headers=self.headers)
            html = etree.HTML(response.text)
        except Exception as e:
            detail["flag"] = str(e)
            self.execute_result.append(detail)
            print(f'details url:{url} title:{title}  error:{e}')
            return
        imgs = []
        try:
            path = f'{self.path}{title}'
            if not os.path.exists(path):
                os.makedirs(path)
            size = re.search(f'for.+<.+?(\d+);', response.text).group(1)
            imgs = range(0, int(size))

            images = detail["images"]
            for img in imgs:
                src = f'{url.replace("/image/","/images/")}/{img}.jpg'
                img_name = f'{img}.jpg'
                images.append({"name": img_name, "src": src})
                if os.path.isfile(f'{path}/{img_name}'):
                    continue
                img_content = requests.get(src, headers=self.headers).content
                with open(f'{path}/{img_name}', 'wb') as f:
                    f.write(img_content)

        except Exception as e:
            detail["flag"] = str(e)
            self.execute_result.append(detail)
            print(f'details url:{url} title:{title}  {len(imgs)} error:{e}')
            return

        time.sleep(random.randint(1, 2))
        detail["flag"] = "ok"

        self.execute_result.append(detail)
        queuePath = f'{self.path}/queues/'
        tempPath = detail['path'].replace('/image', '').replace('/', '')
        tempPath = f'{queuePath}{tempPath}.json'
        os.remove(tempPath)

        print(
            f'details url:{url} title:{title} {len(imgs)} {len(self.execute_result)} / {self.execute_total}')

    def parseList(self, url, result):
        # url = tag['url']
        url = "http://n.huasen.cc/api/journal/findJournalInformationById"
        data = {"_id":"641881fa39ede6001dacb8b9"};
        response = requests.post(url,json=data, headers=self.headers)
        # html = etree.HTML(response.text)
        json.loads(response.text)


        # links = html.xpath('//div[@class="cover-title"]/a')
        # result = []
        for link in links:
            link_text = link.xpath('h2/text()')[0].strip()
            link_path = link.attrib["href"]
            link_href = f'https://diskgirl.com{link_path}'
            result.append(
                {'url': link_href, 'path': link_path, 'title': link_text})
        time.sleep(random.randint(1, 2))
        return result
    execute_total = 0
    execute_result = []

    def execute(self):
        start = datetime.datetime.now()

        list_urls = [
            {
                "url": f"https://diskgirl.com/imageslist?page={i}",
                "title": "disk",
                "text": "girl",
                "code": "diskgirl",
                "details": []
            } for i in range(1, 2)
            # } for i in range(1, 99)
        ]

        # 要请求的url列表
        tags = {'diskgirl': list_urls[0]}
        details = list_urls[0]['details']

        queuePath = f'{self.path}/queues/'
        if not os.path.exists(queuePath):
            os.makedirs(queuePath)

        dirs = os.listdir(queuePath)
        for dir in dirs:
            with open(f'{queuePath}{dir}', 'r') as queueFile:
                queueData = json.load(queueFile)
                details.append(queueData)
                print(queueData)

        if len(details) == 0:
            with ThreadPoolExecutor(max_workers=30) as executor:
                for url in list_urls:
                    executor.submit(self.parseList, url['url'], details)

        for key in tags:
            tag = tags[key]
            for detail in tag['details']:
                self.execute_total += 1
                tempPath = detail['path'].replace(
                    '/image', '').replace('/', '')
                tempPath = f'{queuePath}{tempPath}.json'

                detailData = json.dumps(detail, ensure_ascii=False)
                with open(tempPath, 'wb') as f:
                    f.write(detailData.encode(encoding="utf-8"))
        with ThreadPoolExecutor(max_workers=60) as executor:
            for key in tags:
                tag = tags[key]
                for detail in tag['details']:
                    executor.submit(self.parseDetails, detail)

        data = json.dumps(tags, ensure_ascii=False)
        with open(f'{self.path}/mainfest.json', 'wb') as f:
            f.write(data.encode(encoding="utf-8"))
        delta = (datetime.datetime.now() - start).total_seconds()
        print(f"爬取图片用时：{delta}s")
