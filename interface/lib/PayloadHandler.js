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
    console.log(results)
    var list = document.createElement('DIV')
    list.classList.add('list-group')

    for(var i = 0;i < results.length;i++) {

        var link = document.createElement('A')
        link.href = '#'
        link.classList.add('list-group-item')
        link.classList.add('list-group-item-action')

        var content = document.createElement('DIV')
        content.className = 'd-flex w-100 justify-content-between'

        var title = document.createElement('H5')
        title.classList.add('mb-1')
        title.innerText = results[i].snippet.title

        var small = document.createElement('SMALL')
        small.innerText = results[i].snippet.channelTitle

        var desc = document.createElement('P')
        desc.classList.add('mb-1')
        desc.innerText = results[i].snippet.description

        var date = document.createElement('SMALL')
        date.innerText = 'Published: ' + (new Date(results[i].snippet.publishedAt).getMonth() + 1) + '/' + new Date(results[i].snippet.publishedAt).getDate() + '/' +new Date(results[i].snippet.publishedAt).getFullYear()
        
        var thumb = document.createElement('IMG')
        thumb.src = results[i].snippet.thumbnails.high.url
        thumb.classList = 'resultThumb'

        content.appendChild(title)
        content.appendChild(small)
        link.appendChild(content)
        link.appendChild(thumb)
        link.appendChild(desc)
        link.appendChild(date)
        list.appendChild(link)
    }

    this.resultList.removeChild(this.loadingAnimation)
    this.resultList.appendChild(list)
}