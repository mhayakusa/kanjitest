from flask import Flask, render_template, request
app = Flask(__name__)

@app.route('/')
def main():
   return render_template('index.html')

@app.route('/getnext' ,methods=['GET','POST'])
def getnext():
    return render_template('/kanjitest.html',mojinum=9)

@app.route('/kanjitest' ,methods=['GET','POST'])
def kanjitest():
    kdata =''
    
    if request.method == "GET":
        st_moji_num = request.args.get("mojinum")
    else:
        st_moji_num = request.form.get("mojinum")
    
    if st_moji_num == None :
        moji_num = 1
    else:
        moji_num = int(st_moji_num)
    
    name = "test"
    data_count = 0
    taisyouSW = False
    
    return render_template('kanjitest.html', kdata=kdata,mojinum=moji_num)


if __name__ == "__main__":
    app.run()
    