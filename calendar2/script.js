$(document).ready(function () {
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let events = JSON.parse(localStorage.getItem("events")) || {};

    function renderCalendar(month, year) {
        $("#month-year").text(`${months[month]} ${year}`);

        const firstDay = new Date(year, month).getDay();
        const daysInMonth = 32 - new Date(year, month, 32).getDate();

        let table = $("#calendar-body");
        table.empty();

        let date = 1;
        for (let i = 0; i < 6; i++) {
            let row = $("<tr></tr>");

            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    let cell = $("<td class='empty'></td>");
                    row.append(cell);
                } else if (date > daysInMonth) {
                    break;
                } else {
                    let cell = $("<td></td>");
                    let cellText = document.createTextNode(date);
                    cell.append(cellText);
                    cell.attr("data-date", `${year}-${month + 1}-${date}`);
                    if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                        cell.addClass("active");
                    }
                    if (events[`${year}-${month + 1}-${date}`]) {
                        let event = $("<div class='event'></div>").text(events[`${year}-${month + 1}-${date}`]);
                        cell.append(event);
                    }
                    cell.click(function () {
                        const date = $(this).attr("data-date");
                        showEventModal(date);
                    });
                    row.append(cell);
                    date++;
                }
            }

            table.append(row);
        }
    }

    $("#prev").click(function () {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        renderCalendar(currentMonth, currentYear);
    });

    $("#next").click(function () {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        renderCalendar(currentMonth, currentYear);
    });

    $(".close").click(function () {
        $("#event-modal").css("display", "none");
    });

    $(window).click(function (event) {
        if (event.target === document.getElementById("event-modal")) {
            $("#event-modal").css("display", "none");
        }
    });

    $("#event-form").submit(function (event) {
        event.preventDefault();
        const date = $("#event-date").val();
        const desc = $("#event-desc").val();
        events[date] = desc;
        localStorage.setItem("events", JSON.stringify(events));
        $("#event-modal").css("display", "none");
        renderCalendar(currentMonth, currentYear);
    });

    function clearDistanceCalculation() {
        document.getElementById('output').innerHTML = '';
    }
    

    // Function to show event modal with existing event details or for adding new event
    function showEventModal(date) {
         // Clear distance calculation
    clearDistanceCalculation();
        $("#event-date").val(date);
        const existingEvent = events[date];
        if (existingEvent) {
            $("#event-desc").val(existingEvent);
            $(".modal-content").append(`<button id="delete-event" data-event-date="${date}">Delete Event</button>`);
            $("#delete-event").click(function () {
                const eventDate = $(this).attr("data-event-date");
                delete events[eventDate];
                localStorage.setItem("events", JSON.stringify(events));
                $("#event-modal").css("display", "none");
                renderCalendar(currentMonth, currentYear);
            });
        } else {
            $("#event-desc").val("");
            $("#delete-event").remove(); // Remove delete button if it exists
        }
        $("#event-modal").css("display", "block");
    }

    renderCalendar(currentMonth, currentYear);
});

document.getElementById('save-button').addEventListener('click', function () {
    const noteInput = document.getElementById('note-input');
    const notesContainer = document.getElementById('notes-container');

    if (noteInput.value.trim() !== '') {
        const note = document.createElement('div');
        note.className = 'note';

        const noteText = document.createElement('span');
        noteText.textContent = noteInput.value;

        const removeIcon = document.createElement('i');
        removeIcon.className = 'fas fa-trash-alt remove-icon';
        removeIcon.addEventListener('click', function () {
            notesContainer.removeChild(note);
        });

        note.appendChild(noteText);
        note.appendChild(removeIcon);
        notesContainer.appendChild(note);
        noteInput.value = '';
    } else {
        alert('Please enter a note before saving.');
    }
});


var autocompleteStart, autocompleteEnd;

function initAutocomplete() {
    autocompleteStart = new google.maps.places.Autocomplete(document.getElementById('start'), { types: ['establishment'] });
    autocompleteEnd = new google.maps.places.Autocomplete(document.getElementById('end'), { types: ['establishment'] });
}

function initMapasync() {
    initAutocomplete();
}

function loadScript() {
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB-Ep4rBtq2tecPJgVqHYS9vt6vKwFLFuE&libraries=places&callback=initMapasync';
    script.defer = true;
    document.head.appendChild(script);
}

