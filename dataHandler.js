const { Octokit } = require("@octokit/rest");
var JiraApi = require('jira-client');


const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  baseUrl: 'https://api.github.com',
  log: {
    debug: () => { },
    info: () => { },
    warn: console.warn,
    error: console.error
  },
  request: {
    agent: undefined,
    fetch: undefined,
    timeout: 0
  }
});

// octokit.rest.repos.listCommits({
//   owner: "kevinyc-dri",
//   repo: "engineering-training-c2",
// })
//   .then((response) => {
//     console.log(response);
//   });

// Initialize
var jira = new JiraApi({
  protocol: 'https',
  host: process.env.JIRA_HOST,
  username: process.env.JIRA_USERNAME,
  password: process.env.JIRA_TOKEN,
  apiVersion: '2',
  strictSSL: true
});

async function findJiraIssue(issueNumber) {
  return new Promise(async (resolve) => {
      jira.findIssue(issueNumber)
          .then((issue) => {
              const { summary } = issue.fields
              console.log('Summary: ' + summary)
              resolve({
                  title: summary,
                  link: `https://totalwine.atlassian.net/browse/${issueNumber}`
              })
          })
          .catch((err) => {
              console.error(err)
          })
  })
}

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
const errorJiraTemplate = { icon: "bi bi-x-circle" }

class JiraHandler {
  constructor(links, titles) {
    this.links = links;
    this.titles = titles;
    this.jiraObject = []
    this.createJiraObject();
    this.fetchGitHubData();
  }

  createJiraObject() {
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
      this.jiraObject.push({ ...jiraTemplate, ...jiraObject, ...template })
    }
  }
  async fetchGitHubData() {
    return new Promise(async (resolve) => {
        const commits = await octokit.rest.repos.listCommits({
            owner: "kevinyc-dri",
            repo: "engineer-training-c2",
        })
        resolve(commits)

    })
}

retrieveJiraInfo() {
  this.fetchGitHubData().then((listOfCommits) => {
      let jiraTicketNum = []
      let promises = []
      const regEx = /([A-Z][A-Z0-9]+-[0-9]+)/g
      for (let i = 0; i < listOfCommits.data.length; i++) {
          let ticketNum = listOfCommits.data[i].commit.message.match(regEx)
          let indx = jiraTicketNum.indexOf(ticketNum)

          if (ticketNum != null && indx === -1) {
              jiraTicketNum.push(ticketNum)
          } else {
              console.log(ticketNum + ' Jira ticket number already exists or No Ticket Number')
          }
      }
      console.log(jiraTicketNum)

      for (let i = 0; i < jiraTicketNum.length; i++) {
          promises.push(findJiraIssue(jiraTicketNum[i]));
      }
      Promise.all(promises).then((values) => {
          console.log(values);
      })
  })
}

}

const jiraHandler = new JiraHandler(jiraTitles, jiraLinks);
module.exports = jiraHandler;