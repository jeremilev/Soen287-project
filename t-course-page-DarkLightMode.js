//Dark Mode Implementation
document.getElementById("moon").addEventListener("click",()=>{
    document.documentElement.style.setProperty("--courseCardBackgroundColor","#595959");
    document.documentElement.style.setProperty("--cardWeekTextColor","white")
    document.documentElement.style.setProperty("--courseNameColor","white")
    document.documentElement.style.setProperty("--breadCrumbTextColor","#3399ff")
    document.documentElement.style.setProperty("--overlayPanelBackground","rgb(2,0,36)")
    document.documentElement.style.setProperty("--overlayPanelBackground2","linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,121,95,1) 100%, rgba(61,217,210,1) 100%, rgba(0,212,255,1) 100%)")
    

});



//Light Mode Implementation
document.getElementById("sun").addEventListener("click",()=>{
    document.documentElement.style.setProperty("--courseCardBackgroundColor","white");
    document.documentElement.style.setProperty("--cardWeekTextColor","black")
    document.documentElement.style.setProperty("--courseNameColor","black")
    document.documentElement.style.setProperty("--breadCrumbTextColor","#0072a8")
    document.documentElement.style.setProperty("--overlayPanelBackground","rgb(2,0,36)")
    document.documentElement.style.setProperty("--overlayPanelBackground2","linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(31,24,138,1) 0%, rgba(116,157,103,1) 0%, rgba(57,153,149,1) 0%, rgba(225,232,191,1) 100%, rgba(0,212,255,1) 100%)")
    
});