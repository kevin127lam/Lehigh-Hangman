$(() => {
    $.ajax(
        "/artists",
        {
            type: "GET",
            dataType: "json",
            success: function (data) {
                loadArtists(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error: " + jqXHR.responseText);
                alert("Error: " + textStatus);
                alert("Error: " + errorThrown);
            }
        }
    );
    $("#search").click(function () {
        //arguments
        let artist = $("#artists").val();
        let keyword = $("#keyword").val();
        let displayPerPage = $("#display").val();
        let pageNum = 1;

        // Log the query parameters to the console for error checking
        console.log("Artist:", artist);
        console.log("Keyword:", keyword);
        console.log("Display Per Page:", displayPerPage);

        //sets page num to default
        $("#page-num").text(pageNum);
        fetchSongs(artist, keyword, displayPerPage, pageNum);
    });

    //functions to handle previous and next button click
    $("#prev").click(function () {
        let artist = $("#artists").val();
        let keyword = $("#keyword").val();
        let displayPerPage = $("#display").val();
        let pageNum = parseInt($("#page-num").text()) - 1;
        fetchSongs(artist, keyword, displayPerPage, pageNum);
        //updates page num accordingly
        $("#page-num").text(pageNum);
    });

    $("#next").click(function () {
        let artist = $("#artists").val();
        let keyword = $("#keyword").val();
        let displayPerPage = $("#display").val();
        let pageNum = parseInt($("#page-num").text()) + 1;
        fetchSongs(artist, keyword, displayPerPage, pageNum);
        $("#page-num").text(pageNum);
    });
});

// get the songs based on params
function fetchSongs(artist, keyword, displayPerPage, pageNum) {
    $.ajax({
        url: "/songs",
        type: "GET",
        dataType: "json",
        data: {
            artist: artist,
            keyword: keyword,
            displayPerPage: displayPerPage,
            pageNum: pageNum
        },
        success: function (data) {
            displaySongs(data);
            $("#page-num").text(pageNum);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error: " + errorThrown);
        }
    });
}

//print songs and values onto the table
function displaySongs(data) {
    $("#songs").empty();
    let songs = data.songs;
    for (let song of songs) {
        if (song.numone > 0) {
            $("#songs").append(`<tr class = "number-one"><td>${song.id}</td><td>${song.title}</td><td>${song.artist}</td></tr>`);
        }
        else {
            $("#songs").append(`<tr><td>${song.id}<td>${song.title}</td><td>${song.artist}</td></tr>`);
        }
    }

    // Show/hide prev/next buttons based on current page

    // Show/hide prev/next buttons based on current page
    const currentPage = parseInt($("#page-num").text());
    console.log("Current page", currentPage);
    if (currentPage === 1) {
        $("#prev").prop("disabled", true);
    } else {
        $("#prev").prop("disabled", false);
    }
}

// Function to fetch artist names from server and populate dropdown
function loadArtists(artists) {
    $("#artists").empty();
    $("#artists").append(`<option value=""></option>`);
    for (let artist of artists) {
        $("#artists").append(`<option value = "${artist}">${artist}</option>`);
    }
}

