function showToast(message) {
    const toast = document.createElement("div");

    toast.textContent = message;
    toast.style.position = "fixed";
    toast.style.bottom = "30px";
    toast.style.right = "30px";
    toast.style.background = "#0B1F5F";
    toast.style.color = "white";
    toast.style.padding = "15px 25px";
    toast.style.borderRadius = "8px";
    toast.style.zIndex = "9999";
    toast.style.fontSize = "15px";

    document.body.appendChild(toast);

    setTimeout(function () {
        toast.remove();
    }, 3000);
}


/* ================================
   DOM CONTENT LOADED
================================ */

document.addEventListener("DOMContentLoaded", function () {

    /* About IPL Match */
    const paragraph = document.getElementById("demo");

    if (paragraph) {
        paragraph.textContent =
            "IPL 2026 features exciting cricket matches between top teams and players across India.";
    }


    /* ================================
       HERO BUTTONS
    ================================= */

    const viewSchedule = document.querySelector("#bookticket");
    const bookTicketBtn = document.querySelector("#bookTicketBtn");
    const loadingText = document.querySelector("#loadingText");


    /* View Schedule Button */

    if (viewSchedule) {
        viewSchedule.addEventListener("click", function () {

            if (loadingText) {
                loadingText.style.display = "inline";
            }

            setTimeout(function () {

                const matchesSection = document.getElementById("matches");

                if (matchesSection) {
                    matchesSection.scrollIntoView({
                        behavior: "smooth"
                    });
                }

                if (loadingText) {
                    loadingText.style.display = "none";
                }

            }, 1000);
        });
    }


    /* Book Ticket Button */

    if (bookTicketBtn) {
        bookTicketBtn.addEventListener("click", function () {

            if (loadingText) {
                loadingText.style.display = "inline";
            }

            setTimeout(function () {

                const bookingSection = document.getElementById("booking");

                if (bookingSection) {
                    bookingSection.scrollIntoView({
                        behavior: "smooth"
                    });
                }

                if (loadingText) {
                    loadingText.style.display = "none";
                }

            }, 1000);
        });
    }


    /* ================================
       BOOK BUTTONS IN MATCH TABLE
    ================================= */

    const bookLinks = document.querySelectorAll("#matches table a");

    bookLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();

            const bookingSection = document.getElementById("booking");

            if (bookingSection) {
                bookingSection.scrollIntoView({
                    behavior: "smooth"
                });
            }

            showToast("Please enter your booking details!");
        });

    });


    /* ================================
       TEAM FILTER
    ================================= */

    const teamFilter = document.querySelector("#matches select");
    const matchRows = document.querySelectorAll("#matches table tr");

    if (teamFilter) {

        teamFilter.addEventListener("change", function () {

            const selectedTeam = this.value;

            for (let i = 1; i < matchRows.length; i++) {

                const teams = matchRows[i].cells[1].textContent;

                if (
                    selectedTeam === "All Teams" ||
                    teams.includes(selectedTeam)
                ) {
                    matchRows[i].style.display = "";
                } else {
                    matchRows[i].style.display = "none";
                }

            }

        });

    }


    /* ================================
       BOOKING FORM
    ================================= */

    const form = document.querySelector("#booking form");

    if (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            const selects = form.querySelectorAll("select");

            const match = selects[0].value;
            const stand = selects[1].value;

            const tickets =
                form.querySelector('input[type="number"]').value;

            const name =
                form.querySelector('input[type="text"]').value;


            let price;

            if (stand === "General") {
                price = 800;
            }
            else if (stand === "Premium") {
                price = 1500;
            }
            else {
                price = 3000;
            }


            const total = price * tickets;


            const summary = document.querySelector("aside");

            if (summary) {

                summary.innerHTML = `
                    <h3>Booking Summary</h3>
                    <p><strong>Match:</strong> ${match}</p>
                    <p><strong>Stand:</strong> ${stand}</p>
                    <p><strong>Price per Ticket:</strong> ₹${price}</p>
                    <p><strong>Quantity:</strong> ${tickets}</p>
                    <h4>Total Amount: ₹${total}</h4>
                `;

            }


            showToast("Booking confirmed for " + name + "!");

        });

    }

});
