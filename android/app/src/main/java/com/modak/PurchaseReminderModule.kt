package com.modak

import android.content.ContentValues
import android.content.Context
import android.provider.CalendarContract
import android.provider.CalendarContract.Events
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class PurchaseReminderModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "PurchaseReminderModule"
    }

    @ReactMethod
    fun addPurchaseReminder(title: String, timestamp: Double, promise: Promise) {
        try {
            val beginTime = timestamp.toLong() * 1000
            val endTime = beginTime + 60 * 60 * 1000

            val values = ContentValues().apply {
                put(Events.DTSTART, beginTime)
                put(Events.DTEND, endTime)
                put(Events.TITLE, title)
                put(Events.CALENDAR_ID, 1)
                put(Events.EVENT_TIMEZONE, "UTC")
            }

            val uri = reactApplicationContext.contentResolver.insert(Events.CONTENT_URI, values)

            if (uri != null) {
                promise.resolve("Reminder added successfully")
            } else {
                promise.reject("error", "Failed to insert event")
            }

        } catch (e: Exception) {
            promise.reject("error", e.message, e)
        }
    }
}
