from csv import QUOTE_NONE
import os
from flask import Flask, render_template, request,session
import random

app = Flask(__name__)
app.secret_key = 'abcdefghijklmn'
#app.permanent_session_lifetime = timedelta(minutes=3) 

qlist=[]
quizFile=""
klevel=""

def quiz_init():
    global quizFile,qlist,klevel
    klevel = request.args.get("klevel")
    print("klevel",klevel)
    if klevel == None:
        kleve = "2"
    if klevel == "2":
        quizFile = 'kanjiData_2022-04-12_2kyu.txt'
        qlist = random.sample(range(1,525),20)
        session["qnos"] = qlist
        session["qfile"] = quizFile
    else:
        quizFile = 'kanjiData_2022-04-12_準一級.txt'
        qlist = random.sample(range(1,849),20)
        session["qnos"] = qlist
        session["qfile"] = quizFile

@app.route('/')
def main():
    session.permanent = True  
    session["start"] = True 
    return render_template('index.html')

@app.route('/getnext' ,methods=['GET','POST'])
def getnext():
    return render_template('/kanjitest.html',mojinum=9)

@app.route('/kanjitest' ,methods=['GET','POST'])
def kanjitest():
    global quizFile,qlist

    if "start" in session:
        if session["start"] == True:
            session["start"] = False
            quiz_init()
        else:
            if "qnos" in session:
                qlist = session["qnos"]
                quizFile=session["qfile"]
            else:
                quiz_init()
    else: 
        session.permanent = True 
        session["start"] = False
        quiz_init()
        
    kdata =''
    kanjiDataF =  open(quizFile,'r',encoding='utf8')
    
    if request.method == "GET":
        st_moji_num = request.args.get("mojinum")
    else:
        st_moji_num = request.form.get("mojinum")
 
    if st_moji_num == None :
        moji_num = 1
    else:
        if (st_moji_num.isdigit()):
            moji_num = int(st_moji_num)
        else:
            moji_num = 1   
    
    if (moji_num > 0 and moji_num <=20):
        kanjiNo = qlist[moji_num - 1]
    else:
        kanjiNo = 1
        moji_num = 1

    print("qlist",quizFile,qlist)

    print(moji_num,kanjiNo)

    data_count = 0
    taisyouSW = False
    datalist = kanjiDataF.readlines()
    for data in datalist:
        if '--Start--' in data:
            if data_count + 1 == kanjiNo:
                taisyouSW = True
                tmpdata = data.split(",")
                if len(tmpdata) >= 2:
#                    print("tempdata",tmpdata)
#                    setList = tmpdata[1].split(";")
#                    setumei = setList[1] + setList[2]
                     setumei = tmpdata[1]
                else:
                    setumei = ''
            data_count += 1
        else:
            if taisyouSW :
                if '--EoS--' in data:
                    kdata = kdata + "]"
                    break
                else:
                    data = data.replace( '\n' , '' )
                    if kdata == '':
                        kdata =  "[[" + data+"]"
                    else:
                        kdata =  kdata + ",[" + data + "]"
    kanjiDataF.close()

#    return render_template('kanjitest.html', kdata=kdata,mojinum=moji_num,setumei=setumei)
    return render_template('kanjitest.html', kdata=kdata,mojinum=moji_num,setumei=setumei)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)