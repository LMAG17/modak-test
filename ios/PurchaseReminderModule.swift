//
//  PurchaseReminderModule.swift
//  modak
//
//  Created by Luis Miguel Alvarez Gil on 23/08/25.
//

import Foundation
import EventKit
import React

@objc(PurchaseReminderModule)
class PurchaseReminderModule: NSObject {
  
  private let eventStore = EKEventStore()

  @objc
  func addPurchaseReminder(_ title: String, date: NSNumber, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
    print("✅ addEvent llamado con título: \(title)")
    eventStore.requestAccess(to: .event) { granted, error in
      if let error = error {
        rejecter("error", "Failed to request access: \(error.localizedDescription)", error)
        return
      }

      if !granted {
        rejecter("denied", "Access to calendar denied", nil)
        return
      }

      let event = EKEvent(eventStore: self.eventStore)
      event.title = title
      event.startDate = Date(timeIntervalSince1970: date.doubleValue)
      event.endDate = event.startDate.addingTimeInterval(60*60)
      event.calendar = self.eventStore.defaultCalendarForNewEvents

      do {
        try self.eventStore.save(event, span: .thisEvent)
        resolver("Reminder added successfully")
      } catch let saveError {
        rejecter("error", "Failed to save event: \(saveError.localizedDescription)", saveError)
      }
    }
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
