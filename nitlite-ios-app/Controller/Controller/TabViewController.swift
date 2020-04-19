//
//  ViewController.swift
//  Controller
//
//  Created by SYAM SASIDHARAN on 16/6/17.
//  Copyright © 2017 Myaango Pte Ltd. All rights reserved.
//

import UIKit

class TabViewController: UITabBarController {

    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        self.tabBar.tintColor = Theme.getBaseThemeColor()
    }

}

