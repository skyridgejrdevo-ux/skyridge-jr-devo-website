/**
 * season-embed.js
 * Fetches season.json from GitHub and injects dynamic content into the page.
 *
 * Target elements (add these IDs to your Webflow sections):
 *   #race-schedule     — race schedule table (Home, Registration pages)
 *   #kickoff-meeting   — kickoff meeting details (Home page)
 *   #practice-schedule — practice days and times (Home, About pages)
 *   #key-dates         — upcoming key dates list (Registration page)
 *
 * To update season data: edit content/season.json in the skyridge-jr-devo-website repo.
 * Changes are reflected on the live site immediately (no redeploy needed).
 */

(function () {
  var SEASON_JSON_URL =
    "https://raw.githubusercontent.com/brandongsmitty/skyridge-jr-devo-website/main/content/season.json";

  var FALLBACK = {
    kickoff: "Check back soon for kickoff meeting details.",
    practices: "Practice schedule coming soon — join Spond for updates.",
    races: "Race schedule coming soon.",
    keyDates: "Key dates coming soon."
  };

  function fmt(date_display) {
    return date_display || "";
  }

  function injectKickoff(data, el) {
    var k = data.kickoff;
    if (!k) { el.textContent = FALLBACK.kickoff; return; }
    el.innerHTML =
      "<strong>" + fmt(k.date_display) + "</strong><br>" +
      k.time + "<br>" +
      k.location;
  }

  function injectPractices(data, el) {
    var p = data.practices;
    if (!p) { el.textContent = FALLBACK.practices; return; }
    el.innerHTML =
      "<strong>" + p.days + "</strong><br>" +
      p.time + "<br>" +
      "<span class='practice-location'>" + p.location + "</span>";
  }

  function injectRaceSchedule(data, el) {
    var races = data.races;
    if (!races || races.length === 0) { el.textContent = FALLBACK.races; return; }

    var html = '<table class="race-schedule-table">' +
      '<thead><tr>' +
      '<th>Race</th>' +
      '<th>Date</th>' +
      '<th>Location</th>' +
      '<th>Devo Start</th>' +
      '</tr></thead><tbody>';

    races.forEach(function (r) {
      html += "<tr>" +
        "<td>" + r.name + "</td>" +
        "<td>" + fmt(r.date_display) + "</td>" +
        "<td>" + r.location + ", " + r.city + "</td>" +
        "<td>" + r.start_time + "</td>" +
        "</tr>";
    });

    html += "</tbody></table>";
    el.innerHTML = html;
  }

  function injectKeyDates(data, el) {
    var dates = data.key_dates;
    if (!dates || dates.length === 0) { el.textContent = FALLBACK.keyDates; return; }

    // Only show dates that haven't passed yet
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var upcoming = dates.filter(function (d) {
      return !d.date || new Date(d.date + "T00:00:00") >= today;
    });

    if (upcoming.length === 0) {
      el.textContent = "All key dates for the season have passed. See you next year!";
      return;
    }

    var html = '<ul class="key-dates-list">';
    upcoming.forEach(function (d) {
      html += "<li>" +
        "<strong>" + d.label + "</strong> — " +
        fmt(d.date_display) +
        (d.detail ? "<br><span class='key-date-detail'>" + d.detail + "</span>" : "") +
        "</li>";
    });
    html += "</ul>";
    el.innerHTML = html;
  }

  function populate(data) {
    var targets = {
      "kickoff-meeting": injectKickoff,
      "practice-schedule": injectPractices,
      "race-schedule": injectRaceSchedule,
      "key-dates": injectKeyDates
    };

    Object.keys(targets).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        targets[id](data, el);
      }
    });
  }

  function setFallbacks() {
    var ids = ["kickoff-meeting", "practice-schedule", "race-schedule", "key-dates"];
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.innerHTML.trim() === "") {
        el.textContent = FALLBACK[id] || "Content unavailable — check back soon.";
      }
    });
  }

  function init() {
    fetch(SEASON_JSON_URL)
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (data) {
        populate(data);
      })
      .catch(function (err) {
        console.warn("[season-embed] Could not load season.json:", err.message);
        setFallbacks();
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
