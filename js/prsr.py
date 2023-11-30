import json
import re
"""
with open("hoff_jsons/toys.hoff.ru.json") as file:
    data = json.load(file)
    res = []
    for i in range(len(data["data"]["items"])):
        name = data["data"]["items"][i]["name"].strip()
        name = " ".join(re.findall(r'[^\s]+', name))
        res.append({"id":data["data"]["items"][i]["id"],"name":name,"image":data["data"]["items"][i]["image"],"prices":data["data"]["items"][i]["prices"],"discount":data["data"]["items"][i]["discount"], "rating":data["data"]["items"][i]["rating"]})
    with open("toys.json", "w", encoding='utf-8') as f:
        json.dump(res, f, ensure_ascii=False, indent=4)
"""
with open("hoff_jsons/db.json", "r", encoding='utf-8') as file:
    data = json.load(file)
    res = {}
    for i in data:
        for j in data[i]:
            res.update({str(j["id"]):{"name":j["name"],"image":j["image"],"prices":j["prices"],"discount":j["discount"], "rating":j["rating"]}})
    with open("keys.json", "w", encoding='utf-8') as f:
        json.dump(res, f, ensure_ascii=False, indent=4)
