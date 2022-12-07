//Dark Mode Implementation
document.getElementById("moon").addEventListener("click",()=>{
    document.documentElement.style.setProperty("--mainBackgroundColor","#404040");
    document.documentElement.style.setProperty("--blackColor","#ffffff")
    document.documentElement.style.setProperty("--leftPanelColor","#737373")
    document.documentElement.style.setProperty("--rightPanelTopColor","#737373")
    document.documentElement.style.setProperty("--rightPanelBottomColor","#595959")
    document.documentElement.style.setProperty("--whiteColor","#666666")
    document.documentElement.style.setProperty("--itemRessourcesColor","white")
    document.documentElement.style.setProperty("--teacherRessourcesColor","white")

});



//Light Mode Implementation
document.getElementById("sun").addEventListener("click",()=>{
    document.documentElement.style.setProperty("--mainBackgroundColor","#E6E6E6");
    document.documentElement.style.setProperty("--blackColor","#000000")
    document.documentElement.style.setProperty("--leftPanelColor","#84A98C")
    document.documentElement.style.setProperty("--rightPanelTopColor","#CAD2C5")
    document.documentElement.style.setProperty("--rightPanelBottomColor","#52796F")
    document.documentElement.style.setProperty("--whiteColor","white")
    document.documentElement.style.setProperty("--itemRessourcesColor","#0072a8")
    document.documentElement.style.setProperty("--teacherRessourcesColor","black")
});