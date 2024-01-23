const hiddenSection = document.querySelectorAll('.hidden');

const isVisible = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if(entry.isIntersecting){
            console.log("show");
            entry.target.classList.add('show');
        } else {
            console.log("hide");
            entry.target.classList.remove('show');
        }
    })
})

hiddenSection.forEach((element) => isVisible.observe(element));