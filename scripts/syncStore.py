import os
import requests

def downIcon(path,targetPath):
    # 创建一个名为icons的目录
    os.makedirs(targetPath, exist_ok=True)
    url = "http://n.huasen.cc/"+path
    # 下载并保存icon
    response = requests.get(url)
    if response.status_code == 200:
        print(f"Icon {path} 开始下载")
        icon_path =f"{targetPath}/{path}"
        directory, filename = os.path.split(icon_path)
        # 根据目录创建文件夹
        os.makedirs(directory, exist_ok=True)
        with open(icon_path, "wb") as f:
            f.write(response.content)
    else:
        print(f"下载{path}失败，状态码: {response.status_code}")


def downIcons(data):
    # 提取icon
    for series in data["data"]["series"]:
        for site in series["sites"]:
            icon_url = site.get("icon")
            if icon_url:
                downIcon(icon_url,"public")

url = "http://n.huasen.cc/api/journal/findJournalInformationById"
data = {"_id": "641881fa39ede6001dacb8b9"}

response = requests.post(url, json=data)

if response.status_code == 200:
    downIcons(response.json())
else:
    print("请求失败，状态码:", response.status_code)