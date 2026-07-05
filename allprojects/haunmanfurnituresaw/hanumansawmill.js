function askBot(){

    let input = document
        .getElementById("userInput")
        .value
        .toLowerCase();

    let reply = "";

    if(input.includes("door")){
        reply = "For doors, we recommend Sal Wood.";
    }
    else if(input.includes("window")){
        reply = "For windows, Teak Wood is a great option.";
    }

    else if(input.includes("bed")){
        reply = "For beds, use strong hardwood like Sheesham.";
    }

    else if(input.includes("table")){
        reply = "For tables, Teak or Sheesham wood works best.";
    }

    else{
        reply = "Please contact us on WhatsApp for a custom recommendation.";
    }

    document.getElementById("botReply").innerText = reply;
}

function recommendWood(){

    let product =
    document.getElementById("product")
    .value
    .toLowerCase();

    let length =
    Number(document.getElementById("length").value);

    let width =
    Number(document.getElementById("width").value);

    let area = length * width;

    let wood = "";
    let price = 0;

    if(product.includes("door")){
        wood = "Sal Wood";
        price = area * 350;
    }

    else if(product.includes("window")){
        wood = "Teak Wood";
        price = area * 400;
    }

    else if(product.includes("bed")){
        wood = "Sheesham Wood";
        price = area * 550;
    }

    else if(product.includes("table")){
        wood = "Premium Teak Wood";
        price = area * 500;
    }

    else{
        wood = "Custom Recommendation";
        price = area * 300;
    }

    document.getElementById("result").innerHTML = `
        <h3>Recommended Product</h3>
        <p><strong>Wood:</strong> ${wood}</p>
        <p><strong>Area:</strong> ${area} sq ft</p>
        <p><strong>Estimated Cost:</strong> ₹${price}</p>
    `;
}