//
//  SettingsViewController.swift
//  Controller
//
//  Created by SYAM SASIDHARAN on 23/7/17.
//  Copyright © 2017 Myaango Pte Ltd. All rights reserved.
//

import UIKit
import Eureka

class SettingsViewController: FormViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        setupView()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func setupView() {
        //load settings
        
        form +++ Section("Nitlite")
            <<< LabelRow(){ row in
                row.title = "Name"
        }

    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
    }

}
