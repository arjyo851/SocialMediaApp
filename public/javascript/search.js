var timer;
$("#searchBox").keydown((event)=>{
    clearTimeout(timer);
    var textbox = $(event.target)
    // console.log(event.target.value+" this is event.target.value")
    var value = textbox.val()
//    var value = document.getElementById('searchBox').value
    var searchType = textbox.data().search

timer = setTimeout(() => {
    value = textbox.val().trim()
    console.log(value)
    if(value == null){
        $(".resultsContainer").html("hello");
    }
    else{
search(value,searchType)
    }
}, 500);

})

function search(searchvalue,searchType){
    var url = searchType == "users"?"/api/users":"/api/posts"
    $.get(url,{search:searchvalue},(results)=>{
        console.log(results)
    })

}

// function change_color(url){
//     console.log(url)
//     if(url == "posts"){
//         document.querySelector("#posts").classList.add('active')
//         document.querySelector("#users").classList.remove('active')
//     }
//     else{
//         console.log("reaches here")
//         document.querySelector("#users").classList.add('active')
//         document.querySelector("#posts").classList.remove('active')

//     }
// }

// document.querySelector("#posts").addEventListener("click",(event)=>{
// event.preventDefault()
// document.querySelector("#posts").classList.add('active')
//         document.querySelector("#users").classList.remove('active')
// })

// document.querySelector("#users").addEventListener("click",(event)=>{
//     event.preventDefault()
//     document.querySelector("#users").classList.add('active')
//             document.querySelector("#posts").classList.remove('active')
//     })