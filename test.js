var fs = require("fs");
var request = require("request");

var options = {
    method: 'POST',
    url: 'https://hmg-zuul.monkeyecx.com/v1/buyers/543581803/buyer-tax-file',
    headers:
    {
        'cache-control': 'no-cache',
        Authorization: 'Bearer e8ebfa6e-f4f5-4a01-a2da-2f2296e9a84b',
        'Content-Type': 'application/x-www-form-urlencoded',
        program: 'FIAT'
    },
    formData:
    {
        file:
        {
            value: fs.createReadStream("C:\\Users\\leand\\Documents\\Planilha de Horas 1.xlsx"),
            options:
            {
                filename: 'C:\\Users\\leand\\Documents\\Planilha de Horas 1.xlsx',
                contentType: null
            }
        }
    }
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(response);
});