function calculateDistance() {
    var origin = document.getElementById('start').value;
    var destination = document.getElementById('end').value;
    var avoidHighways = document.getElementById('avoid-highways').checked;
    var avoidTolls = document.getElementById('avoid-tolls').checked;
    var mode = document.getElementById('mode').value;

    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode[mode],
        avoidHighways: avoidHighways,
        avoidTolls: avoidTolls,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }, function (response, status) {
        if (status !== google.maps.DistanceMatrixStatus.OK) {
            alert('Error was: ' + status);
        } else {
            var originAddress = response.originAddresses[0];
            var destinationAddress = response.destinationAddresses[0];
            if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
                alert('Error: No route found');
            } else {
                var distance = response.rows[0].elements[0].distance.text;
                var duration = response.rows[0].elements[0].duration.text;
                var output = 'Distance: ' + distance + '<br> Duration: ' + duration;
                document.getElementById('output').innerHTML = output;
            }
        }
    });
}

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const date = urlParams.get('date');
    $("#event-date").val(date);

    $("#event-scheduler").submit(function (event) {
        event.preventDefault();
        const eventName = $("#event-name").val();
        const startTime = $("#start-time").val();
        const endTime = $("#end-time").val();
        const start = $("#start").val();
        const end = $("#end").val();
        const avoidHighways = $("#avoid-highways").is(':checked');
        const avoidTolls = $("#avoid-tolls").is(':checked');
        const mode = $("#mode").val();

        const eventDetails = {
            eventName,
            startTime,
            endTime,
            start,
            end,
            avoidHighways,
            avoidTolls,
            mode
        };

        const events = JSON.parse(localStorage.getItem("events")) || {};
        events[date] = eventDetails;
        localStorage.setItem("events", JSON.stringify(events));
        //window.location.href = "../";  // Change this to your calendar page
    });
});



loadScript();

document.getElementById("event-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get form values
    let eventName = document.getElementById("event-name").value;
    let eventDate = document.getElementById("event-date").value;
    let startTime = document.getElementById("start-time").value;
    let endTime = document.getElementById("end-time").value;
    let destination = document.getElementById("end").value;
    let duration = document.getElementById("output").innerText.split('Duration: ')[1]; // Assuming the distance calculation is done

    // Convert start time to 12-hour format
    let startTime12h = formatTimeTo12H(startTime);
    // Convert end time to 12-hour format
    let endTime12h = formatTimeTo12H(endTime);

    // Create list item to display the event
    let eventItem = document.createElement("li");

    // Create a span to hold the event details
    let eventDetails = document.createElement("span");
    eventDetails.innerHTML = `<b>${eventName}</b><br>Date: ${eventDate}<br>Time: ${startTime12h} to ${endTime12h}<br>Destination: ${destination}<br>Duration: ${duration}`;
    eventItem.appendChild(eventDetails);

    // Create a delete button with a trash icon
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Using FontAwesome trash icon
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener("click", function () {
        eventItem.remove(); // Remove the event item when the delete button is clicked
    });

    eventItem.appendChild(deleteButton);

    // Append the event item to the events list
    document.getElementById("events").appendChild(eventItem);

    // Clear form inputs after adding event
    document.getElementById("event-form").reset();
});

// Function to convert time to 12-hour format
function formatTimeTo12H(time) {
    let formattedTime = new Date("2000-01-01T" + time + ":00Z").toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    return formattedTime;
}






