import React from "react";
import { CreateWorkoutProvider } from "@/features/workout";
import { Slot } from "expo-router";

export default function Layout() {

    return (
        <CreateWorkoutProvider>
            <Slot />
        </CreateWorkoutProvider>
    );
}