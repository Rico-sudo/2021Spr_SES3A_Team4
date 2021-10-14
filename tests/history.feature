Feature: Ensure the functionalities of history page work

    Background:
        Given Launch App
    Scenario: Open up the history page
        Given Wait for menu: "TabBar"
        When Click element: "history"
        Then Wait for element: "History"