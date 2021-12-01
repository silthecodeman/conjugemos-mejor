import requests
import pprint
from bs4 import BeautifulSoup


dic = dict()

verbs = [
    "ser",
    "ir",
    "estar",
    "ver",
    "saber",
    "tener",
    "mirar",
    "disparar"
]

for i in verbs:
    r = requests.get(f"https://www.spanishdict.com/conjugate/{i}")
    soup = BeautifulSoup(r.text, "html.parser")

    TableDiv = "_pGNF_2O"

    myTables = soup.find_all("div", {"class": TableDiv})

    trips = 0       

    mylists = []

    for j in myTables: 
        jumps = 0
        mylist = []
        for h in j.find_all('a'):
            jumps += 1
            try:
                value = BeautifulSoup(str(h), "html.parser").find('a')['aria-label']
                if trips == 0 and (jumps%5 == 1 or jumps%5 == 2 or jumps%5 == 3):
                    mylist.append(value)
                elif trips == 1 and jumps%3 == 1:
                    mylist.append(value)
            except:
                pass
        mylists.append(mylist)
        trips +=1
        if trips == 2:    
            break

    dic[i] = {
                    "present_indicitive":{
                        "yo":mylists[0][0],
                        "tú":mylists[0][3],
                        "Él, Ella, Usted":mylists[0][6],
                        "Nosotros":mylists[0][9],
                        "Vosostros":mylists[0][12],
                        "Ellos, Ellas, Ustedes":mylists[0][15]
                    },
                    "present_subjunctive":{
                        "yo":mylists[1][0],
                        "tú":mylists[1][1],
                        "Él, Ella, Usted":mylists[1][2],
                        "Nosotros":mylists[1][3],
                        "Vosostros":mylists[1][4],
                        "Ellos, Ellas, Ustedes":mylists[1][5]
                    },
                    "prederite":{
                        "yo":mylists[0][1],
                        "tú":mylists[0][4],
                        "Él, Ella, Usted":mylists[0][7],
                        "Nosotros":mylists[0][10],
                        "Vosostros":mylists[0][13],
                        "Ellos, Ellas, Ustedes":mylists[0][16]
                    },
                    "imperfect":{
                        "yo":mylists[0][2],
                        "tú":mylists[0][5],
                        "Él, Ella, Usted":mylists[0][8],
                        "Nosotros":mylists[0][11],
                        "Vosostros":mylists[0][14],
                        "Ellos, Ellas, Ustedes":mylists[0][17]
                    }
                }

print(pprint.pformat(dic, width=1).replace("'",'"'))
