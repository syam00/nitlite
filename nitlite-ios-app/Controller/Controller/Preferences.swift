//
//  Preferences.swift
//  Controller
//
//  Created by SYAM SASIDHARAN on 22/8/17.
//  Copyright © 2017 Myaango Pte Ltd. All rights reserved.
//

import UIKit

class Preferences: NSObject {

    public static let sharedInstance = Preferences()
    
    func getValueForKey(key : String?) -> String? {
        return UserDefaults.standard.string(forKey: key!)!
    }
    
    func setValueForKey(key : String?, value : String?) {
        
        UserDefaults.standard.setValue(value, forKey: key!)
        UserDefaults.standard.synchronize()
    }
    
    func registerPreferences() {
        UserDefaults.standard.register(defaults: [ServerUrlPrefKey : ServerUrlDefaultPrefValue])
    }
}
