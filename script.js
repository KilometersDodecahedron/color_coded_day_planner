$(document).ready(function(){
    //html elements
    var textAreaArray = $(".col-10");
    var saveButtons = $("button");
    var dateDisplayElement = $("#currentDay");

    //moment object
    var currentDateObject = moment();

    var savedNotesArray = [];
    var loadKeyString = "day-planner-data-for-h5-you-assholes";
    
    //show the current date and time
    $(dateDisplayElement).text(currentDateObject.format('dddd, MMMM Do, YYYY'));

    //set textarea background based on relative time
    $.each(textAreaArray, function(i, current){
        var hourValue = $(current).attr("id");
        //uses CSS to change the color
        if(hourValue > currentDateObject.hour()){
            $(current).addClass("future");
        }
        else if(hourValue < currentDateObject.hour()){
            $(current).addClass("past");
        }
        else
        {
            $(current).addClass("present");
        }
    })

    $.each(saveButtons, function(i, current){
        $(current).click(function(){
            var associatedTextArea = $(current).siblings("[id]")[0];

            savedNotesArray[i] = $(associatedTextArea).val();
            
            localStorage.setItem(loadKeyString, JSON.stringify(savedNotesArray));
        });
    });

    function loadAndSetData(){
        var loadedData = localStorage.getItem(loadKeyString);

        //if no saved data is found, create an empty array entry for each element
        if(loadedData == null){
            $.each(textAreaArray, function(){
                savedNotesArray.push("");
                localStorage.setItem(loadKeyString, JSON.stringify(savedNotesArray));
            });
        }
        else
        {
            loadedData = JSON.parse(loadedData);
            savedNotesArray = loadedData;
            $.each(textAreaArray, function(i, current){
                $(current).val(savedNotesArray[i]);
            });
        }
    }

    loadAndSetData();
});