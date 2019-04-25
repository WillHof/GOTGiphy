$(document).ready(function () {
    var arr = ["Cersei", "Tyrion", "Theon", "Reek", "Joffrey", "Night Watch", "White Walkers", "The Hound", "You know nothing, Jon Snow", "I drink and I know things"]
    //which gif to populate in the queryurl
    var gifLoad = "Cersei"
    var apiKey = "HC1P3s78INLVXHZtQxncPG0wuoH7zkCJ"
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${gifLoad}&api_key=${apiKey}&limit=15`

    //function to add the gif buttons from the array, if the entry form is empty then itll repopulate with the current array, else it will push the value into the array
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
    //document listener for toggling gif states, i think this is pretty inelegant
    $(document).on("click", ".gifImage", function () {
        console.log(this)
        if ($(this).attr("src") === `https://media2.giphy.com/media/${$(this).attr("id")}/200w_s.gif`) {

            $(this).attr("src", `https://media2.giphy.com/media/${$(this).attr("id")}/200w.gif`)
            console.log($(this).attr("src"))
        }
        else {
            $(this).attr("src", `https://media2.giphy.com/media/${$(this).attr("id")}/200w_s.gif`)
            console.log($(this).attr("src"))
        }
    })

    //load stills of new button when button is clicked
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

    //why does $("#add").on("click", addGIFButtons()) not work
    $("#add").on("click", function () {
        addGIFButtons()
    })

});
