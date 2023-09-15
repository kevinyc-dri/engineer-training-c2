const jiraTitles = [
    "Create a public repository under your GitHub account",
    "Create a new script file, and import it into index.html and add a console log",
    "JavaScript: Variables",
    "JavaScript: Event Listeners - Add Toggle Button Inside of Modal",
    "JavaScript: Functions - Write a function to toggle hidden class on modal",
  ];
  
  const jiraLinks = [
    "https://totalwine.atlassian.net/browse/TT-2",
    "https://totalwine.atlassian.net/browse/TT-16",
    "https://totalwine.atlassian.net/browse/TT-17",
    "https://totalwine.atlassian.net/browse/TT-18",
    "https://totalwine.atlassian.net/browse/TT-19",
  ];

  const jiraTemplate = { icon: "bi bi-check-circle-fill" }
  const errorJiraTemplate = { icon: "bi bi-x-circle"}

  class JiraHandler {
    constructor(links, titles) {
      this.links = links;
      this.titles = titles;
      this.jiraObject = []
      this.createJiraObject();
    }
  
    createJiraObject(){
      function getRandomNumber() {
        return Math.floor(Math.random() * 3);
    }

      for (let i = 0; i < this.titles.length; i++) {
        const jiraObject = {
          title: this.titles[i],
          link: this.links[i],
        };
        const useErrorTemplate = getRandomNumber() === 0;
        const template = useErrorTemplate ? errorJiraTemplate : jiraTemplate;
        this.jiraObject.push({...jiraTemplate,...jiraObject,...template})
      }
    }
  } 

  const jiraHandler = new JiraHandler(jiraTitles, jiraLinks);

  module.exports = jiraHandler;