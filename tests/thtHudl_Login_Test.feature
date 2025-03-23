Feature: Hudl Web Login Tests

  Background: 
    Given I am on the Hudl homepage

  Scenario: Login successfully with valid credentials
    Given I navigate to the Hudl login page
    And I fill in the login form with valid credentials
    When I submit the login form
    Then I should be redirected to the Hudl home page
    And I should see the standard menu on the landing page

  Scenario: Login successfully with valid credentials and prefix/suffix white spaces in Username trimmed
    Given I navigate to the Hudl login page
    And I fill in the login form with valid credentials and extra spaces around the username
    When I submit the login form
    Then I should be redirected to the Hudl home page

  Scenario: Login successfully with valid credentials after wrong email edited back from password screen
    Given I navigate to the Hudl login page
    And I attempt to log in with an invalid email and password
    When I edit the email back to a valid one and submit the login form again
    Then I should be redirected to the Hudl home page

  Scenario: Login failure with invalid credentials: password Only
    Given I navigate to the Hudl login page
    And I fill in the login form with a valid username and an invalid password
    When I submit the login form
    Then I should see an error message indicating that the email or password is incorrect
    And I should see a screenshot of the login failure page

  Scenario: Login failure with invalid credentials: email/password
    Given I navigate to the Hudl login page
    And I fill in the login form with an invalid username and password
    When I submit the login form
    Then I should see an error message indicating that the username or password is incorrect

  Scenario: Login failure for SQL Injection and XSS attempts
    Given I navigate to the Hudl login page
    When I attempt to log in with an SQL Injection payload in the email field
    Then I should see an error message indicating that the email is invalid

    When I attempt to log in with an XSS payload in the email field
    Then I should see an error message indicating that the email is invalid
