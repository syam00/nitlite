//
//  ServiceFactory.swift
//  Controller
//
//  Created by SYAM SASIDHARAN on 24/7/17.
//  Copyright © 2017 Myaango Pte Ltd. All rights reserved.
//

import UIKit

class ServiceFactory: NSObject {

    static func createLightService() -> LightService?{
        
        let serverBaseUrl = Preferences.sharedInstance.getValueForKey(key: ServerUrlPrefKey)
        if let url = serverBaseUrl {
            let lightService = LightService(url: url)
            return lightService
        }
        return nil
    }
}
