var timer;

$("#searchBox").keydown((event)=>{
    clearTimeout(timer);
    var textbox = $(event.target)
    console.log(event.target+" this is event.target")
    var value = textbox.val()
//    var value = document.getElementById('searchBox').value
    var searchType = textbox.data().search

timer = setTimeout(() => {
    value = textbox.val().trim()
    if(value = null){
        $(".resultsContainer").html("hello");
    }
    else{
        console.log(value)
    }
}, 1000);

})