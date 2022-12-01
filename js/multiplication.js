/*
Full Name: Ali Rashid
Date Created: 11/30/2022
*/

// Enables two way binding and auto-submission of create_table function if the user changes the values and the form is valid
function sliders() {
    // Slider for the minimum column value
    $("#colMinSlider").slider({
        min: -50,
        max: 50,
        step: 1,
        value: 0,
        slide: function(event, ui) {
            $("#colMin").val(ui.value);
            if ($("#numberInputForm").valid() === true) {
                $("#numberInputForm").submit();
            }
        }
    });
    // // Binding the value of the slider to the input field
    var initialColMin = $("#colMinSlider").slider("option", "value");
    $("#colMin").val(initialColMin);
    $("#colMin").change(function() {
        var oldval = $("#colMinSlider").slider("option", "value");
        var newval = $(this).val();
        if (isNaN(newval)) {
            $("#colMin").val(oldval);
        }
        else {
            $("#colMinSlider").slider("option", "value", newval);
            if ($("#numberInputForm").valid() === true) {
                $("#numberInputForm").submit();
            }
        }
    });

    // Slider for the maximum column value
    $("#colMaxSlider").slider({
        min: -50,
        max: 50,
        step: 1,
        value: 0,
        slide: function(event, ui) {
            $("#colMax").val(ui.value);
            if ($("#numberInputForm").valid() === true) {
                $("#numberInputForm").submit();
            }
        }
    });
    // // Binding the value of the slider to the input field
    var initialColMax = $("#colMaxSlider").slider("option", "value");
    $("#colMax").val(initialColMax);
    $("#colMax").change(function() {
        var oldval = $("#colMaxSlider").slider("option", "value");
        var newval = $(this).val();
        if (isNaN(newval)) {
            $("#colMax").val(oldval);
        }
        else {
            $("#colMaxSlider").slider("option", "value", newval);
            if ($("#numberInputForm").valid() === true) {
                $("#numberInputForm").submit();
            }
        }
    });

    // Slider for the minimum row value
    $("#rowMinSlider").slider({
        min: -50,
        max: 50,
        step: 1,
        value: 0,
        slide: function(event, ui) {
            $("#rowMin").val(ui.value);
            if ($("#numberInputForm").valid() === true) {
                $("#numberInputForm").submit();
            }
        }
    });
    // // Binding the value of the slider to the input field
    var initialRowMin = $("#rowMinSlider").slider("option", "value");
    $("#rowMin").val(initialRowMin);
    $("#rowMin").change(function() {
        var oldval = $("#rowMinSlider").slider("option", "value");
        var newval = $(this).val();
        if (isNaN(newval)) {
            $("#rowMin").val(oldval);
        }
        else {
            $("#rowMinSlider").slider("option", "value", newval);
            if ($("#numberInputForm").valid() === true) {
                $("#numberInputForm").submit();
            }
        }
    });

    // Slider for the maximum row value
    $("#rowMaxSlider").slider({
        min: -50,
        max: 50,
        step: 1,
        value: 0,
        slide: function(event, ui) {
            $("#rowMax").val(ui.value);
            if ($("#numberInputForm").valid() === true) {
                $("#numberInputForm").submit();
            }
        }
    });
    // // Binding the value of the slider to the input field
    var initialRowMax = $("#rowMaxSlider").slider("option", "value");
    $("#rowMax").val(initialRowMax);
    $("#rowMax").change(function() {
        var oldval = $("#rowMaxSlider").slider("option", "value");
        var newval = $(this).val();
        if (isNaN(newval)) {
            $("#rowMax").val(oldval);
        }
        else {
            $("#rowMaxSlider").slider("option", "value", newval);
            if ($("#numberInputForm").valid() === true) {
                $("#numberInputForm").submit();
            }
        }
    });
}

function validate() {
    // Sets the validation rules for the input fields
    $("#numberInputForm").validate({
        rules: {
            colMin: {
                required: true,
                number: true,
                range: [-50, 50],
            },
            colMax: {
                required: true,
                number: true,
                min: () => parseInt($("#colMin").val()), // Arrow function makes sure the min value is current
                max: 50,
            },
            rowMin: {
                required: true,
                number: true,
                range: [-50, 50],
            },
            rowMax: {
                required: true,
                number: true,
                min: () => parseInt($("#rowMin").val()), // Arrow function makes sure the min value is current
                max: 50,
            },
        },
        messages: {
            colMin: {
                required: "Please enter a value",
                number: "Please enter a valid number",
                range: "Please enter a value between -50 and 50",
            },
            colMax: {
                required: "Please enter a value",
                number: "Please enter a valid number",
                min: "Please enter a value greater than or equal to the minimum column value",
                max: "Please enter a value less than or equal to 50",
            },
            rowMin: {
                required: "Please enter a value",
                number: "Please enter a valid number",
                range: "Please enter a value between -50 and 50",
            },
            rowMax: {
                required: "Please enter a value",
                number: "Please enter a valid number",
                min: "Please enter a value greater than or equal to the minimum row value",
                max: "Please enter a value less than or equal to 50",
            },
        },
        // If the form is valid, the create_table function is called
        submitHandler: function() {
            console.log("clicked");
            create_table();
            // tableArchiveFunction()

            return false;
        },
    })

    // Saves the table to the archive
    $("#submit").click(function() {
        if ($("#numberInputForm").valid() === true) {
            tableArchiveFunction();
        }
    });


}



