
//calls init function
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
});

// Function to fetch artist names from server and populate dropdown
function loadArtists(artists) {
    $("#artists").empty();
    $("#artists").append(`<option value=""></option>`);
    for (let artist of artists) {
        $("#artists").append(`<option value = ${artist}>${artist}</option>`);
    }
}
;