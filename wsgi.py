def app(env, start_response): #2つの引数を持つ関数
    status = '200 OK'
    response_headers = [('Content-type', 'text/plain; charset=utf-8')]
    start_response(status, response_headers) #ステータスコードとレスポンスヘッダをセット
    return [b'Hello World\n'] #バイト列を戻り値とする