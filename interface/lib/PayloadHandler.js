function PayloadHandler() {
    var context = this;

    //Credentials for using the YouTube API
    this.API_KEY = 'AIzaSyAxxCiaJEUJamJuBtKirKf3Ow6SXsGqSOc'
    this.YOUTUBE_CLIENT_ID = '939989389020-8qdu0prgearkgcq7lunhon9icplm79ob.apps.googleusercontent.com'
    this.YOUTUBE_SECRET = 'BGC9L13vyPF0xsWeabt118tZ'

    this.items = new Array();

    this.searchField = document.getElementById("youtubeSearchTerm")
    this.searchButton = document.getElementById("youtubeSearchButton")
    this.resultList = document.getElementById("searchResultList")
    this.loadingAnimation = document.createElement('DIV')
    this.loadingAnimation.classList.add('spinner-grow')
    this.loadingAnimation.setAttribute('role','status')
    this.loadingSpan = document.createElement('SPAN')
    this.loadingSpan.classList.add('sr-only')
    this.loadingSpan.appendChild(document.createTextNode('Loading...'))
    this.loadingAnimation.appendChild(this.loadingSpan)

    this.searchButton.addEventListener("click",function(){
        context.searchButton.setAttribute("disabled",true)
        context.resultList.innerHTML = ''
        context.resultList.appendChild(context.loadingAnimation)
        context.searchField.setAttribute('disabled',true)

        context.searchRequest(context.searchField.value,function(response){
            context.renderSearchResults(JSON.parse(response).items);
            context.searchButton.removeAttribute("disabled")
            context.searchField.value = ''
            context.searchField.removeAttribute('disabled')
        })
    })

    context.resultList.innerHTML = ''
    context.resultList.appendChild(context.loadingAnimation)

    //For testing during development we just want to auto load some data.
    context.searchRequest("deagle nation",function(response){
        context.renderSearchResults(JSON.parse(response).items);
    })
}

//Sends a query based on the search value to the YouTube API
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

PayloadHandler.prototype.renderSearchResults = function(results) {
    var list = document.createElement('UL')
    list.classList.add('list-group')

    for(var i = 0;i < results.length;i++) {
        var item = document.createElement('LI')
        item.classList.add('list-group-item')
        item.setAttribute('data',JSON.stringify(results[i]))
        item.addEventListener('click',function() {
            window.contentHandler.addTab(this.getAttribute('data'))
        })

        var text = document.createElement('SPAN')
        text.classList.add('result-text')
        text.appendChild(document.createTextNode(results[i].snippet.title))
        item.appendChild(text)

        var icons = document.createElement('SPAN')
        icons.classList.add('resultIcons')

        //Create icons here.
        var playIcon = document.createElement('I')
        playIcon.classList.add('material-icons')
        playIcon.appendChild(document.createTextNode('play_circle_filled'))
        icons.appendChild(playIcon)

        var favorite = document.createElement('I')
        favorite.classList.add('material-icons')
        favorite.appendChild(document.createTextNode('favorite'))
        icons.appendChild(favorite)

        item.appendChild(icons)
        list.appendChild(item)
    }

    this.resultList.removeChild(this.loadingAnimation)
    this.resultList.appendChild(list)
}