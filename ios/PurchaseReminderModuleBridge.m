//
//  PurchaseReminderModuleBridge.m
//  modak
//
//  Created by Luis Miguel Alvarez Gil on 23/08/25.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(PurchaseReminderModule, NSObject)

RCT_EXTERN_METHOD(addPurchaseReminder:(NSString *)title
                  date:(NSNumber *)date
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
