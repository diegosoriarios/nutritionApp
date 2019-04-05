const myClarifaiApiKey = 'edcb560c7cb747088dedd52680f6b5e9'
const myWolframAppId = 'TU38RL-E25YQ2GJ7K'

const app = new Clarifai.App({apiKey: myClarifaiApiKey})

function predict_click(value, source) {
    let preview = $(".food-photo")
    let file = document.querySelector("input[type=file]").files[0]
    let loader  = "https://s3.amazonaws.com/static.mlh.io/icons/loading.svg"
    let reader = new FileReader()

    reader.addEventListener("load", function() {
        preview.attr('style', 'background-image: url("' + reader.result + '")')
        doPredict({base64: reader.result.split('base64,')[1]})
    }, false)

    if (file) {
        reader.readAsDataURL(file)
        $("#concepts").html('<img src="' + loader + '" class="loading" />')
    } else { alert("No File Selected!")}
}

function doPredict(value) {
    app.models.predict(Clarifai.FOOD_MODEL, value).then(function(response) {
        if(response.rawData.outputs[0].data.hasOwnProperty("concepts")) {
          var tag = response.rawData.outputs[0].data.concepts[0].name;
          var url = 'http://api.wolframalpha.com/v2/query?input='+tag+'%20nutrition%20facts&appid='+myWolframAppId;
  
          getNutritionalInfo(url, function (result) {
            $('#concepts').html('<h3>'+ tag + '</h3>' + "<img src='"+result+"'>");
          });
        }
      }, function(err) { console.log(err); }
    );
}