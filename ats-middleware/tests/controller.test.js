var supertest = require("supertest");  
var chai = require("chai");  
var app = require("../nodeServer");
import { createMockData } from "./create.mock";
import { listMockData } from "./list.mock";
import { createTechMockData } from "./create.tech.mock";
import { listTechMockData } from "./list.tech.mock";

let expect = chai.expect;  
let request = supertest(app); 

describe("Position API Routes", function() {  
	// This function will run before every test to clear database
	beforeEach(function(done) {
		done();
	});

	// In this test it's expected a task list of two tasks
	describe("GET Complete positions", function() {
		it("returns a list of tasks", function(done) {
			request.get("/position")
				.expect(200)
				.end(function(err, res) {
					done(err);
				});
		});
	});
	describe("Add Position to list", function() {
		it("returns a list of tasks", function(done) {
			request.post("/position").send(createMockData.body)
				.expect(200)
				.end(function(err, res) {
					done(err);
				});
		});
	});
	describe("GET position by id", function() {
		it("returns a list of tasks", function(done) {
			request.get("/position/5b8e5300f1ffb500f4e75cac")
				.expect(200)
				.end(function(err, res) {
					done(err);
				});
		});
	});
	describe("GET position by id error ", function() {
		it("returns a list of tasks", function(done) {
			request.get("/position/5b8e5300f1ffb500f4dsddse75cac")
				.expect(400)
				.end(function(err, res) {
					done(err);
				});
		});
	});
	describe("Update position information ", function() {
		it("returns a list of tasks", function(done) {
			request.put("/position/5b8e5300f1ffb500f4e75cac").send(createMockData.body)
				.expect(200)
				.end(function(err, res) {
					done(err);
				});
		});
	});
	describe("Wrong Position id update error", function() {
		it("returns a list of tasks", function(done) {
			request.put("/position/5b8e5300f1ffb500f4e75cac").send(createMockData.body)
				.expect(200)
				.end(function(err, res) {
					done(err);
				});
		});
	});
	describe("GET Complete Technology", function() {
		it("returns a list of Technology", function(done) {
			request.get("/technology")
				.expect(200)
				.end(function(err, res) {
					done(err);
				});
		});
	});
	describe("POST Complete Technology", function() {
		it("returns a list of Technology", function(done) {
			request.get("/technology").send(createTechMockData.body)
				.expect(200)
				.end(function(err, res) {
					done(err);
				});
		});
	});
	describe("GET Technology by Namew", function() {
		it("returns a list of Technology", function(done) {
			request.get("/technology/java")
				.expect(200)
				.end(function(err, res) {
					done(err);
				});
		});
	});
  
});