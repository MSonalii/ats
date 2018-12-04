"use strict";

/**
 * Module dependencies.
 */

import assrt from "assert";
import should from "should";
import mongoose from "mongoose";
import {expect} from "chai";
import Server from "../base-server/index";
import baseApp from  "../base-server/server/server";
import { config } from "../services/Position/config/positions.config";
import supertest from "supertest";
import { createMockData } from "./create.mock";
import { listMockData } from "./list.mock";
import { createTechMockData } from "./create.tech.mock";
import { listTechMockData } from "./list.tech.mock";
import chai from "chai";
import chaiHttp from "chai-http";
import { PositionSchema } from "../services/Position/server/models/position.model";
import { TechnologySchema } from "../services/Position/server/models/technology.model";
import { UserSchema } from "../services/Position/server/models/user.model";
import { routes } from "../services/Position/server/routes/position.routes";

chai.use(chaiHttp);


/**
 * Unit tests
 */


describe("Controller Test", function() {
	let server, db, app;
    let agent;
    let result;
	this.timeout(150000);
	before( async () => {
    
		server = new Server(config);   
		[db, app] = await server.start(routes); 
		//agent =  supertest.agent(app);
	});

    before((done)=>{
        chai.request(app)
            .post("/api/v1/positions/")
            .send(createMockData.body)
            .end((err, res)=>{
                result = res;
                done();
            });
    });

	describe("Create Test", ()=>{

		it("success function sends something",() => {
			expect(result).not.to.be.empty;
		});
    
    
		it("success function sends an object", function(){
			expect(result).to.be.instanceof(Object);
		});

		it("should send  200 Status Code ", function() {
			expect(result).to.have.property("statusCode", 200);
		});

		it("success object should contain body", function(){
			expect(result).to.have.property("body");
		});

		it("success object should not contain empty body", function(){
			expect(result.body).not.to.be.empty;
		});

		it("success body should contain body ", function() {
			expect(result.body).to.have.property("body");
		});

		it("success body will contain non empty body", function(){
			expect(result.body.body).not.to.be.empty;
		});

		it("result should have mandatory fields", function(){
           
			expect(result.body.body).to.contain.all.keys(createMockData.mandatoryFields);
     
		});          

	});

    
    describe("List Test", ()=>{

		let result;
		before((done)=>{
			chai.request(app)
				.get("/api/v1/positions/")
				.send()
				.end((err, res)=>{
					result = res;
					done();
				});
		});

		it("success function sends something", function(){
			expect(result).not.to.be.empty;
		});        

		it("success function sends an object", function(){
			expect(result).to.be.instanceof(Object);
		});        


		it("should send  200 Status Code ", function() {
			expect(result).to.have.property("statusCode", 200);
		});

		it("success object should contain body", function(){
			expect(result).to.have.property("body");
		});

		it("success object should not contain empty body", function(){
			expect(result.body).not.to.be.empty;
		});

		it("success  body will contain body", function(){
			expect(result.body.body).not.to.be.empty;
		});

		it("suceess bodys body should have be an Array", function(){
			expect(result.body.body.data).to.be.instanceOf(Array);
		});       

		it("Array Item should Contain all mandatory criteria", function(){
			expect(result.body.body.data[0]).to.contain.all.keys(listMockData.mandatoryFields);
		});       
	});

	describe("Position Detail Tests", ()=>{
		before((done)=>{
			chai.request(app)
				.get(`/api/v1/positions/${result.body.body._id}`)
				.send()
				.end((err, res)=>{
                    result = res;
                    console.log(result.body);
					done();
				});
		});

		it("success function sends something", function(){
			expect(result).not.to.be.empty;
		});        

		it("success function sends an object", function(){
			expect(result).to.be.instanceof(Object);
		});        


		it("should send  200 Status Code ", function() {
			expect(result).to.have.property("statusCode", 200);
		});

		it("success object should contain body", function(){
			expect(result).to.have.property("body");
		});

		it("success object should not contain empty body", function(){
			expect(result.body).not.to.be.empty;
		});

		it("success  body will contain body", function(){
			expect(result.body.body).not.to.be.empty;
		});       

		it("Array Item should Contain all mandatory criteria", function(){
			expect(result.body.body).to.contain.all.keys(listMockData.mandatoryFields);
		});    

	});
  
	describe("Update Position Test", ()=>{
		before((done)=>{
			chai.request(app)
				.put(`/api/v1/positions/${result.body.body._id}`)
				.send(createMockData.body)
				.end((err, res)=>{
					result = res;
					done();
				});
		});

		it("success function sends something",() => {
			expect(result).not.to.be.empty;
		});
    
    
		it("success function sends an object", function(){
			expect(result).to.be.instanceof(Object);
		});

		it("should send  200 Status Code ", function() {
			expect(result).to.have.property("statusCode", 200);
		});

		it("success object should contain body", function(){
			expect(result).to.have.property("body");
		});

		it("success object should not contain empty body", function(){
			expect(result.body).not.to.be.empty;
		});

		it("success body should contain body ", function() {
			expect(result.body).to.have.property("body");
		});

		it("success body will contain non empty body", function(){
			expect(result.body.body).not.to.be.empty;
		});

		it("result should have mandatory fields", function(){
           
			expect(result.body.body).to.contain.all.keys(createMockData.mandatoryFields);
     
		});          

	});

	describe("Delete Position Test", ()=>{
		before((done)=>{
			chai.request(app)
				.delete(`/api/v1/positions/${result.body.body._id}`)
				.send()
				.end((err, res)=>{
					result = res;
					done();
				});
		});

		it("success function sends something",() => {
			expect(result).not.to.be.empty;
		});
    
    
		it("success function sends an object", function(){
			expect(result).to.be.instanceof(Object);
		});

		it("should send  200 Status Code ", function() {
			expect(result).to.have.property("statusCode", 200);
		});

		it("success object should contain body", function(){
			expect(result).to.have.property("body");
		});

		it("success object should not contain empty body", function(){
			expect(result.body).not.to.be.empty;
		});

		it("success body should contain body ", function() {
			expect(result.body).to.have.property("body");
		});

		it("success body will contain non empty body", function(){
			expect(result.body.body).not.to.be.empty;
		});          

	});

	/* Technology Test */
	describe("Create Technology Test", ()=>{

		let result;
		before((done)=>{
			chai.request(app)
				.post("/api/v1/technology/")
				.send(createTechMockData.body)
				.end((err, res)=>{
					result = res;
					done();
				});
		});

		it("success function sends something",() => {
			expect(result).not.to.be.empty;
		});
    
    
		it("success function sends an object", function(){
			expect(result).to.be.instanceof(Object);
		});

		it("should send  200 Status Code ", function() {
			expect(result).to.have.property("statusCode", 200);
		});

		it("success object should contain body", function(){
			expect(result).to.have.property("body");
		});

		it("success object should not contain empty body", function(){
			expect(result.body).not.to.be.empty;
		});

		it("success body should contain body ", function() {
			expect(result.body).to.have.property("body");
		});

		it("success body will contain non empty body", function(){
			expect(result.body.body).not.to.be.empty;
		});

		it("result should have mandatory fields", function(){
          
			expect(result.body.body).to.contain.all.keys(createTechMockData.mandatoryFields);
    
		});          

	});
	describe("Technology List Test", ()=>{

		let result;
		before((done)=>{
			chai.request(app)
				.get("/api/v1/technology/")
				.send()
				.end((err, res)=>{
					result = res;
					done();
				});
		});

		it("success function sends something", function(){
			expect(result).not.to.be.empty;
		});        

		it("success function sends an object", function(){
			expect(result).to.be.instanceof(Object);
		});        


		it("should send  200 Status Code ", function() {
			expect(result).to.have.property("statusCode", 200);
		});

		it("success object should contain body", function(){
			expect(result).to.have.property("body");
		});

		it("success object should not contain empty body", function(){
			expect(result.body).not.to.be.empty;
		});

		it("success  body will contain body", function(){
			expect(result.body.body).not.to.be.empty;
		});

		it("suceess bodys body should have be an Array", function(){
			expect(result.body.body.data).to.be.instanceOf(Array);
		});       

		it("Array Item should Contain all mandatory criteria", function(){
			expect(result.body.body.data[0]).to.contain.all.keys(listTechMockData.mandatoryFields);
		});    
	});

	describe("Technology List Test", ()=>{

		let result;
		before((done)=>{
			chai.request(app)
				.get("/api/v1/technology/java")
				.send()
				.end((err, res)=>{
					result = res;
					done();
				});
		});

		it("success function sends something", function(){
			expect(result).not.to.be.empty;
		});        

		it("success function sends an object", function(){
			expect(result).to.be.instanceof(Object);
		});        


		it("should send  200 Status Code ", function() {
			expect(result).to.have.property("statusCode", 200);
		});

		it("success object should contain body", function(){
			expect(result).to.have.property("body");
		});

		it("success object should not contain empty body", function(){
			expect(result.body).not.to.be.empty;
		});

		it("success  body will contain body", function(){
			expect(result.body.body).not.to.be.empty;
		});

		it("suceess bodys body should have be an Array", function(){
			expect(result.body.body).to.be.instanceOf(Array);
		});       

		it("Array Item should Contain all mandatory criteria", function(){
			expect(result.body.body[0]).to.contain.all.keys(listTechMockData.mandatoryFields);
		});    
	});

});
