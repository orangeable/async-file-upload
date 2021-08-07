$(document).ready(function() {

    // on form submit, upload file:
    $("form#upload").submit(function(event) {
        event.preventDefault();

        $.ajax({
            type: "POST",
            url: "upload.php",
            data: new FormData($(this)[0]),
            cache: false,
            contentType: false,
            processData: false,
            xhr: function() {
                var my_xhr = $.ajaxSettings.xhr();

                if (my_xhr.upload) {
                    my_xhr.upload.addEventListener("progress", function(event) {
                        Progress(event.loaded, event.total);
                    });
                }

                return my_xhr;
            },
            success: function() {
                $("div#alert").removeClass("red").addClass("green").text("Your file has been uploaded successfully!").show();
            },
            error: function(xhr, status, message) {
                $("div#alert").removeClass("green").addClass("red").text(xhr.status + " " + status + " - " + message).show();
            }
        });
    });

});

// progress bar:
function Progress(current, total) {
    var percent = ((current / total) * 100).toFixed(0) + "%";

    $("div#progress-outer").show();
    $("div#progress-inner").width(percent);
    $("div#progress-text").text(percent);

    if (percent == "100%") {
        Finished();
    }
}

// upload finished:
function Finished() {
    setTimeout(function() {
        $("form#upload input[type='file']").val("");
        $("div#progress-text").text("Upload Complete");

        setTimeout(function() {
            $("form#upload input[type='file']").val("");
            $("div#progress-outer").hide();
            $("div#progress-inner").width(0);
            $("div#progress-text").text("0%");
            $("div#alert").hide();
        }, 3000);
    }, 500);
}
