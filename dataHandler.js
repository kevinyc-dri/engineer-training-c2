const { Octokit } = require("@octokit/rest");
var JiraApi = require('jira-client');


const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  baseUrl: 'https://api.github.com',
  log: {
    debug: () => {},
    info: () => {},
    warn: console.warn,
    error: console.error
  },
  request: {
    agent: undefined,
    fetch: undefined,
    timeout: 0
  }
});

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
function getRandomNum(max) {
  return Math.floor(Math.random() * max);
}
function getIcon() {
  let rNum = getRandomNum(3);
  return (rNum >= 1 ? jiraTemplate : errorJiraTemplate);
}

class JiraHandler {
  constructor(links, titles) {
    this.jiraObject = []
    this.jiraTicketNum = []
    this.links = links;
    this.titles = titles;
    this.createJiraObject();
    this.fetchGitHubData();
    this.retrieveJiraInfo()
  }

  createJiraObject() {
    for (let i = 0; i < this.links.length; i++) {
      let icon = getIcon();
      console.log(icon)
      this.jiraObject.push({
        link: this.links[i],
        title: this.titles[i],
        ...icon,
      })
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

const jiraHandler = new JiraHandler(jiraLinks, jiraTitles);

module.exports = jiraHandler;