// Welcome Message

window.onload = function() {
    console.log("CircuitHub Loaded Successfully");
};

// Buy Button

function buyProduct(productName) {
    alert(productName + " added to cart!");
}

// Search Function

function searchProducts() {

    let input =
    document.getElementById("search")
    .value.toUpperCase();

    let cards =
    document.getElementsByClassName("card");

    for(let i=0;i<cards.length;i++){

        let title =
        cards[i]
        .getElementsByTagName("h3")[0];

        if(title.innerHTML.toUpperCase()
        .indexOf(input)>-1){

            cards[i].style.display="block";
        }
        else{

            cards[i].style.display="none";
        }
    }
}