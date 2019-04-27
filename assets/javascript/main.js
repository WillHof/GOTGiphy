$(document).ready(function () {
    var arr = ["Cersei", "Tyrion", "Theon", "Reek", "Joffrey", "Night Watch", "White Walkers", "The Hound", "You know nothing, Jon Snow", "I drink and I know things"]
    //which gif to populate in the queryurl
    var gifLoad = "Cersei"
    var apiKey = "HC1P3s78INLVXHZtQxncPG0wuoH7zkCJ"
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${gifLoad}&api_key=${apiKey}&limit=15`
    // var idURL = `https://api.giphy.com/v1/randomid/api_key=${apiKey}`
    //add the gif buttons from 'arr', if the entry form is empty then itll repopulate with 'arr', else it will push the value into the array
    function addGIFButtons() {
        $("#buttons").empty();
        if ($("#inputGIF").val() === "") {
            for (i = 0; i < arr.length; i++) {
                var currButton = `<button type="submit" class="btn btn-success mb-2" value="${arr[i]}">${arr[i]}</button>`;
                $("#buttons").append(currButton);
            }
        } else {
            arr.push($("#inputGIF").val())
            for (i = 0; i < arr.length; i++) {
                var currButton = `<button type="submit" class="btn btn-success mb-2" value="${arr[i]}">${arr[i]}</button>`;
                $("#buttons").append(currButton);
            }
        }
    }

    //load stills of gifLoad variable
    function loadGIFS(response) {
        $("#GIFS").empty();
        for (i = 0; i < response.data.length; i++) {
            var currGIF = `<img class="gifImage" id="${response.data[i].id}" src=${response.data[i].images.fixed_width_still.url}>`;
            $("#GIFS").append(currGIF);
        }
    }

    //document listener for toggling gif states
    $(document).on("click", ".gifImage", function () {
        if ($(this).attr("src").search("200w_s") !== -1) {

            $(this).attr("src", `https://media1.giphy.com/media/${$(this).attr("id")}/giphy.gif`)
        }
        else {
            $(this).attr("src", `https://media1.giphy.com/media/${$(this).attr("id")}/200w_s.gif`)
        }
    })

    //loads gif stills of button when button is clicked
    $(document).on("click", ".btn-success", function () {
        gifLoad = $(this).val()
        queryURL = `https://api.giphy.com/v1/gifs/search?q=${gifLoad}&api_key=${apiKey}&limit=15`
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            loadGIFS(response);
        })
    })
    //initial load of gifs, cersei to start
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        loadGIFS(response);
    })

    addGIFButtons()

    //adds a new gif button when the add button is clicked
    $("#add").on("click", addGIFButtons)

});
