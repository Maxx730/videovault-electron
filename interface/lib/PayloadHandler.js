function PayloadHandler() {
    var context = this;

    //Credentials for using the YouTube API
    this.API_KEY = 'AIzaSyAxxCiaJEUJamJuBtKirKf3Ow6SXsGqSOc'
    this.YOUTUBE_CLIENT_ID = '939989389020-8qdu0prgearkgcq7lunhon9icplm79ob.apps.googleusercontent.com'
    this.YOUTUBE_SECRET = 'BGC9L13vyPF0xsWeabt118tZ'

    this.items = new Array();

    this.searchField = document.getElementById("youtubeSearchTerm");
    this.searchButton = document.getElementById("youtubeSearchButton")

    this.searchButton.addEventListener("click",function(){
        context.searchButton.setAttribute("disabled",true)
        console.log("SEARCHING YOUTUBE: "+context.searchField.value)
        context.searchRequest(context.searchField.value,function(response){
            window.resultHandler.renderSearchResults(JSON.parse(response).items);
            context.searchButton.removeAttribute("disabled")
        })
    })
}

PayloadHandler.prototype.searchRequest = function(query,callback) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           callback(xhttp.responseText)
        }
    };

    xhttp.open("GET", "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&type=video&q="+query+"&key=AIzaSyAxxCiaJEUJamJuBtKirKf3Ow6SXsGqSOc", true);
    xhttp.send();
}