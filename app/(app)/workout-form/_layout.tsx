import React from "react";
import WorkoutProvider from "@/contexts/WorkoutContext";
import { Slot } from "expo-router";

export default function Layout() {

    return (
        <WorkoutProvider>
            <Slot />
        </WorkoutProvider>
    );
}