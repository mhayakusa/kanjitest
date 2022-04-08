from flask import Flask, render_template, request
from matplotlib.pyplot import title
app = Flask(__name__)

@app.route('/')
def hello():
   return render_template('index.html')

@app.route('/getnext' ,methods=['GET','POST'])
def getnext():
    print("getnext です")
    return render_template('/kanjitest.html',mojinum=9)

@app.route('/kanjitest' ,methods=['GET','POST'])
def kanjitest():
    kdata =''
    
    kanjiDataF =  open('kanjiData_2022-04-04.txt','r',encoding='utf8')
    
    if request.method == "GET":
        st_moji_num = request.args.get("mojinum")
    else:
        st_moji_num = request.form.get("mojinum")
    
    if st_moji_num == None :
        moji_num = 1
    else:
        print("-GET -",st_moji_num,"--")
        moji_num = int(st_moji_num)
    
    name = "test"
    data_count = 0
    taisyouSW = False
    datalist = kanjiDataF.readlines()
    for data in datalist:
        if '--Start--' in data:
            if data_count + 1 == moji_num:
                taisyouSW = True
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

    #print(kdata)
    
    return render_template('kanjitest.html', kdata=kdata,mojinum=moji_num)
## おまじない
if __name__ == "__main__":
    print(__name__)
    app.run(debug=True)
    