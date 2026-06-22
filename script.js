const itinerary = [
  {
    date: "Jul 1",
    title: "Depart Seattle",
    description:
      "Leave Seattle at 1:30 PM on Delta DL8763, connecting through Paris before continuing to Geneva.",
    tag: "travel",
  },
  {
    date: "Jul 2",
    title: "Arrive Geneva",
    description:
      "Arrive Geneva at 11:10 AM on DL8243. Take bus 23 from the airport to Avenue de l'Ain, then walk to the Chatelaine address.",
    tag: "travel",
  },
  {
    date: "Jul 4",
    title: "Geneva to Chamonix / Les Houches",
    description:
      "Meet the group around Chamonix, then continue to Chalet Hotel du Bois in Les Houches. Bus line 1 is noted for the hotel transfer.",
    tag: "alps",
  },
  {
    date: "Jul 5",
    title: "TMB begins",
    description:
      "Meet around 9:00 AM at the parking lot in front of the Prarion cable car in Les Houches. Start the guided Tour du Mont Blanc.",
    tag: "trek",
  },
  {
    date: "Jul 5-11",
    title: "7-day Tour du Mont Blanc",
    description:
      "Guided hiking tour with shared lodging, meals, luggage transfer, professional mountain guide, first-day cable car, and final local train ticket included.",
    tag: "trek",
  },
  {
    date: "Jul 11",
    title: "TMB ends in Le Tour",
    description:
      "Finish around 4:30 PM in Le Tour. Train ticket to Chamonix is provided. Overnight at ibis Styles Les Houches Chamonix and retrieve stored luggage.",
    tag: "trek",
  },
  {
    date: "Jul 12",
    title: "Extra Chamonix day",
    description:
      "Use bus line 1 from Les Houches toward Chamonix. Check in and leave luggage at Chamonix Lodge in the morning, then coordinate the day with the group.",
    tag: "alps",
  },
  {
    date: "Jul 13",
    title: "Chamonix to Zermatt",
    description:
      "Travel to Zermatt and check in. Walk Hinterdorf, Bahnhofstrasse, and the church square, then ride toward Rotenboden, Riffelsee, and Gornergrat if weather allows.",
    tag: "alps",
  },
  {
    date: "Jul 14",
    title: "Matterhorn sunrise and Glacier Paradise",
    description:
      "Start at Kirchbrucke for alpenglow. Spend late morning at Matterhorn Glacier Paradise and Schwarzsee, then return toward Riffelsee for golden-hour reflections.",
    tag: "alps",
  },
  {
    date: "Jul 15",
    title: "Zermatt to Zurich by scenic rail",
    description:
      "Depart Zermatt at 7:06 AM, pass through Visp and Andermatt, stop in Lucerne, then arrive Zurich HB at 3:55 PM.",
    tag: "travel",
  },
  {
    date: "Jul 15",
    title: "Zurich evening",
    description:
      "Walk Bahnhofstrasse, Lindenhof Hill, St. Peter, the Limmat, Grossmunster, Fraumunster, and the Lake Zurich promenade before chocolate shopping.",
    tag: "city",
  },
  {
    date: "Jul 16",
    title: "Zurich to Seattle",
    description:
      "Fly Zurich to Dublin at 11:20 AM, then Dublin to Seattle at 3:25 PM, arriving Seattle at 5:10 PM local time.",
    tag: "travel",
  },
];

const timeline = document.querySelector("#timeline");
const dayJump = document.querySelector("#dayJump");
const buttons = document.querySelectorAll(".filter-button");

function renderTimeline(filter = "all") {
  const visibleItems =
    filter === "all" ? itinerary : itinerary.filter((item) => item.tag === filter);

  timeline.innerHTML = visibleItems
    .map((item, index) => {
      const id = `day-${item.date.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index}`;

      return `
        <article class="timeline-card" id="${id}" data-tag="${item.tag}">
          <time>${item.date}</time>
          <div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <span class="tag">${item.tag}</span>
          </div>
        </article>
      `;
    })
    .join("");

  dayJump.innerHTML = visibleItems
    .map((item, index) => {
      const id = `day-${item.date.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index}`;
      return `<button type="button" data-target="${id}">${item.date}</button>`;
    })
    .join("");

  dayJump.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      dayJump.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      document
        .getElementById(button.dataset.target)
        .scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderTimeline(button.dataset.filter);
  });
});

renderTimeline();