document.addEventListener("DOMContentLoaded", function () {
    let mealPlans = [];
    let nextMealPlanNumber = 1;

    // Initialize the application
    function init() {
        loadMealPlans();
        attachEventListeners();
        displayMealPlans();
    }

    // Load meal plans from localStorage
    function loadMealPlans() {
        try {
            const storedPlans = localStorage.getItem("mealPlans");
            if (storedPlans) {
                mealPlans = JSON.parse(storedPlans);
                updateNextMealPlanNumber();
            }
        } catch (error) {
            console.error("Error loading meal plans:", error);
            alert("There was an error loading your meal plans. Please try refreshing the page.");
        }
    }

    // Attach event listeners
    function attachEventListeners() {
        document.getElementById("createMealPlanBtn").addEventListener("click", openCreateModal);
        document.getElementById("surpriseMeBtn").addEventListener("click", generateSurpriseMealPlan);
        document.getElementById("saveMealPlanBtn").addEventListener("click", saveMealPlan);
    }

    // Open create modal
    function openCreateModal() {
        document.getElementById("mealPlanForm").reset();
        document.getElementById("modalTitle").textContent = "Create Meal Plan";
        openModal("mealPlanModal");
    }

    // Generate surprise meal plan
    function generateSurpriseMealPlan() {
        const vegetarian = confirm("Are you a vegetarian?");
        const heavyEater = confirm("Are you a heavy eater?");
        const newPlan = generateRandomMealPlan(vegetarian, heavyEater);
        mealPlans.push(newPlan);
        saveMealPlans();
        updateNextMealPlanNumber();
        displayMealPlans();
    }

    // Save meal plan
    function saveMealPlan() {
        const planName = document.getElementById("planName").value.trim();
        if (planName === "") {
            alert("Please enter a meal plan name.");
            return;
        }

        const meals = getDaysOfWeek().map(day => ({
            day: day,
            meals: document.getElementById(day.toLowerCase()).value.trim()
        }));

        const mealPlan = {
            id: generateId(),
            name: planName,
            meals: meals
        };

        mealPlans.push(mealPlan);
        saveMealPlans();
        displayMealPlans();
        closeModal("mealPlanModal");
    }

    // Generate random meal plan
    function generateRandomMealPlan(vegetarian, heavyEater) {
        const planMeals = getDaysOfWeek().map(day => ({
            day: day,
            meals: [
                generateRandomMeal('Breakfast', vegetarian, heavyEater),
                generateRandomMeal('Lunch', vegetarian, heavyEater),
                generateRandomMeal('Dinner', vegetarian, heavyEater)
            ].join(', ')
        }));

        return {
            id: generateId(),
            name: `Meal_${nextMealPlanNumber}`,
            meals: planMeals
        };
    }

    // Generate random meal
    function generateRandomMeal(mealType, vegetarian, heavyEater) {
        const mealsDatabase = {
            'Breakfast': vegetarian ? ['Oatmeal with fruits', 'Avocado toast', 'Smoothie bowl'] : ['Bacon and eggs', 'Pancakes', 'Breakfast burrito'],
            'Lunch': vegetarian ? ['Grilled vegetable sandwich', 'Quinoa salad', 'Lentil soup'] : ['Chicken salad', 'Turkey wrap', 'Steak sandwich'],
            'Dinner': vegetarian ? ['Vegetable stir-fry', 'Pasta primavera', 'Vegetarian chili'] : ['Grilled salmon', 'Beef stew', 'Chicken curry']
        };

        const meals = mealsDatabase[mealType];
        const randomMeal = meals[Math.floor(Math.random() * meals.length)];
        const portionSize = heavyEater ? 'Large portion of ' : 'Small portion of ';

        return portionSize + randomMeal;
    }

    // Update next meal plan number
    function updateNextMealPlanNumber() {
        nextMealPlanNumber = Math.max(...mealPlans.map(plan => {
            const number = parseInt(plan.name.split('_')[1]);
            return isNaN(number) ? 0 : number;
        })) + 1;
    }

    // Display meal plans
    function displayMealPlans() {
        const plansList = document.getElementById("mealPlansList");
        plansList.innerHTML = "";

        mealPlans.forEach(plan => {
            const planItem = document.createElement("li");
            planItem.classList.add("meal-plan-item");

            const planName = document.createElement("strong");
            planName.textContent = plan.name;

            const buttons = [
                createButton('Edit', () => editMealPlan(plan.id)),
                createButton('Delete', () => deleteMealPlan(plan.id)),
                createButton('Share', () => shareMealPlan(plan.id)),
                createButton('View Meal Plan', () => viewMealPlan(plan.id))
            ];

            planItem.appendChild(planName);
            buttons.forEach(button => planItem.appendChild(button));

            plansList.appendChild(planItem);
        });
    }

    // Create button helper function
    function createButton(text, onClickFunction) {
        const button = document.createElement("button");
        button.classList.add("button");
        button.textContent = text;
        button.setAttribute("title", `${text} this meal plan`);
        button.setAttribute("aria-label", `${text} meal plan`);
        button.addEventListener("click", onClickFunction);
        return button;
    }

    // Edit meal plan
    function editMealPlan(planId) {
        const plan = mealPlans.find(plan => plan.id === planId);
        if (plan) {
            document.getElementById("planName").value = plan.name;
            plan.meals.forEach(meal => {
                document.getElementById(meal.day.toLowerCase()).value = meal.meals;
            });
            document.getElementById("modalTitle").textContent = "Edit Meal Plan";
            openModal("mealPlanModal");

            document.getElementById("saveMealPlanBtn").onclick = function () {
                updateMealPlan(plan);
            };
        }
    }

    // Update meal plan
    function updateMealPlan(plan) {
        plan.name = document.getElementById("planName").value.trim();
        plan.meals.forEach(meal => {
            meal.meals = document.getElementById(meal.day.toLowerCase()).value.trim();
        });

        saveMealPlans();
        displayMealPlans();
        closeModal("mealPlanModal");
    }

    // Delete meal plan
    function deleteMealPlan(planId) {
        if (confirm("Are you sure you want to delete this meal plan?")) {
            mealPlans = mealPlans.filter(plan => plan.id !== planId);
            saveMealPlans();
            displayMealPlans();
        }
    }

    // Share meal plan
    function shareMealPlan(planId) {
        const plan = mealPlans.find(plan => plan.id === planId);
        if (plan) {
            let shareText = `Meal Plan: ${plan.name}\n\n`;
            plan.meals.forEach(meal => {
                shareText += `${meal.day}\n${meal.meals}\n\n`;
            });

            if (navigator.share) {
                navigator.share({
                    title: plan.name,
                    text: shareText,
                }).then(() => {
                    console.log('Meal plan shared successfully.');
                }).catch(error => {
                    console.error('Error sharing meal plan:', error);
                    fallbackShare(shareText);
                });
            } else {
                fallbackShare(shareText);
            }
        }
    }

    // Fallback share method
    function fallbackShare(shareText) {
        const tempTextArea = document.createElement("textarea");
        tempTextArea.value = shareText;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand("copy");
        document.body.removeChild(tempTextArea);
        alert("Meal plan copied to clipboard. You can now paste it to share.");
    }

    // View meal plan
    function viewMealPlan(planId) {
        const plan = mealPlans.find(plan => plan.id === planId);
        if (plan) {
            const modalContent = createMealPlanModalContent(plan);
            const mealPlanModal = document.getElementById("mealPlanModal");
            mealPlanModal.innerHTML = "";
            mealPlanModal.appendChild(modalContent);
            openModal("mealPlanModal");
        }
    }

    // Create meal plan modal content
    function createMealPlanModalContent(plan) {
        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");

        const closeButton = document.createElement("span");
        closeButton.classList.add("close");
        closeButton.innerHTML = "&times;";
        closeButton.addEventListener("click", () => closeModal("mealPlanModal"));
        modalContent.appendChild(closeButton);

        const heading = document.createElement("h2");
        heading.textContent = plan.name;
        modalContent.appendChild(heading);

        const table = document.createElement("table");
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Day</th>
                    <th>Meals</th>
                </tr>
            </thead>
            <tbody>
                ${plan.meals.map(meal => `
                    <tr>
                        <td>${meal.day}</td>
                        <td>${meal.meals}</td>
                    </tr>
                `).join('')}
            </tbody>
        `;

        modalContent.appendChild(table);
        return modalContent;
    }

    // Save meal plans to localStorage
    function saveMealPlans() {
        try {
            localStorage.setItem("mealPlans", JSON.stringify(mealPlans));
        } catch (error) {
            console.error("Error saving meal plans:", error);
            alert("There was an error saving your meal plans. Please try again.");
        }
    }

    // Generate unique ID
    function generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    // Open modal
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = "block";
        window.onclick = function (event) {
            if (event.target === modal) {
                closeModal(modalId);
            }
        };
    }

    // Close modal
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = "none";
        document.getElementById("mealPlanForm").reset();
        window.onclick = null;
    }

    // Helper function to get days of the week
    function getDaysOfWeek() {
        return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    }

    // Initialize the application
    init();
});