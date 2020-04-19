//
//  LightServiceTests.swift
//  Controller
//
//  Created by SYAM SASIDHARAN on 3/8/17.
//  Copyright © 2017 Myaango Pte Ltd. All rights reserved.
//

import XCTest

class LightServiceTests: XCTestCase {
    
    var lightService : LightService?
    var baseURL : String = "http://localhost:3000"
    var fetchedLight : Light?
    
    override func setUp() {
        super.setUp()
        // Put setup code here. This method is called before the invocation of each test method in the class.
        lightService = LightService(url: baseURL)
    }
    
    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
        lightService = nil
    }
    
    func testAddLight() {
        
        let addLightServiceExpectation = self.expectation(description: "executing add light service")
        
        let light = Light()
        light.active = 0
        light.device_id = "my_test_light_a1"
        light.id = UUID().uuidString
        light.state = 0
        light.name = "test light A1"
        light.location = "my room test light"
        
        lightService?.addLight(light: light, callback: { (light, error) in
            
            addLightServiceExpectation.fulfill()
        })
        
        waitForExpectations(timeout: 1) { (error) in
            
            if error != nil {
                print("error, timeout")
            }
            else {
                print("no error")
            }
        }
        
    }
    
    func testGetAllLights() {
        
        let allLightsServiceExpectation = self.expectation(description: "executing all lights service")
        
        lightService?.getAllLights(callback: { (lights, error) in
            
            print("completed")
            
            if (lights != nil) {
                for light in lights as! [Light] {
                    print(light.device_id ?? "NO DEVICE ID")
                    self.fetchedLight = light
                }
            }
            
            allLightsServiceExpectation.fulfill()
        })
        
        waitForExpectations(timeout: 1) { (error) in
            
            if error != nil {
                print("error, timeout")
            }
            else {
                print("no error")
            }
        }
    }
    

    
    func testUpdateLightInfo() {
        
        let updateLightServiceExpectation = self.expectation(description: "executing update light service")
        
        let light = Light()
        light.active = 0
        light.device_id = "my_test_light_a1"
        light.state = 0
        light.name = "test light AV1"
        light.location = "my room test light AV"
        
        lightService?.updateLightInfo(light: light, callback: { (light, error) in
            
            print("updateLightInfo completed")
            updateLightServiceExpectation.fulfill()
        })
        
        waitForExpectations(timeout: 1) { (error) in
            
            print("timeout")
            if error != nil {
                print("error, timeout")
            }
            else {
                print("no error")
            }
        }
    }
    
    
    func testTurnOnLight() {
        
        let turnOnLightServiceExpectation = self.expectation(description: "executing control light service")
        
        lightService?.controlLight(lightIdentifier: "my_test_light_a1", state: 1, callback: { (light, error) in
            
            print("controlLight completed - turn on")
            turnOnLightServiceExpectation.fulfill()
        })
        
        waitForExpectations(timeout: 1) { (error) in
            
            print("timeout")
            if error != nil {
                print("error, timeout")
            }
            else {
                print("no error")
            }
        }

    }
    
    func testTurnOffLight() {
        
        let turnOffLightServiceExpectation = self.expectation(description: "executing control light service")
        
        
        lightService?.controlLight(lightIdentifier: "my_test_light_a1", state: 0, callback: { (light, error) in
            
            print("controlLight completed - trun off")
            turnOffLightServiceExpectation.fulfill()
        })
        
        waitForExpectations(timeout: 1) { (error) in
            
            print("timeout")
            if error != nil {
                print("error, timeout")
            }
            else {
                print("no error")
            }
        }

    }
    
    
    func testDeleteLight() {
        
    }
    
}
