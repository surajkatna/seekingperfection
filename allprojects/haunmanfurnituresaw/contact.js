
document.getElementById("contactForm").addEventListener("submit", function(e){

    e.preventDefault();

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    let whatsappMessage =
`*New Website Enquiry*

👤 Name: ${name}

📞 Phone: ${phone}

📧 Email: ${email}

💬 Message:
${message}`;

    let whatsappURL =
`https://wa.me/90000000000?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappURL, "_blank");
});