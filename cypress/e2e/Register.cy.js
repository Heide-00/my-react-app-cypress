import { errorMessages } from "../../src/components/Register";
   //beforeForEach(()=>{
   //cy.visit("http://localhost:5174/"); 
  //});
describe("Register Page",()=>{

 describe("Error Messages",()=>{
    it("Name input throws error for 2 chars",()=>{
      //Arrange
      cy.visit("http://localhost:5174/");
      //Act
      cy.get('[data-cy="ad-input"]').type("em");
      //Assert
      cy.contains(errorMessages.ad);
    });
    it("Surname input throws error for 2 chars",()=>{
      //Arrange
      cy.visit("http://localhost:5174/");
      //Act
      cy.get('[data-cy="soyad-input"]').type("şa");
      //Assert
      cy.contains(errorMessages.soyad);
    });
     it("Email input throws error for emre@wit.",()=>{
      //Arrange
      cy.visit("http://localhost:5174/");
      //Act
      cy.get('[data-cy="email-input"]').type("emre@wit.");
      //Assert
      cy.contains(errorMessages.email);
    });
       it("Password input throws error for 1234",()=>{
      //Arrange
      cy.visit("http://localhost:5174/");
      //Act
      cy.get('[data-cy="password-input"]').type("1234");
      //Assert
      cy.contains(errorMessages.password);
    });
    //Buton disabled mi kontrolü
        it("Button is disabled for unvalidated inputs.",()=>{
      //Arrange
      cy.visit("http://localhost:5174/");
      //Act
      cy.get('[data-cy="password-input"]').type("1234");
      //Assert
      cy.get('[data-cy="submit-button"]').should("be.disabled");
    });
  });
   describe("Form inputs validated",()=>{
    it("Button enabled for validated inputs",()=>{
      //Arrange
      cy.visit("http://localhost:5174/");
      //Act
      cy.get('[data-cy="ad-input"]').type("Emre");
      cy.get('[data-cy="soyad-input"]').type("Şahiner");
      cy.get('[data-cy="email-input"]').type("emre@wit.com.tr");
      cy.get('[data-cy="password-input"]').type("1234Aa**");
      //Assert
      cy.get('[data-cy="submit-button"]').should("not.be.disabled");
    });
      it("Submits form on validated inputs",()=>{
      //Arrange
      cy.visit("http://localhost:5174/");
      //Act
      cy.get('[data-cy="ad-input"]').type("Emre");
      cy.get('[data-cy="soyad-input"]').type("Şahiner");
      cy.get('[data-cy="email-input"]').type("emre@wit.com.tr");
      cy.get('[data-cy="password-input"]').type("1234Aa**");
      cy.get('[data-cy="submit-button"]').click();
      //Assert
      cy.get('[data-cy="response-message"]').should("be.visible");
    });
  });
});
  
  
  
  
  
  
  
  
  
  
  
  
  
