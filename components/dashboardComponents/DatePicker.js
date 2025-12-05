"use client"

import React, { useState } from "react"

import { Calendar } from "@/components/ui/calendar"

export default function DatePicker() {
  const [date, setDate] = useState(
    new Date()
  )

  return (
    <>
      <Calendar
        mode="single"
        defaultMonth={date}
        selected={date}
        onSelect={setDate}
        className="rounded-lg bg-white"
        classNames={{

        }}
      />
    </>
  )
}
