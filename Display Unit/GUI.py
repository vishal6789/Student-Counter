from unicodedata import name
from kivy.app import App
from kivy.uix.widget import Widget
from kivy.lang import Builder
from kivy.uix.floatlayout import FloatLayout
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button
from kivy.uix.label import Label
from kivy.properties import ObjectProperty
import requests
import json


#Including .kv Design file
kv = Builder.load_file("my.kv")

from kivy.config import Config
Config.set('graphics', 'width', '1366')
Config.set('graphics', 'height', '768')

class MainWindow(Widget):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        print("Start")    
        self.fetch()
        
    
    studentCount = {}
    DispCounts = []
    
    def fetch(self):
        url = "http://localhost:3001/studentcount"
        r = requests.get(url)
        self.studentCount = r.json()
        self.generateList()
        
    def generateList(self):
        for classroom in self.studentCount:
            str = "[sup][size=100]{} [/size][/sup][size=300]{}[/size]".format(classroom,"{0:02d}".format(self.studentCount[classroom]))
            self.DispCounts.append(str)
        self.display()

    def display(self):
        print(self.DispCounts)
        self.ids.c1.text = self.DispCounts[0]
        self.ids.c2.text = self.DispCounts[1]
        self.ids.c3.text = self.DispCounts[2]
        self.ids.c4.text = self.DispCounts[3]
    

    
    pass


class myApp(App):
    
    #Setting application Tittle 
    App.title = "Student Counter"
    def build(self):
        return MainWindow()

if __name__ == "__main__":
    myApp().run()       



