//
//  ServiceUtils.swift
//  Controller
//
//  Created by SYAM SASIDHARAN on 7/8/17.
//  Copyright © 2017 Myaango Pte Ltd. All rights reserved.
//

import UIKit

class ServiceUtils: NSObject {
    
    func isSuccess(_ response : Any?) -> Bool {
        
        if (response as? String) != nil {
            return true
        }
        else {
            return false
        }
    }
}