// Main function. Takes two valid inputs and creates a multiplication table. Throws an error if the inputs are invalid.
create_table = function() {

    // Resets the table to prevent more than one table from being created
    var mainTable = document.querySelector(".main-table-container");
    mainTable.innerHTML = "";

    // Gets the input from the user
    var cStartValue = parseInt(document.getElementById("colMin").value)
    var cEndValue = parseInt(document.getElementById("colMax").value)
    var rStartValue = parseInt(document.getElementById("rowMin").value)
    var rEndValue = parseInt(document.getElementById("rowMax").value)


    // Puts them in array so I can use one variable
    var vals = [cStartValue, cEndValue, rStartValue, rEndValue]

    // Gets the minimum and maximum values for the columns and rows
    var minColValue = Math.min(vals[0], vals[1])
    var maxColValue = Math.max(vals[0], vals[1])
    var minRowValue = Math.min(vals[2], vals[3])
    var maxRowValue = Math.max(vals[2], vals[3])


    // Creates the actual result table w/o the headers
    var newTable = document.createElement("table")
    newTable.classList.toggle("hidden-table")
    // newTable.setAttribute("id", "newTable")
    var newTbody = document.createElement("tbody")
    for (var i = minRowValue; i <= maxRowValue; i++) {
        var tr = document.createElement("tr");
        for (var j = minColValue; j <= maxColValue; j++) {
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(parseInt(i) * parseInt(j)));
            tr.appendChild(td);
        }
        newTbody.appendChild(tr);
    }

    // Creates the top header row and appends it to the table in proper place
    var hRow = document.createElement("tr");
    hRow.appendChild(document.createElement("td"))
    for (var i = minColValue; i <= maxColValue; i++) {
        var th = document.createElement("th");
        th.appendChild(document.createTextNode(i));
        hRow.appendChild(th);
    }
    newTbody.insertBefore(hRow, newTbody.firstChild)
    newTable.appendChild(newTbody);
    mainTable.appendChild(newTable)

    // Creates the left header column and appends it to the table in proper place
    var rowsToAppend = document.querySelectorAll(".main-table-container tr")
    var rowValueToAdd = rStartValue
    for (var i = 1; i < rowsToAppend.length; i++) {
        rowsToAppend[i].innerHTML = `<th>${rowValueToAdd}</th>` + rowsToAppend[i].innerHTML
        rowValueToAdd++
    }

    console.log('table created');
    // return false;
}

// Global variables for the archive (tab) function
var tabCount = 1
var savedTables = []

function tabs() {
    var tabs = $("#tabs").tabs();

    // For removing tabs, comes directly from the jQuery UI docs
    tabs.delegate("span.ui-icon-close", "click", function () {
        var panelId = $(this).closest("li").remove().attr("aria-controls");
        $("#" + panelId).remove();
        tabs.tabs("refresh");
    });

    // This function clears all archived tabs
    $("#clear").on("click", function() {
        if ($("#tab-list").children().length > 1) {
            // Gets the relevant li nodes and removes them similar to above but for all of them not just one
            var myL = $("#tab-list").children()
            myL = myL.slice(1, myL.length+1)
            var [...tail] = myL
            tail.forEach((x)=> {
                x.remove("aria-controls");
            });
            // Gets the relevant div nodes and removes them similar to above but for all of them not just one
            var myT = $("#tabs").children()
            myT = myT.slice(2, myT.length+1)
            var [...tail2] = myT
            tail2.forEach((x)=> {
                x.remove();
            });
            // Refreshes the tabs and resets the global variables
            $("#tabs").tabs("refresh");
            tabCount = 1
            savedTables = []
        }
    })

}

function tableArchiveFunction() {

    tabCount++
    savedTables.push(document.querySelector(".main-table-container").innerHTML);
    console.log(savedTables);

    // Creates the tab and appends it to the tab list
    $( "div#tabs ul" ).append(`<li><a href="#tab-${tabCount}">Table ${tabCount-1}</a><span class="ui-icon ui-icon-close" role="presentation">Remove Tab</span></li>`);


    // Add the current multiplication table.
    $("div#tabs").append(`<div id="tab-${tabCount}">${savedTables[savedTables.length - 1]}</div>`)


    // Refreshes the tabs
    $("#tabs").tabs("refresh");

    // Makes the new tab the active one
    $("#tabs").tabs("option", "active", -1);

}

