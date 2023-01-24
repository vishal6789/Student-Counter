import requests
import json

url = "http://localhost:3001/studentcount"
r = requests.get(url)
studentCount = r.json()

for classroom in studentCount:
    print("Students in {} : {}".format(classroom,studentCount[classroom]))