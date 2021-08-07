<?php
    $file_count = sizeof($_FILES["file"]["name"]);

    for ($i = 0; $i < $file_count; $i++) {
        $file_name = $_FILES["file"]["name"][$i];
        $location = "upload/" . $file_name;

        if (move_uploaded_file($_FILES["file"]["tmp_name"][$i], $location)) {
            header("HTTP/1.1 200 OK");
        } else {
            header("HTTP/1.1 500 Internal Server Error");
        }
    }
?>
