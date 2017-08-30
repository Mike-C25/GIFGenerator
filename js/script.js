window.addEventListener('load', function() {
    var topics = ["hamburgers", "whales", "8-bit", "animation", "memes", "cake", "saxaphone", "music", "falcon", "spongebob", "the office", "old spice", "superbowl"]

    //Create buttons for preset topics

    var btnContainer = $("#topic-buttons");
    var gifHolder = $("#gif-holder");

    for (topic in topics) {
        var btnTopic = $("<div class='button-topic'>");
        btnTopic.text(topics[topic]);
        btnTopic.attr("data-value", topics[topic]);

        btnContainer.append(btnTopic);
    }


    //make ajax call

    $(".button-topic").on('click', function() {
        var tempTopic = $(this).data("value");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + tempTopic + "&api_key=0abc950e61194a8792b03c90afa6fa7d&limit=10";
        gifHolder.empty();
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
                    var img = $("<img>").attr({"src": static,"data-static": static, "data-animate": animated});
               		imgDiv.append(ratingP,img);
               		gifHolder.append(imgDiv);
                }




            })


    })




}, false)