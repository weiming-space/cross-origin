function ajax(options){

    var xhr = null,
        method = options.method,
        data = options.data || '';

    method = method && method.toUpperCase() || 'GET';

    if(data){
        var resStr = '';
        for(var attr in data){
            resStr += ('&' + attr + '=' + data[attr]);
        }
        data = resStr.substring(1);
    }

    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    xhr.onreadystatechange = function(){

        if(xhr.readyState === 4 && xhr.status === 200){
            options.callback && options.callback(xhr.responseText);
        }
    }

    xhr.open(method, options.url, true);

    if(method === 'POST'){
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    xhr.send(data);
}
