window.addEventListener('load', function() {
    var topics = ["hamburgers", "whales", "8-bit", "animation", "memes", "cake", "saxaphone", "music", "falcon", "spongebob", "the office", "old spice", "superbowl", "rocky"]

    //Create buttons for preset topics

    var btnContainer = $("#topic-buttons");
    var gifHolder = $("#gif-holder");

    for (topic in topics) {
        var btnTopic = $("<div class='button-topic'>");
        btnTopic.text(topics[topic]);
        btnTopic.attr("data-value", topics[topic]);

        btnContainer.append(btnTopic);
    }


    //Make ajax call on topic button click

    $(".button-topic").on('click', function() {
        var tempTopic = $(this).data("value");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + tempTopic + "&api_key=0abc950e61194a8792b03c90afa6fa7d&limit=10";

        //Clear preexisting gifs
        gifHolder.empty();

        //Simple AJAX Call
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(res, err) {
                var r = res.data;

                for (a in r) {
                    var static = r[a].images.fixed_height_still.url;
                    var animated = r[a].images.fixed_height.url;
                    var rating = r[a].rating;

                    var imgDiv = $("<div class='gif-img'>");
                    var ratingP = $("<p>");
                    ratingP.text("Rating: " + rating);
                    var img = $("<img>").attr({ "src": static, "data-static": static, "data-animate": animated, "data-state": "static" });
                    imgDiv.append(ratingP, img);
                    gifHolder.append(imgDiv);
                }
            })
    });

    //Toggle Src on click
    $(document).on('click', '.gif-img', function() {
        //Get Data Attrs
        var img = $(this).children("img");
        var staticUrl = img.data("static");
        var animatedUrl = img.data("animate");
        var state = img.data("state");

        if (state === "static") {
            img.attr("src", animatedUrl);
            img.data("state", "animate");
        }
        if (state === "animate") {
            img.attr("src", staticUrl);
            img.data("state", "static");
        }
    });

    //Toggle Add
    $(document).on('click','#topic-form',function(){
    	$(this).toggleClass("trigger");
    });


}, false)