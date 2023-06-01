import data from "./data.json" assert { type: "json" };

const list = document.querySelector(".menu");
const searchbar = document.querySelector(".search-bar");
console.log(searchbar);
const chosen = document.querySelector(".chosen-item");
const clearDiv = document.getElementById("clear");
console.log(clearDiv);

const createDomElement = (tag, className, src, text, event, eventFc) => {
  const element = document.createElement(tag);
  element.classList.add(className);

  if (src) {
    element.src = src;
  }
  if (text) {
    element.textContent = text;
  }
  if (event) {
    element[event] = () => {
      eventFc;
    };
  }

  return element;
};

let emptyMassive = [];
displayJobs(data);
function displayJobs(dataBase) {
  list.innerHTML = "";
  for (let index = 0; index < dataBase.length; index++) {
    const {
      id,
      company,
      logo,
      featured,
      position,
      newLanguage,
      role,
      level,
      postedAt,
      contract,
      location,
      languages,
      tools,
    } = dataBase[index];
    const cardId = createDomElement("li", "card-id", id);

    const boxList = createDomElement("li", "boxList");
    const menuInfo = createDomElement("div", "wrapper");
    const headInfo = createDomElement("div", "head-title");
    const companyName = createDomElement("h1", "company", null, company);
    const cardItems = createDomElement("div", "carditem");
    let newItem;
    let featureItem;
    if (newLanguage) {
      newItem = createDomElement("p", "new", null, "NEW!");
      cardItems.append(newItem);
    }

    if (featured) {
      featureItem = createDomElement("p", "featured", null, "FEATURED!");
      cardItems.append(featureItem);
    }
    const jobOffer = createDomElement("div", "offer", null, position);
    const imageElement = createDomElement("img", "logo", logo);
    const jobDetails = createDomElement("div", "details");
    const postedDate = createDomElement("h1", "posteddate", null, postedAt);
    const labelPoint = createDomElement("div", "booletpoint");
    const time = createDomElement("h3", "work-time", null, contract);
    const label = createDomElement("div", "booletpoint2");
    const jobLocation = createDomElement("h3", "location", null, location);
    const line = createDomElement("div", "line");
    const jobSkill = createDomElement("div", "skill");
    const front = createDomElement("button", "frontend", null, role);
    const jobLevel = createDomElement("button", "level", null, level);
    const commonDiv = createDomElement("div", "common");

    front.addEventListener("click", (e) => {
      if (!emptyMassive.includes(role)) {
        emptyMassive.push(role);
      }
      commonArray();
      console.log(role);
      searchbar.classList.remove("hidden");
      filterFc();
    });
    jobLevel.addEventListener("click", (e) => {
      if (!emptyMassive.includes(level)) {
        emptyMassive.push(level);
      }

      commonArray();
      searchbar.classList.remove("hidden");
      filterFc();
    });

    menuInfo.append(
      imageElement,
      headInfo,
      cardItems,
      jobOffer,

      jobDetails,

      commonDiv,
      line,
      jobSkill
    );
    boxList.append(menuInfo);
    headInfo.append(companyName, cardItems);
    list.append(boxList);
    jobDetails.append(postedDate, labelPoint, time, label, jobLocation);
    jobSkill.append(front, jobLevel);
    commonDiv.append(headInfo, jobOffer, jobDetails);

    for (
      let seperateElement = 0;
      seperateElement < tools.length;
      seperateElement++
    ) {
      const toolElement = createDomElement(
        "button",
        "tool-element",
        "null",
        tools[seperateElement]
      );
      toolElement.addEventListener("click", (e) => {
        if (!emptyMassive.includes(tools[seperateElement])) {
          emptyMassive.push(tools[seperateElement]);
        }

        commonArray();

        searchbar.classList.remove("hidden");

        filterFc();
      });
      jobSkill.append(toolElement);
    }

    for (
      let jobLanguages = 0;
      jobLanguages < languages.length;
      jobLanguages++
    ) {
      const htmlLanguages = createDomElement(
        "button",
        "btn",
        null,
        languages[jobLanguages]
      );
      htmlLanguages.addEventListener("click", (e) => {
        if (!emptyMassive.includes(languages[jobLanguages])) {
          emptyMassive.push(languages[jobLanguages]);
        }
        // emptyMassive.push(languages[jobLanguages]);

        searchbar.classList.remove("hidden");

        commonArray();
        filterFc();
      });

      jobSkill.append(htmlLanguages);
    }

    function commonArray() {
      chosen.innerHTML = "";
      for (let empty = 0; empty < emptyMassive.length; empty++) {
        const filterBtn = createDomElement(
          "span",
          "filter-button",
          null,
          emptyMassive[empty]
        );
        const remove = createDomElement("button", "delete", null, "x");

        chosen.append(filterBtn);
        filterBtn.append(remove);
        const filtered = createDomElement("div", "filtered");
        filtered.append(remove, filterBtn);
        console.log(filtered);
        chosen.append(filtered);
        remove.addEventListener("click", (e) => {
          const patternRemove = emptyMassive.indexOf(filtered.textContent);
          emptyMassive.splice(patternRemove, 1);
          filtered.remove();
          remove.remove();
          if (emptyMassive.length == 0) {
            searchbar.classList.add("hidden");
            console.log(emptyMassive.length);
          } else if (emptyMassive.length > 0) {
            searchbar.classList.remove("hidden");
            console.log(emptyMassive.length);
          }
        });
      }
      clearDiv.addEventListener("click", (e) => {
        emptyMassive = [];
        commonArray();
        searchbar.classList.add("hidden");
        displayJobs(data);
      });
    }
  }
  function filterFc(e) {
    console.log(emptyMassive);
    let search = data.filter((i) =>
      emptyMassive.every(
        (element) =>
          i.role === element ||
          i.level === element ||
          i.languages.includes(element) ||
          i.tools.includes(element)
      )
    );

    console.log(search);
    displayJobs(search);
  }
}
