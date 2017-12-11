'use strict';
// Require dependencies
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = class extends yeoman {
  //  Configuration will be loaded here
  //  Ask for user input
  prompting() {
    var done = this.async();
    this.prompt(
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        //  Defaults to the project's folder name if the input is skipped
        default: this.appname
      },
      function (answers) {
        this.props = answers;
        this.log(answers.name);
        done();
      }.bind(this)
    );
  }
  //  Writing Logic here
  writing() {
    this._config();
    this._app();
  }
  // Copy configuration files
  _config() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('_bower.json'),
      this.destinationPath('bower.json'),
      {
        name: this.props.name
      }
    );
    this.fs.copy(this.templatePath('bowerrc'), this.destinationPath('.bowerrc'));
  }
  //  Copy application files
  _app() {
    // Server file
    this.fs.copyTpl(
      this.templatePath('_server.js'),
      this.destinationPath('server.js'),
      this.destinationPath('/views/index.ejs'),
      {
        name: this.props.name
      }
    );
    // Routes
    this.fs.copy(
      this.templatePath('_routes/_all.js'),
      this.destinationPath('routes/all.js')
    );
    // Model
    this.fs.copy(
      this.templatePath('_model/_todo.js'),
      this.destinationPath('model/todo.js')
    );
    // Views
    this.fs.copyTpl(
      this.templatePath('/_views/_index.ejs'),
      this.destinationPath('/views/index.ejs'),
      {
        name: this.props.name
      }
    );
    // Public/
    this.fs.copy(
      this.templatePath('_public/_css/_app.css'),
      this.destinationPath('public/css/app.css')
    );
    this.fs.copy(
      this.templatePath('_public/_js/_app.js'),
      this.destinationPath('public/js/app.js')
    );
  }
  // Install Dependencies
  install() {
    this.installDependencies();
  }
};