//Dark Mode Implementation
document.getElementById("moon").addEventListener("click",()=>{
    document.documentElement.style.setProperty("--myCourseHeaderColor","white");
    document.documentElement.style.setProperty("--courseCardBorderColor","#8c8c8c")
    document.documentElement.style.setProperty("--courseCardBackgroundColor","#s")
    document.documentElement.style.setProperty("--courseCardTextColor","white")
    document.documentElement.style.setProperty("--courseCardNameBackgroundColor","#404040")

});



//Light Mode Implementation
document.getElementById("sun").addEventListener("click",()=>{
    document.documentElement.style.setProperty("--myCourseHeaderColor","black");
    document.documentElement.style.setProperty("--courseCardBorderColor","#84A98C")
    document.documentElement.style.setProperty("--courseCardBackgroundColor","#D9D9D9")
    document.documentElement.style.setProperty("--courseCardTextColor","black")
    document.documentElement.style.setProperty("--courseCardNameBackgroundColor","#52796F")
});