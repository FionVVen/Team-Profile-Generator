const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let team = [];
let teamstring = ``;

async function main() {
    try {
      await prompt();
      for (let i = 0; i < team.length; i++) {
        teamstring = teamstring + html.generateCard(team[i]);
      }
      let finalHTML = html.generateHTML(teamstring);
      console.log(teamstring);
      writeFileAsync("./output/team.html", finalHTML);
    } catch (err) {
      return console.log(err);
    }
  }
  async function prompt() {
    let responseDone = "";
    do {
      try {
        response = await inquirer.prompt([
          {
            type: "input",
            name: "name",
            message: "Please input your name: ",
          },
          {
            type: "input",
            name: "id",
            message: "Please input your ID: ",
          },
          {
            type: "input",
            name: "email",
            message: "Please input your email address?: ",
          },
          {
            type: "list",
            name: "role",
            message: "Pleae select your role:",
            choices: ["Manager", "Engineer", "Intern"],
          }
        ]);
  
        let response2 = "";
        if (response.role === "Engineer") {
          response2 = await inquirer.prompt([
            {
              type: "input",
              name: "x",
              message: "Please input your Github user name:",
            },
          ]);
          const engineer = new Engineer(
            response.name,
            response.id,
            response.email,
            response2.x
          );
          team.push(engineer);
        } else if (response.role === "Intern") {
          response2 = await inquirer.prompt([
            {
              type: "input",
              name: "x",
              message: "Please input the school you are attending:",
            },
          ]);
          const intern = new Intern(
            response.name,
            response.id,
            response.email,
            response2.x
          );
          team.push(intern);
        } else if (response.role === "Manager") {
          response2 = await inquirer.prompt([
            {
              type: "input",
              name: "x",
              message: "Please input your office number:",
            },
          ]);
          const manager = new Manager(
            response.name,
            response.id,
            response.email,
            response2.x
          );
          team.push(manager);
        }
      } catch (err) {
        return console.log(err);
      }
      console.log(team);
      responseDone = await inquirer.prompt([
        {
          type: "list",
          name: "finish",
          message: "Do you want to continue?: ",
          choices: ["Yes", "No"],
        },
      ]);
    } while (responseDone.finish === "Yes");
  }
  main();
  