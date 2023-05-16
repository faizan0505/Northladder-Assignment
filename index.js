"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const CDP_1 = require("./services/CDP");
// Create an instance of CustomerDataPlatform
const cdp = new CDP_1.CustomerDataPlatform();
// Test the methods
const profile = {
    id: "1",
    firstName: "Md",
    lastName: "Faizan",
    email: "johndoe@example.com",
    phone: "1234567890",
    address: {
        street: "123 Main St",
        city: "Bhilai",
        state: "CG",
        zip: "12345",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
};
const addedProfile = cdp.addCustomerProfile(profile);
console.log("Added Profile:", addedProfile);
const updatedProfile = {
    id: addedProfile.id || "1",
    firstName: "Md",
    lastName: "Faizan",
    email: "faizan@gmail.com",
    phone: "9874563215",
    address: {
        street: "456 Plan",
        city: "Raipur",
        state: "WB",
        zip: "98765",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
};
const updatedProfileResult = cdp.updateCustomerProfile(updatedProfile);
if (updatedProfileResult) {
    console.log("Updated Profile:", updatedProfileResult);
    console.log("Updated Profile ID:", updatedProfileResult.id);
    // Perform operations that require the profile to be updated
    cdp.deleteCustomerProfile(updatedProfileResult.id);
    console.log("Deleted Profile");
    const retrievedProfile = cdp.getCustomerProfileFromId(updatedProfileResult.id);
    console.log("Retrieved Profile:", retrievedProfile);
    const profiles = cdp.listCustomerProfiles();
    console.log("All Profiles:", profiles);
    const taggedProfile = cdp.updateTag(updatedProfileResult.id, ["VIP"]);
    console.log("Tagged Profile:", taggedProfile);
}
else {
    console.log("Profile not found");
}
