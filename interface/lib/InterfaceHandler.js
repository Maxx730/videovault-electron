function InterfaceHandler() {

    this.content = document.getElementById("scrollable-video-content")

    this.content.addEventListener("scroll",function(event){
        if(event.target.scrollTop > 80){
            console.log("MAKING TOP MENU FIXED")
        }else{
            console.log("MAKING TOP MENU FLEX")
        }
    })
}