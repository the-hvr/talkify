//alert message
const createAC = document.querySelector(".accout");
createAC.addEventListener("click", () => {
    alert("⚠️ Talkify is still in its developing phase. The “Create Account” feature will be available soon. Stay tuned!");
});


//image slider
const sliderCard = document.querySelectorAll(".img");

sliderCard.forEach((post) => {
    const leftbtn = post.querySelector(".left");
    const rightbtn =post.querySelector(".right");
    const slider = post.querySelector(".slider");
    const images  = post.querySelectorAll(".slider img");

    let sliderNum = 1;
    let length = images.length;
    let slideWidth = images[0].clientWidth;

    const nextSlide = () => {
        slider.style.transform = `translateX(-${sliderNum*slideWidth}px)`;
        sliderNum++ ;
    }

    const prevSlide = () => {
        slider.style.transform = `translateX(-${(sliderNum-2)*slideWidth}px)`;
        sliderNum-- ;
    }

    const getFirstslide = () => {
        slider.style.transform = `translateX(0px)`;
        sliderNum = 1;
    }

    const getLastslide = () => {
        slider.style.transform = `translateX(-${(length-1)*slideWidth}px )`;
        sliderNum = length;
    }

    rightbtn.addEventListener("click", () => {
        if(sliderNum < length ){
            nextSlide();
        } else {
            getFirstslide();
        }
    });

    leftbtn.addEventListener("click", () => {
        if(sliderNum > 1){
            prevSlide();
        } else {
            getLastslide();
        }
    });
});



//likes count
const hearts = document.querySelectorAll(".like i");
const likes = document.querySelectorAll(".like span");

hearts.forEach((heart, idx) => {
    heart.addEventListener("click", () => {
        heart.classList.toggle("active");
        
        let count = parseInt(likes[idx].innerText);
        if(heart.classList.contains("active")){
            likes[idx].innerText = count + 1;
        } else {
            likes[idx].innerText = count - 1;
        }
    })
});




//form select image preview
const fileInput = document.querySelector("#images");
const imgBox = document.querySelector(".img-box");

if (fileInput) {
    fileInput.addEventListener("change", () => {
    imgBox.innerHTML = "";

    const files = fileInput.files;
    if(files.length === 0) return;

    if(files.length === 1){
        const imgURL = URL.createObjectURL(files[0]);  //Converts image file into a previewable/temporary link
        imgBox.style.backgroundImage = `url('${imgURL}')`;
        imgBox.style.backgroundSize = "cover";
        imgBox.style.backgroundPosition = "center";
        return;
    }

    imgBox.style.backgroundImage = "none";
    imgBox.style.display = "flex";
    imgBox.style.flexWrap = "wrap";
    imgBox.style.justifyContent = "center";
    imgBox.style.alignItems = "center";
    imgBox.style.overflowY = "auto";

    [...files].forEach(file => {
        const imgURL = URL.createObjectURL(file);
        const smallImg = document.createElement("img");
        smallImg.src = imgURL;
        smallImg.style.width = "150px";
        smallImg.style.height = "120px";
        smallImg.style.objectFit = "cover";
        smallImg.style.margin = "8px";
        smallImg.style.borderRadius = "12px";

        imgBox.appendChild(smallImg);
    });
});
}





//reset btn functionality
const resetBtn = document.querySelector(".clear");

if (resetBtn) {
    resetBtn.addEventListener("click", () => {
    fileInput.value = "";
    imgBox.innerHTML = "";
    imgBox.style.backgroundImage = "url('/images/sprout-home-prod-topper.jpg')"; 
    imgBox.style.display = "block";
    });
}




//go to top 
const topBtn = document.querySelector(".box1 button");
topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
})