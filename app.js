const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];
getManagerInput();

// Using inquirer to gather information about the development team members,
// Creating objects for each team member 
function getManagerInput() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is your id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is your email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is your office number?",
        name: "officenumber",
      },
    ])
    .then((response) => {
      const m = new Manager(
        response.name,
        response.id,
        response.email,
        response.officenumber
      );
      team.push(m);
      getTeamInput();
    });
}
function getEngineerInput() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is your id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is your email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is your github username?",
        name: "githubuser",
      },
    ])
    .then((response) => {
      const e = new Engineer(
        response.name,
        response.id,
        response.email,
        response.githubuser
      );
      team.push(e);
      getTeamInput();
    });
}
function getInternInput() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is your id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is your email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is your school name?",
        name: "school",
      },
    ])
    .then((response) => {
      const i = new Intern(
        response.name,
        response.id,
        response.email,
        response.school
      );
      team.push(i);
      getTeamInput();
    });
}
function getTeamInput() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What is your employee type?",
        name: "employeetype",
        choices: ["Engineer", "Manager", "Intern", "Quit"],
      },
    ])
    .then((response) => {
      if (response.employeetype === "Engineer") {
        getEngineerInput();
      } else if (response.employeetype === "Manager") {
        getManagerInput();
      } else if (response.employeetype === "Intern") {
        getInternInput();
      } else {
        var html = render(team);
        writeHtmlFile(html);
      }
    });
}
function writeHtmlFile(html) {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFile(outputPath, html, (err) => {
    if (err) console.log(err);
    else {
      console.log("File written successfully\n");
    }
  });
}

